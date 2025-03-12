// components/RootLayoutClient.tsx (Client Component)
"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
