import type { Metadata } from "next";
import "./globals.css";
import { LayoutProvider } from "./LayoutProvider";

export const metadata: Metadata = {
  title: "Radiant Way Travel",
  description: "A clean Next.js TypeScript project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
