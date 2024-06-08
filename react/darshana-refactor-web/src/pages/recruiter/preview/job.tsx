import type { NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import LayoutCore from '@layouts/LayoutCore';
import CardDetail from '../../../components/CardDetail/CardDetail';
import CardDescription from '../../../components/CardDescription/CardDescription';
import i18nConfig from 'src/constants/i18n';

import styles from '../../../styles/pages/_projectDetail.module.scss';
import { useTranslation } from 'next-i18next';

// @ts-ignore
const JobPreview: NextPage = () => {
  const data = localStorage.getItem('jobPreview')!;
  const {
    business_name = ' ',
    contract_type = ' ',
    description = ' ',
    name = ' ',
    min_salary = 0,
    max_salary = 0,
    hourly_wage = 0,
    skills = [],
    summary = ' ',
    country_name = ' ',
  } = JSON.parse(data);
  const router = useRouter();
  const { t: tc } = useTranslation('common');
  const { t: tb } = useTranslation('board');

  return (
    <LayoutCore id="jobDetail" title="Job Preview">
      <div className="container">
        <div className={styles.returnTo}>
          <button
            className="btn btn--return"
            onClick={() => router.push('/opportunities')}
          >
            <Image
              className="icon"
              src="/images/icons/arrow-left.svg"
              alt="back"
              width={16}
              height={16}
            />
            <span>{tc('go-back')}</span>
          </button>
        </div>

        <CardDetail
          type="job"
          title={business_name || ''}
          place={`${country_name}.`}
          typeContract={contract_type || ''}
          min_salary={min_salary}
          max_salary={max_salary}
          hourly_wage={hourly_wage}
          salary={null}
        ></CardDetail>

        <CardDescription
          type="job"
          title={name}
          workplaceName={business_name || ''}
          place={`${country_name}.`}
          summary={summary || ''}
          body={description || ''}
          skills={skills}
        />
      </div>
    </LayoutCore>
  );
};
// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      [
        'common',
        'validation',
        'profile',
        'notifications',
        'board',
        'postulation',
      ],
      i18nConfig
    )),
  },
});
export default JobPreview;
