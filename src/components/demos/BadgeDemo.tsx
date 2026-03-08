import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeConfig {
  bg: string;
  text: string;
  dot: string;
  label: string;
}

const variantConfig: Record<BadgeVariant, BadgeConfig> = {
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
    label: 'Default',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
    label: 'Active',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'Pending',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
    label: 'Failed',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    label: 'Info',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

export default function BadgeDemo() {
  const [selectedVariant, setSelectedVariant] = useState<BadgeVariant>('success');
  const [size, setSize] = useState<BadgeSize>('sm');
  const [showDot, setShowDot] = useState(false);

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Variant
            </label>
            <div className="flex gap-2 flex-wrap">
              {(
                ['default', 'success', 'warning', 'error', 'info'] as BadgeVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    selectedVariant === v
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Size
            </label>
            <div className="flex gap-2">
              {(['sm', 'md'] as BadgeSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    size === s
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={showDot}
                onChange={(e) => setShowDot(e.target.checked)}
                className="rounded border-gray-300"
              />
              Show dot indicator
            </label>
          </div>
        </>
      }
      tips={[
        'Color alone is not sufficient to convey meaning -- combine color with text labels and optionally icons or dots for accessibility.',
        'Badges are non-interactive status indicators. If you need a clickable label, use a chip or tag component instead.',
        'Smaller badges (sm) are for inline metadata. Larger badges (md) work better as standalone status indicators.',
        'The dot indicator adds a visual cue that reinforces the status, helpful for users with color vision deficiency.',
      ]}
    >
      <div className="w-full max-w-md space-y-8">
        {/* Single controlled badge */}
        <div className="text-center">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Controlled Badge
          </h3>
          <span
            className={`
              inline-flex items-center gap-1.5 font-medium rounded-full
              ${variantConfig[selectedVariant].bg}
              ${variantConfig[selectedVariant].text}
              ${sizeClasses[size]}
            `}
          >
            {showDot && (
              <span
                className={`rounded-full ${variantConfig[selectedVariant].dot} ${dotSizeClasses[size]}`}
                aria-hidden="true"
              />
            )}
            {variantConfig[selectedVariant].label}
          </span>
        </div>

        {/* All variants shown together */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            All Variants
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {(Object.keys(variantConfig) as BadgeVariant[]).map((v) => {
              const config = variantConfig[v];
              return (
                <span
                  key={v}
                  className={`
                    inline-flex items-center gap-1.5 font-medium rounded-full
                    ${config.bg} ${config.text} ${sizeClasses[size]}
                  `}
                >
                  {showDot && (
                    <span
                      className={`rounded-full ${config.dot} ${dotSizeClasses[size]}`}
                      aria-hidden="true"
                    />
                  )}
                  {config.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* In-context example */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            In Context
          </h3>
          <div className="space-y-3">
            {[
              { name: 'API Service', variant: 'success' as BadgeVariant, detail: 'Uptime: 99.9%' },
              { name: 'Database Migration', variant: 'warning' as BadgeVariant, detail: 'In progress' },
              { name: 'Build Pipeline', variant: 'error' as BadgeVariant, detail: 'Exit code: 1' },
              { name: 'Documentation', variant: 'info' as BadgeVariant, detail: 'Updated 2h ago' },
            ].map((item) => {
              const config = variantConfig[item.variant];
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span
                      className={`
                        inline-flex items-center gap-1.5 font-medium rounded-full
                        ${config.bg} ${config.text} ${sizeClasses.sm}
                      `}
                    >
                      {showDot && (
                        <span
                          className={`rounded-full ${config.dot} ${dotSizeClasses.sm}`}
                          aria-hidden="true"
                        />
                      )}
                      {config.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DemoContainer>
  );
}
