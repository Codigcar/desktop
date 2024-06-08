import { CButton } from '@components/Atoms';
import React, { Children, FC, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './ratingModal.module.scss';
import { CTextArea } from '../Atoms/CTextArea/CTextArea';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { darshanaApi } from '../../api/darshanaApi';
import { ReactSweetAlert } from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { TFunction, useTranslation } from 'next-i18next';
import { ProjectTalentQualifications } from '@interfaces/ProjectRating';
import { useRouter } from 'next/router';
import Image from 'next/image';
interface ComponentProps {
  index?: number;
  total: number;
  talentApplication: any;
  MySwal: typeof Swal & ReactSweetAlert;
  translationCommon: any;
  isEdit?:boolean;
  projectTalentQualification?:ProjectTalentQualifications | null;
  executeGet?:any
}

const RatingModal: FC<ComponentProps> = ({
  index,
  total,
  talentApplication,
  MySwal,
  translationCommon,
  isEdit=false,
  projectTalentQualification,
  executeGet
}) => {
  const methodsFormRating = useForm<any>({
    mode: 'onChange',
    // resolver: useYupValidationResolver(validationSchemaPostulation),
    defaultValues: {
      score:  projectTalentQualification?.score || 0,
      comment:  projectTalentQualification?.comment || '',
    },
  });
  const secondExample = {
    count: 5,
    value: projectTalentQualification?.score ||  2,
    a11y: true,
    isHalf: true,
    emptyIcon: <img src="/images/repose@3x.png" width={60} />,
    halfIcon: <img src="/images/Midle@3x.png" width={60} />,
    filledIcon: <img src="/images/Active@3x.png" width={60} />,
    onChange: (newValue: number) => {
      methodsFormRating.setValue('score', newValue);
    },
    classNames: `${styles.reactStar}`,
  };
  const onSubmit = async (data: any) => {
    try {
      if(isEdit){
         await darshanaApi.patch(`/projects/${talentApplication?.project_id}/talent-score`, {
          user_uuid: talentApplication?.user_uuid,
          ...data,
        });
      }else{
         await darshanaApi.post(`/projects/${talentApplication?.project_id}/talent-score`, {
          user_uuid: talentApplication?.user_uuid,
          ...data,
        });
      }
      if(executeGet){
        executeGet()
      }
      MySwal.clickConfirm();
    } catch (error) {
      throw error;
    }
  };
  return (
    <FormProvider {...methodsFormRating}>
      <form
        className="flex flex-direction-col flex-y-center"
        onSubmit={methodsFormRating.handleSubmit(onSubmit)}
      >
        {index!==undefined && <p className={styles.title}>
          {translationCommon('talent')} {`${(index || 0) + 1}/${total}`}
        </p>}
        <h2 className={styles.fullName}>
          {projectTalentQualification? translationCommon("edit-calification",{talent:talentApplication?.user?.full_name}) :talentApplication?.user?.full_name}
        </h2>

        <p className={styles.subtitle}>{translationCommon('rate-talent')}</p>
        <ReactStars {...secondExample} />
        <CTextArea
          classNameDiv={`form-group ${styles.textAreaDiv}`}
          classNameTextArea={styles.textArea}
          classNameLabel={styles.textAreaLabel}
          name="comment"
          label={translationCommon('comment')}
          placeholder={'write-here'}
        />
        <p className={styles.warning}>
          <Image src="/images/icons/Alertdark.svg" width={16} height={16}/>
          {translationCommon('warning-rate')}
          </p>
        <div
          className={`flex flex-space-around w-100 flex-wrap ${styles.containerButtom}`}
        >
         {index!==undefined && <CButton
            classNameButton={styles.buttonReturn}
            label={translationCommon('later-rating')}
            type="button"
            onClick={()=>MySwal.close()}
          />}

          <CButton
            classNameButton={styles.continueButtonPost}
            loading={methodsFormRating.formState.isSubmitting}
            label={translationCommon('modal-qualify')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default RatingModal;
