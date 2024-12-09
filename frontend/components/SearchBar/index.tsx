"use client";


import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';

interface SearchBarProps {
  cityOptions: string[];
  specializationOptions: string[];
}

export default function SearchBar({ cityOptions, specializationOptions }: SearchBarProps) {
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] = useState<{ label: string; value: string } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | null>(null);


  const handleSearch = async () => {
    if (!selectedSpecialization && !selectedCity) {
      alert('Por favor, informe pelo menos um critério de pesquisa.');
      return;
    }

    const queryParams = new URLSearchParams();
    if (selectedSpecialization) queryParams.append('specialization', selectedSpecialization.value);
    if (selectedCity) queryParams.append('city', selectedCity.value);

    router.push(`/resultado?${queryParams.toString()}`);
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={8} className="bg-white p-6 rounded-md shadow-md mb-8">
      <Flex direction="column" gap={4}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <FormControl>
            <FormLabel />
            <Select
              defaultValue={selectedSpecialization}
              onChange={(option) => setSelectedSpecialization(option)}
              options={specializationOptions.map((item: string) => ({ label: item, value: item }))}
              placeholder='Especialidade'
            />
          </FormControl>
          <FormControl>
            <FormLabel />
            <Select
              defaultValue={selectedSpecialization}
              onChange={(option) => setSelectedCity(option)}
              options={cityOptions.map((item: string) => ({ label: item, value: item }))}
              placeholder='Cidade'
            />
          </FormControl>
          <Button onClick={handleSearch} colorScheme="orange" alignSelf={{ base: 'stretch', md: 'flex-end' }} width={{ base: '100%', md: 'auto' }} minWidth="120px">
            Pesquisar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
