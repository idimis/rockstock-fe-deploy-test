// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { Pool } from "pg";
// import { JWT } from "next-auth/jwt";
// import NextAuth from "next-auth";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || "",
// });

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const authOptions = {  // <-- Pastikan ini di-export
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials?: Record<"email" | "password", string>) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }

//         const client = await pool.connect();
//         try {
//           const result = await client.query("SELECT * FROM users WHERE email = $1", [credentials.email]);
//           const user = result.rows[0];

//           if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
//             throw new Error("Invalid credentials");
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//           };
//         } finally {
//           client.release();
//         }
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: { params: { scope: "openid email profile" } },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID!,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//       authorization: { params: { scope: "email" } },
//     }),
//   ],

//   session: {
//     strategy: "jwt" as const,
//   },

//   callbacks: {
//     async jwt({ token, account, user }: { token: JWT; account?: any; user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.fullname = user.name;
//         token.role = user.role;
//       }
//       return token;
//     },

//     async session({ session, token }: { session: any; token: JWT }) {
//       session.user.id = token.id;
//       session.user.email = token.email;
//       session.user.fullname = token.fullname;
//       session.user.role = token.role;
//       return session;
//     },

//     async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//       return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard/user`;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//     signOut: "/auth/logout",
//     error: "/auth/error",
//   },
// };
