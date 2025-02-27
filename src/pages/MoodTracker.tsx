import React, { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Smile, Frown, Meh, Sun, Cloud, CloudRain, Loader2 } from 'lucide-react';
import type { MoodEntry } from '../types';

const moods = [
  { value: 'great', icon: <Sun className="h-8 w-8" />, label: 'Excellent' },
  { value: 'good', icon: <Smile className="h-8 w-8" />, label: 'Bien' },
  { value: 'neutral', icon: <Meh className="h-8 w-8" />, label: 'Neutre' },
  { value: 'bad', icon: <Cloud className="h-8 w-8" />, label: 'Pas bien' },
  { value: 'terrible', icon: <CloudRain className="h-8 w-8" />, label: 'Terrible' },
];

const commonTriggers = [
  'Travail',
  'Stress',
  'Sommeil',
  'Exercice',
  'Alimentation',
  'Social',
  'Créativité',
];

const MoodTracker = () => {
  const [user] = useAuthState(auth);
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !user) return;

    setLoading(true);
    setError(null);
    try {
      const moodEntry: Omit<MoodEntry, 'id'> = {
        userId: user.uid,
        mood: selectedMood,
        triggers: selectedTriggers,
        notes: notes.trim(),
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, 'moods'), moodEntry);
      setSuccess(true);
      setSelectedMood(null);
      setSelectedTriggers([]);
      setNotes('');
    } catch (err) {
      console.error('Error saving mood:', err);
      setError('Impossible d\'enregistrer votre humeur. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Comment vous sentez-vous aujourd'hui ?
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-5 gap-4">
            {moods.map(({ value, icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedMood(value as MoodEntry['mood'])}
                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                  selectedMood === value
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {icon}
                <span className="mt-2 text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Qu'est-ce qui influence votre humeur ?
            </h3>
            <div className="flex flex-wrap gap-2">
              {commonTriggers.map(trigger => (
                <button
                  key={trigger}
                  type="button"
                  onClick={() => handleTriggerToggle(trigger)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTriggers.includes(trigger)
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes supplémentaires
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Comment s'est passée votre journée ?"
            />
          </div>

          {success && (
            <div className="p-4 bg-green-50 text-green-700 rounded-md">
              Votre humeur a été enregistrée avec succès !
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedMood || loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Enregistrer mon humeur'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodTracker;