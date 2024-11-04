import { Box, Container, SimpleGrid, Stack, Text, Link, IconButton, Flex, Divider } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

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
            <Flex alignItems="center">
              <Text>Telefone: (61) 99883-1214</Text>
                <Link href="https://api.whatsapp.com/send?phone=5561998831214&text=Ol%C3%A1,%20encontrei%20seu%20n%C3%BAmero%20na%20sess%C3%A3o%20de%20contato%20da%20p%C3%A1gina%20Rede%20Incluidora.%20Eu%20sou%20...%20e%20quero%20conversar%20com%20voc%C3%AA%20sobre%20o%20assunto...%20(Escreva%20seu%20nome%20e%20o%20assunto%20que%20quer%20tratar)" isExternal ml={2}>
                <IconButton
                  aria-label="WhatsApp"
                  icon={<FaWhatsapp />}
                  bg="transparent"
                  color="green.500"
                  _hover={{ bg: 'orange.400' }}
                />
                </Link>
            </Flex>
            <Text>Email: contato@saude.com.br</Text>
            {/* <Text>Endereço: Rua Saúde, 123 - São Paulo, SP</Text> */}
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
              <Link href="https://www.facebook.com/redeincluidora" isExternal>
                <IconButton
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  bg="transparent"
                  color={'blue'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
              {/* <Link href="https://www.twitter.com" isExternal ml={4}>
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  bg="transparent"
                  color={'blue.400'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link> */}
              <Link href="https://www.instagram.com/circulodeincluidoras" isExternal ml={4}>
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  bg="transparent"
                  color={'pink.600'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link>
              {/* <Link href="https://www.linkedin.com" isExternal ml={4}>
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  bg="transparent"
                  color={'blue.600'}
                  _hover={{ bg: 'orange.400' }}
                />
              </Link> */}
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
