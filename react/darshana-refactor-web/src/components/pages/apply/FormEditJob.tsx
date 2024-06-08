import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import styles from './formApply.module.scss';
import { IUserData, Project } from '@interfaces/user';
import Swal from 'sweetalert2';
import { IProjectUser } from '@interfaces/projectAplication';
import { KeyedMutator } from 'swr';
import { postProject } from '@hooks';
import { IProject } from '@interfaces/projects';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { ModalSendPropose, useYupValidationResolver } from '@utils';
import { CButton } from '@components/Atoms';
import { darshanaApi } from '../../../api/darshanaApi';
import withReactContent, {
  ReactSweetAlert,
  SweetAlert2,
} from 'sweetalert2-react-content';
interface ComponentProps {
  weeks?: any | undefined;
  days?: number | undefined;
  price?: number | undefined;
  translationCommon: any;
  translationPostulation: any;
  addProjectUser?: (projectData: Project) => void;
  projectApplication?: IProjectUser | undefined;
  projectMutate?: any;
  user: IUserData;
  projectData?: IProject | undefined;
  idproject?: string;
  lang: string;
  MySwal: SweetAlert2 & ReactSweetAlert;
  idPostulation: number;
  max_salary: number | undefined;
}
interface IFormApplyProject {
  accept_price: boolean;
  accept_time: boolean;
  weeks: number | undefined;
  lang: string;
  procedure_text: any;
  project_id: string;
  proposal: any;
  price_proposal?: any;
}
const FormEditJob: FC<ComponentProps> = ({
  days,
  weeks,
  price,
  translationCommon,
  translationPostulation,
  MySwal,
  idPostulation,
  projectMutate,
  projectData,
  max_salary,
}) => {
  const { t: tv } = useTranslation('validation');
  // const MySwal = withReactContent(Swal);
  const onSubmitFormJob = async (data: any) => {
    if (data.weeks === '') {
      delete data.weeks;
    }
    if (data.price_proposal === '') {
      delete data.price_proposal;
    }
    if (data.weeks?.length > 0) {
      data.accept_time = false;
      data.weeks = Number(data.weeks);
    }
    const response = await ModalSendPropose(styles, translationCommon);
    if (response) {
      data.id = idPostulation;
      const projectUpdate = await darshanaApi.patch(
        '/project_applications',
        data
      );
      const updateProjectData = projectData?.data.applications.map(
        (application) => {
          if (application.id === idPostulation) {
            return projectUpdate.data.data;
          }
          return application;
        }
      );
      const mutateProject = {
        data: { ...projectData?.data, applications: updateProjectData },
        message: 'Listando datos',
        status: true,
      };
      projectMutate(mutateProject);
      await Swal.fire({
        iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
        title: `<h1> ${translationPostulation(
          'modal-application-success'
        )}</h1>`,
        confirmButtonText: translationCommon('understand'),
        confirmButtonColor: '#1A3447',
        background: '#FAFAFA',
        customClass: {
          confirmButton: 'continueButtonPost',
          title: 'congratulation-title',
        },
        buttonsStyling: false,
      });
    }
  };
  const validationSchemaPostulation = useMemo(
    () =>
      yup.object().shape({
        accept_price: yup.boolean(),
        accept_time: yup.boolean(),
        price_proposal: yup.string().when('accept_price', {
          is: true,
          then: yup.string().required(''),
        }),
        weeks: yup.string().when('accept_time', {
          is: true,
          then: yup.string().required(''),
        }),
      }),
    [tv]
  );
  const methodsFormProject = useForm<any>({
    mode: 'onChange',
    // resolver: useYupValidationResolver(validationSchemaPostulation),
    defaultValues: {
      accept_price: false,
      accept_time: true,
      price_proposal: '',
      weeks: '',
    },
  });
  const handlerOnkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  };
  return (
    <FormProvider {...methodsFormProject}>
      <form
        className={`${styles.form}`}
        onSubmit={methodsFormProject.handleSubmit(onSubmitFormJob)}
      >
        <div className={styles.containerDetail}>
          <h1 className={styles.titleModal}>
            {translationPostulation('edit-proposal')}
          </h1>
          <div className="row">
            <div className="col-sm-12 col-md-6 containerCenter">
              <p className="form-description">
                {max_salary !== 0
                  ? translationCommon('gross-compensation')
                  : translationCommon('hourly_wage')}
              </p>
              <h3 className="form-amount-edit">$ {price} USD</h3>
              <div className="form-group-check">
                <label className="controlLabel control-checkbox">
                  {max_salary !== 0
                    ? translationCommon('compensation-proposal')
                    : translationCommon('compensation-wage')}
                </label>
              </div>
              <div className="input-icon icon-left">
                <i>
                  <Image
                    src={'/images/icons/Dollar.svg'}
                    width={16}
                    height={16}
                    alt="icon Dollar"
                  />
                </i>
                <input
                  className="form-control icon"
                  type="number"
                  placeholder=""

                  {...methodsFormProject.register('price_proposal')}
                  onKeyPress={handlerOnkeyPress}
                />
              </div>
              {methodsFormProject.formState.errors.price_proposal && (
                <span>{translationCommon('complete-field')} </span>
              )}
            </div>
            <div className="col-sm-12 col-md-6 containerCenter">
              <p className="form-description">
                {translationCommon('total-time')}
              </p>
              <h3 className="form-amount-edit">
                {weeks}{' '}
                <span className="form-amount-day">
                  ({days} {translationCommon('days')} )
                </span>
              </h3>
              <div className="form-group-check">
                <label className="controlLabel control-checkbox">
                  {translationCommon('time-proposal')}
                </label>
              </div>
              <div className="input-icon icon-left">
                <i>
                  <Image
                    src={'/images/icons/calendar.svg'}
                    width={16}
                    height={16}
                    alt="icon Calendar"
                  />
                </i>
                <input
                  className="form-control icon"
                  type="number"
                  {...methodsFormProject.register('weeks')}

                  onKeyPress={handlerOnkeyPress}
                />
              </div>
              {methodsFormProject.formState.errors.weeks && (
                <span>{translationCommon('complete-field')} </span>
              )}
            </div>
          </div>
          <CButton
            classNameButton={styles.sendProposeButton}
            loading={methodsFormProject.formState.isSubmitting}
            label={translationPostulation('send-propose')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FormEditJob;
