import { FC, useContext } from 'react';

import Link from 'next/link';

import { useTranslation } from 'next-i18next';

import { useMediaQuery } from '@hooks';
import { AuthContext } from '@contexts/auth';

interface IProps {
  headerType: string;
  styles: { [key: string]: string };
  domain?: string;
}

const NavMenu: FC<IProps> = ({ headerType, styles, domain }) => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation('common');
  const { t: ta } = useTranslation('auth');
  const media767 = useMediaQuery('max-width', '767px');

  const btnEnter = headerType ? 'btn--primary--white' : 'btn--primary';

  return (
    <nav>
      <ul className={styles.menuList}>
        <li>
          <Link href="https://www.darshana.io/">
            <a>
              <b>{t('about-us')}</b>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/help-center">
            <a>
              <b>{t('help-center')}</b>
            </a>
          </Link>
        </li>
      </ul>

      {media767 ? (
        <div className={styles.menuOptions}>
          <p className="text-center note">{ta('create-account-message')}</p>

          <div className={styles.buttons}>
            {user ? (
              <Link href="/profile/my-profile">
                <a className="btn btn--primary">{t('my-dashboard')}</a>
              </Link>
            ) : (
              <>
                <Link href={`/auth/login/${domain ? `?board=${domain}` : ''}`}>
                  <a className="btn btn--primary">{t('login-button')}</a>
                </Link>

                <Link href="/auth/create-account">
                  <a className="btn btn--stroke">{ta('register')}</a>
                </Link>
              </>
            )}
            {/* <Link href={`/chat`}>
              <a className={`btn ${styles.btnGpt}`}>
                <b>{"DarshanaGPT+"}</b>
              </a>
            </Link> */}
          </div>
        </div>
      ) : (
        <ul className={styles.menuOptions}>
          <li>
            {user ? (
              <Link href="/profile/my-profile">
                <a className="btn btn--primary">{t('my-dashboard')}</a>
              </Link>
            ) : (
              <Link href={`/auth/login/${domain ? `?board=${domain}` : ''}`}>
                <a className={`btn ${btnEnter}`}>
                  <b>{t('login-button')}</b>
                </a>
              </Link>
            )}
          </li>
          <li>
            {/* <Link href={`/chat`}>
              <a className={`btn ${styles.btnGpt}`}>
                <b>{'DarshanaGPT+'}</b>
              </a>
            </Link> */}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavMenu;
