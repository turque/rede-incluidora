import { Box, VStack, Text } from '@chakra-ui/react';
import HealthProfessionalCard from '@/components/HealthProfessionalCard';
import { HealthProfessional } from '@/types/HealthProfessional';


const Resultado = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const queryString = new URLSearchParams(searchParams).toString();
  const apiUrl = new URL(`${process.env.API_URL}/api/v1/search?${queryString}`);
  let results = await fetch(apiUrl).then((response) => response.json());

  return (
    <Box className="min-h-screen py-1 flex justify-center" w="75%">
      <VStack spacing={2}>
        {results.length > 0 ? (
          results.map((result: HealthProfessional, index: number) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="lg">
              <HealthProfessionalCard {...result} />
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
