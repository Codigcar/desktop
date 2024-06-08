import { FC, useEffect, useReducer } from 'react';
import {
  IProjectAccepted,
  IUserData,
  Notification,
  Project,
  Job,
  Skill,
  StudyCentre,
  Workplace,
} from '@interfaces/index';
import { authReducer, AuthContext } from './';
import { darshanaApi } from 'src/api';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FormDataInfoPersonal } from '@components/pages/profile/ProfilePersonalData';
//
import { CombinedState } from 'redux';
import { dataUserUpdate } from '../user-profile/ProfileProvider';

export type AuthState = CombinedState<{
  isLoggedIn: boolean;
  user?: IUserData;
}>;

export const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<any> = ({ children }) => {
  const router = useRouter();
  const [t, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  const [state, dispatch] = useReducer(
    authReducer,
    AUTH_INITIAL_STATE,
    (initial) => {
      const resp = localStorage.getItem('[authState]');
      if (resp) {
        return JSON.parse(resp);
      }
      return initial;
    },
  );

  useEffect(() => {
    localStorage.setItem('[authState]', JSON.stringify(state));
  }, [state]);

  const loginUser = async (
    email: string,
    password: string,
    checkboxKeepSession: boolean,
  ): Promise<{ hasError: boolean; message?: string; data?: IUserData }> => {
    try {
      const { data: resp } = await darshanaApi.post('/users/login', {
        email,
        password,
      });

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Correo y/o contraseña incorrectos'
              : 'Email and/or password incorrect',
        };
      }

      const { access_token, data } = resp;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem(
        'state',
        JSON.stringify({ authReducer: { isLoggedIn: true, user: data } }),
      );
      // if(checkboxKeepSession) {
      // }
      // }

      dispatch({ type: '[Auth] - Login', payload: data });

      return {
        data: data,
        hasError: false,
        message: lang === 'es' ? '¡Bienvenido!' : 'Welcome!',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es' ? 'Error al iniciar sesión' : 'Error while logging in',
      };
    }
  };
  const patchProject = async (
    id: number,
    shown_accepted_message: boolean,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.patch(`/project_applications`, {
        id,
        shown_accepted_message,
      });
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateProjectApplication',
        payload: data.data,
      });

      return {
        data: data,
        hasError: false,
        message: 'Datos guardados correctamente',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const updateProjectApplicationClose = async (
    idApplication: number,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.post(
        `/project_applications/readytoclose`,
        {
          id: idApplication,
          lang,
        },
      );
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateProjectApplicationClose',
        payload: data.data,
      });

      return {
        data: data.data,
        hasError: false,
        message: data.data.message,
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const addAlgorantTransactionProject = async (
    idApplication: number,
    algorandTransaction: string,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.patch(
        `/project_applications/update_wallet`,
        {
          id: idApplication,
          algorand_transaction: algorandTransaction,
        },
      );
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateAlgorandTransactionProject',
        payload: data.data,
      });

      return {
        data: data.data,
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const addNearTransactionProject = async (
    idApplication: number,
    nearTransaction: string,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.patch(
        `/project_applications/update_wallet`,
        {
          id: idApplication,
          near_transaction: nearTransaction,
        },
      );
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateNearTransactionProject',
        payload: data.data,
      });

      return {
        data: data.data,
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const updateFinishStatusProject = (idProject: number) => {
    dispatch({
      type: '[Auth] - UpdateProjectStatusFinish',
      payload: { idProject, project_status_id: 3 },
    });
  };
  const updateStartStatusProject = (idProject: number) => {
    dispatch({
      type: '[Auth] - UpdateProjectStatusStart',
      payload: { idProject, project_status_id: 2 },
    });
  };
  const updateStatusProjectHired = (
    idProject: number,
    accepted: number,
    shown_accepted_message: boolean,
  ) => {
    dispatch({
      type: '[Auth] - UpdateProjectStatusAcceptedHired',
      payload: { idProject, accepted, shown_accepted_message },
    });
  };
  const updateStatusJobHired = (idJob: number, selected: number) => {
    dispatch({
      type: '[Auth] - UpdateJobStatusAcceptedHired',
      payload: { idJob, selected },
    });
  };
  const updateFinishStatusJob = (idJob: number) => {
    dispatch({
      type: '[Auth] - UpdateJobStatusFinish',
      payload: { idJob, job_status_id: 3 },
    });
  };
  const addAlgorantTransactionJob = async (
    idApplication: number,
    algorandTransaction: string,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.patch(
        `/job_applications/update_wallet`,
        {
          id: idApplication,
          algorand_transaction: algorandTransaction,
        },
      );
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateAlgorandTransactionJob',
        payload: data.data,
      });

      return {
        data: data.data,
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const addNearTransactionJob = async (
    idApplication: number,
    nearTransaction: string,
  ): Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }> => {
    try {
      const response = await darshanaApi.patch(
        `/job_applications/update_wallet`,
        {
          id: idApplication,
          near_transaction: nearTransaction,
        },
      );
      if (!response.status) {
        return {
          hasError: true,
          message:
            'Error al actualizar los datos, por favor vuelva a intentar.',
        };
      }
      const { data } = response;
      dispatch({
        type: '[Auth] - UpdateNearTransactionJob',
        payload: data.data,
      });

      return {
        data: data.data,
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message: 'Error al guardar los datos, por favor vuelva a intentar.',
      };
    }
  };
  const updateNotification = (notifications: Notification) => {
    dispatch({
      type: '[Auth] - UpdateNotification',
      payload: notifications,
    });
  };
  const readNotification = (id: number, notification: Notification) => {
    dispatch({
      type: '[Auth] - readNotification',
      payload: { id, notification },
    });
  };
  const logOut = () => {
    localStorage.removeItem('persist:root');
    localStorage.removeItem('[authState]');
    localStorage.removeItem('access_token');
    localStorage.removeItem('state');
    dispatch({ type: '[Auth] - Logout' });
  };

  const registerUser = async (
    email: string,
    name: string,
    last_name: string,
    phone: string,
    password: string,
    algorand_address: string,
    is_talent: boolean,
    workplace_name?: string,
    position?: string,
    start_date?: string,
    google_id_token?: string,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      // Validar algorand_address

      // if (
      //   algorand_address.trim().length > 0 &&
      //   algorand_address.trim().length !== 58
      // ) {
      //   return {
      //     hasError: true,
      //     message: lang === 'es' ? 'Algorand incorrecto' : 'Algorand incorrect',
      //   };
      // }

      // let respAlgorand: any = '';
      // if (algorand_address.trim().length === 58) {
      //   respAlgorand = await darshanaApi.post('/users/check/algo_address', {
      //     algo_address: algorand_address,
      //   });

      //   if (!respAlgorand.data.status) {
      //     return {
      //       hasError: true,
      //       message: lang === 'es' ? 'Algorand no válido' : 'Algorand invalid',
      //     };
      //   }
      // }
      if (is_talent) {
        const { data: resp } = await darshanaApi.post('/users/register', {
          email,
          name,
          last_name,
          phone,
          password,
          google_id_token,
          // algo_address: algorand_address,
          lang,
          is_talent,
          // workplace_name,
          // position,
          // start_date,
        });
        if (!resp.status) {
          return {
            hasError: true,
            message: lang === 'es' ? resp.message_es : resp.message,
          };
        }
      } else {
        const { data: resp } = await darshanaApi.post('/users/register', {
          email,
          name,
          last_name,
          phone,
          password,
          google_id_token,
          // algo_address: algorand_address,
          lang,
          is_talent,
          workplace_name,
          position,
          start_date,
          work_here: true,
        });
        if (!resp.status) {
          return {
            hasError: true,
            message: lang === 'es' ? resp.message_es : resp.message,
          };
        }
      }

      return {
        hasError: false,
        message:
          lang === 'es' ? '¡Registro exitoso!' : 'Registration successful!',
      };
    } catch (error) {
      console.error({ error });
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'No se pudo crear el usuario - intente de nuevo'
              : 'Failed to create user - try again',
        };
      }

      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'No se pudo crear el usuario - intente de nuevo'
            : 'Failed to create user - try again',
      };
    }
  };

  const loginGoogle = async (
    email: string,
    name: string,
    last_name: string,
    google_id: string,
  ): Promise<{ hasError: boolean; message?: string; data?: IUserData }> => {
    try {
      const { data: resp } = await darshanaApi.post('/users/check/email', {
        email,
      });

      // si el correo ya existe, realiza la autenticación
      if (!resp.status) {
        const { data: respLoginGoogle } = await darshanaApi.post(
          '/users/login/google',
          { google_id_token: google_id },
        );
        const { status, data, access_token } = respLoginGoogle;

        if (!status) {
          return {
            hasError: true,
            message:
              lang === 'es'
                ? 'Error al iniciar sesión'
                : 'Error while logging in',
          };
        }

        localStorage.setItem('access_token', access_token);
        dispatch({ type: '[Auth] - Login', payload: data });

        if (data?.is_talent) {
          router.replace('/profile/my-profile');
        } else {
          router.replace('/opportunities');
        }

        return {
          hasError: false,
          message: lang === 'es' ? '¡Bienvenido!' : 'Welcome!',
          data: respLoginGoogle,
        };
      }

      localStorage.setItem(
        'registerByGoogle',
        JSON.stringify({ email, name, last_name, google_id }),
      );
      router.push('/auth/create-account');

      return {
        hasError: false,
        message:
          lang === 'es'
            ? '¡A un paso de obtener tu nueva cuenta!'
            : 'One step away from getting your new account!',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'No se pudo crear el usuario - intente de nuevo'
            : 'Failed to create user - try again',
      };
    }
  };

  const recoveryEmail = async (
    email: string,
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      const { data: resp } = await darshanaApi.post('/users/recovery/email', {
        email,
        lang,
      });

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Correo electrónico no encontrado'
              : 'Email not found',
        };
      }

      return {
        hasError: false,
        message: lang === 'es' ? '¡Revisa tu correo!' : 'Check your email!',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'No se pudo enviar el correo de recuperación'
            : 'Failed to send recovery email',
      };
    }
  };

  const updateWorkplaces = (id: number, workplace: Workplace) => {
    dispatch({
      type: '[Auth] - UpdateWorkplaces',
      payload: { id, workplace: workplace },
    });
  };
  const updateAllWorkplaces = (workplace: Workplace[]) => {
    dispatch({
      type: '[Auth] - UpdateAllWorkplaces',
      payload: { workplace: workplace },
    });
  };

  const addWorkplace = (workplace: Workplace) => {
    dispatch({ type: '[Auth] - AddWorkplaces', payload: workplace });
  };

  const removeWorkplace = (workplace: Workplace) => {
    dispatch({ type: '[Auth] - RemoveWorkplaces', payload: workplace });
  };

  const updateStudyCenter = (id: number, education: StudyCentre) => {
    dispatch({
      type: '[Auth] - UpdateEducations',
      payload: { id, education: education },
    });
  };
  const updateAllStudyCenter = (education: StudyCentre[]) => {
    dispatch({
      type: '[Auth] - UpdateAllEducations',
      payload: { education: education },
    });
  };
  const addStudyCenter = (education: StudyCentre) => {
    dispatch({ type: '[Auth] - AddEducations', payload: education });
  };

  const removeStudyCenter = (education: StudyCentre) => {
    dispatch({ type: '[Auth] - RemoveEducations', payload: education });
  };

  const addSkillUser = (skills: Skill) => {
    dispatch({ type: '[Auth] - AddSkill', payload: skills });
  };
  const addProjectUser = (projectData: Project) => {
    dispatch({ type: '[Auth] - addProjectUser', payload: projectData });
  };
  const addJobUser = (jobData: Job) => {
    dispatch({ type: '[Auth] - addJobUser', payload: jobData });
  };
  const removeAllSkillsUser = () => {
    dispatch({ type: '[Auth] - RemoveAllSkills' });
  };

  const updateInfoPersonal = (infoPersonal: FormDataInfoPersonal) => {
    dispatch({ type: '[Auth] - UpdateInfoPersonal', payload: infoPersonal });
  };
  const updateInfoPersonalProfessional = (
    infoPersonal: FormDataInfoPersonal,
  ) => {
    dispatch({
      type: '[Auth] - updateInfoPersonalProfessional',
      payload: infoPersonal,
    });
  };
  const updateAlgoAddress = (algoAddress: dataUserUpdate) => {
    dispatch({ type: '[Auth] - UpdateAlgoAddress', payload: algoAddress });
  };
  const updateNearWallet = (nearWallet: dataUserUpdate) => {
    dispatch({ type: '[Auth] - UpdateNearWallet', payload: nearWallet });
  };
  const deleteNearWallet = () => {
    dispatch({ type: '[Auth] - DeleteNearWallet' });
  };
  const deleteAlgoAddress = () => {
    dispatch({ type: '[Auth] - DeleteAlgoAddress' });
  };
  const updatePaypalEmail = (email: string) => {
    dispatch({ type: '[Auth] - UpdateEmailPaypal', payload: email });
  };

  const updateIsTalent = (workplace: Workplace) => {
    const { enable_business } = workplace;
    if (enable_business) {
      dispatch({ type: '[Auth] - UpdateIsTalent', payload: false });
    }
  };
  const recoverByCodeAndPassword = async (
    code: string,
    password: string,
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      if (!code) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Código de recuperación inválido'
              : 'Invalid recovery code',
        };
      }

      const { data: resp } = await darshanaApi.post(
        '/users/recovery/password',
        { code, password },
      );

      if (!resp.status) {
        return {
          hasError: true,
          message:
            lang === 'es'
              ? 'Código de recuperación incorrecto'
              : 'Recovery code incorrect',
        };
      }

      return {
        hasError: false,
        message:
          lang === 'es' ? '¡Contraseña actualizada!' : 'Password changed!',
      };
    } catch (error) {
      console.error({ error });
      return {
        hasError: true,
        message:
          lang === 'es'
            ? 'No se pudo cambiar la contraseña'
            : 'Failed to change password',
      };
    }
  };

  const langGlobal = () => {
    return lang;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        logOut,
        registerUser,
        loginGoogle,
        recoveryEmail,

        updateWorkplaces,
        updateAllWorkplaces,
        addWorkplace,
        removeWorkplace,

        updateStudyCenter,
        updateAllStudyCenter,
        addStudyCenter,
        removeStudyCenter,

        addSkillUser,
        removeAllSkillsUser,
        addProjectUser,
        addJobUser,
        updateInfoPersonal,
        updateInfoPersonalProfessional,
        updateAlgoAddress,
        updateNearWallet,
        deleteAlgoAddress,
        deleteNearWallet,
        updatePaypalEmail,
        updateIsTalent,
        patchProject,
        updateProjectApplicationClose,
        addAlgorantTransactionProject,
        addAlgorantTransactionJob,
        addNearTransactionProject,
        addNearTransactionJob,
        updateFinishStatusProject,
        updateStartStatusProject,
        updateStatusProjectHired,
        updateStatusJobHired,
        updateFinishStatusJob,
        updateNotification,
        readNotification,
        recoverByCodeAndPassword,
        langGlobal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
