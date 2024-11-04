'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import SingleSelectComponent from '../SingleSelectComponent';

const SearchBar = () => {
  const router = useRouter();
  const [specialization, setSpecialization] = useState(null);
  const [specializationList, setSpecializationList] = useState([]);
  const [city, setCity] = useState(null);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    // Fetch filters from backend
    axios.get('/api/filters')
      .then(response => {
        setCityList(response.data.city);
        setSpecializationList(response.data.specializations);
      })
      .catch(error => {
        console.error('Error fetching filters:', error);
      });
  }, []);

  const loadCityOptions = (inputValue, callback) => {
    const filteredOptions = cityList
      .filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
      .map(city => ({ label: city, value: city }));
    callback(filteredOptions);
  };

  const loadSpecializationOptions = (inputValue, callback) => {
    const filteredOptions = specializationList
      .filter(spec => spec.toLowerCase().includes(inputValue.toLowerCase()))
      .map(spec => ({ label: spec, value: spec }));
    callback(filteredOptions);
  };

  const handleSearch = async () => {
    if (!specialization && !city) {
      alert('Por favor, informe pelo menos um critério de pesquisa.');
      return;
    }

    const queryParams = new URLSearchParams();
    if (specialization) queryParams.append('search', specialization.value);
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
            defaultOptions={specializationList.map(spec => ({ label: spec, value: spec }))}
            // label="Pesquisar"
            placeholder="Especialidade"
          />
          <SingleSelectComponent
            value={city}
            setValue={setCity}
            loadOptions={loadCityOptions}
            defaultOptions={cityList.map(city => ({ label: city, value: city }))}
            // label="Cidade"
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
