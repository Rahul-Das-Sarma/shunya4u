import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App for souls",
  description: "Created with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
