import { DropFile } from '@components';
import React, { FC, useMemo } from 'react';
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
} from '@utils';
import { Job, Workplace } from '@interfaces/user';

import Image from 'next/image';
import styles from './verify.module.scss';

interface ComponentProps {
  experiences: Workplace[];
  lang: string;
  onClose: () => void;
  tc: any;
}
export const VerifyStatus: FC<ComponentProps> = ({
  experiences,
  lang,
  onClose,
  tc,
}) => {
  const dateNow = new Date();

  // Calcular la diferencia de tiempo y agregarla a cada objeto
  experiences.forEach((objeto) => {
    const start_date = new Date(objeto.start_date);
    objeto.time_difference = Math.abs(dateNow.getTime() - start_date.getTime());
  });

  // Ordenar la lista por la diferencia de tiempo
  if (experiences.length > 2) {
    experiences.sort((a, b) =>
      a && b ? a.time_difference - b.time_difference : 0
    );
  }

  // Tomar los primeros tres elementos de la lista ordenada
  let experiencesProximal = experiences.slice(0, 3);
  const { t: tv } = useTranslation('validation');

  const onSubmitFormJob = async (data: any) => {
    modalFinishCheckout(styles, tc);
  };
  const validationSchemaPostulation = useMemo(
    () =>
      yup.object().shape({
        summary: yup.string().max(560).required(tv('required-field')),
        experience: yup.string().max(560).required(tv('required-field')),
        cv: yup.array().length(1).required(tv('required-field')),

        // linkedin_url: yup.string().typeError(tv('invalid-string')),
      }),
    [tv]
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
          <div className="flex-y-center" style={{ textAlign: 'center' }}>
            <h1 className="text-20 c-1">
              <strong>
                Por el momento no estamos realizando verificaciones
                individuales, te informaremos en cuanto las iniciemos
              </strong>
            </h1>
          </div>
        </div>
        <div
          className={'flex flex-center'}
          style={{ gap: '16px', marginTop: '32px' }}
        >
          <CButton
            classNameButton={'btn btn--primary'}
            loading={methodsFormJob.formState.isSubmitting}
            label={tc('understand')}
            type="button"
            onClick={onClose}
          />
        </div>
      </form>
    </FormProvider>
  );
};
