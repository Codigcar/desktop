import React, { FC, useContext } from 'react';
import { CardJob } from '@components';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { getTimeAgo } from '@utils';
import { useTranslation } from 'next-i18next';

interface Props {
  jobs: any;
  isLoading: boolean;
  emptyJobsMessage: string;
}

const ListJob: FC<Props> = ({ jobs, isLoading, emptyJobsMessage = '' }) => {
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  return (
    <div className="content-cards">
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={nanoid()} height={198} width={350} />
          ))}
        </>
      ) : (
        <>
          {jobs?.length > 0 ? (
            jobs &&
            jobs.map((job: any) => (
              <CardJob
                key={nanoid()}
                idJob={job?.id}
                title={job?.name}
                company={job?.business?.workplace?.workplace_name}
                description={job?.summary}
                time={getTimeAgo(new Date(), job?.created_at, lang)}
                location={job?.country?.name}
                image={job?.owner?.profile_picture_url}
                showFavorite={true}
                isFavorite={job?.favorite}
                ownerUuid={job?.owner?.user_uuid}
              />
            ))
          ) : (
            <div>{emptyJobsMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

export default ListJob;
