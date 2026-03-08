import { Link } from 'react-router-dom';
import { components } from '../data/components';
import { categories } from '../data/categories';
import { useProgress } from '../hooks/useProgress';

export function ProgressPage() {
  const { progress, getComponentProgress } = useProgress();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium text-zinc-900">Progress</h1>

      <div className="space-y-3">
        {categories.map((cat) => {
          const catComponents = components.filter((c) => c.category === cat.id);
          const visited = catComponents.filter((c) =>
            progress.visitedComponents.includes(c.slug)
          ).length;
          const pct = catComponents.length > 0 ? visited / catComponents.length : 0;
          return (
            <div key={cat.id} className="flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-700 w-44 flex-shrink-0">
                {cat.name}
              </span>
              <div className="flex-1 bg-zinc-100 rounded-sm h-1">
                <div
                  className="bg-amber-600 h-1 rounded-sm transition-all duration-500"
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400 w-12 text-right flex-shrink-0">
                {visited}/{catComponents.length}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-zinc-200 pt-4">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          All components
        </h2>
        <div className="border border-zinc-200 rounded-sm divide-y divide-zinc-100">
          {components.map((comp) => {
            const visited = progress.visitedComponents.includes(comp.slug);
            const pct = getComponentProgress(
              comp.slug,
              comp.learningObjectives.length
            );
            const completedCount = (
              progress.completedObjectives[comp.slug] || []
            ).length;
            return (
              <Link
                key={comp.slug}
                to={`/component/${comp.slug}`}
                className="flex items-center justify-between px-3 py-2 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      pct === 1
                        ? 'bg-emerald-500'
                        : visited
                          ? 'bg-amber-500'
                          : 'bg-zinc-200'
                    }`}
                  />
                  <span className="text-sm text-zinc-800">
                    {comp.name}
                  </span>
                </div>
                <span className="text-xs text-zinc-400">
                  {completedCount}/{comp.learningObjectives.length}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
