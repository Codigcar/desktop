import { FormDataInfoPersonal } from '@components/pages/profile/ProfilePersonalData';
import {
  IAlgoTransaction,
  INearTransaction,
  IProjectAcceptedData,
  IUser,
  IUserData,
  Job,
  Notification,
  Project,
  Skill,
  StudyCentre,
  Workplace,
} from '@interfaces/index';
import { AuthState, AUTH_INITIAL_STATE } from './AuthProvider';
import { useMemo } from 'react';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BiNotification } from 'react-icons/bi';
import { dataUserUpdate } from '@contexts/user-profile';

let store: any = '';

type AuthActionType =
  | { type: '[Auth] - Login'; payload: IUserData }
  | { type: '[Auth] - Logout' }
  | { type: '[Auth] - UpdateWorkplaces'; payload: { id: number; workplace: Workplace } }
  | { type: '[Auth] - UpdateAllWorkplaces'; payload: { workplace: Workplace[] } }
  | { type: '[Auth] - AddWorkplaces'; payload: Workplace }
  | { type: '[Auth] - RemoveWorkplaces'; payload: Workplace }
  | { type: '[Auth] - UpdateEducations'; payload: { id: number; education: StudyCentre } }
  | { type: '[Auth] - UpdateAllEducations'; payload: { education: StudyCentre[] } }
  | { type: '[Auth] - AddEducations'; payload: StudyCentre }
  | { type: '[Auth] - RemoveEducations'; payload: StudyCentre }
  | { type: '[Auth] - AddSkill'; payload: Skill }
  | { type: '[Auth] - addProjectUser'; payload: Project }
  | { type: '[Auth] - addJobUser'; payload: Job }

  | { type: '[Auth] - RemoveAllSkills' }
  | { type: '[Auth] - UpdateInfoPersonal'; payload: FormDataInfoPersonal }
  | { type: '[Auth] - updateInfoPersonalProfessional'; payload: FormDataInfoPersonal }
  | { type: '[Auth] - UpdateAlgoAddress'; payload: dataUserUpdate }
  | { type: '[Auth] - UpdateNearWallet'; payload: dataUserUpdate }
  | { type: '[Auth] - DeleteAlgoAddress' }
  | { type: '[Auth] - DeleteNearWallet'  }
  | { type: '[Auth] - UpdateAlgorandTransactionJob'; payload: IProjectAcceptedData }
  | { type: '[Auth] - UpdateAlgorandTransactionProject'; payload: IProjectAcceptedData }
  | { type: '[Auth] - UpdateNearTransactionJob'; payload: INearTransaction }
  | { type: '[Auth] - UpdateNearTransactionProject'; payload: INearTransaction }
  | { type: '[Auth] - UpdateProjectStatusFinish';payload: {idProject: number, project_status_id: number}}
  | { type: '[Auth] - UpdateProjectStatusStart' ;payload: {idProject: number, project_status_id: number}}
  | { type: '[Auth] - UpdateProjectStatusAcceptedHired' ;payload: {idProject: number, accepted: number,shown_accepted_message:boolean}}
  | { type: '[Auth] - UpdateJobStatusAcceptedHired' ;payload: {idJob: number, selected: number}}
  | { type: '[Auth] - UpdateJobStatusFinish' ;payload: {idJob: number, job_status_id: number}}
  | { type: '[Auth] - UpdateEmailPaypal'; payload: string }
  | { type: '[Auth] - UpdateIsTalent'; payload: boolean }
  | { type: '[Auth] - UpdateProjectApplication'; payload: IProjectAcceptedData }
  | { type: '[Auth] - UpdateProjectApplicationClose'; payload: IProjectAcceptedData }
  | { type: '[Auth] - UpdateNotification'; payload: Notification }
  | { type: '[Auth] - readNotification'; payload: { id: number; notification: Notification }  };

export const authReducer = (
  state: AuthState = AUTH_INITIAL_STATE,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case '[Auth] - UpdateWorkplaces':
      return {
        ...state,
        user: {
          ...state.user!,
          workplaces: state.user!.workplaces.map((workplace) => {
            if (workplace.id == action.payload.id) {
              return {
                ...workplace,
                workplace_name: action.payload.workplace.workplace_name,
                start_date: action.payload.workplace.start_date,
                end_date: action.payload.workplace.end_date || '',
                description: action.payload.workplace.description,
                work_here: action.payload.workplace.work_here,
                position: action.payload.workplace.position,
                enable_business: action.payload.workplace.enable_business,
              };
            }
            return workplace;
          }),
        },
      };
      case '[Auth] - UpdateAllWorkplaces':
        return {
          ...state,
          user: {
            ...state.user!,
            workplaces: action.payload.workplace
          },
        };
    case '[Auth] - UpdateProjectApplication':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.application.id === action.payload.id) {
              return {
                ...project,
                application: {
                  ...project.application,
                  shown_accepted_message: action.payload.shown_accepted_message,
                },
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateProjectApplicationClose':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.application.id === action.payload.id) {
              return {
                ...project,
                application: {
                  ...project.application,
                  ready_to_close: action.payload.ready_to_close,
                },
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateNotification':
      return {
        ...state,
        user: {
          ...state.user!,
          notifications: [action.payload, ...state.user?.notifications!],
        },
      };
    case '[Auth] - readNotification':
      return {
        ...state,
        user: {
          ...state.user!,
          notifications: state.user!.notifications.map((notification) => {
            if (notification.id == action.payload.id) {
              return {
                ...notification,
                been_clicked: action.payload.notification.been_clicked,
              };
            }
            return notification;
          }),
        },
      };
    case '[Auth] - AddWorkplaces':
      return {
        ...state,
        user: {
          ...state.user!,
          workplaces: [
            ...state.user!.workplaces,
            {
              ...action.payload,
            },
          ],
        },
      };
    case '[Auth] - RemoveWorkplaces':
      return {
        ...state,
        user: {
          ...state.user!,
          workplaces: state.user!.workplaces.filter((workplace) => {
            return workplace.id != action.payload.id;
          }),
        },
      };

    case '[Auth] - UpdateEducations':
      return {
        ...state,
        user: {
          ...state.user!,
          study_centres: state.user!.study_centres.map((education) => {
            if (education.id == action.payload.id) {
              return {
                ...education,
                // workplace_name: action.payload.workplace.workplace_name,
                // start_date: action.payload.workplace.start_date,
                // end_date: action.payload.workplace.end_date || '',
                // description: action.payload.workplace.description,
                // work_here: action.payload.workplace.work_here,
                // position: action.payload.workplace.position,
                // enable_business: action.payload.workplace.enable_business,

                ...action.payload.education,
              };
            }
            return education;
          }),
        },
      };
    case '[Auth] - UpdateAllEducations':
      return {
        ...state,
        user: {
          ...state.user!,
          study_centres: action.payload.education,
        },
      };
    case '[Auth] - AddEducations':
      return {
        ...state,
        user: {
          ...state.user!,
          study_centres: [
            ...state.user!.study_centres,
            {
              ...action.payload,
            },
          ],
        },
      };
    case '[Auth] - RemoveEducations':
      return {
        ...state,
        user: {
          ...state.user!,
          study_centres: state.user!.study_centres.filter((education) => {
            return education.id != action.payload.id;
          }),
        },
      };

    case '[Auth] - AddSkill':
      return {
        ...state,
        user: {
          ...state.user!,
          skills: [
            ...state.user!.skills,
            {
              ...action.payload,
            },
          ],
        },
      };

    case '[Auth] - RemoveAllSkills':
      return {
        ...state,
        user: {
          ...state.user!,
          skills: [],
        },
      };
    case '[Auth] - addProjectUser':
      return{
        ...state,
        user:{
          ...state.user!,
          projects:[
            ...state.user!.projects,
            {...action.payload}
          ]
        }
      }
    case   '[Auth] - addJobUser':
      return{
        ...state,
        user:{
          ...state.user!,
          jobs:[
            ...state.user!.jobs,
            {...action.payload}
          ]
        }
      }
    case '[Auth] - UpdateInfoPersonal':
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.payload,
          person: {
            ...state.user!.person,
            name: action.payload.name!,
            last_name: action.payload.last_name!,
            phone: action.payload.phone!,
          },
        },
      };
      case '[Auth] - updateInfoPersonalProfessional':
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.payload,
        },
      };
    case '[Auth] - UpdateAlgoAddress':
      return {
        ...state,
        user: {
          ...state.user!,
          algo_address: action.payload.algo_address!,
        },
      };
    case '[Auth] - UpdateNearWallet':
      return {
        ...state,
        user: {
          ...state.user!,
          near_wallet: action.payload.near_wallet!,
        },
      };
    case '[Auth] - DeleteAlgoAddress':
      return {
        ...state,
        user: {
          ...state.user!,
          algo_address: null,
        },
      };
    case '[Auth] - DeleteNearWallet':
      return {
        ...state,
        user: {
          ...state.user!,
          near_wallet: null,
        },
      };
    case '[Auth] - UpdateProjectStatusFinish':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.id === action.payload.idProject) {
              return {
                ...project,
                project_status_id: action.payload.project_status_id,
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateProjectStatusStart':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.id === action.payload.idProject) {
              return {
                ...project,
                project_status_id: action.payload.project_status_id,
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateProjectStatusAcceptedHired':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.id === action.payload.idProject) {
              return {
                ...project,
                application:{
                  ...project.application,
                  accepted: action.payload.accepted,
                  shown_accepted_message:action.payload.shown_accepted_message
                }
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateJobStatusAcceptedHired':
      return {
        ...state,
        user: {
          ...state.user!,
          jobs: state.user!.jobs.map((job) => {
            if (job.id === action.payload.idJob) {
              return {
                ...job,
                application:{
                  ...job.application,
                  selected: action.payload.selected,
                }
              };
            }
            return job;
          }),
        },
      };
    case '[Auth] - UpdateJobStatusFinish':
      return {
        ...state,
        user: {
          ...state.user!,
          jobs: state.user!.jobs.map((job) => {
            if (job.id === action.payload.idJob) {
              return {
                ...job,
                job_status_id: action.payload.job_status_id,
              };
            }
            return job;
          }),
        },
      };
    case '[Auth] - UpdateAlgorandTransactionProject':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.application.id === action.payload.id) {
              return {
                ...project,
                application: {
                  ...project.application,
                  algorand_transaction: action.payload.algorand_transaction,
                },
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateAlgorandTransactionJob':
      return {
        ...state,
        user: {
          ...state.user!,
          jobs: state.user!.jobs.map((job) => {
            if (job.application.id === action.payload.id) {
              return {
                ...job,
                application: {
                  ...job.application,
                  algorand_transaction: action.payload.algorand_transaction,
                },
              };
            }
            return job;
          }),
        },
      };
    case '[Auth] - UpdateNearTransactionJob':
      return {
        ...state,
        user: {
          ...state.user!,
          jobs: state.user!.jobs.map((job) => {
            if (job.application.id === parseInt(action.payload.id,10)) {
              return {
                ...job,
                application: {
                  ...job.application,
                  near_transaction: action.payload.near_transaction,
                },
              };
            }
            return job;
          }),
        },
      };
    case '[Auth] - UpdateNearTransactionProject':
      return {
        ...state,
        user: {
          ...state.user!,
          projects: state.user!.projects.map((project) => {
            if (project.application.id === parseInt(action.payload.id,10)) {
              return {
                ...project,
                application: {
                  ...project.application,
                  near_transaction: action.payload.near_transaction,
                },
              };
            }
            return project;
          }),
        },
      };
    case '[Auth] - UpdateEmailPaypal':
      return {
        ...state,
        user: {
          ...state.user!,
          paypal_email: action.payload,
        },
      };

    case '[Auth] - UpdateIsTalent':
      return {
        ...state,
        user: {
          ...state.user!,
          is_talent: action.payload,
        },
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: 'primary',
  storage,
  // whitelist: ['user'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, authReducer);

function makeStore(initialState = AUTH_INITIAL_STATE) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
