import { useState } from 'react';
import { darshanaApi } from '@api/darshanaApi';

export interface IMeta {
  last_page?: number;
}

const useGetData = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [dataObject, setDataObject] = useState<any>({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<IMeta>({});

  const executeGet = async (url: string) => {
    try {
      setIsLoading(true);
      const { data: response } = await darshanaApi.get(url);

      if (response) {
        setData(response.data);
        setMeta(response.meta);
        setHasError(false);
      } else {
        setData([]);
        setMeta({});
        setHasError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setData([]);
      setMeta({});
      setHasError(true);
      setIsLoading(false);
    }
  };

  const executeGetById = async (url: string) => {
    try {
      setIsLoading(true);
      const { data: response } = await darshanaApi.get(url);

      if (response) {
        setDataObject(response.data);
        setMeta(response.meta);
        setHasError(false);
      } else {
        setDataObject([]);
        setMeta({});
        setHasError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setDataObject([]);
      setMeta({});
      setHasError(true);
      setIsLoading(false);
    }
  };

  return {
    data,
    dataObject,
    setDataObject,
    meta,
    isLoading,
    hasError,
    executeGet,
    executeGetById,
  };
};

export default useGetData;
