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
  self_description: string;
  avatar_url: string;
  email: string;
  home_care: boolean;
  accepts_insurance: boolean;
  remote_appointment: boolean;
  in_person_appointment: boolean;
  verified: boolean;
  created_at: Date;
  addresses: Address[];
  phones: Phone[];
  social_medias: SocialMedia[];
  specializations: Specialization[];
  insurances: Insurance[];
}
