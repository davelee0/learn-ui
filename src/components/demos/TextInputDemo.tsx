import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type InputType = 'text' | 'email' | 'password' | 'number';

export default function TextInputDemo() {
  const [inputType, setInputType] = useState<InputType>('text');
  const [required, setRequired] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [value, setValue] = useState('');

  const inputId = 'demo-input';

  const placeholders: Record<InputType, string> = {
    text: 'Enter your name',
    email: 'you@example.com',
    password: 'Enter password',
    number: '42',
  };

  const labels: Record<InputType, string> = {
    text: 'Full name',
    email: 'Email address',
    password: 'Password',
    number: 'Quantity',
  };

  const helperTexts: Record<InputType, string> = {
    text: 'Your first and last name as they appear on official documents.',
    email: 'We will never share your email with anyone else.',
    password: 'Must be at least 8 characters with one uppercase letter.',
    number: 'Enter a value between 1 and 100.',
  };

  const errorMessages: Record<InputType, string> = {
    text: 'Name is required and must contain only letters.',
    email: 'Please enter a valid email address.',
    password: 'Password does not meet the requirements.',
    number: 'Please enter a number between 1 and 100.',
  };

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Input Type
            </label>
            <div className="flex gap-2">
              {(['text', 'email', 'password', 'number'] as InputType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setInputType(t);
                    setValue('');
                  }}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    inputType === t
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
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
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="rounded border-gray-300"
              />
              Disabled
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={showError}
                onChange={(e) => setShowError(e.target.checked)}
                className="rounded border-gray-300"
              />
              Show error
            </label>
          </div>
        </>
      }
      tips={[
        'The label is associated with the input via the "htmlFor" / "id" pairing -- clicking the label focuses the input.',
        'Placeholders disappear when typing and should not replace labels. Users cannot reference placeholder text while filling the field.',
        'Error messages use aria-describedby so screen readers announce the validation feedback.',
        'The "required" attribute adds native browser validation, but custom validation messages are often preferred for consistency.',
      ]}
    >
      <div className="w-full max-w-sm">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {labels[inputType]}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholders[inputType]}
          required={required}
          disabled={disabled}
          aria-invalid={showError}
          aria-describedby={showError ? 'input-error' : 'input-helper'}
          className={`
            block w-full rounded-md px-3 py-2 text-sm shadow-sm
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            ${
              showError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
            }
            border
          `}
        />

        {showError ? (
          <p id="input-error" className="mt-1.5 text-sm text-red-600" role="alert">
            {errorMessages[inputType]}
          </p>
        ) : (
          <p id="input-helper" className="mt-1.5 text-sm text-gray-500">
            {helperTexts[inputType]}
          </p>
        )}

        {value && (
          <p className="mt-3 text-xs text-gray-400">
            Current value: <code className="bg-gray-100 px-1 py-0.5 rounded">{inputType === 'password' ? '***' : value}</code>
          </p>
        )}
      </div>
    </DemoContainer>
  );
}
