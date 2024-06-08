import { darshanaApi } from "./darshanaApi";
import { darshanaApiNoToken } from "./darshanaApiNoToken";

 export interface ICountries {
  status: boolean;
  data:   DatumCountries[];
}

export  interface DatumCountries {
  id:         number;
  name:       string;
  nombre:     string;
  nom:        string;
  iso2:       string;
  iso3:       string;
  phone_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}


export const getCountriesResponse = async( ) => {
    try {
        const { data } = await darshanaApiNoToken.get<ICountries>(`/countries`);    
        if(!data.status){
            return null;
        }
        return data;
        
    } catch (error) {
        console.error({error});
        return null;
    }
}