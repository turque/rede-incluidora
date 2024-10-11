// 'use client'
// import { Box, Image, Text, VStack, HStack, Icon, Divider, Link } from '@chakra-ui/react';
// import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FC } from 'react';

// interface Address {
//   street: string;
//   city: string;
//   state: string;
// }

// interface ContactInfo {
//   phone: string;
//   email: string;
//   whatsapp: string;
// }

// interface HealthProfessionalCardProps {
//   name: string;
//   specialty: string;
//   rating: number;
//   imageUrl: string;
//   addresses: Address[];
//   contactInfo: ContactInfo;
// }

// const HealthProfessionalCard: FC<HealthProfessionalCardProps> = ({
//   name,
//   specialty,
//   rating,
//   imageUrl,
//   addresses,
//   contactInfo,
// }) => {
//   return (
//     <Box
//       width="100%"
//       height="100%"
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       className="shadow-lg"
//       p={4}
//       bg="white"
//       display="flex"
//       flexDirection="column"
//     >
//       <HStack spacing={4} alignItems="center" flex="1">
//         <VStack align="start" flex="1">
//           <Text fontWeight="bold" fontSize="2xl">
//             {name}
//           </Text>
//           <Text fontSize="lg" color="gray.500">
//             {specialty}
//           </Text>
//           <HStack spacing={1}>
//             {Array(5)
//               .fill('')
//               .map((_, i) => (
//                 <Icon
//                   as={StarIcon}
//                   key={i}
//                   color={i < rating ? 'yellow.400' : 'gray.300'}
//                 />
//               ))}
//           </HStack>
//         </VStack>
//         <Image
//           borderRadius="full"
//           boxSize="120px"
//           src={imageUrl}
//           alt={`Foto de ${name}`}
//         />
//       </HStack>
//       <Divider marginY={4} />

//       {/* Dados de Contato */}
//       <VStack spacing={2} align="start" flex="1">
//         <Text fontWeight="bold">Contato:</Text>
//         <HStack spacing={3}>
//           <PhoneIcon />
//           <Text>{contactInfo.phone}</Text>
//         </HStack>
//         <HStack spacing={3}>
//           <EmailIcon />
//           <Text>{contactInfo.email}</Text>
//         </HStack>
//         <HStack spacing={3}>
//           <Icon as={FaWhatsapp} />
//           <Link href={`https://wa.me/${contactInfo.whatsapp}`} color="teal.500" isExternal>
//             WhatsApp
//           </Link>
//         </HStack>
//       </VStack>

//       <Divider marginY={4} />

//       {/* Endereços */}
//       <VStack spacing={2} align="start" flex="1">
//         <Text fontWeight="bold">Endereços:</Text>
//         {addresses.map((address, index) => (
//           <Box key={index} p={2} w="full" bg="gray.50" borderRadius="md" className="shadow-sm">
//             <Text>{address.street}</Text>
//             <Text>{`${address.city}, ${address.state}`}</Text>
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default HealthProfessionalCard;

import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';

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

const HealthProfessionalCard: React.FC<HealthProfessionalCardProps> = ({
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
  insurances
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="xl">{name}</Text>
        <Text>{treatment}</Text>
        <Text>{selfDescription}</Text>
        <HStack>
          {homeCare && <Badge colorScheme="green">Home Care</Badge>}
          {acceptsInsurance && <Badge colorScheme="blue">Accepts Insurance</Badge>}
          {remoteAppointment && <Badge colorScheme="purple">Remote Appointment</Badge>}
          {inPersonAppointment && <Badge colorScheme="orange">In-Person Appointment</Badge>}
        </HStack>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Addresses:</Text>
          {addresses.map((address, index) => (
            <Box key={index} p={2} w="full" bg="gray.50" borderRadius="md" className="shadow-sm">
              <Text>{address.street}</Text>
              <Text>{`${address.city}, ${address.state}`}</Text>
            </Box>
          ))}
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Phones:</Text>
          {phones.map((phone, index) => (
            <Text key={index}>{`${phone.phone_number} (${phone.phone_type})`}</Text>
          ))}
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Social Medias:</Text>
          {socialMedias.map((social, index) => (
            <Text key={index}>{`${social.platform}: ${social.username} (${social.profile_url})`}</Text>
          ))}
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Specializations:</Text>
          {specializations.map((specialization, index) => (
            <Text key={index}>{specialization.name}</Text>
          ))}
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Insurances:</Text>
          {insurances.map((insurance, index) => (
            <Text key={index}>{insurance.name}</Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default HealthProfessionalCard;
