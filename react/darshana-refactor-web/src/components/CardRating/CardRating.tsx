// @ts-nocheck

// @ts-ignore

/* tslint:disable */
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './cardRating.module.scss';
import { AuthContext } from '@contexts/auth';
import { darshanaApi } from '@api/darshanaApi';
import { toastMessage, typeFavorites } from '@utils';
import { IProjectTalentQualification } from '../../interfaces/ProjectRating';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useFetchSWR } from '@hooks';
import ProfileInviteModal from '@components/pages/profile/ProfileInviteModal';
import RatingModal from '@components/RatingModal/RatingModal';

interface Props {
  fullName?: string;
  subtitle?: string | null;
  comment?: string;
  ProjectTitle?: string;
  idUser?: number;
  projectId?: number;
  description?: string;
  idJob?: string;
  image?: string;
  isFavorite?: boolean;
  projectTalentQualification: IProjectTalentQualification | null;
  user_detail?: any;
  executeGet: any;
}

const defaultProps = {
  fullName: '',
  comment: '',
  ProjectTitle: '',
  showVisible: false,
  showFavorite: false,
  image: '/images/profile-placeholder.png',
};

const CardRating: FC<Props> = ({
  fullName,
  comment,
  ProjectTitle,
  idUser,
  projectId,
  description,
  subtitle,
  idJob,
  image,
  isFavorite,
  projectTalentQualification,
  user_detail,
  executeGet
}) => {
  const { user } = useContext(AuthContext);
  const { t: tc } = useTranslation('common');
  // const [link, setLink] = useState(`/talent/job/${idJob}`);
  const [isOpen, setIsOpen] = useState(false);
  const [lengthProject, setLengthProject] = useState(0);
  const { data: dataProjects, isLoading: isLoadingProjects } = useFetchSWR(
    `projects?user_uuid=${user?.user_uuid}&project_status_id=1&length=${lengthProject}`
  );
  const MySwal = withReactContent(Swal);
  const handleCloseModal = () => {
    MySwal.close();
  };
  const editRating = async () => {
    const MySwal = withReactContent(Swal);
    const talentApplication={
      user_uuid:user_detail.user_uuid,
      project_id:projectId,
      user:{
        full_name: user_detail.full_name
      }
    }
    const response =await MySwal.fire({
      html: (
        <RatingModal
          total={0}
          isEdit={projectTalentQualification? true:false}
          talentApplication={talentApplication}
          MySwal={MySwal}
          translationCommon={tc}
          projectTalentQualification={projectTalentQualification}
          executeGet={executeGet}
        />
      ),
      showCloseButton: true,
      showConfirmButton: false,
      background: '#FAFAFA',
      buttonsStyling: false,
    }).then((result) => {

      return result;
    });
    if(response.isConfirmed && !projectTalentQualification){
      Swal.fire({
        title: `<h1 class=${styles.modalTitle}>${tc(
          'qualification-successful'
        )}</h1>`,
        html: ` <h2 class=${styles.modalDescription}>${tc(
          'quealification-edit-pending'
        )}</h2>`,
        confirmButtonText: tc('understand'),
        showCancelButton: false,

        background: '#FAFAFA',
        customClass: {
          popup: `${styles.modalContainer}`,
          confirmButton: `${styles.continueButtonPost} `,
          actions: `${styles.ActionContainerQualification}`,
        },
        buttonsStyling: false,
      });
    }

  };
  useEffect(() => {
    if (dataProjects?.meta?.total) {
      setLengthProject(dataProjects?.meta?.total);
    }
  }, [dataProjects?.meta?.total]);
  return (
    <>
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <picture>
            <Image
              className={styles.logoCorp}
              src={
                user_detail.profile_picture_url ||
                'https://cdn.whiz.pe/api/v2/image/e5b8f779-06a6-45a7-b121-88e62182b8f3/png'
              }
              width={64}
              height={64}
              alt="Corporación"
            />
          </picture>

          <div className={styles.HeaderInformation}>
            <h3 className={`text-20 ${styles.title}`}>
              <b>{fullName}</b>
            </h3>
            <p className={styles.company}>{subtitle}</p>
          </div>

          <ul className={`card--options ${styles.options}`}>
            <li className={`visible  ${styles.visible}`}>
              <button className="icon" onClick={()=>editRating()}>
                <Image src={'/images/icons/edit.svg'} width={40} height={40} />
              </button>
            </li>
            <li className="favorite">
              <button
                type="button"
                // className={`${
                //   true ? 'icon icon--favorite-active' : 'icon icon--favorite'
                // }`}
                className={styles.edit}
                onClick={(e: any) => {
                  e.preventDefault();
                  editRating();
                  // addFavorite();
                }}
              >
                {projectTalentQualification === null ? (
                  <>
                    <p>{tc("pending")} </p>
                    <Image
                      src={'/images/icons/Line.svg'}
                      width={18}
                      height={18}
                    />
                  </>
                ) : (
                  <>

                    <p>
                      {parseFloat(projectTalentQualification?.score || 0).toFixed(1)}
                    </p>
                    <Image
                      src={'/images/icons/Active.svg'}
                      width={18}
                      height={18}
                    />
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.cardBody}>
          <p className={`flex flex-y-center ${styles.project}`}>
            <Image
              src={'/images/icons/projectsRating.svg'}
              width={20}
              height={20}
            />
            {tc("project")}: {ProjectTitle}
          </p>
          <p>{comment}</p>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.footerLink} /* onClick={handleSeeResume} */>
            <picture>
              <Image
                src={'/images/icons/resume.svg'}
                width={24}
                height={24}
                alt="Darshana"
              />
            </picture>
            <h1
              className="text-16 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <strong>{tc("invite-to-project")}</strong>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href={`/profile/${idUser}`}>
              <a>
                <picture>
                  <Image
                    className={styles.logo}
                    src="/images/icons/user.svg"
                    width={24}
                    height={24}
                    alt="Corporación"
                  />
                </picture>
              </a>
            </Link>
            {/* <picture onClick={() => handleDownloadCV(props?.user?.url_cv)}
            >
              <Image
                className={styles.logo}
                src="/images/icons/download.svg"
                width={20}
                height={20}
                alt="Corporación"
              />
            </picture> */}
          </div>
        </div>
      </div>
      {isOpen && (
        <ProfileInviteModal
          translationCommon={tc}
          user={user}
          closeModal={handleCloseModal}
          inviteUser={user_detail}
          typeInvitation={'projects'}
          isLoading={isLoadingProjects}
          data={dataProjects}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

CardRating.defaultProps = defaultProps;

export default CardRating;
