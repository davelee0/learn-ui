import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  ghost:
    'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function ButtonDemo() {
  const [variant, setVariant] = useState<Variant>('primary');
  const [size, setSize] = useState<Size>('md');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (!loading) {
      setClickCount((c) => c + 1);
    }
  };

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Variant
            </label>
            <div className="flex gap-2">
              {(['primary', 'secondary', 'destructive', 'ghost'] as Variant[]).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      variant === v
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {v}
                  </button>
                )
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Size
            </label>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as Size[]).map((s) => (
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
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="rounded border-gray-300"
              />
              Disabled
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
                className="rounded border-gray-300"
              />
              Loading
            </label>
          </div>
        </>
      }
      tips={[
        'Try tabbing to the button and pressing Enter or Space -- notice the focus ring appears for keyboard users.',
        'The disabled state reduces contrast and removes hover effects, signaling it is not interactive.',
        'Visual hierarchy: primary (filled) draws the most attention, ghost (transparent) draws the least.',
        'Loading state should prevent duplicate submissions -- try clicking rapidly while loading is on.',
      ]}
    >
      <div className="flex flex-col items-center gap-4">
        <button
          disabled={disabled || loading}
          onClick={handleClick}
          className={`
            inline-flex items-center justify-center gap-2 rounded-md font-medium
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:cursor-not-allowed
            ${variantClasses[variant]}
            ${sizeClasses[size]}
          `}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {loading ? 'Processing...' : 'Click me'}
        </button>
        <p className="text-sm text-gray-500">
          Click count: <span className="font-semibold text-gray-900">{clickCount}</span>
        </p>
      </div>
    </DemoContainer>
  );
}
