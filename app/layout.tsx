import type { Metadata } from "next";
import "./globals.css";
import "../styles/theme.css";

export const metadata: Metadata = {
  title: "Nexus AI Agent | Premium AI Platform v2",
  description: "Plataforma profissional de gerenciamento de agentes IA - Powered by Mastra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
