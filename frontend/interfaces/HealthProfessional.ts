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

export interface HealthProfessional {
  name: string;
  treatment: string;
  selfDescription: string;
  avatarUrl: string;
  email: string;
  homeCare: boolean;
  acceptsInsurance: boolean;
  remoteAppointment: boolean;
  inPersonAppointment: boolean;
  verified: boolean;
  createdAt: Date;
  addresses: Address[];
  phones: Phone[];
  socialMedias: SocialMedia[];
  specializations: Specialization[];
  insurances: Insurance[];
}
