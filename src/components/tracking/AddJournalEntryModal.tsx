import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import TagSelector from './TagSelector';
import { JOURNAL_CATEGORIES, COMMON_TAGS } from '@/types/tracking';

interface AddJournalEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: { 
    content: string;
    category?: string;
    tags?: string[];
    mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  }) => void;
  initialData?: {
    content: string;
    category?: string;
    tags?: string[];
    mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  };
}

const moods = [
  { value: 'great', label: 'Excellent' },
  { value: 'good', label: 'Bien' },
  { value: 'neutral', label: 'Neutre' },
  { value: 'bad', label: 'Pas bien' },
  { value: 'terrible', label: 'Terrible' }
] as const;

const AddJournalEntryModal: React.FC<AddJournalEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || JOURNAL_CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [mood, setMood] = useState<typeof moods[number]['value'] | undefined>(
    initialData?.mood || undefined
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, category, tags, mood });
    setContent('');
    setCategory(JOURNAL_CATEGORIES[0]);
    setTags([]);
    setMood(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? 'Modifier le moment positif' : 'Nouveau moment positif'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Décrivez ce moment positif..."
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {JOURNAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
              Humeur associée
            </label>
            <select
              id="mood"
              value={mood || ''}
              onChange={(e) => setMood(e.target.value as typeof mood)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Sélectionner une humeur...</option>
              {moods.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <TagSelector
              selectedTags={tags}
              availableTags={COMMON_TAGS}
              onTagsChange={setTags}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!content}
            >
              {initialData ? 'Mettre à jour' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournalEntryModal;