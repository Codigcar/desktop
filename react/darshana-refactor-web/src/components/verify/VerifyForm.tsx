import { uploadFile } from '@api/uploadFile';

import { CButton, CInput } from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import { useYupValidationResolver } from '@utils';

import { useTranslation } from 'next-i18next';
import { FC, useContext, useMemo, useState, MouseEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './verify.module.scss';
import * as yup from 'yup';
import usePaidUserValidation from '@hooks/usePaidUser';
import { darshanaApi } from '@api/darshanaApi';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type FormData = {
  emailTalent: string;
  urlLink: string;
  urlLinkFile: File;
};

interface ComponentProps {
  onClickCheckoutModal: () => void;
}
export const VerifyForm: FC<ComponentProps> = ({ onClickCheckoutModal }) => {
  const { t: tp } = useTranslation('profile');
  const { t: tv } = useTranslation('validation');

  const { t: tc } = useTranslation('common');

  const { user } = useContext(AuthContext);

  const getValidationsDetails = async () => {
    try {
      const response = await darshanaApi.get(
        `/validation_checkout?email=${user?.email}`,
      );

      if (response.data.data[0].verification_number > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching validation details:', error);
    }
  };
  const [activeTab, setActiveTab] = useState('linkedin');
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        emailTalent: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
        urlLink: yup.string().optional(),
        urlLinkFile: yup.mixed().optional(),
      }),
    [tv],
  );
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver,
  });

  const ModalSuccessPayment = async (styles: any) => {
    const MySwal = withReactContent(Swal);
    return MySwal.fire({
      iconHtml:
        '<Image src="/images/icons/megaphone.svg" alt="Alert Icon" width={33} height={34}/>',
      title: `<h1 class=${styles.modalTitle}>${tc(
        'modal-verify-success-title',
      )}</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tc(
        'modal-verify-success-title',
      )}</h2>`,
      confirmButtonText: tc('understand'),
      showCancelButton: false,

      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `btn btn--primary `,

        actions: `${styles.ActionContainer}`,
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  };
  const registerVerify = async (data: FormData) => {
    try {
      const isPaidUser = await getValidationsDetails();
      if (!isPaidUser) {
        onClickCheckoutModal();
        return;
      }
      if (data.urlLinkFile instanceof FileList && data.urlLinkFile.length > 0) {
        const upload = await uploadFile(data.urlLinkFile[0]);
        const linkFile = `https://darshana-refactor.whiz.pe/api/file/${upload?.key}`;

        await darshanaApi.post('/verification_request', {
          urlLink: linkFile,
          emailTalent: data.emailTalent,
          email: user?.email,
        });
      } else {
        await darshanaApi.post('/verification_request', {
          urlLink: data.urlLink,
          emailTalent: data.emailTalent,
          email: user?.email,
        });
      }
      await ModalSuccessPayment(styles);
    } catch (error: any) {}
  };
  const onSubmit = async (data: FormData) => {
    await registerVerify(data);
    // const { hasError, message } = await registerUser();
    //
    // if (hasError) {
    //   return;
    // }
  };
  const {
    formState: { isSubmitting },
    register,
  } = methods;
  return (
    <div className="card" style={{ padding: '24px' }}>
      <p className={`text-32 ${styles.verifyGreen}`}>
        {tp('verify-information-1') + ' '}
        <span className={`text-32 ${styles.text}`}>
          {tp('verify-information-2')}
        </span>
      </p>
      <p className={styles.verifyDescription}>
        {tp('verify-information-description')}{' '}
      </p>
      <div className="flex " style={{ gap: '16px', marginBlock: '24px' }}>
        <p
          onClick={() => setActiveTab('linkedin')}
          className={activeTab === 'linkedin' ? styles.activeTab : ''}
        >
          {tp('profile-linkedin')}
        </p>

        <p
          onClick={() => setActiveTab('cv')}
          className={activeTab === 'cv' ? styles.activeTab : ''}
        >
          {tp('cv-vitae')}
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          className="form  flex flex-wrap flex-center"
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          style={{ gap: '16px' }}
        >
          {activeTab === 'linkedin' && (
            <CInput
              name="urlLink"
              placeholder={tp('profile-linkedin')}
              classNameDiv={styles.cinput}
            />
          )}
          {activeTab === 'cv' && (
            <div className={styles.cinput}>
              <label htmlFor="file-upload" className={styles.customUpload}>
                Adjuntar el archivo aqui
              </label>

              <input
                className={styles.inputUpload}
                id="file-upload"
                type="file"
                accept=".pdf"
                {...register('urlLinkFile', { required: true })}
              />
            </div>
          )}
          <CInput
            name="emailTalent"
            placeholder={tp('email-talent')}
            classNameDiv={styles.cinput}
          />
          <CButton
            label={tp('send')}
            loading={isSubmitting}
            classNameButton="btn btn--primary"
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};
