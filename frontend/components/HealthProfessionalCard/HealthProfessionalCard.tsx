import { Box, Image, Text, VStack, HStack, Icon, Divider, Link, Badge, Avatar } from '@chakra-ui/react';
import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { FC } from 'react';
import { HealthProfessional } from '@/interfaces/HealthProfessional';

const HealthProfessionalCard: FC<HealthProfessional> = (props: HealthProfessional) => {
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
            {props.name}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {props.specializations.map(specialization => specialization.name).join(', ')}
          </Text>
          {/* <HStack spacing={1}>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <Icon
                  as={StarIcon}
                  key={i}
                  color={i < props.rating ? 'orange.400' : 'gray.300'}
                />
              ))}
          </HStack> */}
        </VStack>
        {/* TODO! Levar a url do avatar para o backend */}
        <Avatar
          size="xl"
          name={props.name}
          src={`https://i.pravatar.cc/150?img=${props.addresses[0].professional_id}`}
        />
      </HStack>
      <HStack>
        {props.homeCare && <Badge colorScheme="green">Atende em Domicilio</Badge>}
        {props.acceptsInsurance && <Badge colorScheme="blue">Aceita Plano</Badge>}
        {props.remoteAppointment && <Badge colorScheme="purple">Atende Remoto</Badge>}
        {props.inPersonAppointment && <Badge colorScheme="orange">Atende Presencial</Badge>}
      </HStack>
      <Divider marginY={4} />

      {/* Dados de Contato */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Contato:</Text>
        <HStack spacing={3}>
          <PhoneIcon />
          <Text>
            {props.phones.map(phone => phone.phone_number).join(', ')}
          </Text>
        </HStack>
        <HStack spacing={3}>
          <EmailIcon />
          <Text>contato@mail.com</Text>
        </HStack>
        <HStack spacing={3}>
          <Icon as={FaWhatsapp} />
          <Link href={`https://wa.me/${props.phones[0].phone_number}`} color="teal.500" isExternal>
            WhatsApp
          </Link>
        </HStack>
      </VStack>

      <Divider marginY={4} />

      {/* Endereços */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Endereços:</Text>
        {props.addresses.map((address, index) => (
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
