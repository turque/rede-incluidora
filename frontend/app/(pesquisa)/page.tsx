import { Box, Container, Text, Flex } from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';;

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box as="main">
        <Text fontSize="3xl" color="orange.400" textAlign="left" mb={8} fontWeight="bold">
          Pesquise por especialistas e encontre o melhor atendimento para você.
        </Text>
        <SearchBar />
      </Box>
    </Container>
  );
}
