import { useState, useMemo } from 'react';
import type { ComponentData, CategoryId } from '../types/component';

export function useSearch(components: ComponentData[]) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);

  const filtered = useMemo(() => {
    let result = components;
    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.category));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)) ||
          c.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [components, query, selectedCategories]);

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return { query, setQuery, selectedCategories, toggleCategory, filtered };
}
