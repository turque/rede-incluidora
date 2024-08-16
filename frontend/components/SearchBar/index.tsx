'use client';

import { useState } from 'react';
import {
  Box,
  Input,
  Select,
  Button,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('especialidade');
  const [region, setRegion] = useState('');

  const handleSearch = () => {
    // Lógica para fazer a pesquisa
    console.log({ searchQuery, filterType, region });
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={8}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        gap={4}
      >
        <FormControl flex="2">
          <FormLabel>Pesquisar</FormLabel>
          <Input
            placeholder="Digite o nome do profissional, especialidade ou doença"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>

        <FormControl flex="1">
          <FormLabel>Filtrar por</FormLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="especialidade">Especialidade</option>
            <option value="doenca">Doença</option>
            <option value="regiao">Região</option>
          </Select>
        </FormControl>

        {filterType === 'regiao' && (
          <FormControl flex="1">
            <FormLabel>Região</FormLabel>
            <Input
              placeholder="Digite a região"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </FormControl>
        )}

        <Button
          mt={{ base: 4, md: 8 }}
          ml={{ md: 4 }}
          colorScheme="orange"
          height="48px"  // Alinha com a altura do input
          onClick={handleSearch}
          width={{ base: '100%', md: 'auto' }}
        >
          Buscar
        </Button>
      </Flex>
    </Box>
  );
}
