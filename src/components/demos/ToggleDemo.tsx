import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type ToggleSize = 'sm' | 'md';
type LabelPosition = 'left' | 'right';

const trackSizes: Record<ToggleSize, string> = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
};

const thumbSizes: Record<ToggleSize, { base: string; translate: string }> = {
  sm: { base: 'h-3 w-3', translate: 'translate-x-4' },
  md: { base: 'h-5 w-5', translate: 'translate-x-5' },
};

export default function ToggleDemo() {
  const [size, setSize] = useState<ToggleSize>('md');
  const [disabled, setDisabled] = useState(false);
  const [labelPosition, setLabelPosition] = useState<LabelPosition>('right');

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  function Toggle({
    checked,
    onChange,
    label,
    description,
    id,
  }: {
    checked: boolean;
    onChange: (val: boolean) => void;
    label: string;
    description?: string;
    id: string;
  }) {
    const toggle = (
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${trackSizes[size]}
          ${checked ? 'bg-indigo-600' : 'bg-gray-200'}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0
            transition-transform duration-200 ease-in-out
            ${thumbSizes[size].base}
            ${checked ? thumbSizes[size].translate : 'translate-x-0'}
            ${size === 'sm' ? 'mt-0.5 ml-0.5' : 'mt-0.5 ml-0.5'}
          `}
        />
      </button>
    );

    const labelContent = (
      <div>
        <span
          id={`${id}-label`}
          className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {label}
        </span>
        {description && (
          <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>
    );

    return (
      <div className={`flex items-center gap-3 ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : ''}`}>
        {toggle}
        {labelContent}
      </div>
    );
  }

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Size
            </label>
            <div className="flex gap-2">
              {(['sm', 'md'] as ToggleSize[]).map((s) => (
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
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Label Position
            </label>
            <div className="flex gap-2">
              {(['left', 'right'] as LabelPosition[]).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setLabelPosition(pos)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    labelPosition === pos
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {pos}
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
          </div>
        </>
      }
      tips={[
        'Toggles use role="switch" and aria-checked for screen readers -- different from checkboxes which use role="checkbox".',
        'Toggles should cause an immediate effect (like the dark mode toggle changing the background). Checkboxes are for forms submitted later.',
        'The "Dark mode" toggle below has a visible, immediate result -- this is the key differentiator from a checkbox.',
        'Label position (left or right) can affect scannability in settings panels.',
      ]}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg space-y-5 transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <Toggle
          id="dark-mode"
          checked={darkMode}
          onChange={setDarkMode}
          label="Dark mode"
          description="Switch the demo area between light and dark backgrounds"
        />
        <Toggle
          id="notifications"
          checked={notifications}
          onChange={setNotifications}
          label="Notifications"
          description="Receive push notifications for updates"
        />
        <Toggle
          id="auto-save"
          checked={autoSave}
          onChange={setAutoSave}
          label="Auto-save"
          description="Automatically save changes as you type"
        />

        <div className={`pt-3 border-t text-xs ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
          State: dark={String(darkMode)}, notifications={String(notifications)}, autoSave={String(autoSave)}
        </div>
      </div>
    </DemoContainer>
  );
}
