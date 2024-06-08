import { Workplace } from '@interfaces/user';
import { darshanaApi } from './darshanaApi';

export const saveExperiences = async (
  experiences: Workplace[],
  lang: string
): Promise<{
  hasError: boolean;
  message: string;
}> => {
  const response = await darshanaApi.get('/user_workplaces/list');
  const experiencesCurrent = response.data.data as Workplace[];
  const experiencesToEliminate =
    experiencesCurrent.filter(
      (workplace) =>
        !experiences.find((exp) => exp.id == workplace.id!.toString())
    ) || [];

  try {
    await Promise.all(
      experiences.map((exp) => {
        delete exp.verify_status_id;
        if (typeof exp.id === 'number') {
          darshanaApi
            .patch(`/user_workplaces`, exp)
            .then((res) => {
              const { data: resp } = res;
              if (!resp.status) {
                return {
                  hasError: true,
                  message:
                    lang === 'es'
                      ? 'Error al actualizar las experiencias'
                      : 'There was an error, please try again.',
                };
              }

              //   updateIsTalent(exp);
              //   updateWorkplaces(Number(exp.id), exp);
            })
            .catch((err) => {
              console.error(err);
              return {
                hasError: true,
                message:
                  lang === 'es'
                    ? 'Error al actualizar las experiencias'
                    : 'There was an error, please try again.',
              };
            });
        } else {
          darshanaApi.post('/user_workplaces', exp).then((res) => {
            const { data: resp } = res;
            if (!resp.status) {
              return {
                hasError: true,
                message:
                  lang === 'es'
                    ? 'Error al actualizar las experiencias'
                    : 'There was an error, please try again.',
              };
            }

            // updateIsTalent(exp);
            // addWorkplace(resp.data);
          });
        }
      })
    );

    if (experiencesToEliminate.length > 0) {
      await Promise.all(
        experiencesToEliminate.map((exp) => {
          darshanaApi
            .delete(`/user_workplaces`, { data: { id: exp.id } })
            .then((res) => {
              const { data: resp } = res;
              if (!resp.status) {
                return {
                  hasError: true,
                  message:
                    lang === 'es'
                      ? 'Error al actualizar las experiencias'
                      : 'There was an error, please try again.',
                };
              }
              //   removeWorkplace(exp);
            });
        })
      );
    }

    return {
      hasError: false,
      message:
        lang === 'es'
          ? 'Experiencias actualizadas correctamente'
          : 'Successfully updated.',
    };
  } catch (error) {
    console.error({ error });
    return {
      hasError: true,
      message:
        lang === 'es'
          ? 'Error al actualizar las experiencias'
          : 'There was an error, please try again.',
    };
  }
};
