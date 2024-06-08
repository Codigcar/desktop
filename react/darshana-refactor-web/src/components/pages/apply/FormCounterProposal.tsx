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
  user: IUserData;
  idproject?: string;
  idPostulation: number;
}
interface IFormApplyProject {
  accept_price: boolean;
  accept_time: boolean;
  time_counter_proposal: number | undefined;
  lang: string;
  procedure_text: any;
  project_id: string;
  proposal: any;
  salary_counter_proposal?: any;
}
const FormCounterProposal: FC<ComponentProps> = ({
  days,
  weeks,
  price,
  translationCommon,
  translationPostulation,
  idPostulation,
}) => {
  const [weeksNumber, weeksString] = weeks.split(' ');
  const { t: tv } = useTranslation('validation');
  // const MySwal = withReactContent(Swal);
  const onSubmitFormJob = async (data: any) => {
    if (data.time_counter_proposal === '') {
      delete data.time_counter_proposal;
    }
    if (data.salary_counter_proposal === '') {
      delete data.salary_counter_proposal;
    }
    data.time_counter_proposal = Number(data.time_counter_proposal);
    data.salary_counter_proposal = Number(data.salary_counter_proposal);

    data.id = idPostulation;

    await darshanaApi.patch('/project_applications/counter_proposal', data);

    await Swal.fire({
      iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
      title: `<h1> ${translationPostulation('modal-application-success')}</h1>`,
      confirmButtonText: translationCommon('understand'),
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        confirmButton: 'continueButtonPost',
        title: 'congratulation-title',
      },
      buttonsStyling: false,
    });
  };
  const validationSchemaPostulation = useMemo(
    () =>
      yup.object().shape({
        // data: yup.object().shape({
        salary_counter_proposal: yup.string().required(),
        time_counter_proposal: yup.string().required(),
      }),
    ['salary_counter_proposal', 'time_counter_proposal'],
  );
  const methodsFormProject = useForm<any>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchemaPostulation),
    defaultValues: {
      salary_counter_proposal: price,
      time_counter_proposal: weeksNumber,
    },
    // resolver: yupResolver(validationSchemaPostulation),
  });
  return (
    <FormProvider {...methodsFormProject}>
      <form
        className={`${styles.form}`}
        onSubmit={methodsFormProject.handleSubmit(onSubmitFormJob)}
      >
        <div className={styles.containerDetail}>
          <h1 className={styles.titleModal}>
            {translationPostulation('applicant-proposal')}
          </h1>
          <div className="row">
            <div className="col-sm-12 col-md-6 containerCenter">
              <p className="form-description">
                {translationCommon('gross-compensation')}
              </p>
              <h3 className="form-amount-edit">$ {price ? price : ''} USDd</h3>
              <div className="form-group-check">
                <label className="controlLabel control-checkbox">
                  {translationCommon('compensation-proposal')}
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
                  {...methodsFormProject.register('salary_counter_proposal')}
                />
              </div>
              {methodsFormProject.formState.errors.salary_counter_proposal && (
                <span className="message-error">
                  {translationCommon('complete-field')}
                </span>
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
                  {...methodsFormProject.register('time_counter_proposal')}
                />
              </div>
              {methodsFormProject.formState.errors.time_counter_proposal && (
                <span className="message-error">
                  {translationCommon('complete-field')}
                </span>
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

export default FormCounterProposal;
