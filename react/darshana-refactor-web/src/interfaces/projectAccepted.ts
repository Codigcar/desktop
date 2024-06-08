export interface IProjectAccepted {
  status: boolean;
  message: string;
  data: IProjectAcceptedData;
}

export interface IProjectAcceptedData {
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
  accepted: boolean;
  close_at_proposal: string;
  recieve_pay_at: string;
  send_pay_at: null;
  recieve_pay_order_id: null;
  send_pay_order_id: null;
  talent_payment: null;
  weeks: number;
  shown_accepted_message: boolean;
  algorand_transaction: string | null;
  near_transaction: string | null;
  project: ProjectClass;
}

interface ProjectClass {
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
  image_url: string;
  days: number;
  end_date: string;
  expected_close_at: string;
  weeks: number;
  is_visible: boolean;
  user_uuid: string;
  work_modality_id: number;
  country_id: number;
  country: Country;
  business: Business;
  favorite: boolean
}

interface Business {
  id: number;
  user_workplace_id: number;
  user_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  workplace: Workplace;
}

interface Workplace {
  id: number;
  name: string;
  profile_picture_url: null;
  profile_banner_url: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface Country {
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
