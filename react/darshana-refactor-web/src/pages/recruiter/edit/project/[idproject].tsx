import type { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Swal from 'sweetalert2';

import i18nConfig from 'src/constants/i18n';
import LayoutCore from '@layouts/LayoutCore';
import { Form } from '@components';

import styles from '@styles/pages/_addProject.module.scss';
import { useTranslation } from 'next-i18next';
import { getProjectByIdResponse } from '@api/index';

const EditProject: NextPage = ({ project }: any) => {
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const router = useRouter();

  const handlerClickReturn = (e: { preventDefault: any }) => {
    e.preventDefault();
    Swal.fire({
      iconHtml:
        '<Image src="/images/icons/Alert.svg" alt="Alert Icon" width={33} height={34}/>',
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
        confirmButton: `${styles.buttonQuit} `,
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
    <LayoutCore id="editProject" title="Edit Project">
      <div className={styles.container} style={{ marginTop: 20 }}>
        <h1 className={`${styles.title} col-sm-12`}>{tc('edit-post')}</h1>
        {/*
                <p className={`${styles.description} col-sm-12`}>
          Nulla ullamcorper mattis augue, at finibus mi. Maecenas at diam metus.
          Etiam sit amet diam scelerisque.
        </p>
        */}
        <Form typePost="project" infoData={project} />
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
  const { idproject } = params as { idproject: string };
  const data = await getProjectByIdResponse(idproject);
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
        ['common', 'profile', 'validation', 'notifications'],
        i18nConfig
      )),
      project: data.data,
    },
  };
};

export default EditProject;
