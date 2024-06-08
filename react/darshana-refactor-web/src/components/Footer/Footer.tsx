import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './footer.module.scss';
import { useTranslation } from 'next-i18next';
import {
  DISCORD_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from '../../constants/links';

const Footer: FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer id={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className="row">
            <div className="col-md-2">
              <div className={styles.contentLogo}>
                <Link href="/">
                  <a className="logo">
                    <Image
                      src="/images/logo_white.svg"
                      width={129}
                      height={24}
                      alt="Darshana"
                    />
                  </a>
                </Link>

                <FooterLanguage typeMedia="mobile" />
              </div>
            </div>

            <div className="col-md-1"></div>

            <div className={`col-md-2`}>
              <p className={styles.menuTitle}>
                <b>{t('services')}</b>
              </p>

              <ul className={styles.menuList}>
                <li>
                  <Link href="https://www.darshana.io">
                    <a>{t('about-us')}</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={`col-md-2`}>
              <p className={styles.menuTitle}>
                <b>{t('help-center')}</b>
              </p>

              <ul className={styles.menuList}>
                <li>
                  <Link href="/help-center">
                    <a>{t('contact-us')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    <a>{t('terms-and-conditions')}</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={`col-md-2`}>
              <p className={styles.menuTitle}>
                <b>{t('follow-us')}</b>
              </p>

              <ul className={styles.followLinks}>
                <li>
                  <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                    <Image
                      src="/images/icons/facebook-white.svg"
                      width={24}
                      height={24}
                      alt="Facebook"
                    />
                  </a>
                </li>

                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                    <Image
                      src="/images/icons/linkedin.svg"
                      width={24}
                      height={24}
                      alt="Linkedin"
                    />
                  </a>
                </li>

                <li>
                  <a href={TWITTER_URL} target="_blank" rel="noreferrer">
                    <Image
                      src="/images/icons/twitter.svg"
                      width={24}
                      height={24}
                      alt="Twitter"
                    />
                  </a>
                </li>

                <li>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer">
                    <Image
                      src="/images/icons/discord.svg"
                      width={24}
                      height={24}
                      alt="Discord"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-1"></div>

            <div className={`col-md-2 ${styles.colLanguage}`}>
              <p className={styles.menuTitle}>
                <b>{t('language')}</b>
              </p>

              <FooterLanguage typeMedia="desktop" />
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          Darshana {t('copyright')} © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

const FooterLanguage: FC<{ typeMedia: string }> = ({ typeMedia }) => {
  const { t } = useTranslation('common');

  return (
    <ul className={`${styles.language} ${styles[typeMedia]}`}>
      <li>
        <Link href="/" locale={'es'}>
          <a>
            <Image
              src="/images/icons/es.svg"
              width={18}
              height={12}
              alt={t('spanish')}
            />
          </a>
        </Link>
      </li>

      <li>
        <Link href="/" locale={'en'}>
          <a>
            <Image
              src="/images/icons/en.svg"
              width={18}
              height={12}
              alt={t('english')}
            />
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Footer;
