import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Apple",
  description: "A clean Next.js TypeScript project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
