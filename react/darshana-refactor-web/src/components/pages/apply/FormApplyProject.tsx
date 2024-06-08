import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import styles from './formApply.module.scss';
import { Interweave } from 'interweave';
import { IUserData, Project } from '@interfaces/user';
import Swal from 'sweetalert2';
import { IProjectUser } from '@interfaces/projectAplication';
import { KeyedMutator } from 'swr';
import { postProject } from '@hooks';
import { IProject } from '@interfaces/projects';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useYupValidationResolver } from '@utils';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import { CButton } from '@components/Atoms';
import withReactContent from 'sweetalert2-react-content';
interface ComponentProps {
  nameProject: string | undefined;
  workplaceName: string | undefined;
  description: string | undefined;
  place: string;
  weeks: number | undefined;
  days: number | undefined;
  price: number | undefined;
  min_salary: number | undefined;
  max_salary: number | undefined;
  hourlyWage: number | undefined;
  translationCommon: any;
  translationPostulation: any;
  translationValidation: any;
  image_url: string | undefined;
  addProjectUser: (projectData: Project) => void;
  projectApplication: IProjectUser | undefined;
  mutate: KeyedMutator<IProjectUser>;
  user: IUserData;
  projectData: IProject | undefined;
  idproject: string;
  lang: string;
  router: NextRouter;
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
const FormApplyProject: FC<ComponentProps> = ({
  nameProject,
  workplaceName,
  description,
  place,
  weeks,
  days,
  price,
  min_salary,
  max_salary,
  hourlyWage,
  translationCommon,
  translationPostulation,
  translationValidation,
  image_url,
  addProjectUser,
  projectApplication,
  mutate,
  user,
  projectData,
  idproject,
  lang,
  router,
}) => {
  const MySwal = withReactContent(Swal);
  const onSubmitFormJob = async (data: any) => {
    if (user?.paypal_email === null) {
      return MySwal.fire({
        iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
        title: `<h1>${translationPostulation(
          'modal-start-application-title',
        )}</h1>`,
        confirmButtonColor: '#1A3447',
        showConfirmButton: false,
        background: '#FAFAFA',
        html: (
          <button
            type="button"
            className="continueButtonPost"
            onClick={() => {
              Swal.close();
              router.push('/edit-profile/?profesional_data=paymentData');
            }}
          >
            {translationCommon('understand')}
          </button>
        ),
        customClass: {
          title: 'congratulation-title',
        },
        buttonsStyling: false,
      });
    }
    const weeks = data.weeks ? parseInt(data.weeks) : projectData?.data?.weeks;
    const accept_price = !data.accept_price;
    const accept_time = !data.accept_time;
    const formApply: IFormApplyProject = {
      accept_price,
      accept_time,
      weeks,
      lang,
      procedure_text: data.procedure_text,
      project_id: idproject,
      proposal: data.proposal,
    };
    if (!accept_price) {
      formApply.price_proposal = data.price_proposal;
    }
    const resp = await postProject(formApply);
    if (!resp.hasError) {
      const updatedProjects: any = { ...projectApplication };
      updatedProjects.data?.push(resp.data);
      mutate();
      Swal.fire({
        iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
        title: `<h1> ${translationPostulation(
          'modal-application-success',
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
      const { project, ...otherDataProject } = resp.data!;
      const { country, business, ...otherData } = project;
      const projectUpdate = {
        ...otherData,
        application: otherDataProject,
      };
      addProjectUser(projectUpdate);
      // setIsAplicate(true);
    }
  };
  const validationSchemaPostulation = useMemo(
    () =>
      yup.object().shape({
        procedure_text: yup
          .string()
          .max(560)
          .required(translationValidation('required-field')),
        proposal: yup
          .string()
          .max(560)
          .required(translationValidation('required-field')),
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
    [translationValidation],
  );
  const methodsFormProject = useForm<any>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchemaPostulation),
    defaultValues: {
      accept_price: min_salary ? false : true,
      accept_time: false,
      price_proposal: '',
      procedure_text: '',
      proposal: '',
      weeks: '',
    },
  });
  const handlerOnkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === '-') {
      e.preventDefault();
    }
  };
  return (
    <FormProvider {...methodsFormProject}>
      <form
        className={`${styles.form}`}
        onSubmit={methodsFormProject.handleSubmit(onSubmitFormJob)}
      >
        {/* <div className={styles.ProjectImage} /> */}
        <img
          src={image_url !== null ? image_url : '/images/bg-project.png'}
          className={styles.ProjectImage}
        />
        <div className={styles.containerDetail}>
          <div className={styles.rowDetail}>
            <div>
              <div className={styles.titleDetail}>{nameProject}</div>
              <div className={styles.SubHeadDetail}>
                {workplaceName} - {place}
              </div>
            </div>
          </div>
          <h2 className={styles.subTitleDetail}>
            {translationCommon('project-description')}
          </h2>
          <p>
            <Interweave content={description} className={styles.ProseMirror} />
          </p>
          <div className="rectangleDivider"></div>
          <div className="form-group">
            <CTextArea
              classNameDiv="form-group"
              name="proposal"
              label={translationCommon('proposal')}
              placeholder={translationCommon('write-here')}
            />
            <p>{translationCommon('max-characters')}</p>
          </div>
          <div className="form-group">
            <CTextArea
              classNameDiv="form-group"
              name="procedure_text"
              label={translationCommon('follow-up-proposal')}
              placeholder={translationCommon('write-here')}
            />
            <p>{translationCommon('max-characters')}</p>
          </div>
          <div className="rectangleDivider" />
          <div className="row">
            <div className="col-sm-12 col-md-6 containerCenter">
              <p className="form-description">
                {max_salary !== 0
                  ? translationCommon('gross-compensation')
                  : translationCommon('hourly_wage')}
              </p>
              <h3 className="form-amount">
                {max_salary !== 0
                  ? `${min_salary || ''} ${min_salary ? '-' : ''}   ${
                      max_salary || ''
                    } USD`
                  : `${hourlyWage} USD`}
              </h3>
              <div className="form-group-check">
                <label className="control control-checkbox">
                  {translationCommon('compensation-proposal')}
                  <input
                    type="checkbox"
                    {...methodsFormProject.register('accept_price', {})}
                  />
                  <div className="control_indicator"></div>
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
              {(methodsFormProject.formState.errors.price_proposal ||
                methodsFormProject.formState.errors.accept_price) && (
                <span className="message-error">
                  {translationCommon('complete-field')}{' '}
                </span>
              )}
            </div>
            <div className="col-sm-12 col-md-6 containerCenter">
              <p className="form-description">
                {translationCommon('total-time')}{' '}
              </p>
              <h3 className="form-amount">{weeks}</h3>
              <div className="form-group-check">
                <label className="control control-checkbox">
                  {translationCommon('time-proposal')}
                  <input
                    type="checkbox"
                    {...methodsFormProject.register('accept_time', {})}
                  />
                  <div className="control_indicator"></div>
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
                <span className="message-error">
                  {translationCommon('complete-field')}{' '}
                </span>
              )}
            </div>
          </div>
          <CButton
            classNameButton={styles.continueButtonPost}
            loading={methodsFormProject.formState.isSubmitting}
            label={translationPostulation('postulate')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FormApplyProject;
