import React, { FC, useState } from 'react';
import styles from './projectBoard.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { ModalChangeStatusApplication, toastMessage } from '@utils';
import usePostData from '@hooks/usePostData';
import Router from 'next/router';
import withReactContent from 'sweetalert2-react-content';
import FormCounterProposal from '@components/pages/apply/FormCounterProposal';
import Swal from 'sweetalert2';
interface Props {
  cardId: number;
  columnId: number;
  user: any;
  favorite: boolean;
  type: 'job' | 'project';
  translationCommon: any;
  translationBoard: any;
  translationPostulation: any;
  summary: string;
  experience: string;
  acceptPrice?: boolean;
  acceptTime?: boolean;
  weeks?: number;
  days?: number;
  priceProposal: number;
  addFavorite: () => void;
  handleDownloadCV: (url: string) => void;
  closeModal: any;
  updated: any;
  applications: any;
  setDataObject: any;
  idProject: any;
  executeGetById: (url: string) => Promise<void>;
  selectOption: {
    value: number;
    label: string;
  }[];
  fullName: string;
}

const CardModal: FC<Props> = ({
  columnId,
  cardId,
  user,
  favorite,
  type,
  translationCommon,
  translationBoard,
  translationPostulation,
  summary,
  experience,
  acceptPrice,
  acceptTime,
  weeks,
  days,
  priceProposal,
  addFavorite,
  handleDownloadCV,
  closeModal,
  updated,
  idProject,
  executeGetById,
  selectOption,
  fullName,
}) => {
  const { i18n } = useTranslation('board');
  const [favoriteUser, setFavoriteUser] = useState(favorite);
  const { executePost } = usePostData();
  const [columnIdValue, setcolumnIdValue] = useState(columnId);

  const handleAddFavorite = () => {
    addFavorite();
    setFavoriteUser(!favoriteUser);
  };

  const handleChangeStatus = async (destColumnId: string) => {
    const option = selectOption.find(
      (option) => option.value === Number(destColumnId)
    );
    const response = await ModalChangeStatusApplication(
      styles,
      translationCommon,
      fullName,
      option?.label
    );
    if (response) {
      const { hasError, message } = await executePost(
        `/${type}_applications/changeApplicationStatus`,
        {
          application_id: cardId,
          status: parseInt(destColumnId),
          lang: i18n.language || 'es',
        }
      );

      await executeGetById(`${type}s/${idProject}`);
      if (hasError) {
        toastMessage('error', message);
        return;
      }
    }
  };
  const onClickEditPostulation = async () => {
    // e.preventDefault();

    // if (!talentApllications) return;
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      html: (
        <>
          <FormCounterProposal
            weeks={translationCommon('time-weeks', {
              weeks: weeks,
            })}
            days={days}
            price={priceProposal}
            translationCommon={translationCommon}
            translationPostulation={translationPostulation}
            // addProjectUser={addProjectUser}
            // projectApplication={projectApplication}
            user={user}
            // idproject={idproject}
            idPostulation={cardId}
            // lang={lang}
          />
        </>
      ),
      showCloseButton: true,
      showConfirmButton: false,

      confirmButtonText: 'Enviar Propuesta',
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        popup: `modal-popup`,
        htmlContainer: 'html-container',
        confirmButton: 'continueButtonPost',
      },
      buttonsStyling: false,
    });
  };
  return (
    <div className={styles.modalCard}>
      <div className={styles.modalCardHeader}>
        <div className={styles.modalCardInformation}>
          <picture className={styles.profilePicture}>
            <Image
              className={styles.logo}
              src={
                user?.profile_picture_url || '/images/profile-placeholder.png'
              }
              width={64}
              height={64}
              alt="Corporación"
            />
          </picture>
          <div className={styles.headerTitle}>
            <div className={styles.headerTitleName}>
              <h3 className={`text-16 ${styles.title}`}>
                <b>{`${user?.person?.name} ${user?.person?.last_name}`}</b>
              </h3>
              <picture onClick={handleAddFavorite}>
                <Image
                  className={styles.logo}
                  src={
                    favoriteUser
                      ? '/images/icons/favorite--active.svg'
                      : '/images/icons/favorite.svg'
                  }
                  width={24}
                  height={24}
                  alt="Corporación"
                />
              </picture>
            </div>
            <p className={`text-14 c-2 ${styles.profession}`}>
              {user?.subtitle}
            </p>
          </div>
        </div>
        <div className={styles.modalCardActions}>
          <a
            // href={`/profile/${user?.id!}`}
            onClick={(e) => {
              e.preventDefault();
              Router.push(`/profile/${user?.id!}`);
              // setTimeout(() => {
              //   closeModal.close();
              // }, 5000);
            }}
          >
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
          <picture onClick={() => Router.push('/message/' + user?.user_uuid)}>
            <Image
              className={styles.logo}
              src="/images/icons/message.svg"
              width={24}
              height={24}
              alt="Corporación"
            />
          </picture>
          {type === 'job' && user?.url_cv && (
            <picture onClick={() => handleDownloadCV(user?.url_cv)}>
              <Image
                className={styles.logo}
                src="/images/icons/download.svg"
                width={24}
                height={24}
                alt="Corporación"
              />
            </picture>
          )}
          <select
            className=" form-select btn btn--stroke"
            value={columnIdValue}
            onChange={(e) => {
              setcolumnIdValue(parseInt(e.target.value, 10));
              handleChangeStatus(e.target.value);
            }}
          >
            {selectOption.map((select) => (
              <option value={select.value} key={select.value}>
                {select.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.modalCardBody}>
        {updated && (
          <p className={styles.updatedApplication}>
            {translationBoard('proposal-updated')}
          </p>
        )}
        {type === 'project' && (
          <div className={styles.cardRow}>
            {priceProposal && (
              <div className={styles.cardContainer}>
                <h1>
                  <strong>{translationCommon('proposal-gross')}:</strong>
                </h1>
                <p className="text-16 c-brand-1">$ {priceProposal}</p>
              </div>
            )}
            {weeks && (
              <div className={styles.cardContainer}>
                <h1>
                  <strong>{translationCommon('proposal-week')}:</strong>
                </h1>
                <p>{weeks} semanas</p>
              </div>
            )}
          </div>
        )}
        <div className={``}>
          <h1 className="text-16 c-1">
            <strong>
              {type === 'job'
                ? translationCommon('summary')
                : translationCommon('proposal')}
            </strong>
          </h1>
          <p>{summary}</p>
          <h1 className="text-16 c-1">
            <strong>
              {type === 'job'
                ? translationCommon('job-experience')
                : translationCommon('follow-up-proposal')}
            </strong>
          </h1>
          <p>{experience}</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          {type === 'project' && (
            <button
              className="btn btn--stroke"
              onClick={onClickEditPostulation}
            >
              {translationBoard('propose-remuneration')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
