import React, { FC, useEffect, useState } from 'react';
import Board from './Board';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import usePostData from '@hooks/usePostData';
import { toastMessage } from '@utils';
import { useRouter } from 'next/router';
import useGetData from '@hooks/useGetData';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import styles from '@components/ProjectBoard/projectBoard.module.scss';

interface Props {
  type: 'job' | 'project';
  beginProject?: (status: boolean) => void;
}

interface Column {
  id?: number;
  title?: string;
  icon?: string;
  cardIds?: number[];
}

const ProjectBoardWrapper: FC<Props> = ({ type, beginProject = () => {} }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation('board');
  const { executePost } = usePostData();
  const { id: idProject } = router.query as { id: string };
  const { executeGetById, isLoading, dataObject, setDataObject } = useGetData();
  const [cards, setCards] = useState([]);
  const [columns, setColumns] = useState<Array<Column>>([]);

  useEffect(() => {
    if (idProject) {
      executeGetById(`${type}s/${idProject}`);
    }
  }, [idProject]);

  useEffect(() => {
    if (dataObject?.applications) {
      handleInitialData(dataObject?.applications);
    }
  }, [dataObject]);

  useEffect(() => {
    if (columns.length) {
      const hiredTalents = columns.find((item) => item.id === 2);
      // @ts-ignore
      if (hiredTalents.cardIds.length > 0) {
        beginProject(true);
      } else {
        beginProject(false);
      }
    }
  }, [columns]);

  const handleInitialData = (applicationList: any) => {
    setCards(applicationList);
    const initialColumns = [
      {
        id: 0,
        title: t('postulates'),
        icon: '/images/icons/avatar.svg',
      },
      {
        id: 1,
        title: t('selected'),
        icon: '/images/icons/clipboard.svg',
      },
      {
        id: 2,
        title: t('hired'),
        icon: '/images/icons/badge.svg',
      },
    ].map((column, i) => ({
      ...column,
      cardIds:
        type === 'project'
          ? applicationList
              .filter((item: any) => item.accepted === column.id)
              .map((application: any) => application.id)
          : applicationList
              .filter((item: any) => item.selected === column.id)
              .map((application: any) => application.id),
    }));
    setColumns(initialColumns);
  };

  const moveCard = (cardId: any, destColumnId: any, index: any) => {
    const newColumns = columns.map((column: any) => {
      return {
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids: number[]) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids: number[]) => ids.filter((id: number) => id !== cardId)
        )(column.cardIds),
      };
    });
    setColumns(newColumns);
  };

  const dropCard = (cardId: number, destColumnId: number, index: any) => {
    changeStatus(cardId, destColumnId);
  };

  const changeStatus = async (cardId: number, destColumnId: number) => {
    const { hasError, message, data } = await executePost(
      `/${type}_applications/changeApplicationStatus`,
      {
        application_id: cardId,
        status: destColumnId,
        lang: i18n.language || 'es',
      }
    );
    if (hasError) {
      toastMessage('error', message);
      return;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={`${styles.projectBoardContainer}`}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={nanoid()} height={500} width={414} />
          ))}
        </div>
      ) : (
        <Board
          cards={cards}
          columns={columns}
          moveCard={moveCard}
          dropCard={dropCard}
          type={type}
          dataObject={dataObject}
          setDataObject={setDataObject}
          executeGetById={executeGetById}
        />
      )}
    </>
  );
};

export default ProjectBoardWrapper;
