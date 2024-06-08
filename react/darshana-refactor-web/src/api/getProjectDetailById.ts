import { darshanaApi } from './darshanaApi';
import { darshanaApiNoToken } from './darshanaApiNoToken';

export interface IGetProjectByIdResponse {
  status: boolean;
  message: string;
  data: DataProject;
  project: ProjectDetailById;
}

export interface DataProject {
  id: number;
  recruiter_id: null;
  business_id: number;
  project_status_id: number;
  topic_id: number;
  name: string;
  description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  body: string;
  price: number;
  max_salary: number;
  min_salary: number;
  hourly_wage: number;
  image_url: string;
  mobile_image_url: string;
  days: number;
  end_date: string;
  expected_close_at: null;
  weeks: number;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
  topic: string;
  business: BusinessProject;
  recruiter: null;
  owner: OwnerProject;
  skills: SkillProject[];
  files: FileProject[];
  country: CountryProject;
  applications: any;
  project: ProjectDetailById;
}


export interface BusinessProject {
  id: number;
  user_workplace_id: number;
  user_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  workplace: WorkplaceProject;
}

export interface WorkplaceProject {
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

export interface CountryProject {
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

export interface FileProject {
  id: number;
  file_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  project_id: number;
  user_uuid: string;
  file_name: string;
}

export interface OwnerProject {
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
  default_cover_image_url?:string;
  person: PersonProject;
}

export interface PersonProject {
  uuid: string;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
}

export interface SkillProject {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
 export interface ProjectDetailById {
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
  users_industry: UsersIndustry
}

interface UsersIndustry {
  industry_id: number
  industry: Industry
}

interface Industry {
  name_en: string
  name_es: string
}


export const getProjectByIdResponse = async (id: string) => {
  try {
    const { data } = await darshanaApiNoToken.get<IGetProjectByIdResponse>(
      `/projects/${id}`
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
