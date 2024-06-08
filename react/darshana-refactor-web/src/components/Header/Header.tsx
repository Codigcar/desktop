import { FC, useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useMediaQuery } from '@hooks';
import NavMenu from './NavMenu';

import styles from './header.module.scss';

interface IProps {
  headerType: string;
  logoJobBoard: string | undefined;
  domain: string | undefined;
}

const Header: FC<IProps> = ({ headerType, logoJobBoard, domain }) => {
  const media767 = useMediaQuery('max-width', '767px');
  const [open, setOpen] = useState(false);
  const logo = headerType ? 'logo-dark' : 'logo';
  const isOpenMenu = open ? styles.openMenu : '';

  return (
    <header
      id={styles.header}
      className={`${styles[headerType] || ''} ${isOpenMenu}`}
    >
      <div className={`container ${styles.container}`}>
        {media767 && (
          <button
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <div
          className="flex flex-center"
          // style={{ background: 'red', height: '100px' }}
        >
          <Link href="/">
            <a className={styles.logo}>
              <Image
                src={`/images/${logo}.svg`}
                width={170}
                height={40}
                alt="Darshana"
              />
            </a>
          </Link>
          {logoJobBoard && (
            <div
              style={{
                border: '1px solid #FFFFFF',
                height: '25px',
                marginLeft: '10px',
              }}
            />
          )}

          {logoJobBoard && (
            <figure className={styles.logo}>
              <Image
                src={logoJobBoard}
                objectFit="contain"
                width={150}
                height={25}
                alt="Darshana"
              />
            </figure>
          )}
        </div>
        {media767 && <div></div>}
        <NavMenu headerType={headerType} styles={styles} domain={domain} />
      </div>
    </header>
  );
};

export default Header;
