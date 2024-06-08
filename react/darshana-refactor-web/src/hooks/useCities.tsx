import useSWR, { SWRConfiguration } from 'swr';
import { ICities } from 'src/interfaces/cities';

const useCities = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<ICities>(`${process.env.NEXT_PUBLIC_API}/api${ url }`, config );

    return {
        cities: data,
        isLoading: !error && !data,
        isError: error
    }

}

export default useCities;