import React, { useState } from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Achievement, JournalEntry } from '@/types/tracking';

interface CalendarViewProps {
  achievements: Achievement[];
  journalEntries: JournalEntry[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  achievements,
  journalEntries
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const selectedDateAchievements = achievements.filter(
    achievement => format(new Date(achievement.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );
  
  const selectedDateEntries = journalEntries.filter(
    entry => format(new Date(entry.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-6">
      <Calendar
        achievements={achievements}
        journalEntries={journalEntries}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
        </h3>

        {(selectedDateAchievements.length > 0 || selectedDateEntries.length > 0) ? (
          <div className="space-y-6">
            {selectedDateAchievements.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Réalisations</h4>
                <div className="space-y-2">
                  {selectedDateAchievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm text-gray-900">{achievement.title}</p>
                      {achievement.tags && achievement.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {achievement.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDateEntries.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Journal</h4>
                <div className="space-y-2">
                  {selectedDateEntries.map(entry => (
                    <div
                      key={entry.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm text-gray-900">{entry.content}</p>
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {entry.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Aucune activité enregistrée pour cette date
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;