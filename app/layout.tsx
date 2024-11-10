import { ChakraProvider } from "@chakra-ui/react";
import './globals.css';
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import Header from '@/components/Header';
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Rede Incluidora",
  description: "Portal da Rede Incluidora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ChakraProvider>
          <Flex minH="100vh" direction="column">
            <Header />
            <Flex as="main" flex="1" justify="center" align="center" p={4} bg="orange.50">
              {children}
            </Flex>
            <Footer />
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
