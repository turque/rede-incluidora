'use client'
import { Box, Image, Text, VStack, HStack, Icon, Divider, Link } from '@chakra-ui/react';
import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { FC } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
}

interface HealthProfessionalCardProps {
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  addresses: Address[];
  contactInfo: ContactInfo;
}

const HealthProfessionalCard: FC<HealthProfessionalCardProps> = ({
  name,
  specialty,
  rating,
  imageUrl,
  addresses,
  contactInfo,
}) => {
  return (
    <Box
      width="100%"
      height="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow-lg"
      p={4}
      bg="white"
      display="flex"
      flexDirection="column"
    >
      <HStack spacing={4} alignItems="center" flex="1">
        <VStack align="start" flex="1">
          <Text fontWeight="bold" fontSize="2xl">
            {name}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {specialty}
          </Text>
          <HStack spacing={1}>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <Icon
                  as={StarIcon}
                  key={i}
                  color={i < rating ? 'yellow.400' : 'gray.300'}
                />
              ))}
          </HStack>
        </VStack>
        <Image
          borderRadius="full"
          boxSize="120px"
          src={imageUrl}
          alt={`Foto de ${name}`}
        />
      </HStack>
      <Divider marginY={4} />
      
      {/* Dados de Contato */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Contato:</Text>
        <HStack spacing={3}>
          <PhoneIcon />
          <Text>{contactInfo.phone}</Text>
        </HStack>
        <HStack spacing={3}>
          <EmailIcon />
          <Text>{contactInfo.email}</Text>
        </HStack>
        <HStack spacing={3}>
          <Icon as={FaWhatsapp} />
          <Link href={`https://wa.me/${contactInfo.whatsapp}`} color="teal.500" isExternal>
            WhatsApp
          </Link>
        </HStack>
      </VStack>
      
      <Divider marginY={4} />

      {/* Endereços */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Endereços:</Text>
        {addresses.map((address, index) => (
          <Box key={index} p={2} w="full" bg="gray.50" borderRadius="md" className="shadow-sm">
            <Text>{address.street}</Text>
            <Text>{`${address.city}, ${address.state}`}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default HealthProfessionalCard;
