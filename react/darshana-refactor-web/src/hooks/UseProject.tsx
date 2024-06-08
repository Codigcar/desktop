import useSWR, { SWRConfiguration } from 'swr';
import { darshanaApi } from '@api/darshanaApi';
import { IProject } from '@interfaces/projects';
import { IJobAplication } from '@interfaces/jobAplication';
import { IProjectUser, IProjectIndidual } from '../interfaces/projectAplication';

interface IFormApplyProject {
  accept_price: boolean;
  accept_time: boolean;
  weeks: number | undefined;
  lang: string;
  price_proposal?: string;
  procedure_text: string;
  project_id: string;
  proposal: string;
}

export const useProject = (url: string, config: SWRConfiguration = {}) => {
  const { data, mutate, error } = useSWR<IProject>(
    `${process.env.NEXT_PUBLIC_API}/api${url}`,
    config
  );
  return {
    project: data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useProjectApplication = (
  url: string,
  config: SWRConfiguration = {}
) => {
  const { data, mutate, error } = useSWR<IProjectUser>(
    `${process.env.NEXT_PUBLIC_API}/api${url}`,
    config
  );
  return {
    projectApplication: data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
export const postProject = async (
  formApplyProject: IFormApplyProject
): Promise<{ hasError: boolean; message?: string; data?: IProjectIndidual }> => {
  const { lang } = formApplyProject;
  try {
    const { data: resp } = await darshanaApi.post(
      '/project_applications',
      formApplyProject
    );
    if (!resp.status) {
      return {
        hasError: true,
        message: resp.message,
      };
    }
    return {
      hasError: false,
      message:
        lang === 'es'
          ? '¡Se completó la postulación éxitosamente!'
          : 'successful registration!',
      data: resp.data,
    };
  } catch (error) {
    console.error({ error });
    return {
      hasError: true,
      message: lang === 'es' ? 'Error al postular' : 'Error while postulate',
    };
  }
};
