import { FC } from 'react';
import Image from 'next/image';

import { RenderIf } from '@utils';

import styles from './tag.module.scss';

interface IProps {
  name: string;
  background?: string;
  close?: boolean;
}

const Tag: FC<IProps> = ({ name, background, close }) => {
  return (
    <span
      className={`tag ${styles.tag}`}
      style={{ ['--bg-tag' as string]: background }}
    >
      {name}

      <RenderIf condition={close}>
        <button className={`tag--close ${styles['tag--close']}`} type="button">
          <Image
            src="/images/icons/close.svg"
            width={16}
            height={16}
            alt="Cerrar"
          />
        </button>
      </RenderIf>
    </span>
  );
};

export default Tag;
