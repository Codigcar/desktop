import { DropFile } from '@components';
import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import styles from './formApply.module.scss';
import { useTranslation } from 'next-i18next';
import { CButton } from '@components/Atoms';
import { Interweave } from 'interweave';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { postJob } from '@hooks';
import { OwnerProject } from '@api/getProjectDetailById';
import * as yup from 'yup';
import { useYupValidationResolver } from '@utils';
import { IJob } from '@interfaces/jobs';
import { KeyedMutator } from 'swr';
import { Job } from '@interfaces/user';
import Swal from 'sweetalert2';
interface ComponentProps {
  position: string | undefined;
  description: string | undefined;
  workplaceName: string;
  place: string;
  translationCommon: any;
  translationPostulation: any;
  owner?: OwnerProject;
  idjob: string;
  lang: string;
  job: IJob | undefined;
  mutate: KeyedMutator<IJob>;
  addJobUser: (jobData: Job) => void;
}
const FormApplyJob: FC<ComponentProps> = ({
  position,
  workplaceName,
  description,
  place,
  translationCommon,
  translationPostulation,
  owner,
  idjob,
  lang,
  job,
  mutate,
  addJobUser,
}) => {
  const { t: tv } = useTranslation('validation');
  // const { register, formState } = useFormContext();
  const onSubmitFormJob = async (data: any) => {
    const { summary, experience, cv, urlFile } = data;

    const resp = await postJob(
      idjob,
      summary,
      experience,
      cv[0],
      lang,
      urlFile,
    );
    if (!resp.hasError) {
      const updatedJobs = { ...job };
      updatedJobs.data?.applications.push(resp.data);
      mutate(updatedJobs);
      Swal.fire({
        iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
        title: `<h1 > ${translationPostulation(
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
      const { job: jobData, ...otherDataJob } = resp.data!;
      const { country, business, owner, ...otherData } = jobData;
      const jobUpdate = {
        ...otherData,
        application: otherDataJob,
      };
      addJobUser(jobUpdate);
      // setIsAplicate(true);
    }
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
    resolver: useYupValidationResolver(validationSchemaPostulation),
    defaultValues: {
      summary: '',
      experience: '',
      cv: [],
    },
  });
  return (
    <FormProvider {...methodsFormJob}>
      <form
        className={`${styles.form}`}
        onSubmit={methodsFormJob.handleSubmit(onSubmitFormJob)}
      >
        <div className={styles.containerDetail}>
          <div className={styles.rowDetail}>
            <div className={styles.header}>
              <div className={styles.cardImg}>
                <Image
                  className={styles.img}
                  src={
                    owner?.profile_picture_url ||
                    '/images/profile-placeholder.png'
                  }
                  width={64}
                  height={64}
                  alt="Corporación"
                />
              </div>
              <div>
                <div className={styles.titleDetail}>{position}</div>
                <div className={styles.SubHeadDetail}>
                  {workplaceName} - {place}
                </div>
              </div>
            </div>
          </div>
          <h2 className={styles.subTitleDetail}>
            {translationCommon('job-description')}
          </h2>
          <p>
            <Interweave content={description} className={styles.ProseMirror} />
          </p>
          <div className="rectangleDivider"></div>
          <div className="form-group">
            <CTextArea
              classNameDiv="form-group"
              name="summary"
              label={translationCommon('summary')}
              placeholder={translationCommon('write-here')}
            />
            <p>{translationCommon('max-characters')}</p>
          </div>
          <div className="form-group">
            <CTextArea
              classNameDiv="form-group"
              name="experience"
              label={translationCommon('job-experience')}
              placeholder={translationCommon('write-here')}
            />
            <p>{translationCommon('max-characters')}</p>
          </div>
          <div className="form-group">
            <label className={styles.subTitleDetail}>
              {translationCommon('my-cv')}
            </label>
            <DropFile
              acceptTypeFiles={{
                'application/pdf': ['.pdf'],
              }}
              name="cv"
              type="file"
              maxSize={3150000} //3Mb (megabyte)
              translationCommon={translationCommon}
            />
          </div>
          <CButton
            classNameButton={styles.continueButtonPost}
            loading={methodsFormJob.formState.isSubmitting}
            label={translationPostulation('postulate')}
            type="submit"
          />
          {/* <button type="submit" className='continueButtonPost'>
          {translationPostulation('postulate')}
        </button> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default FormApplyJob;
