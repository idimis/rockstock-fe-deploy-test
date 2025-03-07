import type { Metadata } from "next";
import RootLayoutClient from "./root-layout-client";

export const metadata: Metadata = {
  title: "rockstock",
  description: "Furniture for Rockers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
