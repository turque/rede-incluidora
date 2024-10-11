'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, VStack } from '@chakra-ui/react';
import HealthProfessionalCard from '@/components/HealthProfessionalCard/HealthProfessionalCard';

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  id: number;
  professional_id: number;
}

interface Phone {
  phone_number: string;
  phone_type: string;
  has_whatsapp: boolean;
  has_telegram: boolean;
  is_primary: boolean;
  usage_type: string;
  id: number;
  professional_id: number;
}

interface SocialMedia {
  platform: string;
  username: string;
  profile_url: string;
  id: number;
  professional_id: number;
}

interface Specialization {
  name: string;
  id: number;
}

interface Insurance {
  name: string;
  id: number;
}

interface HealthProfessional {
  name: string;
  treatment: string;
  self_description: string;
  home_care: boolean;
  accepts_insurance: boolean;
  remote_appointment: boolean;
  in_person_appointment: boolean;
  id: number;
  addresses: Address[];
  phones: Phone[];
  social_medias: SocialMedia[];
  specializations: Specialization[];
  insurances: Insurance[];
}

const PesquisaPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HealthProfessional[] | null>(null);
  // const searchResults: HealthProfessional[] = results ? JSON.parse(results as string) : [];

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
    <Box className="min-h-screen py-1 flex justify-center" w='75%'>
      <VStack spacing={2}>
        {results?.map((professional: HealthProfessional, index) => (
          <HealthProfessionalCard
            key={index}
            name={professional.name}
            treatment={professional.treatment}
            selfDescription={professional.self_description}
            homeCare={professional.home_care}
            acceptsInsurance={professional.accepts_insurance}
            remoteAppointment={professional.remote_appointment}
            inPersonAppointment={professional.in_person_appointment}
            addresses={professional.addresses}
            phones={professional.phones}
            socialMedias={professional.social_medias}
            specializations={professional.specializations}
            insurances={professional.insurances}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default PesquisaPage;
