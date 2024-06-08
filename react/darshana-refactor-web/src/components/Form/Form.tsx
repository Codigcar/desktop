// @ts-nocheck
import {
  FC,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import * as yup from 'yup';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';

import {
  CButton,
  CCheckbox,
  CInput,
  CInputWithIcon,
  CSelect,
  CTextoEditor,
} from '@components/Atoms';
import {
  useYupValidationResolver,
  toastMessage,
  convertDateToYYYYMMDD,
  modalDelete,
  convertDateNow,
} from '@utils/index';
import { useBusiness, useFetchSWR, useSkills } from '@hooks';
import DropFile from '@components/Dropzone/DropFile';
import SelectAbility from '@components/selectAbility/selectAbility';
import styles from './form.module.scss';
import { darshanaApi } from '@api/darshanaApi';
import { CInputWithIconColumn } from '../Atoms/CInputWithIcon/CInputWithIconColumn';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '@contexts/auth';

interface ComponentProps {
  typePost: string;
  infoData?: any;
}
interface IJobUpdate {
  stripe_id?: string;
  business_id: string;
  contract_type: string;
  contract_time: number;
  description: string;
  end_date: string;
  name: string;
  salary: number;
  skills: any;
  summary: string;
  is_visible: boolean | undefined;
  work_modality_id: string;
  country_id: string;
  id?: string;
  lang: string;
  min_salary: number;
  max_salary: number;
}
interface IProjectUpdate {
  business_id: string;
  weeks: number;
  description: string;
  body: string;
  end_date: string;
  image_url?: string;
  mobile_image_url?: string;
  name: string;
  price: number;
  work_modality_id: string;
  skills: any;
  topic_id: string | number;
  files: any;
  country_id: string;
  is_visible: boolean | undefined;
  id?: string;
  lang: string;
  min_salary: number | null;
  max_salary: number | null;
  category?: string | null;
  hourly_wage: number | null;
  stripe_id?: string | null;
}
interface IProjectPOST {
  type?: string;
  country_id: string;
  cover: any;
  mobileImageUrl: any;
  description: string;
  end_date: string;
  files: any;
  name: string;
  remuneration_usd: number;
  min_salary: number;
  max_salary: number;
  hourly_wage: number;
  select_skills: any;
  summary: string;
  time: number;
  topic_id: string | number;
  business_id: string;
  work_modality_id: string;
  is_visible: boolean;
  contract_type: string;
  contract_time: string;
  category?: string | null;
}
interface IdefaultProjectData {
  type: string;
  name: string;
  min_salary: number;
  max_salary: number;
  time: number;
  summary: string;
  description: string;
  end_date: string;
  country_id: number;
  topic_id: number;
  business_id: number;
  work_modality_id: number;
  files: string;
  is_visible: string;
  category?: string;
}

const Form: FC<ComponentProps> = ({ typePost, infoData }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { t: tp } = useTranslation('postulation');
  let idTransactionStripe = '';
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  const { data: topicsList, isLoading: isLoadingTopics } = useFetchSWR(
    'topics',
    { length: 100 }
  );
  const { data: countries, isLoading: isLoadingCountries } =
    useFetchSWR('countries');
  const { data: workModalities, isLoading: isLoadingWorkModalities } =
    useFetchSWR('work_modalities');
  const { data: skills, isLoading: isLoadingSkills } = useSkills();
  const { data: business, isLoading: isLoadingBusiness } = useBusiness();
  const handlerClickPost = (id: string): void => {
    Swal.fire({
      iconHtml:
        '<Image src="/images/icons/check_state.svg" alt="check icon" />',
      title: `<h1 class=${styles.modalTitle}>¡${
        typePost === 'project' ? tc('project') : tc('job')
      } ${tc('modal-message')}!</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tc('post-ready')}</h2>
              <p class=${styles.modalId}>${tc('post-id')}: ${id}</p>`,
      confirmButtonText: tc('understand'),
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `${styles.continueButtonPost}`,
        title: 'congratulation-title',
      },
      buttonsStyling: false,
    }).then(() =>
      router.push(
        typePost === 'project'
          ? `/recruiter/project-detail/${id}`
          : `/recruiter/job-detail/${id}`
      )
    );
  };
  const handlerClickUpdate = (id: string): void => {
    Swal.fire({
      iconHtml:
        '<Image src="/images/icons/check_state.svg" alt="check icon" />',
      title: `<h1 class=${styles.modalTitle}>¡ ${tc('you')} ${
        typePost === 'project' ? tc('project') : tc('job')
      } ${tc('modal-message-1')}!</h1>`,
      confirmButtonText: tc('understand'),
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `${styles.continueButtonPost}`,
        title: 'congratulation-title',
      },
      buttonsStyling: false,
    }).then(() =>
      router.push(
        typePost === 'project'
          ? `/recruiter/project-detail/${id}`
          : `/recruiter/job-detail/${id}`
      )
    );
  };
  const handlerClickDelete = async (e: { preventDefault: any }) => {
    e.preventDefault();

    const resp = await modalDelete(styles, tc);
    if (resp) {
      const deletedPublish = {
        id: infoData?.id,
        business_id: infoData?.business_id,
      };
      let response;
      if (typePost === 'project') {
        response = await darshanaApi.delete('/projects', {
          data: deletedPublish,
        });
      } else {
        response = await darshanaApi.delete('/jobs', { data: deletedPublish });
      }
      if (!response.status) {
        return;
      }
      router.push('/opportunities');
    }
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        type: yup.string(),
        name: yup.string().required(tv('required-field')),
        min_salary: yup
          .number()

          .transform((value) =>
            isNaN(value) || value === null || value === undefined ? null : value
          )
          .nullable(),
        // .typeError(tv('invalid-number'))
        // .required(tv('required-field'))
        // .min(0, tv('invalid-number')),
        max_salary: yup.number().when('min_salary', {
          is: (minSalary: number) => minSalary > 0,
          then: yup
            .number()
            .moreThan(yup.ref('min_salary'), tv('invalid-min-salary'))
            // .typeError(tv('invalid-number'))
            .nullable(),
          // .required(tv('required-field')),
          otherwise: yup
            .number()
            .transform((value) =>
              isNaN(value) || value === null || value === undefined
                ? null
                : value
            )
            // .min(0, tv('invalid-number'))
            .nullable(),
        }),
        hourly_wage: yup.number().when('type', {
          is: 'project',
          then: yup
            .number()
            .transform((value) =>
              isNaN(value) || value === null || value === undefined
                ? null
                : value
            )
            .nullable(),
          // .required(tv('required-field'))
          // .min(0, tv('invalid-number')),
        }),

        time: yup
          .number()
          .typeError(tv('invalid-number'))
          .required(tv('required-field'))
          .min(1, tv('invalid-number')),
        summary: yup.string().required(tv('required-field')),
        description: yup.string().required(tv('required-field')),
        end_date: yup
          .date()
          .typeError(tv('invalid-date'))
          .min(new Date(), tv('invalid-date')),
        select_skills: yup.string().required(tv('required-field')),
        country_id: yup.number().min(1, tv('required-field')),
        topic_id: yup.number().min(1, tv('required-field')),
        contract_type: yup.string().when('type', {
          is: 'job',
          then: yup
            .string()
            .test('len', tv('required-field'), (val: any) => val.length > 1),
        }),
        category: yup
          .string()
          .nullable()
          .when('topic_id', {
            is: 12,
            then: yup.string().nullable().required(tv('required-field')),
          }),
        business_id: yup.number().min(1, tv('required-field')),
        work_modality_id: yup.number().min(1, tv('required-field')),
      }),
    [tv]
  );

  const defaultValuesJob = {
    type: typePost,
    name: infoData?.name || '',
    min_salary: infoData?.min_salary,
    max_salary: infoData?.max_salary,
    time: infoData?.contract_time,
    summary: infoData?.summary || '',
    description: infoData?.description || '',
    end_date: convertDateToYYYYMMDD(infoData?.end_date) || '',
    country_id: infoData?.country_id || '0',
    contract_type: infoData?.contract_type || '0',
    business_id: infoData?.business_id || '0',
    work_modality_id: infoData?.work_modality_id || '0',
    is_visible: infoData?.is_visible,
  };
  const defaultValuesProject = {
    type: typePost,
    name: infoData?.name,
    min_salary: infoData?.min_salary,
    max_salary: infoData?.max_salary,
    hourly_wage: infoData?.hourly_wage,
    time: infoData?.weeks,
    summary: infoData?.description,
    description: infoData?.body,
    end_date: convertDateToYYYYMMDD(infoData?.end_date) || '',
    country_id: infoData?.country_id,
    topic_id: infoData?.topic_id,
    business_id: infoData?.business_id,
    work_modality_id: infoData?.work_modality_id,
    files: infoData?.files || [],
    is_visible: infoData?.is_visible,
    category: '',
    disable_compensation: false,
  };

  if (infoData?.topic_id == 12) {
    defaultValuesProject.category = infoData?.category;
  }
  const defaultValue =
    typePost === 'project' ? defaultValuesProject : defaultValuesJob;

  const methods = useForm<IProjectPOST>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: defaultValue,
  });

  const watchmode = methods.watch();

  const onSubmit = async (data: IProjectPOST) => {
    data.end_date = convertDateToYYYYMMDD(data.end_date);
    data.select_skills = JSON.parse(data.select_skills);
    data.select_skills = data.select_skills
      .map((skill: any) => skill.value)
      .toString();
    if (typePost === 'project') {
      const project: IProjectUpdate = {
        business_id: data.business_id,
        weeks: data.time,
        description: data.summary,
        body: data.description,
        end_date: data.end_date,
        name: data.name,
        price: data.remuneration_usd,
        min_salary: data.min_salary,
        max_salary: data.max_salary,
        hourly_wage: data.hourly_wage,
        work_modality_id: data.work_modality_id,
        skills: data.select_skills,
        topic_id: data.topic_id,
        files: data.files,
        country_id: data.country_id,
        is_visible: data.is_visible,
        lang: lang,
      };
      if (data.topic_id === 12) {
        project.category = data.category;
      }
      let resp;
      if (data.disable_compensation) {
        project.hourly_wage = null;
        project.max_salary = null;
        project.min_salary = null;
      }
      if (data.hourly_wage) {
        project.max_salary = null;
        project.min_salary = null;
      }
      if (data.max_salary || data.min_salary) {
        project.hourly_wage = null;
      }
      if (infoData) {
        project.id = infoData?.id;
        // if (data.cover && data.cover[0]?.file_url) {
        //   project.image_url = data?.cover[0]?.file_url;
        // }
        project.image_url = user?.default_cover_image_url;
        if (data.mobileImageUrl[0]?.file_url) {
          project.mobile_image_url = data?.mobileImageUrl[0]?.file_url;
        }
        resp = await darshanaApi.patch('/projects', project);
        if (!resp.data.status) {
          toastMessage('error', 'Error');
          return;
        }
        handlerClickUpdate(resp.data.data.id);
      } else {
        project.is_visible = true;
        project.image_url = user?.default_cover_image_url || null;
        project.mobile_image_url = data?.mobileImageUrl[0]?.file_url;
        if (user?.email === 'hi@darshana.io') {
          resp = await darshanaApi.post('/projects', project);

          if (!resp.data.status) {
            toastMessage('error', 'Error');
            return;
          }
          handlerClickPost(resp.data.data.id);
        } else {
          const MySwal = withReactContent(Swal);
          const response = await MySwal.fire({
            title: tp('stripe-payment-title'),
            html: (
              <div className="flex flex-space-evenly flex-wrap">
                <button
                  type="button"
                  className={styles.continueButtonPreview}
                  onClick={() => Swal.close()}
                >
                  {tc('cancel-edition')}
                </button>

                <StripeCheckout
                  stripeKey={process.env.NEXT_PUBLIC_KEY_STRIPE || '123'}
                  name={watchmode.name}
                  // description={watchmode.summary}
                  image="https://cdn.whiz.pe/api/v2/image/35368dfa-e0b6-4f19-b029-23b41ed69c32/png"
                  amount={10 * 100}
                  token={payNow}
                  email={user?.email}
                  locale={lang || en}
                  billingAddress
                  ComponentClass="div"
                  // shippingAddress
                >
                  <CButton
                    label={tc('publish')}
                    type="submit"
                    classNameButton={styles.confirmButton}
                  />
                </StripeCheckout>
              </div>
            ),
            showCloseButton: true,
            showConfirmButton: false,
            confirmButtonText: tp('send-propose'),
            confirmButtonColor: '#1A3447',
            background: '#FAFAFA',
            customClass: {
              popup: `modal-popup`,
              htmlContainer: 'html-container',
              confirmButton: 'continueButtonPost',
            },
            buttonsStyling: false,
          });
          if (response.isConfirmed) {
            project.stripe_id = idTransactionStripe;
            resp = await darshanaApi.post('/projects', project);

            if (!resp.data.status) {
              toastMessage('error', 'Error');
              return;
            }
            handlerClickPost(resp.data.data.id);
          }
        }
      }
      return;
    }
    if (typePost === 'job') {
      const job: IJobUpdate = {
        business_id: data.business_id,
        contract_type: data.contract_type,
        contract_time: data.time,
        description: data.description,
        end_date: data.end_date,
        name: data.name,
        salary: data.remuneration_usd,
        min_salary: data.min_salary,
        max_salary: data.max_salary,
        skills: data.select_skills,
        summary: data.summary,
        is_visible: data.is_visible,
        work_modality_id: data.work_modality_id,
        country_id: data.country_id,
        lang: lang,
      };
      let resp;
      if (data.disable_compensation) {
        job.max_salary = null;
        job.min_salary = null;
      }
      if (infoData) {
        job.id = infoData?.id;
        resp = await darshanaApi.patch('/jobs', job);
        if (!resp.data.status) {
          toastMessage('error', 'Error');
          return;
        }
        handlerClickUpdate(resp.data.data.id);
      } else {
        job.is_visible = true;
        if (user?.email === 'hi@darshana.io') {
          resp = await darshanaApi.post('/jobs', job);

          if (!resp.data.status) {
            toastMessage('error', 'Error');
            return;
          }
          handlerClickPost(resp.data.data.id);
        } else {
          const MySwal = withReactContent(Swal);
          const response = await MySwal.fire({
            title: tp('stripe-payment-title'),
            html: (
              <div className="flex flex-space-evenly flex-wrap">
                <button
                  type="button"
                  className={styles.continueButtonPreview}
                  onClick={() => Swal.close()}
                >
                  {tc('cancel-edition')}
                </button>
                <StripeCheckout
                  stripeKey={process.env.NEXT_PUBLIC_KEY_STRIPE || '123'}
                  name={watchmode.name}
                  // description={watchmode.summary}
                  image="https://cdn.whiz.pe/api/v2/image/35368dfa-e0b6-4f19-b029-23b41ed69c32/png"
                  amount={10 * 100}
                  token={payNow}
                  email={user?.email}
                  locale={lang || en} // en o es
                  billingAddress
                  ComponentClass="div"
                  // shippingAddress
                >
                  <CButton
                    label={tc('publish')}
                    type="submit"
                    classNameButton={styles.confirmButton}
                  />
                </StripeCheckout>
              </div>
            ),
            showCloseButton: true,
            showConfirmButton: false,
            confirmButtonText: tp('send-propose'),
            confirmButtonColor: '#1A3447',
            background: '#FAFAFA',
            customClass: {
              popup: `modal-popup`,
              htmlContainer: 'html-container',
              confirmButton: 'continueButtonPost',
            },
            buttonsStyling: false,
          });
          if (response.isConfirmed) {
            job.stripe_id = idTransactionStripe;
            resp = await darshanaApi.post('/jobs', job);
            if (!resp.status) {
              toastMessage('error', 'Error');
              return;
            }
            handlerClickPost(resp.data.data.id);
          }
        }
      }
      return;
    }
  };
  const handlerClickPreview = () => {
    const businessData = business.data.find(
      (b: any) => b.id == watchmode.business_id
    );
    const countryData = countries?.data.find(
      (country: any) => country.id == watchmode.country_id
    );
    const skillsList = JSON.parse(watchmode.select_skills).map(
      (skill: any, index: number) => ({ name: skill.value, id: index })
    );
    if (typePost === 'job') {
      const job = {
        business_name: businessData?.workplace?.workplace_name || ' ',
        contract_type: watchmode.contract_type || ' ',
        description: watchmode.description || ' ',
        name: watchmode.name || '',
        salary: watchmode.remuneration_usd || ' ',
        min_salary: watchmode.min_salary,
        max_salary: watchmode.max_salary,
        hourly_wage: watchmode.hourly_wage,
        skills: skillsList || [],
        summary: watchmode.summary || ' ',
        country_name: countryData?.name || ' ',
      };
      localStorage.setItem('jobPreview', JSON.stringify(job));
      if (typeof window !== 'undefined') {
        const hostname = window.location.origin;

        lang === 'es'
          ? window.open(`${hostname}/es/recruiter/preview/job`, '_blank')
          : window.open(`${hostname}/recruiter/preview/job`, '_blank');
      }
    } else {
      const project = {
        workplace_name: businessData?.workplace?.workplace_name || ' ',
        name: watchmode.name || ' ',
        price: watchmode.remuneration_usd || ' ',
        min_salary: watchmode.min_salary || ' ',
        max_salary: watchmode.max_salary || ' ',
        skills: skillsList || ' ',
        description: watchmode.summary || ' ',
        body: watchmode.description || ' ',
        country_name: countryData?.name || ' ',
        weeks: watchmode.time || ' ',
        created_at: convertDateNow(),
        image_url: watchmode.cover[0]?.file_url || ' ',
      };
      localStorage.setItem('projectPreview', JSON.stringify(project));
      if (typeof window !== 'undefined') {
        const hostname = window.location.origin;
        lang === 'es'
          ? window.open(`${hostname}/es/recruiter/preview/project`, '_blank')
          : window.open(`${hostname}/recruiter/preview/project`, '_blank');
      }
    }
  };
  const payNow = async (token: Token) => {
    try {
      const response = await darshanaApi.post(`/stripe/payment`, {
        amount: 10 * 100,
        token,
      });

      if (response.status === 200) {
        idTransactionStripe = response.data.data.id;

        Swal.clickConfirm();
      }
    } catch (error: any) {
      Swal.clickDeny();
      toastMessage('error', error?.response?.data?.message);
      return error;
    }
  };

  const handlerOnkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === '-') {
      e.preventDefault();
    }
  };
  // consoel.log(watchmode);
  return (
    <FormProvider {...methods}>
      <form
        action=""
        className={`${styles.form} col-sm-12`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12-sm col-md-8">
            <div className="row">
              <CInput
                classNameDiv="form-group col-sm-12 col-md-6"
                name="name"
                label={
                  typePost === 'project' ? tc('project-name') : tc('job-name')
                }
                placeholder={tc('write-here')}
              />
              {typePost === 'project' ? (
                <>
                  {isLoadingTopics ? (
                    <div></div>
                  ) : (
                    <CSelect
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="topic_id"
                      label={tc('category')}
                      options={topicsList?.data || []}
                      valueName={'name'}
                    />
                  )}
                </>
              ) : (
                ''
              )}
              {typePost === 'project' && watchmode.topic_id == 12 && (
                <CInput
                  classNameDiv="form-group col-sm-12 col-md-6"
                  name="category"
                  label={tc('category')}
                  placeholder={tc('write-here')}
                />
              )}
              <div className="col-sm-12 col-md-6 ">
                <label className="form-label">{tc('remuneration-usd')}</label>
                <div
                  className="col-sm-12 col-md-12 flex"
                  style={{ padding: 0 }}
                >
                  <CInputWithIconColumn
                    classNameDiv="form-group flex-direction-col"
                    classNameInput={`${styles.remuneration} form-control `}
                    name="min_salary"
                    label={`${tc('from')}`}
                    placeholder={tc('0')}
                    showImageIcon={false}
                    icon={'$'}
                    type="number"
                    onKeyPress={handlerOnkeyPress}
                    disable={
                      watchmode.disable_compensation || watchmode.hourly_wage
                        ? true
                        : false
                    }
                  />
                  <CInputWithIconColumn
                    classNameDiv="form-group flex-direction-col"
                    classNameInput={`${styles.remuneration} form-control `}
                    name="max_salary"
                    label={`${tc('to')}`}
                    placeholder={tc('0')}
                    showImageIcon={false}
                    icon={'$'}
                    type="number"
                    onKeyPress={handlerOnkeyPress}
                    disable={
                      watchmode.disable_compensation || watchmode.hourly_wage
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              {typePost === 'project' ? (
                <CInputWithIcon
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="hourly_wage"
                  label={tc('hourly_wage')}
                  showImageIcon={false}
                  icon={'$'}
                  classNameDivIcon="input-icon icon-left"
                  type="number"
                  placeholder={tc('0')}
                  onKeyPress={handlerOnkeyPress}
                  disable={
                    watchmode.disable_compensation || watchmode.max_salary
                      ? true
                      : false || watchmode.min_salary
                      ? true
                      : false
                  }
                />
              ) : (
                ''
              )}
              <h1
                className="form-group col-sm-12 col-md-12"
                style={{ marginLeft: '8px', fontSize: 14 }}
              >
                <CCheckbox
                  name="disable_compensation"
                  label={tc('not-total-compensation')}
                />
              </h1>

              {typePost === 'job' ? (
                <CSelect
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="contract_type"
                  label={tc('contract_type')}
                  options={[
                    {
                      id: `${lang === 'es' ? 'Renovable' : 'Renewable'}`,
                      name: 'Renovable',
                      name_en: 'Renewable',
                    },
                    {
                      id: `${lang === 'es' ? 'Indefinido' : 'Undefined'}`,
                      name: 'Indefinido',
                      name_en: 'Undefined',
                    },
                  ]}
                  valueName={lang === 'es' ? 'name' : 'name_en'}
                />
              ) : (
                ''
              )}
              <CInput
                classNameDiv="form-group col-sm-12 col-md-6"
                name="time"
                label={
                  typePost === 'project'
                    ? tc('project-period')
                    : tc('job-period')
                }
                placeholder={tc('write-here')}
              />
              {isLoadingWorkModalities ? (
                <div></div>
              ) : (
                <CSelect
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="work_modality_id"
                  label={tc('work-modality')}
                  options={workModalities?.data || []}
                  valueName={lang === 'es' ? 'name' : 'name_en'}
                />
              )}
              {isLoadingCountries ? (
                <div></div>
              ) : (
                <CSelect
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="country_id"
                  label={t('country')}
                  options={countries?.data || []}
                  valueName={'name'}
                />
              )}
            </div>

            <div className="row">
              {/* {typePost === 'project' && (
                <div className="form-group col-sm-12 col-md-12">
                  <label className="form-label">{tc('desktop-image')}</label>
                  <DropFile
                    acceptTypeFiles={{
                      'image/*': ['.png', '.jpeg', '.jpg'],
                    }}
                    name="cover"
                    type="image"
                    maxSize={3150000} //3Mb (megabyte)
                    translationCommon={tc}
                  />
                </div>
              )} */}
              {typePost === 'project' && (
                <div className="form-group col-sm-12 col-md-12">
                  <label className="form-label">{tc('mobile-image')}</label>
                  <DropFile
                    acceptTypeFiles={{
                      'image/*': ['.png', '.jpeg', '.jpg'],
                    }}
                    name="mobileImageUrl"
                    type="image"
                    maxSize={3150000} //3Mb (megabyte)
                    translationCommon={tc}
                    placeholder={tc('drop-file-message-image')}
                  />
                </div>
              )}
              <CTextoEditor
                disable={false}
                name="summary"
                label={tc('summary')}
                placeholder={tc('write-here')}
              />
              <CTextoEditor
                disable={false}
                name="description"
                label={tc('description')}
                placeholder={tc('write-here')}
              />

              <div className="form-group col-sm-12 col-md-12">
                <label className="form-label">{tc('skills')}</label>
                {isLoadingSkills ? (
                  <div></div>
                ) : (
                  <SelectAbility
                    defaultValue={infoData?.skills ? infoData.skills : []}
                    data={skills}
                    placeholder={t('enter-ability')}
                    name="select_skills"
                  />
                )}
              </div>
              {typePost === 'project' ? (
                <div className="form-group col-sm-12 col-md-12">
                  <label className="form-label">{tc('add-files')}</label>
                  <DropFile
                    acceptTypeFiles={{
                      'image/*': ['.png', '.jpeg', '.jpg'],
                      'application/pdf': ['.pdf'],
                    }}
                    name="files"
                    type="files"
                    translationCommon={tc}
                  />
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="row">
              {isLoadingBusiness ? (
                <div></div>
              ) : (
                <CSelect
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="business_id"
                  label={tc('post-as')}
                  options={business?.data || []}
                  valueName={'workplace_name'}
                />
              )}
              <CInputWithIcon
                classNameDiv="col-sm-12 col-md-6 form-group"
                name="end_date"
                label={tc('close-post')}
                imageUrl={'/images/icons/calendar.svg'}
                classNameDivIcon="input-icon icon-right"
                type="date"
                max={'2999-12-12'}
              />
            </div>
          </div>
          {infoData ? (
            <div className={`${styles.containerDiv} col-12-sm col-md-4`}>
              <div className={styles.continueButtons}>
                <div className={styles.continueHeader}>
                  <span>{tc('post-status')}</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      {...methods.register('is_visible')}
                    ></input>
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                  <span>{watchmode.is_visible ? 'Visible' : 'No visible'}</span>
                </div>

                <CButton
                  classNameButton={styles.continueButtonPost}
                  loading={methods.formState.isSubmitting}
                  label={tc('save-button')}
                  type="submit"
                />

                <button
                  type="button"
                  className={styles.continueButtonPreview}
                  onClick={() => router.back()}
                >
                  {tc('cancel-edition')}
                </button>

                <button
                  type="button"
                  className={styles.buttonDelete}
                  onClick={handlerClickDelete}
                >
                  {tc('delete-publication')}
                </button>
              </div>
            </div>
          ) : (
            <div className={`${styles.containerDiv} col-12-sm col-md-4`}>
              <div className={styles.containerButtons}>
                <p className={styles.continueHeader}>{tc('post-find')}:</p>
                <CButton
                  classNameButton={styles.continueButtonPost}
                  loading={methods.formState.isSubmitting}
                  label={tc('publish')}
                  type="submit"
                />
                <button
                  className={styles.continueButtonPreview}
                  onClick={handlerClickPreview}
                  type="button"
                >
                  {tc('preview')}
                </button>
                <p>{tc('preview-publication')}</p>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
