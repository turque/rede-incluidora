import { Box, VStack, Text } from '@chakra-ui/react';
import HealthProfessionalCard from '@/components/HealthProfessionalCard';


const Resultado = async ({ searchParams }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryString = new URLSearchParams(searchParams).toString();

  const response = await fetch(`${apiUrl}/api/v1/search?${queryString}`);
  const results = await response.json();
  console.log(results);

  return (
    <Box className="min-h-screen py-1 flex justify-center" w="75%">
      <VStack spacing={2}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="lg">
              <HealthProfessionalCard data={result} />
            </Box>
          ))
        ) : (
          <Box p={4} borderWidth={1} borderRadius="lg" className="bg-gray-100 text-center">
            <Text fontSize="lg" color="gray.500">Não foram encontrados resultados. Por favor, refaça a pesquisa.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Resultado;
