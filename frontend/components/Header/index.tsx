'use client'
import { Avatar, Button, HStack, Box, Link, Image } from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-24">
        {/* Logo */}
        <Box>
          <NextLink href="/" passHref>
            <Image src="img/rede-incluidora-logo.svg" alt="Logotipo com um girasoll e os dizeres Rede Incluidora" />
          </NextLink>
        </Box>

        {/* Menu */}
        <HStack spacing={2}>
          <NextLink href="/produtos-servicos" passHref>
            <Button as={Link} variant="ghost" colorScheme="orange">
              Produtos e Serviços
            </Button>
          </NextLink>

          <NextLink href="/pergunte-ao-especialista" passHref>
            <Button as={Link} variant="ghost" colorScheme="orange">
              Pergunte ao Especialista
            </Button>
          </NextLink>

          {isAuthenticated ? (
            <Avatar
              name="Nome do Usuário"
              src=""
              size="md"
            />
          ) : (
            <>
              <NextLink href="/entrar" passHref>
                <Button as={Link} colorScheme="orange">
                  Entrar
                </Button>
              </NextLink>

              <NextLink href="/criar-conta" passHref>
                <Button as={Link} colorScheme="orange" variant="outline">
                  Criar Conta
                </Button>
              </NextLink>
            </>
          )}
        </HStack>
      </div>
    </header>
  );
};

export default Header;
