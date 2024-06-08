import { darshanaApi } from '@api/darshanaApi';
import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

const parameters = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

const fetcher = (url: string, query: object = {}) =>
  darshanaApi
    .get(url, {params: query})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error({ err });
    });

const useFetchSWR = (url: string, query:object = {}) => {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useFetchLanguage = (url: string,lang:string, query:object = {}) => {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
  );
  const languageList= data?.data?.map((language:any)=>{
    return {
      value:language.id,
      label: lang==="es"?language.name_es:language.name_en
    }
  })
  return {
    data: languageList,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useFetchLanguageMe = (url: string,lang:string, query:object = {}) => {
  const { data, error,mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
    );
  const languageList= data?.data?.map((info:any)=>{
    return {
      value:info.language.id,
      label: lang==="es"?info.language.name_es:info.language.name_en
    }
  })
  return {
    data: languageList,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
export const useFetchIndustries = (url: string,lang:string, query:object = {}) => {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
  );
  // const industriesList= data?.data?.map((industries:any)=>{
  //   return {
  //     value:industries.id,
  //     label: lang==="es"?industries.name_es:industries.name_en
  //   }
  // })
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useFetchIndustriesMe = (url: string,lang:string, query:object = {}) => {
  const { data, error,mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
    );
  // const languageList= data?.data?.map((info:any)=>{
  //   return {
  //     value:info.language.id,
  //     label: lang==="es"?info.language.name_es:info.language.name_en
  //   }
  // })
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
export const useFetchGender = (url: string,lang:string, query:object = {}) => {
  const { data, error,mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API}/api/${url}`, query],
    fetcher
  );
  // const industriesList= data?.data?.map((industries:any)=>{
  //   return {
  //     value:industries.id,
  //     label: lang==="es"?industries.name_es:industries.name_en
  //   }
  // })
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
export default useFetchSWR;
