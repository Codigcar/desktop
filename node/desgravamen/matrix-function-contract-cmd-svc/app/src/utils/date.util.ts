const options: Intl.DateTimeFormatOptions = {
  timeZone: 'America/Lima',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const formatTimestamp = (now: Date): string => {
  return now.toLocaleDateString('es-PE', options);
};