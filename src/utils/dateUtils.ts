import { format, formatDistance, isToday, isYesterday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) {
    return "Aujourd'hui";
  }
  
  if (isYesterday(parsedDate)) {
    return 'Hier';
  }
  
  return format(parsedDate, 'dd MMMM yyyy', { locale: fr });
};

export const formatRelativeTime = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), { 
    addSuffix: true,
    locale: fr 
  });
};

export const formatTime = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'HH:mm', { locale: fr });
};