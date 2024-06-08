import { DropFile } from '@components';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CButton } from '@components/Atoms';
import * as yup from 'yup';
import {
  convertDateToNameMonth,
  convertDateToYYYY,
  diffDatesByMonths,
  modalFinishCheckout,
  useYupValidationResolver,
} from '@utils';
import { IUserData, Job, Workplace } from '@interfaces/user';

import styles from './verify.module.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { darshanaApi } from '@api/darshanaApi';
import { DataUSer, getUserByIdResponse } from '@api/getUserById';
interface ComponentProps {
  experiences: Workplace[];
  lang: string;
  onClose: () => void;
  tc: any;
  userTalent: IUserData | undefined;
}
export const VerifyModalTalent: FC<ComponentProps> = ({
  experiences,
  lang,
  onClose,
  tc,
  userTalent,
}) => {
  const [experienceVerify, setExperienceVerify] = useState(experiences);
  const sliceExperience = (experiences: Workplace[]) => {
    const dateNow = new Date();

    // Calcular la diferencia de tiempo y agregarla a cada objeto
    experiences.forEach((objeto) => {
      const start_date = new Date(objeto.start_date);
      objeto.time_difference = Math.abs(
        dateNow.getTime() - start_date.getTime(),
      );
    });

    // Ordenar la lista por la diferencia de tiempo
    if (experiences.length > 2) {
      experiences.sort((a, b) =>
        a && b ? a.time_difference - b.time_difference : 0,
      );
    }

    // Tomar los primeros tres elementos de la lista ordenada
    let experiencesProximal = experiences.slice(0, 3);
    setExperienceVerify(experiencesProximal);
  };
  useEffect(() => {
    sliceExperience(experienceVerify);
  }, []);

  const { t: tv } = useTranslation('validation');

  // const { register, formState } = useFormContext();
  const onSubmitFormJob = async (data: any) => {
    const response = await darshanaApi.post('/user_workplaces/verifyTalent', {
      email: userTalent?.email,
      user_uuid: userTalent?.user_uuid,
      workplace_list: data.checkboxExperiences,
      is_talent: true,
    });

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      iconHtml: '<Image src="/images/icons/clock.svg" alt="error icon"/>',
      title: `<h1 >${tc('modal-verify-success-title')}</h1>`,
      html: ` <h2 >${tc('modal-verify-success-body')}</h2>`,
      confirmButtonText: tc('understand'),
      showCancelButton: false,
      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `btn btn--primary`,
        actions: `${styles.ActionContainer}`,
      },
      buttonsStyling: false,
    });
  };
  const validationSchemaPostulation = useMemo(
    () =>
      yup.object().shape({
        summary: yup.string().max(560).required(tv('required-field')),
        experience: yup.string().max(560).required(tv('required-field')),
        cv: yup.array().length(1).required(tv('required-field')),

        // linkedin_url: yup.string().typeError(tv('invalid-string')),
      }),
    [tv],
  );
  const methodsFormJob = useForm<any>({
    mode: 'onChange',
    //resolver: useYupValidationResolver(validationSchemaPostulation),
  });
  return (
    <FormProvider {...methodsFormJob}>
      <form
        className={``}
        onSubmit={methodsFormJob.handleSubmit(onSubmitFormJob)}
      >
        <div>
          <h2 className={styles.title}>Informacion a verificar</h2>
          <p className={styles.description}>
            Selecciona la informacion que desea verificar
          </p>
          <p className={styles.title2}>Experiencia</p>
        </div>
        <div>
          {experienceVerify.map((experience: Workplace, index: number) => (
            <div key={index} className={styles.container}>
              <div className="information-row__body flex-space-between">
                <div className="information-row__text">
                  <div className="flex-y-center">
                    <h1 className="text-20 c-1">
                      <strong>{experience.position}</strong>
                    </h1>
                  </div>

                  <h2 className="text-16 c-1">
                    Empresa {experience.workplace_name}
                  </h2>
                  <span className="text-16 c-1">
                    {convertDateToNameMonth(experience.start_date, lang)}{' '}
                    {convertDateToYYYY(experience.start_date)} {' - '}
                    {experience.work_here ? (
                      'actualidad'
                    ) : (
                      <>
                        {convertDateToNameMonth(experience.end_date, lang)}{' '}
                        {convertDateToYYYY(experience.end_date)}
                      </>
                    )}
                    {' / '}
                    {experience.work_here ? (
                      <>
                        {' '}
                        {diffDatesByMonths(
                          new Date(),
                          experience.start_date,
                        )}{' '}
                        meses
                      </>
                    ) : (
                      <>
                        {' '}
                        {diffDatesByMonths(
                          experience.end_date,
                          experience.start_date,
                        )}{' '}
                        meses
                      </>
                    )}
                  </span>
                </div>
                <div className="information-row__icons">
                  <input
                    className={styles.demo}
                    type="checkbox"
                    value={experience.id}
                    {...methodsFormJob.register(`checkboxExperiences`)}
                  />
                </div>
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>
        <div
          className={'flex flex-center'}
          style={{ gap: '16px', marginTop: '32px' }}
        >
          <CButton
            classNameButton={'btn btn--stroke'}
            loading={methodsFormJob.formState.isSubmitting}
            label={'cancel'}
            type="button"
            onClick={onClose}
          />
          <CButton
            classNameButton={'btn btn--primary'}
            loading={methodsFormJob.formState.isSubmitting}
            label={tc('validate')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};
