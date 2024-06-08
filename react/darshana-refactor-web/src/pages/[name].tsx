import React, { CSSProperties, useContext } from 'react';
import { NextPage } from 'next';

import Layout from '@layouts/Layout';
import {
  CardJob,
  CardJobHighLight,
  CardProfile,
  CardProject,
} from '@components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useGetData from '@hooks/useGetData';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { collapseMotion, getTimeAgo } from '@utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';
import { AuthContext } from '@contexts/auth';
import CPagination from '@components/Atoms/Pagination/CPagination';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useMediaQuery } from '@hooks';
import Collapse, { Panel } from 'rc-collapse';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LayoutCore from '@layouts/LayoutCore';
import { CFilterList } from '@components/Atoms';
import { darshanaApi } from '@api/darshanaApi';
import { darshanaApiNoToken } from '../api/darshanaApiNoToken';

type FormInput = {
  searchContent: 'string';
};
interface Params {
  countriesQuerys: Array<string>;
  datesQuerys: string;
  workModalitiesQuerys: Array<string>;
  industriesQuerys: Array<string>;
  languageQuerys: Array<string>;
  skillQuerys: Array<string>;
  rolInterestQuerys: Array<string>;
}
interface IProps {
  jobBoard: {
    background: string;
    iconLogo: string;
    iconPost: string;
    domain: string;
  };
}
function expandIcon({ isActive }: any) {
  return (
    <i style={{ marginRight: '.5rem' }}>
      <svg
        viewBox="0 0 14.37 13.26"
        width="16px"
        height="1em"
        fill="currentColor"
        style={{
          verticalAlign: '-.125em',
          transition: 'transform .2s',
          transform: `rotate(${isActive ? 180 : 0}deg)`,
        }}
      >
        <title>next copy</title>
        <g
          id="pagos-y-articulo_desktop"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="TALENTOmiperfil---editar6-(tarjeta)"
            transform="translate(-787.000000, -753.000000)"
            fill="#1A3447"
            fillRule="nonzero"
          >
            <g
              id="next-copy"
              transform="translate(793.500000, 757.000000) rotate(-90.000000) translate(-793.500000, -757.000000) translate(789.500000, 750.500000)"
            >
              <path
                d="M7.3141466,6.07171687 L1.59695956,0.677143284 C1.34609321,0.440952239 0.939649609,0.440952239 0.688149761,0.677143284 C0.437283413,0.91333433 0.437283413,1.29697038 0.688149761,1.53316142 L5.95185576,6.49970102 L0.688783261,11.4662406 C0.437916914,11.7024317 0.437916914,12.0860677 0.688783261,12.3228567 C0.939649609,12.5590478 1.34672671,12.5590478 1.59759306,12.3228567 L7.3147801,6.92828313 C7.56184545,6.69453372 7.56184545,6.30486833 7.3141466,6.07171687 Z"
                id="Chevron_Right_1_"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </i>
  );
}
const indicatorStyles: CSSProperties = {
  background: '#7F8D98',
  width: 12,
  height: 12,
  display: 'inline-block',
  margin: '0 8px',
  opacity: 0.32,
  borderRadius: '32px',
};
const Opportunities: NextPage<IProps> = ({ jobBoard }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const router = useRouter();
  const { t: tp } = useTranslation('profile');
  const { t } = useTranslation('common');
  const [, i18nConfig] = useTranslation('postulation');
  const lang = i18nConfig.language;
  const { register, handleSubmit } = useForm<FormInput>();
  const [params, setParams] = useState<Params>({
    countriesQuerys: [],
    datesQuerys: '',
    workModalitiesQuerys: [],
    industriesQuerys: [],
    languageQuerys: [],
    rolInterestQuerys: [],
    skillQuerys: [],
  });
  const media767 = useMediaQuery('min-width', '767px');
  const { executeGet, isLoading, data, meta } = useGetData();

  const {
    executeGet: executeGetHighLight,
    isLoading: isLoadingHighLight,
    data: dataHighLight,
  } = useGetData();

  const SearchData = (): string => {
    if (user) {
      const isRecruiter = user?.workplaces.find(
        (workplace) => workplace.enable_business
      );
      if (isRecruiter) {
        return 'talents';
      }
      return user?.is_talent ? 'jobs' : 'talents';
    }
    return router.query.find === 'talents' ? 'talents' : 'jobs';
  };
  const isRecruiter = () => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business
    );
    if (isRecruiter) {
      return true;
    }
    return !user?.is_talent;
  };

  const [option, setOption] = useState(SearchData());
  const [countries, setCountries] = useState<Array<any>>([]);
  const [dates, setDates] = useState([]);
  const [workModalities, setWorkModalities] = useState([]);
  const [industry, setIndustries] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('created_at/desc');
  const [isClean, setIsClean] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = React.useState<React.Key | React.Key[]>([
    '1',
    '2',
    '3',
  ]);
  const [itemsCarousel, setitemsCarousel] = useState<Array<any>>([]);
  const createItemCarousell = () => {
    const items =
      dataHighLight &&
      dataHighLight.map((item: any, index: number) => {
        if (!media767) {
          if (option === 'jobs') {
            return (
              <CardJobHighLight
                key={index}
                idJob={item?.id}
                title={item?.name}
                company={item?.business?.workplace?.workplace_name}
                description={item?.summary}
                time={getTimeAgo(new Date(), item?.created_at, lang)}
                location={item?.country?.name}
                image={item?.owner?.profile_picture_url || jobBoard.iconPost}
                showFavorite={isLoggedIn ? true : false}
                isFavorite={item?.favorite}
                ownerUuid={item?.owner?.user_uuid}
              />
            );
          }
          if (option === 'projects') {
            return (
              <CardProject
                key={index}
                idProject={item?.id}
                image={item?.image_url}
                mobileImage={item?.mobile_image_url}
                title={item?.name}
                company={item?.business?.workplace?.workplace_name}
                description={item?.description}
                time={getTimeAgo(new Date(), item?.created_at, lang)}
                location={item?.country?.name}
                isFavorite={item?.favorite}
                ownerUuid={item?.owner?.user_uuid}
                summary={item?.description}
                isTop={item?.is_top}
                showFavorite={isLoggedIn ? true : false}
              />
            );
          }
          if (option === 'talents') {
            return (
              <CardProfile
                key={nanoid()}
                idTalent={item?.id}
                image={
                  item?.profile_picture_url || '/images/profile-placeholder.png'
                }
                name={`${item?.full_name || ''} `}
                profession={item?.subtitle}
                summary={item?.summary}
                isFavorite={item?.favorite}
                user_uuid={item?.user_uuid}
                isTop={item?.is_top}
              />
            );
          }
        } else {
          if (option === 'jobs' && index % 2 === 0) {
            return (
              <div className="flex flex-space-between" key={index}>
                <CardJobHighLight
                  idJob={item?.id}
                  title={item?.name}
                  company={item?.business?.workplace?.workplace_name}
                  description={item?.summary}
                  time={getTimeAgo(new Date(), item?.created_at, lang)}
                  location={item?.country?.name}
                  image={item?.owner?.profile_picture_url || jobBoard.iconPost}
                  showFavorite={isLoggedIn ? true : false}
                  isFavorite={item?.favorite}
                  ownerUuid={item?.owner?.user_uuid}
                />
                <CardJobHighLight
                  idJob={dataHighLight[index + 1]?.id}
                  title={dataHighLight[index + 1]?.name}
                  company={
                    dataHighLight[index + 1]?.business?.workplace
                      ?.workplace_name
                  }
                  description={dataHighLight[index + 1]?.summary}
                  time={getTimeAgo(
                    new Date(),
                    dataHighLight[index + 1]?.created_at,
                    lang
                  )}
                  location={dataHighLight[index + 1]?.country?.name}
                  image={
                    dataHighLight[index + 1]?.owner?.profile_picture_url ||
                    jobBoard.iconPost
                  }
                  showFavorite={isLoggedIn ? true : false}
                  isFavorite={dataHighLight[index + 1]?.favorite}
                  ownerUuid={dataHighLight[index + 1]?.owner?.user_uuid}
                />
              </div>
            );
          }
          if (option === 'projects' && index % 2 === 0) {
            return (
              <div className="flex flex-space-between" key={index}>
                <CardProject
                  idProject={item?.id}
                  image={item?.image_url}
                  mobileImage={item?.mobile_image_url}
                  title={item?.name}
                  company={item?.business?.workplace?.workplace_name}
                  description={item?.description}
                  time={getTimeAgo(new Date(), item?.created_at, lang)}
                  location={item?.country?.name}
                  isFavorite={item?.favorite}
                  ownerUuid={item?.owner?.user_uuid}
                  summary={item?.description}
                  isTop={item?.is_top}
                  showFavorite={isLoggedIn ? true : false}
                />
                <CardProject
                  idProject={dataHighLight[index + 1]?.id}
                  image={dataHighLight[index + 1]?.image_url}
                  mobileImage={dataHighLight[index + 1]?.mobile_image_url}
                  title={dataHighLight[index + 1]?.name}
                  company={
                    dataHighLight[index + 1]?.business?.workplace
                      ?.workplace_name
                  }
                  description={dataHighLight[index + 1]?.description}
                  time={getTimeAgo(
                    new Date(),
                    dataHighLight[index + 1]?.created_at,
                    lang
                  )}
                  location={dataHighLight[index + 1]?.country?.name}
                  isFavorite={dataHighLight[index + 1]?.favorite}
                  ownerUuid={dataHighLight[index + 1]?.owner?.user_uuid}
                  summary={dataHighLight[index + 1]?.description}
                  isTop={dataHighLight[index + 1]?.is_top}
                  showFavorite={isLoggedIn ? true : false}
                />
              </div>
            );
          }
          if (option === 'talents' && index % 2 === 0) {
            return (
              <div className="flex flex-space-between" key={index}>
                <CardProfile
                  key={nanoid()}
                  idTalent={item?.id}
                  image={
                    item?.profile_picture_url ||
                    '/images/profile-placeholder.png'
                  }
                  name={`${item?.full_name || ''}`}
                  profession={item?.subtitle}
                  summary={item?.summary}
                  isFavorite={item?.favorite}
                  user_uuid={item?.user_uuid}
                  isTop={item?.is_top}
                />
                <CardProfile
                  key={nanoid()}
                  idTalent={dataHighLight[index + 1]?.id}
                  image={
                    dataHighLight[index + 1]?.profile_picture_url ||
                    '/images/profile-placeholder.png'
                  }
                  name={`${dataHighLight[index + 1]?.full_name || ''} `}
                  profession={dataHighLight[index + 1]?.subtitle}
                  summary={dataHighLight[index + 1]?.summary}
                  isFavorite={dataHighLight[index + 1]?.favorite}
                  user_uuid={dataHighLight[index + 1]?.user_uuid}
                  isTop={item?.is_top}
                />
              </div>
            );
          }
        }

        return null;
      });
    const filterItems = items.filter((item) => item !== null);
    setitemsCarousel(filterItems);
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const criteriaStatus =
      option === 'projects' ? 'project_status_id=1' : 'job_status_id=1';
    const searchValue = data.searchContent
      ? `&search[value]=${data.searchContent}`
      : '';
    const [column, dir] = orderBy.split('/');
    const buildQuery = `${option}?order[][column]=${
      option === 'talents' ? 'profile_percentage' : column
    }&order[][dir]=${dir}&length=10&page=${currentPage}&${criteriaStatus}${searchValue}${
      user ? `&user_logueado_uuid=${user.user_uuid}` : ''
    }`;

    executeGet(buildQuery);
    setCurrentPage(1);
  };
  const handlerClean = () => {
    setIsClean(true);

    document
      .querySelectorAll('.container-checked input[type=checkbox]')
      .forEach((checkElement) => {
        // @ts-ignore
        checkElement.checked = false;
      });
  };

  const handleChangeSelect = (event: any) => {
    setCurrentPage(1);
    setOption(event.target.value);
    setParams({
      countriesQuerys: [],
      datesQuerys: '',
      workModalitiesQuerys: [],
      industriesQuerys: [],
      languageQuerys: [],
      rolInterestQuerys: [],
      skillQuerys: [],
    });
  };
  useEffect(() => {
    const criteriaStatus =
      option === 'projects' ? 'project_status_id=1' : 'job_status_id=1';
    const searchValue = '';
    const [column, dir] = orderBy.split('/');
    let paramsQuery = '';
    if (params?.countriesQuerys?.length > 0) {
      for (let i = 0; i < params?.countriesQuerys.length; i++) {
        paramsQuery += params?.countriesQuerys[i];
      }
    }
    if (params?.workModalitiesQuerys?.length > 0) {
      for (let i = 0; i < params?.workModalitiesQuerys.length; i++) {
        paramsQuery += params?.workModalitiesQuerys[i];
      }
    }
    if (params?.datesQuerys?.length > 0) {
      paramsQuery += params?.datesQuerys;
    }
    const buildQuery = `${option}?order[][column]=${
      option === 'talents' ? 'profile_percentage' : column
    }&order[][dir]=${dir}&length=10&page=${currentPage}&${criteriaStatus}${searchValue}${
      user ? `&user_logueado_uuid=${user.user_uuid}` : ''
    }`;
    if (!user && option === 'talents') {
      executeGet(buildQuery);
    } else {
      executeGet(`${buildQuery}${paramsQuery}`);
    }
  }, [option, currentPage, orderBy, params]);
  const getFilters = async () => {
    try {
      if (option === 'jobs') {
        const response = await darshanaApi.get('/opportunities/filters/jobs');
        executeGetHighLight(
          'jobs?order[][column]=id&order[][dir]=desc&is_top=1'
        );
        setCountries(response.data.countries);
        setDates(response.data.dates);
        setWorkModalities(response.data.work_modalities);
        return;
      }
      if (option === 'projects') {
        const response = await darshanaApi.get(
          '/opportunities/filters/projects'
        );
        executeGetHighLight(
          '/projects?order[][column]=id&order[][dir]=desc&is_top=1'
        );
        setCountries(response.data.countries);
        setDates(response.data.dates);
        setWorkModalities(response.data.work_modalities);
        return;
      }
      if (option === 'talents') {
        executeGetHighLight(
          '/talents?order[][column]=id&order[][dir]=desc&is_top=1'
        );
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFilters();
  }, [option]);
  useEffect(() => {
    createItemCarousell();
  }, [dataHighLight, media767]);

  return (
    <>
      {isLoggedIn ? (
        <LayoutCore
          id="opportunities"
          className={'bg'}
          title="Opportunities"
          logoJobBoard={jobBoard.iconLogo}
        >
          <section
            id="hero"
            style={{
              background: `url(${jobBoard.background}) no-repeat center `,
              backgroundSize: 'cover',
              // background: 'red',
            }}
          >
            <div className="container">
              <div className="search">
                <div className="form-group-addons">
                  <div className="form-control-has-icon">
                    <select
                      className="form-control form-select"
                      name=""
                      onChange={handleChangeSelect}
                      value={option!}
                    >
                      {!isRecruiter() && (
                        <option value="jobs">{t('jobs')}</option>
                      )}
                      {!isRecruiter() && (
                        <option value="projects">{t('projects')}</option>
                      )}
                      {isRecruiter() && (
                        <option value="talents">{t('talents')}</option>
                      )}
                    </select>

                    <span className="icon">
                      <Image
                        src="/images/icons/binoculars.svg"
                        width={24}
                        height={24}
                        alt="Ícono buscar"
                      />
                    </span>
                  </div>
                  <div className="search-container">
                    <form
                      className="form-control-has-icon expanded search-input  "
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('find')}
                        // onChange={handleFind}
                        {...register('searchContent')}
                      />
                      <span className="icon">
                        <Image
                          src="/images/icons/search.svg"
                          width={24}
                          height={24}
                          alt="Ícono buscar"
                        />
                      </span>
                    </form>
                    <span
                      className="icon-right"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <Image
                        src="/images/icons/filter.svg"
                        width={24}
                        height={24}
                        alt="Ícono buscar"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="content">
            <div className="container">
              <div className="row" /* style={{ flexDirection: 'column' }} */>
                {option === 'jobs' || option === 'projects' ? (
                  <aside className={`col-md-3 filter ${isOpen ? 'open' : ''}`}>
                    <div className="row flex-y-center flex-space-between m-0">
                      <p className="title">{t('filter')}</p>
                      {media767 && (
                        <p className="clean" onClick={handlerClean}>
                          {t('clean')}
                        </p>
                      )}
                      {!media767 && (
                        <span
                          className="icon-right"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <Image
                            src="/images/icons/close.svg"
                            width={24}
                            height={24}
                            alt="Ícono buscar"
                            onClick={() => setIsOpen(!isOpen)}
                          />
                        </span>
                      )}
                    </div>
                    {option === 'jobs' && (
                      <Collapse
                        accordion={false}
                        openMotion={collapseMotion}
                        expandIcon={expandIcon}
                        activeKey={activeKey}
                        onChange={setActiveKey}
                      >
                        <Panel
                          header={t('country')}
                          headerClass="my-header-class"
                          key={1}
                        >
                          <CFilterList
                            title={t('country')}
                            list={countries}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('modality')}
                          headerClass="my-header-class"
                          key={2}
                        >
                          <CFilterList
                            title={t('modality')}
                            list={workModalities}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('date-publication')}
                          headerClass="my-header-class"
                          key={3}
                        >
                          <CFilterList
                            title={t('date-publication')}
                            list={dates}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={tp('industry')}
                          headerClass="my-header-class"
                          key={4}
                        >
                          <CFilterList
                            title={tp('industry')}
                            list={industry}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                      </Collapse>
                    )}
                    {option === 'projects' && (
                      <Collapse
                        accordion={false}
                        openMotion={collapseMotion}
                        expandIcon={expandIcon}
                        activeKey={activeKey}
                        onChange={setActiveKey}
                      >
                        <Panel
                          header={t('country')}
                          headerClass="my-header-class"
                          key={1}
                        >
                          <CFilterList
                            title={t('country')}
                            list={countries}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('country')}
                          headerClass="my-header-class"
                          key={2}
                        >
                          <CFilterList
                            title={t('date-publication')}
                            list={dates}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                      </Collapse>
                    )}
                    {!media767 && (
                      <p className=" btn btn--stroke" onClick={handlerClean}>
                        Limpiar
                      </p>
                    )}
                  </aside>
                ) : (
                  ''
                )}

                {
                  <div
                    className={`result-section  ${
                      option === 'jobs' || option === 'projects'
                        ? 'col-md-9'
                        : 'col-md-12'
                    }`}
                  >
                    {option !== 'talents' && (
                      <div
                        className={`col-sm-2 col-md-3 form-group `}
                        style={{
                          alignSelf: 'flex-end',
                        }}
                      >
                        <select
                          className={`form-control form-select`}
                          value={orderBy}
                          onChange={(event) => setOrderBy(event.target.value)}
                        >
                          <option key={-1} value="/">
                            {t('orderBy')}
                          </option>
                          <option value="created_at/asc">
                            {t('date-old-current')}
                          </option>
                          <option value="created_at/desc">
                            {t('date-current-old')}
                          </option>
                          <option value="name/asc">{t('order-a-z')}</option>
                          <option value="name/desc">{t('order-z-a')}</option>
                        </select>
                      </div>
                    )}
                    <Carousel
                      // infiniteLoop
                      swipeable={true}
                      useKeyboardArrows
                      swipeScrollTolerance={20}
                      showArrows={false}
                      showStatus={false}
                      showThumbs={false}
                      // centerMode
                      // autoPlay
                      className={`${
                        option === 'jobs'
                          ? 'carousel-slider-job'
                          : 'carousel-slider-project'
                      }`}
                      renderIndicator={(
                        onClickHandler,
                        isSelected,
                        index,
                        label
                      ) => {
                        if (isSelected) {
                          return (
                            <li
                              style={{
                                ...indicatorStyles,
                                background: '#19A79B',
                                width: 24,
                                opacity: 1,
                              }}
                              aria-label={`Selected: ${label} ${index + 1}`}
                              title={`Selected: ${label} ${index + 1}`}
                            />
                          );
                        }
                        return (
                          <li
                            style={indicatorStyles}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                          />
                        );
                      }}
                    >
                      {data && itemsCarousel}
                    </Carousel>

                    <div className="result-content">
                      {isLoading ? (
                        <div className="result-content-loader">
                          {[...Array(5)].map((_, i) => (
                            <Skeleton key={nanoid()} className="skeleton" />
                          ))}
                        </div>
                      ) : (
                        <>
                          {data &&
                            data.map((item: any) => (
                              <React.Fragment key={nanoid()}>
                                {option === 'jobs' && (
                                  <CardJob
                                    idJob={item?.id}
                                    title={item?.name}
                                    company={
                                      item?.business?.user_workplace
                                        ?.workplace_name
                                    }
                                    description={item?.summary}
                                    time={getTimeAgo(
                                      new Date(),
                                      item?.created_at,
                                      lang
                                    )}
                                    location={item?.country?.name}
                                    image={
                                      item?.business?.owner?.profile_picture_url
                                    }
                                    showFavorite={true}
                                    isFavorite={item?.favorite}
                                    ownerUuid={item?.owner?.user_uuid}
                                  />
                                )}
                                {option === 'projects' && (
                                  <>
                                    <CardProject
                                      idProject={item?.id}
                                      image={item?.image_url}
                                      mobileImage={item?.mobile_image_url}
                                      title={item?.name}
                                      company={
                                        item?.business?.workplace
                                          ?.workplace_name
                                      }
                                      description={item?.description}
                                      time={getTimeAgo(
                                        new Date(),
                                        item?.created_at,
                                        lang
                                      )}
                                      location={item?.country?.name}
                                      isFavorite={item?.favorite}
                                      ownerUuid={item?.owner?.user_uuid}
                                      summary={item?.description}
                                    />
                                  </>
                                )}
                                {option === 'talents' && (
                                  <CardProfile
                                    key={nanoid()}
                                    idTalent={item?.id}
                                    image={
                                      item?.profile_picture_url ||
                                      '/images/profile-placeholder.png'
                                    }
                                    name={item?.full_name ?? ''}
                                    profession={item?.subtitle}
                                    summary={item?.summary}
                                    isFavorite={item?.favorite}
                                    user_uuid={item?.user_uuid}
                                  />
                                )}
                              </React.Fragment>
                            ))}
                        </>
                      )}
                    </div>

                    <CPagination
                      isLoading={isLoading}
                      meta={meta}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                }
              </div>
            </div>
          </section>
        </LayoutCore>
      ) : (
        <Layout
          id="opportunities"
          headerType="secondary"
          title="Opportunities"
          className={`${option === 'jobs' ? '' : 'project-class'}`}
          logoJobBoard={jobBoard.iconLogo}
          domain={jobBoard.domain}
        >
          <section
            id="hero"
            style={{
              background: `url(${jobBoard.background}) no-repeat center `,
              backgroundSize: 'cover',
            }}
          >
            <div className="container">
              <div className="search">
                <div className="form-group-addons">
                  <div className="form-control-has-icon-select">
                    <select
                      className="form-control form-select border-radius-select"
                      name=""
                      onChange={handleChangeSelect}
                      value={option!}
                    >
                      <option value="jobs">{t('jobs')}</option>
                      <option value="projects">{t('projects')}</option>
                      <option value="talents">{t('talents')}</option>
                    </select>

                    <span className="icon">
                      <Image
                        src="/images/icons/binoculars.svg"
                        width={24}
                        height={24}
                        alt="Ícono buscar"
                      />
                    </span>
                  </div>

                  <div className="search-container">
                    <form
                      className="form-control-has-icon expanded search-input  "
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="text"
                        className="form-control border-radius-form"
                        placeholder={t('find')}
                        // onChange={handleFind}
                        {...register('searchContent')}
                      />
                      <span className="icon">
                        <Image
                          src="/images/icons/search.svg"
                          width={24}
                          height={24}
                          alt="Ícono buscar"
                        />
                      </span>
                    </form>
                    <span
                      className="icon-right"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <Image
                        src="/images/icons/filter.svg"
                        width={24}
                        height={24}
                        alt="Ícono buscar"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="content">
            <div className="container">
              <div className="row" /*  style={{ flexDirection: 'column' }} */>
                {option === 'jobs' || option === 'projects' ? (
                  <aside className={`col-md-3 filter ${isOpen ? 'open' : ''}`}>
                    <div className="row flex-y-center flex-space-between m-0">
                      <p className="title">{t('filter')}</p>
                      {media767 && (
                        <p className="clean" onClick={handlerClean}>
                          {t('clean')}
                        </p>
                      )}
                      {!media767 && (
                        <span
                          className="icon-right"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <Image
                            src="/images/icons/close.svg"
                            width={24}
                            height={24}
                            alt="Ícono buscar"
                            onClick={() => setIsOpen(!isOpen)}
                          />
                        </span>
                      )}
                    </div>
                    {option === 'jobs' && (
                      <Collapse
                        accordion={false}
                        openMotion={collapseMotion}
                        expandIcon={expandIcon}
                        activeKey={activeKey}
                        onChange={setActiveKey}
                      >
                        <Panel
                          header={t('country')}
                          headerClass="my-header-class"
                          key={1}
                        >
                          <CFilterList
                            title={t('country')}
                            list={countries}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('modality')}
                          headerClass="my-header-class"
                          key={2}
                        >
                          <CFilterList
                            title={t('modality')}
                            list={workModalities}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('date-publication')}
                          headerClass="my-header-class"
                          key={3}
                        >
                          <CFilterList
                            title={t('date-publication')}
                            list={dates}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={tp('industry')}
                          headerClass="my-header-class"
                          key={3}
                        >
                          <CFilterList
                            title={tp('industry')}
                            list={industry}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                      </Collapse>
                    )}
                    {option === 'projects' && (
                      <Collapse
                        accordion={false}
                        openMotion={collapseMotion}
                        expandIcon={expandIcon}
                        activeKey={activeKey}
                        onChange={setActiveKey}
                      >
                        <Panel
                          header={t('country')}
                          headerClass="my-header-class"
                          key={1}
                        >
                          <CFilterList
                            title={t('country')}
                            list={countries}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={t('date-publication')}
                          headerClass="my-header-class"
                          key={2}
                        >
                          <CFilterList
                            title={t('date-publication')}
                            list={dates}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                        <Panel
                          header={tp('industry')}
                          headerClass="my-header-class"
                          key={3}
                        >
                          <CFilterList
                            title={tp('industry')}
                            list={industry}
                            params={params}
                            setParams={setParams}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </Panel>
                      </Collapse>
                    )}
                  </aside>
                ) : (
                  ''
                )}

                <div
                  className={`result-section  ${
                    option === 'jobs' || option === 'projects'
                      ? 'col-md-9'
                      : 'col-md-12'
                  }`}
                >
                  {option !== 'talents' && (
                    <div
                      className={`col-sm-2 col-md-3 form-group 'border-error'`}
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <select
                        className={`form-control form-select`}
                        value={orderBy}
                        onChange={(event) => setOrderBy(event.target.value)}
                      >
                        <option key={-1} value="/">
                          {t('orderBy')}
                        </option>
                        <option value="created_at/asc">
                          {t('date-old-current')}
                        </option>
                        <option value="created_at/desc">
                          {t('date-current-old')}
                        </option>
                        <option value="name/asc">{t('order-a-z')}</option>
                        <option value="name/desc">{t('order-z-a')}</option>
                      </select>
                    </div>
                  )}
                  <Carousel
                    infiniteLoop
                    swipeable={true}
                    useKeyboardArrows
                    swipeScrollTolerance={20}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    autoPlay
                    className={`${
                      option === 'jobs'
                        ? 'carousel-slider-job'
                        : 'carousel-slider-project'
                    }`}
                    renderIndicator={(
                      onClickHandler,
                      isSelected,
                      index,
                      label
                    ) => {
                      if (isSelected) {
                        return (
                          <li
                            style={{
                              ...indicatorStyles,
                              background: '#19A79B',
                              width: 24,
                              opacity: 1,
                            }}
                            aria-label={`Selected: ${label} ${index + 1}`}
                            title={`Selected: ${label} ${index + 1}`}
                          />
                        );
                      }
                      return (
                        <li
                          style={indicatorStyles}
                          onClick={onClickHandler}
                          onKeyDown={onClickHandler}
                          value={index}
                          key={index}
                          role="button"
                          tabIndex={0}
                          title={`${label} ${index + 1}`}
                          aria-label={`${label} ${index + 1}`}
                        />
                      );
                    }}
                  >
                    {data && itemsCarousel}
                  </Carousel>
                  <div className="result-content">
                    {isLoading ? (
                      <div className="result-content-loader">
                        {[...Array(5)].map((_, i) => (
                          <Skeleton key={nanoid()} className="skeleton" />
                        ))}
                      </div>
                    ) : (
                      <>
                        {data &&
                          data.map((item: any) => (
                            <React.Fragment key={nanoid()}>
                              {option === 'jobs' && (
                                <CardJob
                                  idJob={item?.id}
                                  title={item?.name}
                                  company={
                                    item?.business?.user_workplace
                                      ?.workplace_name
                                  }
                                  description={item?.summary}
                                  time={getTimeAgo(
                                    new Date(),
                                    item?.created_at,
                                    lang
                                  )}
                                  location={item?.country?.name}
                                  image={
                                    item?.business?.owner
                                      ?.profile_picture_url || jobBoard.iconPost
                                  }
                                  ownerUuid={item?.owner?.user_uuid}
                                />
                              )}
                              {option === 'projects' && (
                                <CardProject
                                  idProject={item?.id}
                                  image={item?.image_url}
                                  mobileImage={item?.mobile_image_url}
                                  title={item?.name}
                                  company={
                                    item?.business?.workplace?.workplace_name
                                  }
                                  description={item?.description}
                                  time={getTimeAgo(
                                    new Date(),
                                    item?.created_at,
                                    lang
                                  )}
                                  location={item?.country?.name}
                                  ownerUuid={item?.owner?.user_uuid}
                                  summary={item?.description}
                                />
                              )}
                              {option === 'talents' && (
                                <CardProfile
                                  key={nanoid()}
                                  idTalent={item?.id}
                                  image={
                                    item?.profile_picture_url ||
                                    '/images/profile-placeholder.png'
                                  }
                                  name={item?.full_name ?? ''}
                                  profession={item?.subtitle}
                                  summary={item?.summary}
                                />
                              )}
                            </React.Fragment>
                          ))}
                      </>
                    )}
                  </div>

                  <CPagination
                    isLoading={isLoading}
                    meta={meta}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

// @ts-ignore
export const getServerSideProps = async ({ params, locale }) => {
  const { name } = params as { name: string };
  // const listCompany = ['reach'];
  // if (!listCompany.includes(name)) {
  //   return {
  //     notFound: true,
  //   };
  // }
  try {
    const { data } = await darshanaApiNoToken(
      `/opportunities/header?domain=${name}`
    );
    if (!data) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const dataCompany = {
      background: data.data.banner,
      iconLogo: data.data.logo,
      iconPost: data.data.placeholder,
      domain: data.data.domain,
    };
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['common', 'validation', 'notifications'],
          i18nConfig
        )),
        jobBoard: dataCompany,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Opportunities;
