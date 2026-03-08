interface LearningChecklistProps {
  slug: string;
  objectives: string[];
  isComplete: (slug: string, objective: string) => boolean;
  onToggle: (slug: string, objective: string) => void;
}

export function LearningChecklist({
  slug,
  objectives,
  isComplete,
  onToggle,
}: LearningChecklistProps) {
  const completedCount = objectives.filter((o) => isComplete(slug, o)).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Learning objectives
        </h3>
        <span className="text-xs text-zinc-400">
          {completedCount}/{objectives.length}
        </span>
      </div>
      <div className="space-y-1">
        {objectives.map((objective) => (
          <label
            key={objective}
            className="flex items-start gap-2.5 p-2 rounded-sm hover:bg-zinc-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={isComplete(slug, objective)}
              onChange={() => onToggle(slug, objective)}
              className="mt-0.5 rounded-sm border-zinc-300 text-amber-600 focus:ring-amber-500"
            />
            <span
              className={`text-sm ${
                isComplete(slug, objective)
                  ? 'text-zinc-400 line-through'
                  : 'text-zinc-600'
              }`}
            >
              {objective}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
