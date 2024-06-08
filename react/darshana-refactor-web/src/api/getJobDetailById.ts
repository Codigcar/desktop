import { string } from 'yup';
import { darshanaApiNoToken } from './darshanaApiNoToken';

export interface IGetJobByIDResponse {
  status: boolean;
  message: string;
  data: DataJob;
  job?:GetJobResponseById;
}

export interface DataJob {
  id: number;
  recruiter_id: null;
  business_id: number;
  job_status_id: number;
  name: string;
  description: string;
  status: boolean;
  contract_type: string;
  summary: string;
  salary: number;
  min_salary: number;
  max_salary: number;
  hourly_wage: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  contract_time: string;
  end_date: string;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
  topic: string;
  business: BusinessJob;
  recruiter: null;
  owner: OwnerJob;
  applications: any[];
  skills: SkillJob[];
  work_modality: WorkModalityJob;
  country: CountryJob;
  job?:GetJobResponseById;
}

export interface BusinessJob {
  id: number;
  user_workplace_id: number;
  user_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  workplace: Workplace;
}

export interface Workplace {
  id: number;
  user_uuid: string;
  start_date: string;
  end_date: string;
  description: string;
  work_here: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  position: string;
  workplace_id: number;
  workplace_name: string;
  enable_business: boolean;
}

export interface OwnerJob {
  id: number;
  user_uuid: string;
  purpose: null;
  country_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  subtitle: string;
  summary: string;
  profile_picture_url: string;
  profile_banner_url: string;
  is_talent: boolean;
  google_id: null;
  phone: string;
  contact_phone2: null;
  facebook_url: string;
  linkedin_url: string;
  github_url: null;
  contact_email: null;
  contact_phone: null;
  city_id: number;
  paypal_email: null;
  paypal_url: null;
  algo_address: null;
  twitter_url: string;
  person: PersonJob;
  city: CityJob;
  country: CountryJob;
}

export interface CityJob {
  id: string;
  country_iso2: string;
  name: string;
  lat: string;
  lng: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface PersonJob {
  uuid: string;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
}

export interface SkillJob {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface WorkModalityJob {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
export interface CountryJob {
  id: number;
  name: string;
  nombre: string;
  nom: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
export interface GetJobResponseById {
  id: number
  business: Business
}

interface Business {
  user_workplace_id: number
  user_uuid: string
  owner: Owner
}

interface Owner {
  id: number
  user_uuid: string
  profile_picture_url: string
  users_industry: any
}
export const getJobByIdResponse = async (id: string) => {
  try {
    const { data } = await darshanaApiNoToken.get<IGetJobByIDResponse>(
      `/jobs/${id}`
    );

    if (!data.status) {
      return null;
    }

    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};
