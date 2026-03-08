import { useState, useEffect, useRef, useCallback } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openModal = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    setResult(null);
  };

  const closeModal = useCallback((resultText?: string) => {
    setIsOpen(false);
    if (resultText) setResult(resultText);
    // Return focus to trigger element
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, []);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Auto-focus first focusable element
    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal('Closed via Escape key');
      }
    };

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal('Closed via backdrop click');
    }
  };

  return (
    <DemoContainer
      controls={
        <div className="text-xs text-gray-500">
          Try these interactions when the modal is open: press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Escape</kbd> to close, press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Tab</kbd> to see focus trapping, click the backdrop to close.
        </div>
      }
      tips={[
        'Focus trapping: Tab and Shift+Tab cycle through only the elements inside the modal, never escaping to the page behind.',
        'When the modal closes, focus returns to the button that opened it -- this is critical for keyboard users to maintain their place.',
        'The backdrop click and Escape key are both expected ways to dismiss a modal. Some modals (confirmation dialogs) may disable backdrop click.',
        'Scroll lock prevents the background page from scrolling while the modal is open, avoiding a confusing visual.',
      ]}
    >
      <div className="flex flex-col items-center gap-4">
        <button
          ref={triggerRef}
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Open Modal
        </button>

        {result && (
          <p className="text-sm text-gray-500">
            Last action: <span className="font-medium text-gray-700">{result}</span>
          </p>
        )}

        {/* Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 transition-opacity" aria-hidden="true" />

            {/* Modal panel */}
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto transform transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Confirm Action
                </h2>
                <button
                  onClick={() => closeModal('Closed via X button')}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p id="modal-description" className="text-sm text-gray-600">
                  This is a modal dialog that demonstrates proper focus management,
                  keyboard interactions, and accessibility patterns. Try pressing
                  Tab to see focus stay within the modal.
                </p>
                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                  <label htmlFor="modal-input" className="block text-xs font-medium text-gray-600 mb-1">
                    Enter something (to test focus trapping)
                  </label>
                  <input
                    id="modal-input"
                    type="text"
                    placeholder="Type here..."
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => closeModal('Cancelled via button')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => closeModal('Confirmed via button')}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
}
