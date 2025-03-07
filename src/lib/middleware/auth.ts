// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/api/authOptions";  // <-- Tambahkan import ini

// export async function requireAuth(req: NextRequest) {
//   const session = await getServerSession(authOptions);
  
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   return session; 
// }
