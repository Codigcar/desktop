import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const BannerSearch = () => {
  const { t: tc } = useTranslation('common');

  return (
    <div className="banner-search">
      <div className="content">
        <h2 className="text-32 banner-search__title">
          <b>{tc('our-users')}</b> <br /> {tc('validate-trajectory')}
        </h2>

        <Link href="https://darshana.io/testim.html">
          <a className="btn btn--primary">{tc('lear-more')}</a>
        </Link>
      </div>
    </div>
  );
};

export default BannerSearch;
