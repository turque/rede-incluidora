'use client'
import { Box, Heading, Text, Button } from "@chakra-ui/react";


export default function Soon() {
  return (
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={4} color="brand.500">
          Em Breve 🚧
        </Heading>
        <Text fontSize="lg" mb={6}>
          Estamos trabalhando duro para trazer esta funcionalidade e muitas
          outras em breve. Fique ligado!
        </Text>
        <Button
          colorScheme="brand"
          variant="solid"
          size="lg"
          onClick={() => alert("Obrigado por sua paciência!")}
        >
          Obrigado por esperar!
        </Button>
      </Box>
  );
}
