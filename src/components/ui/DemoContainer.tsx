import type { ReactNode } from 'react';

interface DemoContainerProps {
  children: ReactNode;
  controls?: ReactNode;
  tips?: string[];
}

export function DemoContainer({ children, controls, tips }: DemoContainerProps) {
  return (
    <div className="space-y-3">
      {controls && (
        <div className="bg-zinc-50 rounded-sm p-4 space-y-3">{controls}</div>
      )}
      <div className="border-2 border-dashed border-zinc-200 rounded-sm p-8 flex items-center justify-center min-h-[200px] bg-white">
        {children}
      </div>
      {tips && tips.length > 0 && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-3">
          <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
            What to notice
          </h4>
          <ul className="text-sm text-zinc-600 space-y-1">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-zinc-400 font-mono text-xs mt-0.5">-</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
