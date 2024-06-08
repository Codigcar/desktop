import { useMediaQuery } from '@hooks';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';

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
  title: string;
  list: any[];
  params: Params;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
  isClean: boolean;
  setIsClean: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  option?: string;
  type?:string;
}
export const CFilterList: FC<IProps> = ({
  title,
  list,
  params,
  setParams,
  isClean,
  setIsClean,
  currentPage,
  setCurrentPage,
  type="talent",
}) => {
  const { t } = useTranslation('common');
  const { t: tp } = useTranslation('profile');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const [isShowMore, setIsShowMore] = useState(false);
  const [filterTags, setFilterTags] = useState<Array<String | number>>([]);
  const media767 = useMediaQuery('min-width', '767px');
  const filterHandler = (event: React. ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      );
    }
    setCurrentPage(1);
  };
  useEffect(() => {
    if (title === t('modality') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&$work_modality.name_en$=${tags}`;
      });

      setParams({ ...params, workModalitiesQuerys: paramsQuery });
    }
    if (title === t('country') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&$country.name$=${tags}`;
      });

      setParams({ ...params, countriesQuerys: paramsQuery });
    }
    if (title === t('date-publication') && filterTags.length >= 0) {
      const auxDate = filterTags.length === 0 ? 5000 : 1;

      // @ts-ignore
      const paramsQuery = `&from_date=${Math.max(...filterTags, auxDate)}`;
      setParams({ ...params, datesQuerys: paramsQuery });
    }
    if (title === tp('industry') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&$business.owner.users_industry.industry.name_en$=${tags}`;
      });

      setParams({ ...params, industriesQuerys: paramsQuery });
    }
    if (title === tp('languages') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&language_en=${tags}`;
      });

      setParams({ ...params, languageQuerys: paramsQuery });
    }
    if (title === t('skills') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&skill=${tags}`;
      });

      setParams({ ...params, skillQuerys: paramsQuery });
    }
    if (title === t('roles-interest') && filterTags.length >= 0) {
      const paramsQuery = filterTags.map((tags) => {
        return `&rol_interest=${tags}`;
      });

      setParams({ ...params, rolInterestQuerys: paramsQuery });
    }
    if (isClean) {
      setParams({
        countriesQuerys: [],
        datesQuerys: '',
        workModalitiesQuerys: [],
        industriesQuerys: [],
        languageQuerys: [],
        rolInterestQuerys: [],
        skillQuerys: [],
      });
      setFilterTags([]);
      setIsClean(false);
    }
  }, [filterTags, isClean]);
  const valueInput = (data:any)=>{
    if(type==="talent")
    {
      return lang === 'en' ? data.name : data.nombre;
    }else if (type==="recruiter"  && title === tp('languages')) {
      return  lang === 'en' ? data.name_en : data.name_es;
    }
    else{
      return data.name
    }
  }
  return (
    <div className="container-filter">
      {/* <p className="title-filter">{title}</p> */}
      <div
        className={` ${
          title === t('country') || title ===t("skills") ? 'row container-checked' : 'container-checked'
        }`}
      >
        {list?.map((data, index) => {
          if (index >= 5 && !isShowMore && (title === t('country') || title ===t("skills") || title===t("languages"))) {
            return;
          }
          return (
            <div
              key={index}
              className={`row flex-y-center flex-space-between m-1  ${
                title === t('country') || title ===t("skills") ? ' col-6 col-sm-12' : 'row'
              } `}
            >
              <div className="form-group-check">
                <label className="control control-checkbox">
                  {title !== t('date-publication') ? (
                    <input
                      type="checkbox"
                      value={title === tp('languages')?data.name_en:data.name}
                      onChange={filterHandler}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      value={data.from_date}
                      onChange={filterHandler}
                    />
                  )}
                  {valueInput(data)}
                  <div className="control_indicator"></div>
                </label>
              </div>
              <p className="text-data">{data.count}</p>
            </div>
          );
        })}
        {(title === t('country') || title ===t("skills") || title===t("languages") ) && list.length > 5 && (
          <p
            className="more-than col-12"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {!isShowMore ? t('see-more-options') : t('see-less-options')}
          </p>
        )}
      </div>
    </div>
  );
};
