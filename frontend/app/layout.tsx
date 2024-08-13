// import { Footer, Header } from "@/components";
import { Grid, GridItem } from '@chakra-ui/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

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
        <Providers>
          <Grid
            templateAreas={`"header header"
                    "main main"
                    "footer footer"`}
            gridTemplateRows={'60px 2fr 50px'}
            gridTemplateColumns={'150px 1fr'}
            h='200px'
            gap='1'
          >
            <GridItem pl='2' bgGradient='linear(to-r, #F0AF0A, #F0790A)' area={'header'}>
              {/* <Header /> */}
            </GridItem>
            <GridItem pl='2' area={'main'}>
              {children}
            </GridItem>
            <GridItem pl='2' bg='blue.300' area={'footer'}>
              {/* <Footer /> */}
            </GridItem>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
