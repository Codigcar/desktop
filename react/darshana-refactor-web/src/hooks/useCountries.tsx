import useSWR, { SWRConfiguration } from 'swr';
import { ICountries } from 'src/interfaces/countries';

const useCountries = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICountries>(
    `https://countriesnow.space/api/v0.1${url}`,
    config
  );
  const rta = data?.data.sort((a, b) => a.name.localeCompare(b.name));

  return {
    countries: rta,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useCountries;
