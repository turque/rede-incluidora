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
  const [insurance, setInsurance] = useState(null);
  const [insuranceList, setInsuranceList] = useState([]);

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
  }, []);

  const loadInsuranceOptions = (inputValue, callback) => {
    const filteredOptions = insuranceList
      .filter(plan => plan.toLowerCase().includes(inputValue.toLowerCase()))
      .map(plan => ({ label: plan, value: plan }));
    callback(filteredOptions);
  };

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
    const queryParams = new URLSearchParams();
    if (specialization) queryParams.append('search', specialization.value);
    if (city) queryParams.append('city', city.value);
    if (insurance) queryParams.append('insurance', insurance.value);

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
            label="Pesquisar"
            placeholder="Selecione ou digite a especialidade"
          />
          <Button onClick={handleSearch} colorScheme="orange" alignSelf={{ base: 'stretch', md: 'flex-end' }}>
            Pesquisar
          </Button>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <SingleSelectComponent
            value={insurance}
            setValue={setInsurance}
            loadOptions={loadInsuranceOptions}
            defaultOptions={insuranceList.map(plan => ({ label: plan, value: plan }))}
            label="Plano de Saúde"
            placeholder="Selecione ou digite o plano de saúde"
          />
          <SingleSelectComponent
            value={city}
            setValue={setCity}
            loadOptions={loadCityOptions}
            defaultOptions={cityList.map(city => ({ label: city, value: city }))}
            label="Cidade"
            placeholder="Selecione ou digite o nome da cidade"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchBar;
