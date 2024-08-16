import { Box, VStack } from '@chakra-ui/react';
import HealthProfessionalCard from '@/components/HealthProfessionalCard/HealthProfessionalCard';

const results = [
  {
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    rating: 4,
    imageUrl: 'https://via.placeholder.com/120',
    addresses: [
      { street: 'Rua A, 123', city: 'São Paulo', state: 'SP' },
      { street: 'Av. B, 456', city: 'Rio de Janeiro', state: 'RJ' },
    ],
    contactInfo: {
      phone: '(11) 98765-4321',
      email: 'joao.silva@example.com',
      whatsapp: '5511987654321',
    },
  },
  {
    name: 'Dra. Maria Oliveira',
    specialty: 'Dermatologista',
    rating: 5,
    imageUrl: 'https://via.placeholder.com/120',
    addresses: [
      { street: 'Rua C, 789', city: 'Belo Horizonte', state: 'MG' },
    ],
    contactInfo: {
      phone: '(31) 98765-4321',
      email: 'maria.oliveira@example.com',
      whatsapp: '5531987654321',
    },
  },
  {
    name: 'Dr. Pedro Costa',
    specialty: 'Ortopedista',
    rating: 3,
    imageUrl: 'https://via.placeholder.com/120',
    addresses: [
      { street: 'Av. D, 321', city: 'Porto Alegre', state: 'RS' },
      { street: 'Rua E, 654', city: 'Curitiba', state: 'PR' },
    ],
    contactInfo: {
      phone: '(51) 98765-4321',
      email: 'pedro.costa@example.com',
      whatsapp: '5551987654321',
    },
  },
];

export default function ResultsPage() {
  return (
    <Box className="min-h-screen py-1 flex justify-center" w='75%'>
      <VStack spacing={2} >
        {results.map((professional, index) => (
          <HealthProfessionalCard
            key={index}
            name={professional.name}
            specialty={professional.specialty}
            rating={professional.rating}
            imageUrl={professional.imageUrl}
            addresses={professional.addresses}
            contactInfo={professional.contactInfo}
          />
        ))}
      </VStack>
    </Box>
  );
}
