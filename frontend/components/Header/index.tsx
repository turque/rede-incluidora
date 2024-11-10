'use client'
import { Avatar, Button, HStack, Box, Link, Image, Stack, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="container mx-auto" px={{ base: 4, md: 12 }}>
      <Stack
        direction={{ base: "row", md: "row" }}
        justify={{ base: "space-between", md: "space-between" }}
        align="center"
      >
        {/* Logo */}
        <Box>
          <NextLink href="/" passHref>
            <Image src="img/rede-incluidora-logo.svg" alt="Logotipo com um girassol e os dizeres Rede Incluidora" boxSize={{ base: "120px", md: "160px" }} />
          </NextLink>
        </Box>

        {/* Menu - Desktop */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <NextLink href="/em-breve" passHref>
            <Button as={Link} variant="ghost" colorScheme="orange" size="sm">
              Produtos e Serviços
            </Button>
          </NextLink>

          <NextLink href="/em-breve" passHref>
            <Button as={Link} variant="ghost" colorScheme="orange" size="sm">
              Pergunte ao Especialista
            </Button>
          </NextLink>

          {isAuthenticated ? (
            <Avatar name="Nome do Usuário" src="" size="sm" />
          ) : (
            <>
              <NextLink href="/em-breve" passHref>
                <Button as={Link} colorScheme="orange" size="sm">
                  Entrar
                </Button>
              </NextLink>

              <NextLink href="/em-breve" passHref>
                <Button as={Link} colorScheme="orange" variant="outline" size="sm">
                  Criar Conta
                </Button>
              </NextLink>
            </>
          )}
        </HStack>

        {/* Menu Hamburger - Mobile */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          colorScheme="orange"
        />

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                <NextLink href="/em-breve" passHref>
                  <Button as={Link} variant="ghost" colorScheme="orange" width="100%" onClick={onClose}>
                    Produtos e Serviços
                  </Button>
                </NextLink>

                <NextLink href="/em-breve" passHref>
                  <Button as={Link} variant="ghost" colorScheme="orange" width="100%" onClick={onClose}>
                    Pergunte ao Especialista
                  </Button>
                </NextLink>

                {isAuthenticated ? (
                  <Avatar name="Nome do Usuário" src="" size="md" />
                ) : (
                  <>
                    <NextLink href="/em-breve" passHref>
                      <Button as={Link} colorScheme="orange" width="100%" onClick={onClose}>
                        Entrar
                      </Button>
                    </NextLink>

                    <NextLink href="/em-breve" passHref>
                      <Button as={Link} colorScheme="orange" variant="outline" width="100%" onClick={onClose}>
                        Criar Conta
                      </Button>
                    </NextLink>
                  </>
                )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </Box>
  );
};

export default Header;
