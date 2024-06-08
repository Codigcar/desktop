import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { AuthContext } from '@contexts/auth';
import { CButton, CInput } from '@components/Atoms';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toastMessage, useYupValidationResolver } from '@utils';
import { ProfileContext } from '@contexts/user-profile';

interface ComponentProps {
  setIsChangeData: Dispatch<SetStateAction<boolean>>;
}

const ProfilePaymentData: FC<ComponentProps> = ({ setIsChangeData }) => {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { user } = useContext(AuthContext);
  const { saveEmailPaypal } = useContext(ProfileContext);

  // useEffect(() => {}, []);

  type FormData = {
    email: string;
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
      }),
    [tv]
  );

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      email: user?.paypal_email || '',
    },
  });

  const onSubmit = async ({ email }: FormData) => {
    const { hasError, message } = await saveEmailPaypal(email);
    if (hasError) {
      toastMessage('error', message);
      return;
    }
    toastMessage('success', message);
  };
  const validationChanges = () => {
    const defaultValues = {
      email: user?.paypal_email || '',
    };
    const isEqual =
      JSON.stringify(defaultValues) === JSON.stringify(methods.watch());
    setIsChangeData(!isEqual);
  };
  useEffect(() => {
    validationChanges();
  }, [methods.watch()]);
  return (
    <div className="content">
      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="row">
            <section className="col-sm-12 col-md-8 section content__left">
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('payment-method')}</strong>
                </h1>
                <div className="paypal-image">
                  <Image
                    src="/images/paypal-logo.svg"
                    alt="back"
                    width={132}
                    height={32}
                  />
                </div>
                <div className="form">
                  <div className="row">
                    <CInput
                      classNameDiv={'col-sm-12 col-md-6 form-group'}
                      label={t('paypal-email')}
                      placeholder={tc('write-here')}
                      name="email"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="col-sm-12 col-md-4 section content__right">
              <h1 className="text-16 message text-center">
                <strong className="black">{t('profile-text')}</strong>
              </h1>
              <CButton
                label={tc('save-button')}
                loading={methods.formState.isSubmitting}
                classNameButton="btn btn--primary btn--full"
                type="submit"
              />
            </section>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default React.memo(ProfilePaymentData);
