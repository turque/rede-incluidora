import { Box, Container, Text, Flex } from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';;

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      {(process.env.ENVIRONMENT === 'staging' || process.env.ENVIRONMENT === 'local') && (
        <Box position="fixed" top="0" left="0" right="0" bottom="0" zIndex="banner" pointerEvents="none" opacity={0.5}>
          {[...Array(5)].map((_, index) => (
            <Text
              key={index}
              fontSize="4xl"
              color="gray.200"
              style={{
                position: 'absolute',
                transform: 'rotate(-45deg)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                top: `${10 + index * 20}%`,
                left: `${10 + index * 20}%`,
                transformOrigin: 'center',
                zIndex: -1,
              }}
            >
              Página de teste. <br /> Dados fictícios.
            </Text>
          ))}
        </Box>
      )}
      <Box as="main">
        <Text fontSize="3xl" color="orange.400" textAlign="left" mb={8} fontWeight="bold">
          Pesquise por especialistas e encontre o melhor atendimento para você.
        </Text>
        <SearchBar />
      </Box>
    </Container>
  );
}
