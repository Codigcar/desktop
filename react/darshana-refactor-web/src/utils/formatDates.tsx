import useEffect, { useContext } from 'react';

import moment from 'moment';
import 'moment/locale/es';
import { useTranslation } from 'next-i18next';
import { AuthContext } from '@contexts/auth';

export const convertDateToYYYYMMDD = (date: any): string => {
  moment.locale('es');
  return date ? moment(date).format('YYYY-MM-DD') : '';
};
export const convertDateToDDMMYYYY = (date: any): string => {
  moment.locale('es');
  return date ? moment(date).format('DD-MM-YYYY') : '';
};
export const convertDateNow = (): string => {
  moment.locale('es');
  return moment().format('DD-MM-YYYY');
};
export const convertDateToMMYYYY = (date: any): string => {
  moment.locale('es');
  return moment(date).format('MMMM-YYYY');
};
export const convertDateToNameMonth = (
  date: any | string,
  lang: string,
): string => {
  moment.locale('es');
  return moment(date).locale(`${lang}`).format('MMMM');
};

export const convertDateToYYYY = (date: any | string): string => {
  return moment(date).format('YYYY');
};

export const convertDateToMMDDYYYY = (date: Date | string): string => {
  return moment(date).format('MM/DD/YYYY');
};

export const diffDatesByMonths = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'months');
};

export const diffDatesByYears = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'years');
};

export const diffDatesByDays = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'days');
};

export const diffDatesByHours = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'hours');
};

export const diffDatesByMinutes = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'minutes');
};

export const diffDatesBySeconds = (date1: any, date2: any): number => {
  return moment(date1).diff(date2, 'seconds');
};

export const getTimeDescription = (
  count: number,
  singular: string,
  plural: string,
  lang: string,
): string => {
  const word = count > 1 ? plural : singular;
  return lang === 'es' ? `Hace ${count} ${word}` : `${count} ${word} ago`;
};
export const getTimeDescriptionUser = (
  count: number,
  singular: string,
  plural: string,
): string => {
  const word = count > 1 ? plural : singular;
  return `${count} ${word}`;
};
export const getTimeAgo = (date1: any, date2: any, lang: string): string => {
  const diaName = `${lang === 'es' ? 'día' : 'day'}`;
  const diasName = `${lang === 'es' ? 'días' : 'days'}`;

  const mesName = `${lang === 'es' ? 'mes' : 'month'}`;
  const mesesName = `${lang === 'es' ? 'meses' : 'months'}`;

  const anioName = `${lang === 'es' ? 'año' : 'year'}`;
  const aniosName = `${lang === 'es' ? 'años' : 'years'}`;

  const horaName = `${lang === 'es' ? 'hora' : 'hour'}`;
  const horasName = `${lang === 'es' ? 'horas' : 'hours'}`;

  const minutoName = `${lang === 'es' ? 'minuto' : 'minute'}`;
  const minutosName = `${lang === 'es' ? 'minutos' : 'minutes'}`;

  const segundoName = `${lang === 'es' ? 'segundo' : 'second'}`;
  const segundosName = `${lang === 'es' ? 'segundos' : 'seconds'}`;

  const years: number = diffDatesByYears(date1, date2);
  if (years > 0) {
    return getTimeDescription(years, anioName, aniosName, lang);
  }
  const months: number = diffDatesByMonths(date1, date2);
  if (months > 0) {
    return getTimeDescription(months, mesName, mesesName, lang);
  }
  const days: number = diffDatesByDays(date1, date2);
  if (days > 0) {
    return getTimeDescription(days, diaName, diasName, lang);
  }
  const hours: number = diffDatesByHours(date1, date2);
  if (hours > 0) {
    return getTimeDescription(hours, horaName, horasName, lang);
  }

  const minutes: number = diffDatesByMinutes(date1, date2);
  if (minutes > 0) {
    return getTimeDescription(minutes, minutoName, minutosName, lang);
  }

  const seconds: number = diffDatesBySeconds(date1, date2);
  if (seconds > 0) {
    return getTimeDescription(seconds, segundoName, segundosName, lang);
  }

  return '';
};
export const getTimeAgoUser = (
  date1: any,
  date2: any,
  lang: string,
): string => {
  let time: string = '';

  const mesName = `${lang === 'es' ? 'mes' : 'month'}`;
  const mesesName = `${lang === 'es' ? 'meses' : 'months'}`;

  const anioName = `${lang === 'es' ? 'año' : 'year'}`;
  const aniosName = `${lang === 'es' ? 'años' : 'years'}`;

  const years: number = diffDatesByYears(date1, date2);
  if (years > 0) {
    time = time + getTimeDescriptionUser(years, anioName, aniosName);
  }
  const date: number = diffDatesByMonths(date1, date2);
  const months = date % 12;
  if (months > 0) {
    time = time + ' ' + getTimeDescriptionUser(months, mesName, mesesName);
  }
  return time;
};
