import React from 'react';
import { X } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  availableTags: readonly string[];
  onTagsChange: (tags: string[]) => void;
  allowCustom?: boolean;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  availableTags,
  onTagsChange,
  allowCustom = true
}) => {
  const [customTag, setCustomTag] = React.useState('');

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleCustomTagSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (customTag && !selectedTags.includes(customTag)) {
      onTagsChange([...selectedTags, customTag]);
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-primary-100 text-primary-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className="ml-1 hover:text-primary-900"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          onChange={(e) => handleTagSelect(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value=""
        >
          <option value="" disabled>Ajouter un tag...</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {allowCustom && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Tag personnalisé"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleCustomTagSubmit}
              className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              disabled={!customTag}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;