import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Coursify",
  description: "All the skills you need in one place",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-poppins bg-background flex flex-col h-screen gap-7">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
