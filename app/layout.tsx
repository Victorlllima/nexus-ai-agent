import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus AI Agent | Control Center",
  description: "Exclusive AI Management Interface by Vibecoding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
