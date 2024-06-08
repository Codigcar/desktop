import { FC, useContext, useEffect, useReducer } from 'react';
import { Skill, StudyCentre, Workplace } from '@interfaces/index';
import { ProfileContext } from './ProfileContext';
import { profileReducer } from './profileReducer';
import { darshanaApi } from '@api/index';
import { AuthContext } from '@contexts/auth';
import { convertDateToYYYYMMDD } from '@utils';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { FormDataInfoPersonal } from '@components/pages/profile/ProfilePersonalData';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export interface ProfileState {
  experiences: Workplace[];
  educations: StudyCentre[];
  skillsUser: OptionsOrGroups<
    { value: string; label: string },
    GroupBase<{ value: string; label: string }>
  >;
}
export interface dataUserUpdate {
  algo_address?: string | null;
  near_wallet?: string | null;
}
export const PROFILE_INITIAL_STATE: ProfileState = {
  experiences: [],
  educations: [],
  skillsUser: [],
};

export const ProfileProvider: FC<any> = ({ children }) => {
  const {
    user,
    updateWorkplaces,
    addWorkplace,
    removeWorkplace,
    updateStudyCenter,
    addStudyCenter,
    removeStudyCenter,
    addSkillUser,
    removeAllSkillsUser,
    updateInfoPersonal,
    updateInfoPersonalProfessional,
    updateAlgoAddress,
    updateNearWallet,
    updatePaypalEmail,
    updateIsTalent,
    deleteNearWallet,
    deleteAlgoAddress,
  } = useContext(AuthContext);
  const [t, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  useEffect(() => {
    reloadAllExperiences();
    reloadAllEducations();
    reloadAllSkills();
  }, [user]);

  const [state, dispatch] = useReducer(
    profileReducer,
    PROFILE_INITIAL_STATE,
    (initial) => {
      const resp = localStorage.getItem('[profileState]');
      if (resp) {
        return JSON.parse(resp);
      }
      return initial;
    },
  );

  useEffect(() => {
    localStorage.setItem('[profileState]', JSON.stringify(state));
  }, [state]);

  const addExperience = (experience: Workplace) => {
    dispatch({ type: '[Profile] - AddExperience', payload: experience });
  };

  const getExperienceById = (id: string) => {
    return state.experiences.find((exp) => exp.id == id)!;
  };

  const deleteExperienceById = (id: string) => {
    dispatch({ type: '[Profile] - RemoveExperienceById', payload: id });
  };

  const removeAllExperiences = () => {
    dispatch({ type: '[Profile] - RemoveAllExperiences' });
  };

  const editExperienceById = (id: string, experience: Workplace) => {
    dispatch({
      type: '[Profile] - EditExperienceById',
      payload: { id, experience },
    });
  };

  const saveExperiences = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    const experiencesToEliminate =
      user?.workplaces.filter(
        (workplace) =>
          !state.experiences.find((exp) => exp.id == workplace.id!.toString()),
      ) || [];

    try {
      await Promise.all(
        state.experiences.map((exp) => {
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

                updateIsTalent(exp);
                updateWorkplaces(Number(exp.id), exp);
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

              updateIsTalent(exp);
              addWorkplace(resp.data);
            });
          }
        }),
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
                removeWorkplace(exp);
              });
          }),
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
  const saveExperiencesProfile = async (
    experiences: Workplace[],
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    const response = await darshanaApi.get('/user_workplaces/list');
    const experiencesCurrent = response.data.data as Workplace[];
    const experiencesToEliminate =
      experiencesCurrent.filter(
        (workplace) =>
          !experiences.find((exp) => exp.id == workplace.id!.toString()),
      ) || [];

    try {
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
          }),
        );
      }
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

                updateIsTalent(exp);
                updateWorkplaces(Number(exp.id), exp);
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

              updateIsTalent(exp);
              addWorkplace(resp.data);
            });
          }
        }),
      );

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
  const reloadAllExperiences = () => {
    const dataConverted: Workplace[] =
      user?.workplaces?.map((data: any) => {
        return {
          id: data.id,
          workplace_name: data?.workplace_name,
          start_date: convertDateToYYYYMMDD(data.start_date),
          end_date: convertDateToYYYYMMDD(data.end_date),
          description: data.description,
          work_here: data.work_here,
          position: data.position,
          enable_business: data.enable_business,
          verify_status_id: data.verify_status_id,
        };
      }) || [];

    dispatch({ type: '[Profile] - LoadExperiences', payload: dataConverted });
  };

  // educations

  const reloadAllEducations = () => {
    const dataConverted: StudyCentre[] =
      user?.study_centres.map((data: StudyCentre) => {
        return {
          id: data.id,
          name: data.name,
          course_name: data.course_name,
          start_date: convertDateToYYYYMMDD(data.start_date),
          end_date: convertDateToYYYYMMDD(data.end_date),
          studying_here: data.studying_here,
          description: data.description,
          verify_status_id: data.verify_status_id,
        };
      }) || [];

    dispatch({ type: '[Profile] - LoadEducations', payload: dataConverted });
  };

  const reloadAllSkills = () => {
    const dataConverted: OptionsOrGroups<
      { value: string; label: string },
      GroupBase<{ value: string; label: string }>
    > = user?.skills.map((skill: Skill) => {
      return {
        value: skill.name,
        label: skill.name,
      };
    }) || [];

    dispatch({ type: '[Profile] - LoadSkills', payload: dataConverted });
  };

  const addEducation = (education: StudyCentre) => {
    dispatch({ type: '[Profile] - AddEducation', payload: education });
  };

  const getEducationById = (id: string) => {
    return state.educations.find((edu) => edu.id == id)!;
  };

  const removeEducationById = (id: string) => {
    dispatch({ type: '[Profile] - RemoveEducationById', payload: id });
  };

  const editEducationById = (id: string, education: StudyCentre) => {
    dispatch({
      type: '[Profile] - EditEducationById',
      payload: { id, education },
    });
  };

  const saveEducations = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    const educationsToEliminate =
      user?.study_centres.filter(
        (education) =>
          !state.educations.find((edu) => edu.id == education.id!.toString()),
      ) || [];

    try {
      await Promise.all(
        state.educations.map((edu) => {
          if (typeof edu.id === 'number') {
            darshanaApi
              .patch(`/user_study_centres`, edu)
              .then((res) => {
                const { data: resp } = res;
                if (!resp.status) {
                  return {
                    hasError: true,
                    message:
                      lang === 'es'
                        ? 'Error al actualizar la sección Educación'
                        : 'There was an error, please try again.',
                  };
                }
                updateStudyCenter(Number(edu.id), edu);
              })
              .catch((err) => {
                console.error({ err });
                return {
                  hasError: true,
                  message:
                    lang === 'es'
                      ? 'Error al actualizar la sección Educación'
                      : 'There was an error, please try again.',
                };
              });
          } else {
            darshanaApi
              .post('/user_study_centres', edu)
              .then((res) => {
                const { data: resp } = res;
                if (!resp.status) {
                  return {
                    hasError: true,
                    message:
                      lang === 'es'
                        ? 'Error al actualizar la sección Educación'
                        : 'There was an error, please try again.',
                  };
                }
                addStudyCenter(resp.data);
              })
              .catch((err) => {
                console.error({ err });
                return {
                  hasError: true,
                  message:
                    lang === 'es'
                      ? 'Error al actualizar la sección Educación'
                      : 'There was an error, please try again.',
                };
              });
          }
        }),
      );

      if (educationsToEliminate.length > 0) {
        await Promise.all(
          educationsToEliminate.map((edu) => {
            darshanaApi
              .delete(`/user_study_centres`, { data: { id: edu.id } })
              .then((res) => {
                const { data: resp } = res;
                if (!resp.status) {
                  return {
                    hasError: true,
                    message:
                      lang === 'es'
                        ? 'Error al actualizar la sección Educación'
                        : 'There was an error, please try again.',
                  };
                }
                removeStudyCenter(edu);
              })
              .catch((err) => {
                console.error({ err });
                return {
                  hasError: true,
                  message:
                    lang === 'es'
                      ? 'Error al actualizar la sección Educación'
                      : 'There was an error, please try again.',
                };
              });
          }),
        );
      }

      return {
        hasError: false,
        message: 'Educación actualizadas correctamente',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'Error al actualizar la sección Educación'
            : 'There was an error, please try again.',
      };
    }
  };

  // skills

  const addSkill = async (skills: any) => {
    if (state.skillsUser.length > 0) {
      const respDeleted = await darshanaApi.delete('/user_skills/all');
      if (!respDeleted.status) {
        return;
      }

      removeAllSkillsUser();
    }

    await Promise.all(
      skills.map((skill: any) => {
        return darshanaApi
          .post('/user_skills', { name: skill.value })
          .then((res) => {
            const { data: resp } = res;
            if (resp.status) {
              addSkillUser(resp.data);
            }
          });
      }),
    );
  };
  const addPlacesInterest = async (
    placesInterest: any,
    placesInterestLength: any,
  ) => {
    if (placesInterestLength > 0) {
      const respDeleted = await darshanaApi.delete(`/me/roles_interest/all`);
      if (!respDeleted.status) {
        return;
      }
      // removeAllSkillsUser();
    }
    await Promise.all(
      placesInterest.map((roles: any) => {
        return darshanaApi
          .post('/me/roles_interest', {
            name: roles.value,
          })
          .then((res) => {
            const { data: resp } = res;
            if (resp.status) {
              // addSkillUser(resp.data);
            }
          });
      }),
    );
  };
  const addLanguageMe = async (languageList: any, languageListLength: any) => {
    if (languageListLength >= 0) {
      const respDeleted = await darshanaApi.delete(`/me/languages/all`);
      if (!respDeleted.status) {
        return;
      }
      // removeAllSkillsUser();
    }
    await Promise.all(
      languageList.map((language: any) => {
        return darshanaApi
          .post('/me/languages', {
            language_id: language.value,
          })
          .then((res) => {
            const { data: resp } = res;
            if (resp.status) {
              // addSkillUser(resp.data);
            }
          });
      }),
    );
  };
  const saveInfoPersonal = async (
    infoPersonal: FormDataInfoPersonal,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      // if (infoPersonal.city_id === '0' || infoPersonal.country_id === '0') {
      //   return {
      //     hasError: true,
      //     message:
      //       lang === 'es'
      //         ? 'Debe seleccionar una país y ciudad válida'
      //         : 'You must select a valid country and city',
      //   };
      // }

      const { data: resp } = await darshanaApi.patch(
        '/users/info',
        infoPersonal,
      );

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Error al guardar la información'
              : 'Error saving information',
        };
      }

      updateInfoPersonal(infoPersonal);
      return {
        hasError: false,
        message:
          lang === 'es'
            ? 'Información guardada correctamente'
            : 'Successfully updated',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'Error al guardar la información'
            : 'Error saving information',
      };
    }
  };
  const saveInfoPersonalProfessional = async (
    infoPersonal: FormDataInfoPersonal,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      // if (infoPersonal.city_id === '0' || infoPersonal.country_id === '0') {
      //   return {
      //     hasError: true,
      //     message:
      //       lang === 'es'
      //         ? 'Debe seleccionar una país y ciudad válida'
      //         : 'You must select a valid country and city',
      //   };
      // }

      const { data: resp } = await darshanaApi.patch(
        '/users/info',
        infoPersonal,
      );

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Error al guardar la información'
              : 'Error saving information',
        };
      }
      updateInfoPersonalProfessional(infoPersonal);
      return {
        hasError: false,
        message:
          lang === 'es'
            ? 'Información guardada correctamente'
            : 'Successfully updated',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'Error al guardar la información'
            : 'Error saving information',
      };
    }
  };
  const saveAlgoAddress = async (dataUserUpdate: dataUserUpdate) => {
    const { data: resp } = await darshanaApi.patch(
      '/users/update_algo_address',
      dataUserUpdate,
    );
    if (!resp.status) {
      return {
        hasError: true,
        message: 'Error al guardar la información',
      };
    }
    localStorage.setItem('isConnectAlgorand', 'true');
    updateAlgoAddress(dataUserUpdate);
    return {
      hasError: false,
      message: 'Información guardada correctamente',
    };
  };
  const saveNearWallet = async (dataUserUpdate: dataUserUpdate) => {
    const { data: resp } = await darshanaApi.patch(
      '/users/update_near_wallet',
      dataUserUpdate,
    );
    if (!resp.status) {
      return {
        hasError: true,
        message: 'Error al guardar la información',
      };
    }
    updateNearWallet(dataUserUpdate);
    return {
      hasError: false,
      message: 'Información guardada correctamente',
    };
  };
  const deleteAlgoAddressPost = async () => {
    const dataUserUpdate: dataUserUpdate = {
      algo_address: null,
    };
    const { data: resp } = await darshanaApi.patch(
      '/users/update_algo_address',
      dataUserUpdate,
    );
    if (!resp.status) {
      return {
        hasError: true,
        message: 'Error al guardar la información',
      };
    }
    localStorage.removeItem('isConnectAlgorand');
    deleteAlgoAddress();
    return {
      hasError: false,
      message: 'Información guardada correctamente',
    };
  };
  const deleteNearWalletPost = async () => {
    const dataUserUpdate: dataUserUpdate = {
      near_wallet: null,
    };
    const { data: resp } = await darshanaApi.patch(
      '/users/update_near_wallet',
      dataUserUpdate,
    );
    if (!resp.status) {
      return {
        hasError: true,
        message: 'Error al guardar la información',
      };
    }
    deleteNearWallet();
    return {
      hasError: false,
      message: 'Información guardada correctamente',
    };
  };
  const saveEmailPaypal = async (email: string) => {
    try {
      const resp = await darshanaApi.post('users/paypal/email', {
        paypal_email: email,
      });
      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Error al guardar la información'
              : 'Error saving information',
        };
      }

      updatePaypalEmail(email);
      return {
        hasError: false,
        message:
          lang === 'es'
            ? 'Información guardada correctamente'
            : 'Successfully updated',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'Error al guardar la información'
            : 'Error saving information',
      };
    }
  };

  const saveChangePassword = async (
    new_password: string,
    confirm_new_password: string,
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      const { data: resp } = await darshanaApi.post('/users/password', {
        new_password,
        confirm_new_password,
      });

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Error al cambiar la contraseña'
              : 'Failed to change password',
        };
      }

      return {
        hasError: false,
        message:
          lang === 'es'
            ? 'Contraseña cambiada correctamente'
            : 'Password changed successfully',
      };
    } catch (error) {
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'Error al cambiar la contraseña'
            : 'Failed to change password',
      };
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,

        // Methods
        addExperience,
        removeAllExperiences,
        getExperienceById,
        deleteExperienceById,
        editExperienceById,
        saveExperiences,
        saveExperiencesProfile,
        reloadAllExperiences,

        reloadAllEducations,
        addEducation,
        removeEducationById,
        editEducationById,
        saveEducations,
        getEducationById,

        addSkill,
        addPlacesInterest,
        addLanguageMe,
        saveInfoPersonal,
        saveInfoPersonalProfessional,
        saveAlgoAddress,
        saveNearWallet,
        deleteAlgoAddressPost,
        deleteNearWalletPost,
        saveEmailPaypal,

        saveChangePassword,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
