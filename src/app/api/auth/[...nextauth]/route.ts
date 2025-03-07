import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { JWT } from "next-auth/jwt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials?: Record<"email" | "password", string>) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const client = await pool.connect();
        try {
          const result = await client.query("SELECT * FROM users WHERE email = $1", [credentials.email]);
          const user = result.rows[0];

          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role, 
          };
        } finally {
          client.release();
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: "openid email profile" } },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: { params: { scope: "email" } },
    }), 

  ],

  session: {
    strategy: "jwt" as const, 
  },

  callbacks: {
    async jwt(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { token, account, user }: { token: JWT; account?: any; user?: any }) {
      console.log("JWT CALLBACK START:", { token, account, user });
  
      // **Google OAuth Login**
      if (account?.provider === "google" && account.id_token && account.access_token) {
        console.log("New Login - Processing Google Account");
        try {
          const googleUserInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${account.access_token}` },
          }).then((res) => res.json());
  
          console.log("GOOGLE USER INFO:", googleUserInfo);
  
          const backendResponse = await fetch(`${BACKEND_URL}/api/v1/auth/oauth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: account.id_token,
              accessToken: account.access_token,
              email: googleUserInfo.email,
              name: googleUserInfo.name,
              photoProfileUrl: googleUserInfo.picture,
            }),
          });
  
          if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error("Backend Authentication Error:", backendResponse.status, errorText);
            throw new Error(`Failed to authenticate with backend: ${backendResponse.status} - ${errorText}`);
          }
  
          const backendData = await backendResponse.json();
          console.log("BACKEND RESPONSE:", backendData);
  
          // **Pastikan `accessToken` selalu ada**
          token.accessToken = backendData.accessToken || "";
          token.refreshToken = backendData.refreshToken || "";
          token.id = backendData.userId || "";
          token.name = backendData.fullname || "";
          token.email = backendData.email || "";
          token.role = backendData.role || "";
          token.scope = backendData.scope || "";
  
        } catch (error) {
          console.error("Error processing Google login:", error);
        }
      }
  
      // **Facebook OAuth Login**
      if (account?.provider === "facebook" && account.access_token) {
        console.log("New Login - Processing Facebook Account");
        try {
          const facebookUserInfo = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${account.access_token}`)
            .then((res) => res.json());
  
          console.log("FACEBOOK USER INFO:", facebookUserInfo);
  
          const backendResponse = await fetch(`${BACKEND_URL}/api/v1/auth/oauth/facebook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: account.access_token,
              email: facebookUserInfo.email,
              name: facebookUserInfo.name,
              photoProfileUrl: facebookUserInfo.picture?.data?.url || "",
            }),
          });
  
          if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error("Backend Authentication Error:", backendResponse.status, errorText);
            throw new Error(`Failed to authenticate with backend: ${backendResponse.status} - ${errorText}`);
          }
  
          const backendData = await backendResponse.json();
          console.log("BACKEND RESPONSE:", backendData);
  
          token.accessToken = backendData.accessToken || "";
          token.refreshToken = backendData.refreshToken || "";
          token.id = backendData.userId || "";
          token.name = backendData.fullname || "";
          token.email = backendData.email || "";
          token.role = backendData.role || "";
          token.scope = backendData.scope || "";
  
        } catch (error) {
          console.error("Error processing Facebook login:", error);
        }
      }
  
      // **Email & Password Login (Credentials)**
      if (user) {
        token.id = user.id || "";
        token.email = user.email || "";
        token.fullname = user.name || "";
        token.role = user.role || "";
      }
  
      console.log("FINAL JWT TOKEN:", token);
      return token;
    },
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      console.log("SESSION CALLBACK:", { session, token });
  
      // **Pastikan `session.user` tidak mencoba mengakses `undefined` token**
      session.user = {
        id: token.id || "",
        email: token.email || "",
        fullname: token.fullname || "",
        role: token.role || "",
      };
  
      session.accessToken = token.accessToken || "";
      session.refreshToken = token.refreshToken || "";
      session.scope = token.scope || "";
  
      return session;
    },
  
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/dashboard/user`;
      }
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard/user`;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
