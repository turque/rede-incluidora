'use client';
import { Box, Image, Text, VStack, HStack, Icon, Divider, Link, Badge, Avatar, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Tooltip } from '@chakra-ui/react';
import { StarIcon, PhoneIcon, EmailIcon, CheckIcon } from '@chakra-ui/icons';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest, FaSnapchat, FaCheckCircle } from 'react-icons/fa';
import React, { FC, useEffect } from 'react';
import { HealthProfessional } from '@/types/HealthProfessional';

const HealthProfessionalCard: FC<HealthProfessional> = (props: HealthProfessional) => {
  return (
    <Box
      width="80vw"
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
            {props.verified && (
              <Tooltip label="Este profissional foi verificado" aria-label="Verificado">
                <span>
                  <Icon as={FaCheckCircle} color="green.500" ml={2} boxSize={3} />
                </span>
              </Tooltip>
            )}
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
          <PhoneIcon />
          <Text>
            {props.phones?.map((phone, index) => (
              <span key={index}>
                {phone.phone_number}
                {phone.has_whatsapp && (
                  <Link href={`https://wa.me/${phone.phone_number}`} color="teal.500" isExternal>
                    <Icon as={FaWhatsapp} ml={2} />
                  </Link>
                )}
                {index < props.phones.length - 1 && ', '}
              </span>
            )) || 'Telefones não disponíveis'}
          </Text>
        </HStack>
        <HStack spacing={3}>
          <EmailIcon />
          <Text>{props.email || 'Email não disponível'}</Text>
        </HStack>
      </VStack>

      <Divider marginY={4} />

      {/* Redes Sociais */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Redes Sociais:</Text>
        {props.social_medias?.length > 0 ? (
          <HStack spacing={3}>
            {props.social_medias.map((social, index) => (
              <Link
                key={index}
                href={social.profile_url}
                isExternal
                bg="transparent"
                color={
                  social.platform === 'Facebook' ? 'blue.600' :
                  social.platform === 'Twitter' ? 'blue.400' :
                  social.platform === 'Instagram' ? 'pink.600' :
                  social.platform === 'LinkedIn' ? 'blue.700' :
                  social.platform === 'Pinterest' ? 'red.600' :
                  social.platform === 'TikTok' ? 'black' :
                  social.platform === 'YouTube' ? 'red.600' :
                  social.platform === 'Snapchat' ? 'yellow.500' : 'gray.500'

                }
                _hover={{ bg: 'orange.400' }}
              >
                <Icon as={
                  social.platform === 'Facebook' ? FaFacebook :
                  social.platform === 'Twitter' ? FaTwitter :
                  social.platform === 'Instagram' ? FaInstagram :
                  social.platform === 'LinkedIn' ? FaLinkedin :
                  social.platform === 'Pinterest' ? FaPinterest :
                  social.platform === 'TikTok' ? FaTiktok :
                  social.platform === 'YouTube' ? FaYoutube :
                  social.platform === 'Snapchat' ? FaSnapchat : null

                } boxSize={6} />
              </Link>
            ))}
          </HStack>
        ) : (
          <Text>Redes sociais não disponíveis</Text>
        )}
      </VStack>

      <Divider marginY={4} />

      {/* Endereços */}
      <VStack spacing={2} align="start" flex="1">
        <Text fontWeight="bold">Endereços:</Text>
        {props.addresses?.length > 0 ? (
          <Tabs variant="soft-rounded" colorScheme="orange" w="full">
            <TabList>
              {props.addresses.map((address, index) => (
                <Tab key={index}>{`Endereço ${index + 1}`}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {props.addresses.map((address, index) => (
                <TabPanel key={index}>
                  <Box p={2} w="full" bg="gray.50" borderRadius="md" className="shadow-sm">
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack align="start">
                        <Text>{address.street}</Text>
                        <Text>{`${address.city}, ${address.state}`}</Text>
                      </VStack>
                      <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.street + ', ' + address.city + ', ' + address.state)}`} color="orange.500" isExternal>
                        Mapa
                      </Link>
                    </HStack>
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        ) : (
          <Text>Endereços não disponíveis</Text>
        )}
      </VStack>
    </Box>
  );
};

export default HealthProfessionalCard;
