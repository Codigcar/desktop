import { darshanaApi } from "./darshanaApi";
import { darshanaApiNoToken } from "./darshanaApiNoToken";

interface IGetUserByIDResponse {
  status:  boolean;
  message: string;
  data:    DataUSer;
}
export interface DataUSer {
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



export const getUserByIdResponse = async( id: string ) => {
    try {
        const { data } = await darshanaApiNoToken.get<IGetUserByIDResponse>(`/users/id/${ id }`);    
        if(!data.status){
            return null;
        }
        return data;
        
    } catch (error) {
        console.error({error});
        return null;
    }
}