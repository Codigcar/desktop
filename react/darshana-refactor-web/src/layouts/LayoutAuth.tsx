import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';

import { useMediaQuery } from '@hooks';
import Head from 'next/head';

interface IProps {
  className?: string;
  linkReturn?: string;
  background?: string;
  backgroundMobile?: string;
  children: any;
  title?: string;
  isBack?: boolean;
}

const LayoutAuth: FC<IProps> = ({
  children,
  className,
  title,
  linkReturn = '/',
  background = 'login-bg',
  backgroundMobile = 'login-bg-mobile',
  isBack = true,
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const cleanLocalStorage = () => {
    localStorage.removeItem('registerByGoogle');
    router.back();
  };

  const isMedia767 = useMediaQuery('max-width', '767px');
  const bgColumn = isMedia767 ? backgroundMobile : background;

  return (
    <div id="wrapper">
      <Head>
        <title>{title || 'Darshana'} </title>
      </Head>
      <header id="header-auth">
        <div className="container">
          <Link href="/">
            <a>
              <Image
                src="/images/logo.svg"
                alt="Darshana Logo"
                width={170}
                height={40}
              />
            </a>
          </Link>
        </div>
      </header>

      <main id="auth" className={className}>
        <div className="container-full">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-information">
              <div className="limit-box">
                <div className="limit-box-content">
                  {isBack && (
                    <a className="btn btn--return" onClick={cleanLocalStorage}>
                      <Image
                        className="icon"
                        src="/images/icons/arrow-left.svg"
                        alt="back"
                        width={16}
                        height={16}
                      />

                      <span>{t('go-back')}</span>
                    </a>
                  )}

                  <div className="form-container">{children}</div>
                </div>
              </div>
            </div>

            <div
              className="col-xs-12 col-md-6 background-image"
              style={{
                backgroundImage: `url('/images/${bgColumn}.jpg')`,
              }}
            >
              {isBack && (
                <div className="container">
                  <Link href="/">
                    <a className="back-arrow">
                      <Image
                        src="/images/icons/back-arrow.svg"
                        alt="Back arrow"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutAuth;
