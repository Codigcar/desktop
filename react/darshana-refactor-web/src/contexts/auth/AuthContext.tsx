import { createContext } from 'react';
import {
  IProjectAccepted,
  IUserData,
  Job,
  Notification,
  Project,
  Skill,
  StudyCentre,
  Workplace,
} from '@interfaces/index';
import { FormDataInfoPersonal } from '@components/pages/profile/ProfilePersonalData';
import { dataUserUpdate } from '@contexts/user-profile';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUserData;

  loginUser: (
    email: string,
    password: string,
    checkboxKeepSession: boolean
  ) => Promise<{ hasError: boolean; message?: string; data?: IUserData }>;
  patchProject: (
    id: number,
    shown_accepted_message: boolean
  ) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  updateProjectApplicationClose: (idApplication: number) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  addAlgorantTransactionProject: (
    idApplication: number,
    algorandTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  addAlgorantTransactionJob: (
    idApplication: number,
    algorandTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  addNearTransactionProject: (
    idApplication: number,
    algorandTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  addNearTransactionJob: (
    idApplication: number,
    nearTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
    data?: IProjectAccepted;
  }>;
  updateFinishStatusProject: (idProject: number) => void;
  updateStartStatusProject: (idProject: number) => void;
  updateStatusProjectHired: (
    idProject: number,
    accepted: number,
    shown_accepted_message: boolean
  ) => void;
  updateStatusJobHired: (idJob: number, selected: number) => void;
  updateFinishStatusJob: (idJob: number) => void;
  updateNotification: (notifications: Notification) => void;
  readNotification: (id: number, notification: Notification) => void;
  logOut: () => void;
  registerUser: (
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
    profile_picture_url?: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  loginGoogle: (
    email: string,
    name: string,
    last_name: string,
    google_id: string,
    profile_picture_url: string
  ) => Promise<{ hasError: boolean; message?: string; data?: IUserData }>;
  recoveryEmail: (
    email: string
  ) => Promise<{ hasError: boolean; message: string }>;

  updateWorkplaces: (id: number, workplace: Workplace) => void;
  updateAllWorkplaces: (workplace: Workplace[]) => void;
  addWorkplace: (workplace: Workplace) => void;
  removeWorkplace: (workplace: Workplace) => void;

  updateStudyCenter: (id: number, education: StudyCentre) => void;
  updateAllStudyCenter: (education: StudyCentre[]) => void;
  addStudyCenter: (education: StudyCentre) => void;
  removeStudyCenter: (education: StudyCentre) => void;
  addSkillUser: (skills: Skill) => void;
  removeAllSkillsUser: () => void;
  addProjectUser: (projectData: Project) => void;
  addJobUser: (jobData: Job) => void;
  updateInfoPersonal: (infoPersonal: FormDataInfoPersonal) => void;
  updateInfoPersonalProfessional: (infoPersonal: FormDataInfoPersonal) => void;
  updateAlgoAddress: (algoAddress: dataUserUpdate) => void;
  updateNearWallet: (nearWallet: dataUserUpdate) => void;
  deleteAlgoAddress: () => void;
  deleteNearWallet: () => void;

  updatePaypalEmail: (email: string) => void;

  updateIsTalent: (workplace: Workplace) => void;

  recoverByCodeAndPassword: (
    code: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;

  langGlobal: () => string;
}

export const AuthContext = createContext({} as ContextProps);
