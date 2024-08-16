import { Box, Container, SimpleGrid, Stack, Text, Link, IconButton, Flex, Divider } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="white" color="gray.600" py={1}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {/* Seção de Contato */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize="md" mb={2}>
              Contato
            </Text>
            <Text>Telefone: (11) 1234-5678</Text>
            <Text>Email: contato@saude.com.br</Text>
            <Text>Endereço: Rua Saúde, 123 - São Paulo, SP</Text>
          </Stack>

          {/* Seção de Links Rápidos */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize="sd" mb={2}>
              Links Rápidos
            </Text>
            <Link href="#">Sobre Nós</Link>
            <Link href="#">Serviços</Link>
            <Link href="#">Termos de Uso</Link>
            <Link href="#">Política de Privacidade</Link>
          </Stack>

          {/* Seção de Mídias Sociais */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize='md' mb={2}>
              Siga-nos
            </Text>
            <Flex>
              <Link href="https://www.facebook.com" isExternal>
                <IconButton
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  bg="transparent"
                  color={'blue'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
              <Link href="https://www.twitter.com" isExternal ml={4}>
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  bg="transparent"
                  color={'blue.400'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
              <Link href="https://www.instagram.com" isExternal ml={4}>
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  bg="transparent"
                  color={'pink.600'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
              <Link href="https://www.linkedin.com" isExternal ml={4}>
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  bg="transparent"
                  color={'blue.600'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
            </Flex>
          </Stack>
        </SimpleGrid>

        <Divider my={6} borderColor="gray.700" />

        {/* Seção de Direitos Autorais */}
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize="sm" textAlign="center">
            &copy; {new Date().getFullYear()} Rede Incluidora. Todos os direitos reservados.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
