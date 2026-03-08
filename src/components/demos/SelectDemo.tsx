import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

export default function SelectDemo() {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [value, setValue] = useState('');

  return (
    <DemoContainer
      controls={
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
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              className="rounded border-gray-300"
            />
            Required
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={showPlaceholder}
              onChange={(e) => {
                setShowPlaceholder(e.target.checked);
                if (!e.target.checked && !value) {
                  setValue('js');
                }
              }}
              className="rounded border-gray-300"
            />
            Show placeholder
          </label>
        </div>
      }
      tips={[
        'Native <select> gets free keyboard navigation: type letters to jump, use arrow keys to browse, Enter to select.',
        'Custom select dropdowns often break keyboard and screen reader support -- prefer native unless you have a strong reason.',
        'Option groups (<optgroup>) provide visual and semantic grouping, announced by screen readers.',
        'A disabled first option with empty value acts as a placeholder and works well with the "required" attribute for validation.',
      ]}
    >
      <div className="w-full max-w-sm">
        <label
          htmlFor="demo-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Programming language
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          <select
            id="demo-select"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            required={required}
            className={`
              block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10
              text-sm shadow-sm transition-colors
              focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
              disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
              appearance-none
              ${!value ? 'text-gray-400' : 'text-gray-900'}
            `}
          >
            {showPlaceholder && (
              <option value="" disabled>
                Choose a language...
              </option>
            )}

            <optgroup label="Web Languages">
              <option value="js">JavaScript</option>
              <option value="ts">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </optgroup>

            <optgroup label="Systems Languages">
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
            </optgroup>

            <optgroup label="Scripting Languages">
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </optgroup>
          </select>

          {/* Custom chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <p className="mt-1.5 text-sm text-gray-500">
          Select the language you are most comfortable with.
        </p>

        {value && (
          <p className="mt-3 text-xs text-gray-400">
            Selected value: <code className="bg-gray-100 px-1 py-0.5 rounded">{value}</code>
          </p>
        )}
      </div>
    </DemoContainer>
  );
}
