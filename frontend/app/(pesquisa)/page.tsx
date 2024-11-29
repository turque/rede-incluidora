import { Box, Container, Text, Flex } from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';;

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box as="main">
      {/* <Flex maxW="300px"> */}
        <Text fontSize="3xl" color="orange.400" textAlign="left" mb={8} fontWeight="bold" lineClamp="2">
          Pesquise por especialistas e encontre o melhor atendimento para você.
        </Text>
        {/* </Flex> */}
        <SearchBar />
      </Box>
    </Container>
  );
}
