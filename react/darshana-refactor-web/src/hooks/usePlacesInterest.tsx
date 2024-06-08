import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

export const usePlacesInterest = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/roles_interest`,
    config
  );

  const placesInterest = data?.data?.map((skill: any) => {
    return {
      value: skill.name,
      label: skill.name,
    };
  });

  return {
    data: placesInterest,
    isLoading: !error && !data,
    isError: error,
  };
};
export const usePlacesInterestUser = (
  userUuid: string,
  config: SWRConfiguration = {}
) => {
  const token = localStorage.getItem('access_token');
  const fetcher = (url: string) =>
    axios
      .get(url, { headers: { Authorization: 'Bearer ' + token } })
      .then((res) => res.data);
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/me/roles_interest`,
    fetcher
    );
    let placesInterest =[];
  if(typeof data?.data ==="object"){
    placesInterest = data?.data[0].roles_interests?.map((skill: any) => {
      return {
        value: skill.name,
        label: skill.name,
      };
    });
  }
  

  return {
    data: placesInterest,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
