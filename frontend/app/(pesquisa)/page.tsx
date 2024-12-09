import { Box, Container, Text } from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';
import FilterCard from '@/components/FilterCard';


export default async function Home() {
  const apiUrl = new URL(`${process.env.API_URL}/api/v1/search/filters`);
  let filters = await fetch(apiUrl).then((response) => response.json());
  // let data = await fetch('http://backend:8000/api/v1/search/filters');
  // let filters = await data.json();

  return (
    <Container maxW="container.xl" py={8}>
      <Box as="main" display="flex" flexDirection="column" justifyContent="center" minHeight="100vh">
        <Text fontSize="3xl" color="orange.400" textAlign="left" mb={8} fontWeight="bold">
          Pesquise por especialistas e encontre o melhor atendimento para você.
        </Text>
        <SearchBar cityOptions={filters.city} specializationOptions={filters.specializations} />
        <Box mb={36} />
        <Box mb={4}>
          <FilterCard
            items={filters.specializations.map((item: string) => ({
              text: item,
              url: `/resultado?specialization=${item}`
            }))}
          />
        </Box>
        <Box mb={4}>
          <FilterCard
            items={filters.insurances.map((item: string) => ({
              text: item,
              url: `/resultado?insurance=${item}`
            }))}
          />
        </Box>
      </Box>
    </Container>
  );
}
