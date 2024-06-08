import React, { useEffect, useState } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import _ from 'lodash';
import styles from './projectBoard.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { darshanaApi } from '@api/darshanaApi';
import {
  ModalChangeStatusApplication,
  toastMessage,
  typeFavorites,
} from '@utils';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CardModal from './CardModal';
import { useRouter } from 'next/router';
import usePostData from '@hooks/usePostData';
import { useGetData } from '@hooks';
import { BeatLoader, ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import 'animate.css';

export const Card = (props: any) => {
  const { t, i18n } = useTranslation('board');
  const { t: tv } = useTranslation('validation');
  const { t: tc } = useTranslation('common');
  const { t: tp } = useTranslation('postulation');
  const { executeGetById, isLoading, dataObject } = useGetData();

  const [isLoadingChangeCard, setIsLoadingChangeCard] = useState(false);
  const [favorite, setFavorite] = useState(props?.user?.favorite === true);
  const [columnIdValue, setcolumnIdValue] = useState(props?.columnId);
  const router = useRouter();
  const { id: idProject } = router.query as { id: string };
  const MySwal = withReactContent(Swal);
  const { executePost } = usePostData();
  const override = css`
    display: block;
    margin-top: -16px;
  `;
  const dataSelect = [
    {
      value: 0,
      label: t('postulates'),
    },
    {
      value: 1,
      label: t('selected'),
    },
    {
      value: 2,
      label: t('hired'),
    },
  ];
  const selectOption = dataSelect.filter(
    (select) => select.value >= columnIdValue
  );
  const addFavorite = async () => {
    const { data } = await darshanaApi.post(
      `/users/favorites/toggle/${props?.user?.user_uuid}`,
      { type: typeFavorites.talent }
    );
    const { status } = data;
    if (!status) {
      toastMessage('error', `${tv('invalid-favorites')}`);
      return;
    }
    setFavorite(!favorite);
    return;
  };
  const handleDownloadCV = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url;
    link.click();
  };
  const handleChangeStatus = async (destColumnId: string) => {
    setIsLoadingChangeCard(true);
    const option = selectOption.find(
      (option) => option.value === Number(destColumnId)
    );
    const response = await ModalChangeStatusApplication(
      styles,
      tc,
      `${props?.user?.person?.name} ${props?.user?.person?.last_name}`,
      option?.label
    );
    if (response) {
      const { hasError, message, data } = await executePost(
        `/${props?.type}_applications/changeApplicationStatus`,
        {
          application_id: props?.id,
          status: parseInt(destColumnId),
          lang: i18n.language || 'es',
        }
      );
      await executeGetById(`${props?.type}s/${idProject}`);
      if (hasError) {
        toastMessage('error', message);
        setIsLoadingChangeCard(false);
        return;
      }
      setcolumnIdValue(parseInt(destColumnId, 10));
    }
    setIsLoadingChangeCard(false);
  };
  const handleSeeResume = async () => {
    const responseModal = await MySwal.fire({
      html: (
        <CardModal
          columnId={props?.columnId}
          cardId={props?.id}
          user={props?.user}
          addFavorite={addFavorite}
          favorite={favorite}
          type={props?.type}
          handleDownloadCV={handleDownloadCV}
          summary={props?.summary}
          experience={props?.experience}
          translationCommon={tc}
          translationBoard={t}
          translationPostulation={tp}
          acceptPrice={props?.accept_price}
          acceptTime={props?.accept_time}
          weeks={props?.weeks}
          days={props?.days}
          priceProposal={props?.priceProposal}
          closeModal={MySwal}
          updated={props?.updated}
          applications={props?.dataObject}
          setDataObject={props?.setDataObject}
          idProject={idProject}
          executeGetById={executeGetById}
          selectOption={selectOption}
          fullName={`${props?.user?.person?.name} ${props?.user?.person?.last_name}`}
        />
      ),
      showCloseButton: true,
      showConfirmButton: false,
      confirmButtonText: '',
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        popup: `modal-popup-resumen-proposal`,
        htmlContainer: 'html-container-card',
        confirmButton: 'continueButtonPost',
        closeButton: 'close-button',
      },
      buttonsStyling: false,
      willClose: async () => {
        if (!props?.updated) return;
        const updatedPatch = await darshanaApi.patch(
          '/project_applications/updated',
          {
            id: props?.id,
            updated: false,
          }
        );
        const updateProject = props?.dataObject.applications.map(
          (application: any) => {
            if (application.id === props?.id) {
              return { ...updatedPatch.data.data, user: application.user };
            }
            return application;
          }
        );
        props?.setDataObject({
          ...props?.dataObject,
          applications: updateProject,
        });
      },
      didDestroy: async () => {
        if (!props?.updated) return;
        const updatedPatch = await darshanaApi.patch(
          '/project_applications/updated',
          {
            id: props?.id,
            updated: false,
          }
        );
        const updateProject = props?.dataObject.applications.map(
          (application: any) => {
            if (application.id === props?.id) {
              return { ...updatedPatch.data.data, user: application.user };
            }
            return application;
          }
        );
        props?.setDataObject({
          ...props?.dataObject,
          applications: updateProject,
        });
      },
    });

    // if (responseModal.isDismissed) {
    //   const data = `${location.pathname}?tab=talent`;
    //   window.location.href = data;
    // }
  };
  useEffect(() => {
    if (dataObject?.applications) {
      props.setDataObject(dataObject);
    }
  }, [dataObject]);
  return (
    <div
      className={`card
              ${styles.boardCard}
              ${props.isDragging ? styles.cardDragging : ''}
              ${props.isSpacer ? styles.cardSpacer : ''}
              animate__animated animate__fadeIn
            `}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerInformation}>
          <picture>
            <Image
              className={styles.logo}
              src={
                props?.user?.profile_picture_url ||
                '/images/profile-placeholder.png'
              }
              width={48}
              height={48}
              alt="Corporación"
            />
          </picture>
          <div className={styles.headerTitle}>
            <h3 className={`text-16 ${styles.title}`}>
              <b>{`${props?.user?.person?.name} ${props?.user?.person?.last_name}`}</b>
            </h3>
            <p className={`text-14 c-2 ${styles.profession}`}>
              {props?.user?.subtitle}
            </p>
          </div>
        </div>
        <div className={`flex flex-y-center ${styles.headerIcons}`}>
          <picture className={`${styles.tooltip} ${styles.bottom}`}>
            <Image
              className={styles.logo}
              src={
                props?.updated
                  ? '/images/icons/coin-dolar-active.svg'
                  : '/images/icons/coin-dolar.svg'
              }
              width={30}
              height={30}
              alt="Corporación"
            />
            {props?.updated && (
              <span className={`${styles.tiptext}`}>
                {tc('message-tooltip')}
              </span>
            )}
          </picture>
          <picture onClick={addFavorite}>
            <Image
              className={styles.logo}
              src={
                favorite
                  ? '/images/icons/favorite--active.svg'
                  : '/images/icons/favorite.svg'
              }
              width={24}
              height={24}
              alt="Corporación"
            />
          </picture>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.footerIcons}>
          {props?.algorandTransaction && (
            <a
              href={`${process.env.NEXT_PUBLIC_ALGORAND_EXPLORER}${props?.algorandTransaction}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={'/images/icon-algorant.png'}
                width={24}
                height={24}
                alt="icon algorand"
              />
            </a>
          )}
          {props?.nearTransaction && (
            <a
              href={`${process.env.NEXT_PUBLIC_NEAR_EXPLORER}${props?.nearTransaction}`}
              target="_blank"
              rel="noopener noreferrer"
              /* style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }} */
            >
              <Image
                src={'/images/icon-NearProtocol.png'}
                width={24}
                height={24}
                alt="icon near"
              />
            </a>
          )}
          <Link href={`/profile/${props?.user?.id}`}>
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

          <picture
            onClick={() => router.push('/message/' + props?.user?.user_uuid)}
          >
            <Image
              className={styles.logo}
              src="/images/icons/message.svg"
              width={24}
              height={24}
              alt="Corporación"
            />
          </picture>

          {props?.type === 'job' && props?.user?.url_cv && (
            <picture onClick={() => handleDownloadCV(props?.user?.url_cv)}>
              <Image
                className={styles.logo}
                src="/images/icons/download.svg"
                width={24}
                height={24}
                alt="Corporación"
              />
            </picture>
          )}
        </div>
        <div className={styles.footerLink} onClick={handleSeeResume}>
          <picture>
            <Image
              src={'/images/icons/resume.svg'}
              width={24}
              height={24}
              alt="Darshana"
            />
          </picture>
          <h1 className="text-16 cursor-pointer">
            <strong>{t('see-resume')}</strong>
          </h1>
        </div>
        <select
          className=" form-select btn btn--stroke save-button"
          value={columnIdValue}
          onChange={(e) => {
            handleChangeStatus(e.target.value);
          }}
        >
          {selectOption.map((select) => (
            <option value={select.value} key={select.value}>
              {select.label}
            </option>
          ))}
        </select>
        {isLoadingChangeCard && (
          <ClipLoader color="#19a79b" loading={true} css={override} size={30} />
        )}
      </div>
    </div>
  );
};

{
}
export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props: any, monitor) {
        const { columnId, columnIndex } = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          props.moveCard(draggingItem.id, columnId, columnIndex);
        }
      },
      drop(props: any, monitor) {
        const { columnId, columnIndex } = props;
        const draggingItem = monitor.getItem();
        props.dropCard(draggingItem.id, columnId, columnIndex);
      },
    },
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    'Card',
    {
      beginDrag(props: any) {
        return { id: props.id };
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);
