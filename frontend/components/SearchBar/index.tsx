"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import axios from 'axios';

import { Box, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import MultiSelectComponent from '../MultiSelectComponent';
import AutocompleteSelect from '../AutocompleteSelect';

const SearchBar = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [insurance, setInsurance] = useState([]);
  const [city, setCity] = useState('');
  const [insuranceList, setInsuranceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);

  useEffect(() => {
    // Fetch filters from backend
    axios.get('/api/filters')
      .then(response => {
        setInsuranceList(response.data.insurances);
        setCityList(response.data.city);
        setSpecializationList(response.data.specializations);
      })
      .catch(error => {
        console.error('Error fetching filters:', error);
      });
  },
  []);


  const handleSearch = async (search) => {
    search.preventDefault();
    router.push(`/resultado?${new URLSearchParams({ search })}`);
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={8} className="bg-white p-6 rounded-md shadow-md mb-8">
      <Flex direction="column" gap={4}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <FormControl flex="2">
            <FormLabel>Pesquisar</FormLabel>
            <Input
              placeholder="Digite especialidade ou doença"
              value={query}
              onChange={(search) => setQuery(search.target.value)}
            />
          </FormControl>

          <Button onClick={handleSearch} colorScheme="orange" alignSelf={{ base: 'stretch', md: 'flex-end' }}>
            Pesquisar
          </Button>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <MultiSelectComponent
                value={insurance}
                setValue={setInsurance}
                options={insuranceList.map(plan => ({ label: plan, value: plan }))}
                label="Plano de Saúde"
              />
            <AutocompleteSelect
                value={city}
                setValue={setCity}
                options={cityList}
                label="Cidade"
                placeholder="Digite a cidade"
              />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchBar;
