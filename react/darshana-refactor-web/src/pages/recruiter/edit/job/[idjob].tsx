import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutCore from '@layouts/LayoutCore';
import { Form } from '@components';
import i18nConfig from 'src/constants/i18n';
import { DataJob, getJobByIdResponse } from '@api/index';

import styles from '@styles/pages/_addProject.module.scss';
import { useTranslation } from 'next-i18next';

const EditJob: NextPage = ({ job }: any) => {
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');

  const router = useRouter();
  // const {name,salary,contract_type,contract_time,work_modality,country,summary,description,skills} = job as DataJob;
  const handlerClickReturn = (e: { preventDefault: any }) => {
    e.preventDefault();
    Swal.fire({
      iconHtml: '<Image src="/images/icons/Alert.svg" alt="Alert icon"/>',
      title: `<h1 class=${styles.modalTitle}>${tv('new-job-modal-title')}</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tv(
        'new-job-modal-message'
      )}</h2>`,
      confirmButtonText: tc('exit'),
      showCancelButton: true,
      cancelButtonText: tc('back'),
      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `${styles.buttonQuit}`,
        cancelButton: `${styles.buttonReturn}`,
        actions: `${styles.ActionContainer}`,
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.back();
      }
    });
  };
  return (
    <LayoutCore id="addJob" title="Edit Job">
      <div className={styles.container} style={{ marginTop: 20 }}>
        <h1 className={`${styles.title} col-sm-12`}>{tc('edit-post')}</h1>
        {/* <p className={`${styles.description} col-sm-12`}>
          Nulla ullamcorper mattis augue, at finibus mi. Maecenas at diam metus.
          Etiam sit amet diam scelerisque.
        </p> */}
        <Form typePost="job" infoData={job} />
      </div>
    </LayoutCore>
  );
};
// @ts-ignore
export const getServerSidePaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getServerSideProps = async ({ params, locale }: any) => {
  const { idjob } = params as { idjob: string };
  const data = await getJobByIdResponse(idjob);
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'validation', 'notifications'],
        i18nConfig
      )),
      job: data.data,
    },
  };
};
export default EditJob;
