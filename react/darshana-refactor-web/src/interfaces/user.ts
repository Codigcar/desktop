export interface IUser {
  status: boolean;
  message: string;
  access_token: string;
  data: IUserData;
}

export interface IUserData {
  id: number;
  user_uuid: string;
  purpose: null;
  country_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  subtitle: string;
  summary: string;
  profile_picture_url: string;
  default_cover_image_url: string;
  profile_banner_url: string;
  profile_percentage: number | null;
  is_talent: boolean;
  google_id: null;
  phone: string;
  contact_phone2: null;
  facebook_url: string;
  linkedin_url: string;
  discord_url: string;
  github_url: null;
  contact_email: null;
  contact_phone: null;
  city_id: number;
  paypal_email: string | null;
  paypal_url: null;
  algo_address: string | null;
  near_wallet: string | null;
  twitter_url: string;
  person: Person;
  projects: Project[];
  jobs: Job[];
  status: string;
  workplaces: Workplace[];
  study_centres: StudyCentre[];
  skills: Skill[];
  businesses: Business[];
  email: string;
  previous_month_income: number;
  notifications: Notification[];
  ubigeo_country: string;
  ubigeo_city: string;
  ubigeo_state: string;
  other_link_work: string;
  cv_resumen_file_name: string;
  cv_resumen_file_size: string;
  cv_resumen_file_url: string;
}
export interface Job {
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
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  contract_time: string;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
  application: JobApplication;
}

export interface JobApplication {
  id: number;
  user_uuid: string;
  job_id: number;
  summary: string;
  experience: string;
  file_url: string;
  file_name: string;
  file_size: string;
  time_proposal: null;
  ready_to_close: boolean;
  selected: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  close_at_proposal: null;
  algorand_transaction: null | string;
  near_transaction: null | string;
}
export interface Project {
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
  image_url: null | string;
  days: number;
  end_date: string;
  expected_close_at: null | string;
  weeks: number;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
  application: ProjectApplication;
}
export interface IProjectDataUser {
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
  image_url: null | string;
  days: number;
  end_date: string;
  expected_close_at: null | string;
  weeks: number;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
}
export interface ProjectApplication {
  id: number;
  user_uuid: string;
  project_id: number;
  proposal: string;
  procedure_text: string;
  accept_price: boolean;
  price_proposal: null;
  accept_time: boolean;
  days: number;
  ready_to_close: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  accepted: number;
  close_at_proposal: string;
  recieve_pay_at: null | string;
  send_pay_at: null;
  recieve_pay_order_id: null;
  send_pay_order_id: null;
  talent_payment: null;
  weeks: number;
  shown_accepted_message: boolean;
  algorand_transaction: null | string;
  near_transaction: null | string;
  time_counter_proposal?: null | number;
  salary_counter_proposal?: null | number;
  counter_proposal_status?: null | number;
}

export interface Business {
  id: number;
  user_workplace_id: number;
  user_uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  profile_picture_url?: string;
}

export interface Notification {
  id: number;
  message: null;
  been_read: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  user_uuid: string;
  action: string;
  been_clicked: boolean;
  n_type: string;
  project_name: null;
  person_name: string;
}

export interface Person {
  uuid: string;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
}

export interface Skill {
  id: number;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: null;
}

export interface Workplace {
  id: number | string;
  workplace_name: string;
  start_date: Date | string;
  end_date?: null | string;
  description: string;
  work_here: boolean;
  position: string;
  enable_business: boolean;
  verify_status_id?: number;
  user_uuid?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  workplace_id?: number;
  time_difference?: any;
  business?: Business;
}

export interface StudyCentre {
  id: number | string;
  user_uuid?: string;

  name: string;
  course_name: string;
  start_date: Date | string;
  end_date?: string;
  studying_here: boolean;
  description: string;
  verify_status_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}
