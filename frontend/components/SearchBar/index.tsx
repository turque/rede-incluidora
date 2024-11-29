'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import SingleSelectComponent from '../SingleSelectComponent';

interface Option {
  label: string;
  value: string;
}

const SearchBar = () => {
  const router = useRouter();
  const [specialization, setSpecialization] = useState<Option | null>(null);
  const [specializationList, setSpecializationList] = useState<string[]>([]);
  const [city, setCity] = useState<Option | null>(null);
  const [cityList, setCityList] = useState<string[]>([]);

  useEffect(() => {
    // Fetch filters from backend
    axios.get('/api/v1/search/filters')
      .then((response: { data: { city: string[], specializations: string[] } }) => {
        setCityList(response.data.city);
        setSpecializationList(response.data.specializations);
      })
      .catch((error: any) => {
        console.error('Error fetching filters:', error);
      });
  }, []);

  const loadCityOptions = (inputValue: string, callback: (options: Option[]) => void) => {
    const filteredOptions = cityList
      .filter((city: string) => city.toLowerCase().includes(inputValue.toLowerCase()))
      .map((city: string) => ({ label: city, value: city }));
    callback(filteredOptions);
  };

  const loadSpecializationOptions = (inputValue: string, callback: (options: Option[]) => void) => {
    const filteredOptions = specializationList
      .filter((spec: string) => spec.toLowerCase().includes(inputValue.toLowerCase()))
      .map((spec: string) => ({ label: spec, value: spec }));
    callback(filteredOptions);
  };

  const handleSearch = async () => {
    if (!specialization && !city) {
      alert('Por favor, informe pelo menos um critério de pesquisa.');
      return;
    }

    const queryParams = new URLSearchParams();
    if (specialization) queryParams.append('specialization', specialization.value);
    if (city) queryParams.append('city', city.value);

    router.push(`/resultado?${queryParams.toString()}`);
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={8} className="bg-white p-6 rounded-md shadow-md mb-8">
      <Flex direction="column" gap={4}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <SingleSelectComponent
            value={specialization}
            setValue={setSpecialization}
            loadOptions={loadSpecializationOptions}
            defaultOptions={specializationList.map((spec: string) => ({ label: spec, value: spec }))}
            label=""
            placeholder="Especialidade"
          />
          <SingleSelectComponent
            value={city}
            setValue={setCity}
            loadOptions={loadCityOptions}
            defaultOptions={cityList.map((city: string) => ({ label: city, value: city }))}
            label=""
            placeholder="Cidade"
          />
          <Button onClick={handleSearch} colorScheme="orange" alignSelf={{ base: 'stretch', md: 'flex-end' }} width={{ base: '100%', md: 'auto' }} minWidth="120px">
            Pesquisar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchBar;
