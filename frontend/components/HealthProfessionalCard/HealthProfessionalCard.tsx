import { Box, Image, Text, VStack, HStack, Icon, Divider, Link, Badge, Avatar } from '@chakra-ui/react';
import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { FC } from 'react';

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

interface HealthProfessionalCardProps {
  name: string;
  treatment: string;
  selfDescription: string;
  avatarUrl?: string;
  homeCare: boolean;
  acceptsInsurance: boolean;
  remoteAppointment: boolean;
  inPersonAppointment: boolean;
  addresses: Address[];
  phones: Phone[];
  socialMedias: SocialMedia[];
  specializations: Specialization[];
  insurances: Insurance[];
}

const HealthProfessionalCard: FC<HealthProfessionalCardProps> = ({
  name,
  treatment,
  selfDescription,
  homeCare,
  acceptsInsurance,
  remoteAppointment,
  inPersonAppointment,
  addresses,
  phones,
  socialMedias,
  specializations,
  insurances,
  rating = 4,
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
            {specializations.map(specialization => specialization.name).join(', ')}
          </Text>
          <HStack spacing={1}>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <Icon
                  as={StarIcon}
                  key={i}
                  color={i < rating ? 'orange.400' : 'gray.300'}
                />
              ))}
          </HStack>
        </VStack>
        {/* TODO! Levar a url do avatar para o backend */}
        <Avatar
          size="xl"
          name={name}
          src={`https://i.pravatar.cc/150?img=${addresses[0].professional_id}`}
        />
      </HStack>
      <HStack>
        {homeCare && <Badge colorScheme="green">Atende em Domicilio</Badge>}
        {acceptsInsurance && <Badge colorScheme="blue">Aceita Plano</Badge>}
        {remoteAppointment && <Badge colorScheme="purple">Atende Remoto</Badge>}
        {inPersonAppointment && <Badge colorScheme="orange">Atende Presencial</Badge>}
      </HStack>
      <Divider marginY={4} />

      {/* Dados de Contato */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Contato:</Text>
        <HStack spacing={3}>
          <PhoneIcon />
          <Text>
            {phones.map(phone => phone.phone_number).join(', ')}
          </Text>
        </HStack>
        <HStack spacing={3}>
          <EmailIcon />
          <Text>contato@mail.com</Text>
        </HStack>
        <HStack spacing={3}>
          <Icon as={FaWhatsapp} />
          <Link href={`https://wa.me/${phones[0].phone_number}`} color="teal.500" isExternal>
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
