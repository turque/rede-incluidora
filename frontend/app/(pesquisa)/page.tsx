import { Box, Container, Text } from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';;

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box as="main">
        <SearchBar />
      </Box>
    </Container>
  );
}
