import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Skill } from '@interfaces/user';
import { Tooltip } from '@components/Tooltip/Tooltip';

export interface IItem {
  title: string;
  company: string;
  time: string;
  verify_status_id?: number;
}

interface Props {
  iconPath: string;
  title: string;
  items?: Array<IItem>;
  tags?: Skill[] | undefined;
  roles?: any[];
  seeMoreText?: string;
  seeLessText?: string;
}

const ProfileCard: FC<Props> = ({
  iconPath,
  title,
  items,
  tags,
  roles,
  seeMoreText = '',
  seeLessText = '',
}) => {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const iconDown = '/images/icons/arrow-down.svg';
  const iconUp = '/images/icons/arrow-top.svg';
  const [footerText, setFooterText] = useState('');
  const [footerIcon, setFooterIcon] = useState(iconDown);
  const [showFooter, setShowFooter] = useState(false);
  const [showFooterIcon, setShowFooterIcon] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [list, setList] = useState<Array<IItem>>();

  useEffect(() => {
    if (title === 'skills') {
      handleInitialSkillsData();
    } else if (title === 'education' || title === 'experience') {
      handleInitialData();
    } else {
      handleInitialRolesData();
    }
  }, [roles]);

  const handleInitialData = () => {
    if (!items || items.length === 0) {
      setFooterText(tc('no-info-yet'));
      setShowFooter(true);
      setShowFooterIcon(false);
    } else {
      if (items.length > 3) {
        setShowFooter(true);
        setShowFooterIcon(true);
        setList(items.slice(0, 3));
      } else {
        setShowFooter(false);
        setList(items.slice(0, items.length));
      }
    }
  };

  const handleInitialSkillsData = () => {
    if (!tags || tags.length === 0) {
      setFooterText(tc('no-info-yet'));
      setShowFooter(true);
      setShowFooterIcon(false);
    } else {
      setShowFooter(false);
    }
  };
  const handleInitialRolesData = () => {
    if (!roles || roles.length === 0) {
      setFooterText(tc('no-info-yet'));
      setShowFooter(true);
      setShowFooterIcon(false);
    } else {
      setShowFooter(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      setFooterText(t(seeLessText));
      setFooterIcon(iconUp);
      setList(items?.slice(0, items.length));
    } else if (items && items.length > 0) {
      setFooterText(t(seeMoreText));
      setFooterIcon(iconDown);
      setList(items?.slice(0, 3));
    }
  }, [isExpanded]);

  const handleOnClickFooter = () => {
    if (items && items.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };
  useEffect(() => {
    handleInitialData();
  }, [items]);

  return (
    <div className="content block">
      <div className="content__title">
        <Image src={iconPath} width={24} height={24} alt="Darshana" />
        <h1 className="text-20">
          <strong>{t(title)}</strong>
        </h1>
      </div>
      <div className="divider"></div>
      {list &&
        list.map((item) => (
          <div key={nanoid()} className="content__body-card">
            <div className="flex-y-center flex-space-between">
              <h1 className="text-16 c-1">
                <strong>{item?.title}</strong>
              </h1>
            </div>

            <div className="flex-y-center flex-space-between">
              <h2 className="text-16 c-1">{item?.company}</h2>
              {item?.verify_status_id === 3 && (
                <Tooltip text={tc('verified-experience')}>
                  <div className="flex-y-center">
                    <Image
                      src={'/images/icons/experience.svg'}
                      width={22}
                      height={22}
                      alt="experience"
                    />
                  </div>
                </Tooltip>
              )}
            </div>
            <span className="text-16 c-1">{item?.time}</span>
          </div>
        ))}
      {tags && tags.length > 0 && (
        <div className="content__body-tags">
          {tags.map((tag) => (
            <span key={nanoid()}>{tag?.name}</span>
          ))}
        </div>
      )}
      {roles && roles.length > 0 && (
        <div className="content__body-tags">
          {roles.map((rol) => (
            <span key={nanoid()}>{rol?.value}</span>
          ))}
        </div>
      )}

      {showFooter && (
        <>
          {showFooterIcon && <div className="divider"></div>}
          <div className="content__footer" onClick={handleOnClickFooter}>
            <h1 className="text-16 c-1">
              <strong>{footerText}</strong>
            </h1>
            {showFooterIcon && (
              <Image
                src={footerIcon || ''}
                width={16}
                height={16}
                alt="Darshana"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
