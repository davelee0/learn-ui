import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';
import { components } from '../data/components';
import { useProgress } from '../hooks/useProgress';

export function HomePage() {
  const { progress } = useProgress();
  const totalComponents = components.length;
  const visitedCount = progress.visitedComponents.length;
  const totalObjectives = components.reduce(
    (sum, c) => sum + c.learningObjectives.length,
    0
  );
  const completedObjectives = Object.values(progress.completedObjectives).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const demoCount = components.filter((c) => c.hasDemo).length;

  return (
    <div className="space-y-6">
      <div className="text-sm text-zinc-400">
        {demoCount} demos · {visitedCount}/{totalComponents} explored · {completedObjectives}/{totalObjectives} objectives
      </div>

      {progress.lastVisited && (
        <Link
          to={`/component/${progress.lastVisited}`}
          className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors"
        >
          Continue: {components.find((c) => c.slug === progress.lastVisited)?.name}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}

      <div>
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
          Categories
        </h2>
        <div className="border-t border-zinc-200">
          {categories.map((cat) => {
            const catComponents = components.filter((c) => c.category === cat.id);
            const visited = catComponents.filter((c) =>
              progress.visitedComponents.includes(c.slug)
            ).length;
            return (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.id}`}
                className="flex items-center justify-between py-3 border-b border-zinc-100 hover:bg-zinc-50 px-2 -mx-2 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-zinc-900">
                    {cat.name}
                  </span>
                  <span className="text-xs text-zinc-400 ml-3">
                    {cat.description}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 flex-shrink-0 ml-4">
                  {visited}/{catComponents.length}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
