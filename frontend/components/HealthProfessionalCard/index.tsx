'use client';
import { Box, Image, Text, VStack, HStack, Icon, Divider, Link, Badge, Avatar } from '@chakra-ui/react';
// import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
// import { FaWhatsapp } from 'react-icons/fa';
import { FC, useEffect } from 'react';
import { HealthProfessional } from '@/types/HealthProfessional';

const HealthProfessionalCard: FC<HealthProfessional> = (props: HealthProfessional) => {
  useEffect(() => {
    console.log('HealthProfessionalCard props:', props);
  }, [props]);

  return (
    <Box
      width="80vw" // Alterado para 80% da largura da tela
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
            {props.name || 'Nome não disponível'}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {props.specializations?.map(specialization => specialization.name).join(', ') || 'Especializações não disponíveis'}
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
        <Avatar
          size="xl"
          name={props.name}
          src={props.avatar_url}
        />
      </HStack>
      <HStack>
        {props.home_care && <Badge colorScheme="green">Atende em Domicilio</Badge>}
        {props.accepts_insurance && <Badge colorScheme="blue">Aceita Plano</Badge>}
        {props.remote_appointment && <Badge colorScheme="purple">Atende Remoto</Badge>}
        {props.in_person_appointment && <Badge colorScheme="orange">Atende Presencial</Badge>}
      </HStack>
      <Divider marginY={4} />

      {/* Dados de Contato */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Contato:</Text>
        <HStack spacing={3}>
          {/* <PhoneIcon /> */}
          <Text>
            {props.phones?.map(phone => phone.phone_number).join(', ') || 'Telefones não disponíveis'}
          </Text>
        </HStack>
        <HStack spacing={3}>
          {/* <EmailIcon /> */}
          <Text>{props.email || 'Email não disponível'}</Text>
        </HStack>
        <HStack spacing={3}>
          {/* <Icon as={FaWhatsapp} /> */}
          <Link href={`https://wa.me/${props.phones?.[0]?.phone_number}`} color="teal.500" isExternal>
            WhatsApp
          </Link>
        </HStack>
      </VStack>

      <Divider marginY={4} />

      {/* Endereços */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Endereços:</Text>
        {props.addresses?.length > 0 ? (
          props.addresses.map((address, index) => (
            <Box key={index} p={2} w="full" bg="gray.50" borderRadius="md" className="shadow-sm">
              <Text>{address.street}</Text>
              <Text>{`${address.city}, ${address.state}`}</Text>
            </Box>
          ))
        ) : (
          <Text>Endereços não disponíveis</Text>
        )}
      </VStack>
    </Box>
  );
};

export default HealthProfessionalCard;
