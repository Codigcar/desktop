import React, { useState } from 'react';
import Image from 'next/image';
import styles from './tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}
export const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className={`${styles.tooltip} ${styles.bottom}`}>
      {children}
      <div className={`${styles.tiptext}`}>
        <div className="flex-y-center ">
          <div className="c-1 text-by"> {text} by</div>
          <Image
            src={'/images/logo.svg'}
            width={90}
            height={25}
            alt="Darshana"
            style={{ marginTop: '1px' }}
          />
        </div>
      </div>
    </div>
  );
};
