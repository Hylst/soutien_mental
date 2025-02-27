import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { MoodEntry } from '@/types';

interface MoodChartProps {
  moods: MoodEntry[];
}

const moodValues = {
  'great': 5,
  'good': 4,
  'neutral': 3,
  'bad': 2,
  'terrible': 1
};

const moodLabels = {
  5: 'Excellent',
  4: 'Bien',
  3: 'Neutre',
  2: 'Pas bien',
  1: 'Terrible'
};

const MoodChart: React.FC<MoodChartProps> = ({ moods }) => {
  const data = moods.map(mood => ({
    date: mood.timestamp.toDate(),
    value: moodValues[mood.mood],
    mood: mood.mood
  })).sort((a, b) => a.date.getTime() - b.date.getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            {format(new Date(label), 'dd MMMM yyyy', { locale: fr })}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            Humeur: {moodLabels[payload[0].value]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'dd/MM')}
            stroke="#6B7280"
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => moodLabels[value as keyof typeof moodLabels]}
            stroke="#6B7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0EA5E9"
            strokeWidth={2}
            dot={{ fill: '#0EA5E9', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;