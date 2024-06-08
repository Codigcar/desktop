import { createContext } from 'react';
import { StudyCentre, Workplace } from '@interfaces/index';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { FormDataInfoPersonal } from '@components/pages/profile/ProfilePersonalData';
import { dataUserUpdate } from './ProfileProvider';

interface ContextProps {
  experiences: Workplace[];
  educations: StudyCentre[];
  skillsUser: OptionsOrGroups<
    { value: string; label: string },
    GroupBase<{ value: string; label: string }>
  >;

  addExperience: (experience: Workplace) => void;
  removeAllExperiences: () => void;
  getExperienceById: (id: string) => Workplace;
  deleteExperienceById: (id: string) => void;
  editExperienceById: (id: string, experience: Workplace) => void;
  saveExperiences: () => Promise<{ hasError: boolean; message: string }>;
  saveExperiencesProfile: (experiences: Workplace[]) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  reloadAllExperiences: () => void;

  reloadAllEducations: () => void;
  addEducation: (education: StudyCentre) => void;
  removeEducationById: (id: string) => void;
  editEducationById: (id: string, education: StudyCentre) => void;
  saveEducations: () => Promise<{ hasError: boolean; message: string }>;
  getEducationById: (id: string) => StudyCentre;

  addSkill: (skills: any) => Promise<void>;
  addPlacesInterest: (
    placesInteres: any,
    placesInterestLength: any
  ) => Promise<void>;
  addLanguageMe: (languageList: any, languageListLength: any) => Promise<void>;
  saveInfoPersonal: (
    infoPersonal: FormDataInfoPersonal
  ) => Promise<{ hasError: boolean; message?: string }>;
  saveInfoPersonalProfessional: (
    infoPersonal: FormDataInfoPersonal
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  saveAlgoAddress: (algoAddress: dataUserUpdate) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  saveNearWallet: (dataUserUpdate: dataUserUpdate) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  deleteAlgoAddressPost: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
  deleteNearWalletPost: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
  saveEmailPaypal: (
    email: string
  ) => Promise<{ hasError: boolean; message?: string }>;

  saveChangePassword: (
    new_password: string,
    confirm_new_password: string
  ) => Promise<{ hasError: boolean; message: string }>;
}

export const ProfileContext = createContext({} as ContextProps);
