import { FC, useContext } from 'react';

import HeaderCore from '@components/Header/HeaderCore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthContext } from '@contexts/auth';

interface IProps {
  id: string;
  title?: string;
  className?: string;
  children: any;
  logoJobBoard?: string;
}

const LayoutCore: FC<IProps> = ({
  children,
  id,
  className = '',
  title,
  logoJobBoard,
}) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const pathName = router.pathname.split('/');
  if (pathName[1] === 'recruiter') {
    if (!user) {
      router.push('/');
      return <div>Loading</div>;
    }
  }
  if (
    router.pathname === 'profile/my-profile' ||
    router.pathname === '/talent/myPostulation'
  ) {
    if (!user) {
      router.push('/');
      return <div>Loading</div>;
    }
  }
  return (
    <div id="wrapper">
      <Head>
        <title>{title || 'Darshana'} </title>
      </Head>
      <HeaderCore logoJobBoard={logoJobBoard} />
      <main id={id} className={`${className}`}>
        {children}
      </main>
    </div>
  );
};

export default LayoutCore;
