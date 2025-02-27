import React from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  allowCustom?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  allowCustom = true
}) => {
  const [customValue, setCustomValue] = React.useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      onChange([...selected, value]);
    }
    e.target.value = ''; // Reset select after selection
  };

  const handleRemove = (valueToRemove: string) => {
    onChange(selected.filter(value => value !== valueToRemove));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customValue && !selected.includes(customValue)) {
      onChange([...selected, customValue]);
      setCustomValue('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((value) => (
          <div
            key={value}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
          >
            <span>{value}</span>
            <button
              type="button"
              onClick={() => handleRemove(value)}
              className="ml-2 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          onChange={handleSelect}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          defaultValue=""
        >
          <option value="" disabled>Sélectionner...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {allowCustom && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Autre..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleCustomSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;