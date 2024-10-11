'use client'

import { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, VStack } from '@chakra-ui/react';
import HealthProfessionalCard from '@/components/HealthProfessionalCard/HealthProfessionalCard';
import { HealthProfessional } from '@/interfaces/HealthProfessional';


const PesquisaPage: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HealthProfessional[] | null>(null);

  useEffect(() => {
    interface SearchResponse {
      data: HealthProfessional[];
    }

    axios.post<SearchResponse>('/api/search', { query })
      .then((response: SearchResponse) => {
        setResults(response.data);
      })
      .catch((error: unknown) => {
        console.error('Error fetching search results:', error);
      });
  },
  []);

  return (
    <Box className="min-h-screen py-1 flex justify-center" w='75%'>
      <VStack spacing={2}>
        {results?.map((professional: HealthProfessional, index: number) => (
          <HealthProfessionalCard
            key={index}
            {...professional}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default PesquisaPage;
