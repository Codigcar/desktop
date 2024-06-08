
export interface IJobAplication {
  status:  boolean;
  message: string;
  data:    Data;
}
export interface IJobIndividual{
  job:IJob;
  id:                   number;
  user_uuid:            string;
  job_id:               number;
  summary:              string;
  experience:           string;
  file_url:             string;
  file_name:            string;
  file_size:            string;
  time_proposal:        null;
  ready_to_close:       boolean;
  selected:             number;
  created_at:           string;
  updated_at:           string;
  deleted_at:           null;
  close_at_proposal:    null;
  algorand_transaction: null | string;
  near_transaction:     null | string;
}
 interface IJob {
  id:               number;
  recruiter_id:     null;
  business_id:      number;
  job_status_id:    number;
  name:             string;
  description:      string;
  status:           boolean;
  contract_type:    string;
  summary:          string;
  salary:           number;
  end_date:         string;
  created_at:       string;
  updated_at:       string;
  deleted_at:       null;
  contract_time:    string;
  is_visible:       boolean;
  user_uuid:        string;
  work_modality_id: number;
  country_id:       number;
  country: Country;
  business: Business;
  owner:Owner;
}
 interface Data {
  id:                number;
  user_uuid:         string;
  job_id:            number;
  summary:           string;
  experience:        string;
  file_url:          string;
  file_name:         string;
  file_size:         string;
  time_proposal:     null;
  ready_to_close:    boolean;
  selected:          boolean;
  created_at:        string;
  updated_at:        string;
  deleted_at:        null;
  close_at_proposal: null;
  user:              User;
  job:               Job;
}

 interface Job {
  id:            number;
  recruiter_id:  null;
  business_id:   number;
  job_status_id: number;
  name:          string;
  description:   string;
  status:        boolean;
  contract_type: string;
  summary:       string;
  salary:        number;
  end_date:      string;
  created_at:    string;
  updated_at:    string;
  deleted_at:    null;
  contract_time: string;
  is_visible:    boolean;
  user_uuid:     string;
  country: Country;
  business: Business;
  owner:Owner;
}

 interface User {
  id:                    number;
  user_uuid:             string;
  purpose:               null;
  country_id:            null;
  created_at:            string;
  updated_at:            string;
  deleted_at:            null;
  subtitle:              null;
  summary:               null;
  profile_picture_url:   string;
  profile_banner_url:    null;
  is_talent:             boolean;
  google_id:             null;
  phone:                 string;
  contact_phone2:        null;
  facebook_url:          null;
  linkedin_url:          null;
  github_url:            null;
  contact_email:         null;
  contact_phone:         null;
  city_id:               null;
  paypal_email:          null;
  paypal_url:            null;
  algo_address:          null;
  twitter_url:           null;
  person:                Person;
  projects:              any[];
  jobs:                  any[];
  status:                string;
  workplaces:            any[];
  study_centres:         any[];
  skills:                any[];
  businesses:            any[];
  email:                 string;
  previous_month_income: number;
  notifications:         any[];
}

 interface Person {
  uuid:            string;
  name:            string;
  last_name:       string;
  phone:           string;
  document_type:   string;
  document_number: string;
}
interface Business {
  id: number;
  user_workplace_id: number;
  user_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  workplace: Country;
}

interface Country {}
interface Owner{}