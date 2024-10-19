import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teeny URL",
  description: "Don't let your lengthy links scare people away",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
