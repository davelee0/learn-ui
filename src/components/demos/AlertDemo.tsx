import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type Severity = 'info' | 'success' | 'warning' | 'error';

interface AlertConfig {
  bg: string;
  border: string;
  iconColor: string;
  titleColor: string;
  textColor: string;
  icon: React.ReactNode;
}

const severityConfig: Record<Severity, AlertConfig> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
    textColor: 'text-green-700',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-700',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    textColor: 'text-red-700',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const titles: Record<Severity, string> = {
  info: 'Did you know?',
  success: 'Operation completed',
  warning: 'Please be careful',
  error: 'Something went wrong',
};

const descriptions: Record<Severity, string> = {
  info: 'Alerts convey important information to the user. They can be purely informational, or they can indicate success, warning, or error states.',
  success: 'Your changes have been saved successfully. The new settings will take effect within a few minutes.',
  warning: 'Your session will expire in 5 minutes. Please save your work to avoid losing any unsaved changes.',
  error: 'We were unable to process your request. Please check your connection and try again. If the problem persists, contact support.',
};

export default function AlertDemo() {
  const [severity, setSeverity] = useState<Severity>('info');
  const [dismissible, setDismissible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const config = severityConfig[severity];

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => setDismissed(false), 1500);
  };

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Severity
            </label>
            <div className="flex gap-2">
              {(['info', 'success', 'warning', 'error'] as Severity[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSeverity(s);
                    setDismissed(false);
                  }}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    severity === s
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
                checked={dismissible}
                onChange={(e) => setDismissible(e.target.checked)}
                className="rounded border-gray-300"
              />
              Dismissible
            </label>
          </div>
        </>
      }
      tips={[
        'Alerts use role="alert" to announce their content to screen readers immediately when they appear.',
        'Color alone should not convey severity -- icons provide a redundant visual cue for color-blind users.',
        'Dismissible alerts should have a clear close button with an accessible label.',
        'Success and error alerts often appear after user actions (form submissions, API responses), while info and warning can be static.',
      ]}
    >
      <div className="w-full max-w-lg">
        {dismissed ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-400">Alert dismissed. Reappearing shortly...</p>
          </div>
        ) : (
          <div
            role="alert"
            className={`rounded-lg border p-4 ${config.bg} ${config.border}`}
          >
            <div className="flex">
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                {config.icon}
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium ${config.titleColor}`}>
                  {titles[severity]}
                </h3>
                <p className={`mt-1 text-sm ${config.textColor}`}>
                  {descriptions[severity]}
                </p>
              </div>
              {dismissible && (
                <div className="ml-auto pl-3">
                  <button
                    onClick={handleDismiss}
                    className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${config.iconColor} hover:${config.bg} focus:ring-offset-${config.bg}`}
                    aria-label="Dismiss alert"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
}
