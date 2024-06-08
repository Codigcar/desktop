import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { IMeta } from '@hooks/useGetData';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import Pagination from 'react-responsive-pagination';

import styles from './Pagination.module.scss';

type Props = {
  isLoading: boolean;
  meta: IMeta;
  currentPage: number;
  setCurrentPage: (data: number) => void;
};

const CPagination = ({
  meta,
  isLoading,
  currentPage,
  setCurrentPage,
}: Props) => {
  return (
    <Pagination
      current={currentPage}
      total={meta?.last_page! || 1}
      onPageChange={setCurrentPage}
      previousLabel={' '}
      nextLabel={' '}
    />
  );
};

CPagination.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    last_page: PropTypes.number,
  }),
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default CPagination;
