"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';

const ResultadoPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.post('/api/search', { query })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  },
  []);

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Resultados da Pesquisa</Text>
      {results ? (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <Text>Carregando...</Text>
      )}
    </Box>
  );
};

export default ResultadoPage;
