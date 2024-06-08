import { FC } from 'react';

import { useMediaQuery } from '@hooks';
import { Footer, Header } from '@components';
import Head from 'next/head';

interface IProps {
  id: string;
  className?: string;
  headerType?: string;
  children: any;
  title?: any;
  logoJobBoard?: string;
  domain?: string;
}

const Layout: FC<IProps> = ({
  children,
  id,
  headerType,
  title,
  className = '',
  logoJobBoard,
  domain,
}) => {
  const media767 = useMediaQuery('max-width', '767px');

  const isHeaderMobile = media767 ? '' : headerType;

  return (
    <div id="wrapper">
      <Head>
        <title>{title || 'Darshana'} </title>
      </Head>
      <Header
        headerType={isHeaderMobile || ''}
        logoJobBoard={logoJobBoard}
        domain={domain}
      />

      <main id={id} className={className}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
