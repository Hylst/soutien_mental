import React from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Achievement, JournalEntry } from '@/types/tracking';

interface CalendarProps {
  achievements: Achievement[];
  journalEntries: JournalEntry[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  achievements,
  journalEntries,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, dateFormat, { locale: fr })}
        </h2>
        <button
          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { locale: fr });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="font-medium text-center text-sm text-gray-500">
          {format(addDays(startDate, i), dateFormat, { locale: fr })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: fr });
    const endDate = endOfMonth(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const hasAchievements = achievements.some(
          achievement => isSameDay(new Date(achievement.date), cloneDay)
        );
        const hasJournalEntries = journalEntries.some(
          entry => isSameDay(new Date(entry.date), cloneDay)
        );

        days.push(
          <div
            key={day.toString()}
            className={`relative p-2 border border-gray-100 min-h-[80px] ${
              isSameDay(day, selectedDate)
                ? 'bg-primary-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onDateSelect(cloneDay)}
          >
            <span className={`text-sm ${
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text-gray-400'
                : 'text-gray-900'
            }`}>
              {format(day, 'd')}
            </span>
            {hasAchievements && (
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full" />
            )}
            {hasJournalEntries && (
              <div className="absolute bottom-1 right-4 w-2 h-2 bg-blue-400 rounded-full" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white rounded-lg">{rows}</div>;
  };

  return (
    <div className="p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;