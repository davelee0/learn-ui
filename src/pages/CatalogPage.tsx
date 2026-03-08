import { Link, useSearchParams } from 'react-router-dom';
import { Search, Play, ExternalLink } from 'lucide-react';
import { components } from '../data/components';
import { categories } from '../data/categories';
import { useSearch } from '../hooks/useSearch';
import { useProgress } from '../hooks/useProgress';
import type { CategoryId } from '../types/component';
import { useEffect } from 'react';

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const { query, setQuery, selectedCategories, toggleCategory, filtered } =
    useSearch(components);
  const { progress, getComponentProgress } = useProgress();

  useEffect(() => {
    const cat = searchParams.get('category') as CategoryId | null;
    if (cat && !selectedCategories.includes(cat)) {
      toggleCategory(cat);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-xs text-zinc-400">
        {components.length} components · {categories.length} categories
      </div>

      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0 space-y-3">
          <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Filter
          </h3>
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="rounded-sm border-zinc-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-zinc-600">{cat.name}</span>
            </label>
          ))}
        </div>

        <div className="flex-1 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {filtered.map((comp) => {
              const visited = progress.visitedComponents.includes(comp.slug);
              const pct = getComponentProgress(
                comp.slug,
                comp.learningObjectives.length
              );
              return (
                <Link
                  key={comp.slug}
                  to={`/component/${comp.slug}`}
                  className="border border-zinc-200 rounded-sm p-3 hover:border-amber-300 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-sm font-medium text-zinc-900 group-hover:text-amber-800 transition-colors">
                      {comp.name}
                    </h3>
                    {comp.hasDemo && (
                      <span className="flex items-center gap-0.5 text-[11px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-sm">
                        <Play className="w-2.5 h-2.5" />
                        Demo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 mb-2">
                    {comp.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-2.5 h-2.5" />
                      {comp.exampleCount}
                    </span>
                    {visited && (
                      <span className={pct === 1 ? 'text-emerald-600' : 'text-zinc-400'}>
                        {pct === 1 ? 'Done' : 'Visited'}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-400 text-sm">
              No components match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
