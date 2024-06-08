import useSWR, { SWRConfiguration } from 'swr';
import { darshanaApi } from '@api/darshanaApi';
import { IJob } from '@interfaces/jobs';
import { IJobIndividual } from '@interfaces/jobAplication';

export const useJob = (url: string, config: SWRConfiguration = {} ) => {

    const { data,mutate, error } = useSWR<IJob>(`${process.env.NEXT_PUBLIC_API}/api${ url }`, config );
    return {
        job: data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
};
export const getJobs= async (idJob:any)=>{
  try {
    const { data:resp } = await darshanaApi.get(`/jobs/${idJob}`);
  return resp;

  }
  catch (error) {
    console.error({error});
      return {
          hasError: true,
          message:'ah ocurrido un error'
    }
  }
}
export const postJob = async(idjob:( string | string[] | undefined  ),summary:string, experience:string,cv:any,lang:string,urlFile:string): Promise<{hasError: boolean; message?: string,data?:IJobIndividual}> => {
  const job_id=idjob;
  const file_url= urlFile;
  const file_name= cv.file_name;
  const file_size= String(cv.file_size);
  try {
      const { data:resp } = await darshanaApi.post('/job_applications',{job_id,summary, experience,file_url,file_name,file_size,lang});
      if( !resp.status ){
          return {
              hasError: true,
              message: resp.message
          };
      }
      return {
          hasError: false,
          message: lang === 'es' ? '¡Se completó la postulación éxitosamente!' : 'successful registration!',
          data:resp.data
      };
  } catch (error) {
      console.error({error});
      return {
          hasError: true,
          message: lang === 'es' ? 'Error al postular' : 'Error while postulate'
      };
  }
}
