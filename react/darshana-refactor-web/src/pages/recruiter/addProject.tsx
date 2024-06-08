import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Swal from 'sweetalert2';

import i18nConfig from 'src/constants/i18n';
import LayoutCore from '@layouts/LayoutCore';
import { Form } from '@components';

import styles from '../../styles/pages/_addProject.module.scss';
import { useTranslation } from 'next-i18next';

const AddProject: NextPage = () => {
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
    <LayoutCore id="addProject" title="Create Project">
      <div className={styles.container}>
        <div className={styles.returnTo}>
          <button className="btn btn--return" onClick={handlerClickReturn}>
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

        <h1 className={`${styles.title} text-40 title`}>
          <strong className="black">{tc('new-project')}</strong>
        </h1>

        {/* <p className={`${styles.description} col-sm-12`}>
          Nulla ullamcorper mattis augue, at finibus mi. Maecenas at diam metus.
          Etiam sit amet diam scelerisque.
        </p> */}
        <Form typePost="project" />
      </div>
    </LayoutCore>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'validation', 'profile', 'notifications','postulation'],
      i18nConfig
    )),
  },
});

export default AddProject;
