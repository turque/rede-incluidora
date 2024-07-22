import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "Rede Incluidora",
  description: "Portal da Rede Incluidora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
