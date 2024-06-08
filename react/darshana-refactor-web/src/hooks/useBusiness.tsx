import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

const parameters = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

const fetcher = (url: string) => {
  const tokeen = localStorage.getItem('access_token') || '';
  return axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + tokeen,
      },
    })
    .then((res) => res.data);
};

const useBusiness = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/business`,
    fetcher,
    parameters
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBusiness;
