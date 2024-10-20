import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Header from "@/components/header";
import PageWrapper from "@/components/pagewrapper";
import MarginWidthWrapper from "@/components/margin-width-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vesperia",
  description: "Generated for Inter Test",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <ChakraProvider>
          <Flex direction={{ base: "column", md: "row" }}>
            <Box flex="1">
              <MarginWidthWrapper>
                <Header />
                <PageWrapper>{children}</PageWrapper>
              </MarginWidthWrapper>
            </Box>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
