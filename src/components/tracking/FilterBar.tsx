import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FilterBarProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onlyShowCompleted?: boolean;
  onCompletedFilterChange?: (showCompleted: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  onlyShowCompleted,
  onCompletedFilterChange
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        icon={sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
      >
        {sortOrder === 'asc' ? 'Plus récent' : 'Plus ancien'}
      </Button>

      {onCompletedFilterChange && (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyShowCompleted}
            onChange={(e) => onCompletedFilterChange(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Uniquement terminés</span>
        </label>
      )}
    </div>
  );
};

export default FilterBar;