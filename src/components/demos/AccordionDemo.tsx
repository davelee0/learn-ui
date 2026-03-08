import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type Variant = 'button' | 'details';

interface AccordionSection {
  id: string;
  title: string;
  content: string;
}

const sections: AccordionSection[] = [
  {
    id: 'what',
    title: 'What is an accordion?',
    content:
      'An accordion is a vertically stacked set of interactive headings that each reveal a section of content. They are useful for reducing page length and letting users focus on specific sections without scrolling past irrelevant information.',
  },
  {
    id: 'when',
    title: 'When should I use one?',
    content:
      'Use accordions for FAQ sections, settings panels, or any content that can be logically grouped and where users typically need only one section at a time. Avoid them if users need to compare content across sections or if there are only 1-2 sections.',
  },
  {
    id: 'accessibility',
    title: 'How do I make them accessible?',
    content:
      'Use proper ARIA attributes: aria-expanded on the trigger button, aria-controls pointing to the panel ID, and ensure the trigger is a button element (not a div). The content panel should have role="region" and aria-labelledby pointing back to the trigger. Keyboard users expect Enter and Space to toggle sections.',
  },
];

export default function AccordionDemo() {
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [variant, setVariant] = useState<Variant>('button');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['what']));

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <DemoContainer
      controls={
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Implementation
            </label>
            <div className="flex gap-2">
              {(['button', 'details'] as Variant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    variant === v
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {v === 'button' ? 'Button + ARIA' : '<details> / <summary>'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={allowMultiple}
                onChange={(e) => setAllowMultiple(e.target.checked)}
                className="rounded border-gray-300"
              />
              Allow multiple open
            </label>
          </div>
        </>
      }
      tips={[
        'Two approaches side by side: the button+ARIA approach gives full control, while <details>/<summary> provides built-in browser behavior for free.',
        'aria-expanded tells screen readers whether a section is open or closed.',
        'Consider whether users need to compare sections -- if so, show all content instead of hiding it in an accordion.',
        'The "allow multiple" toggle changes whether opening one section closes others (exclusive mode) or not.',
      ]}
    >
      <div className="w-full max-w-lg">
        {variant === 'button' ? (
          /* Button-based accordion with ARIA */
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {sections.map((section) => {
              const isOpen = openSections.has(section.id);
              return (
                <div key={section.id}>
                  <h3>
                    <button
                      id={`accordion-trigger-${section.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`accordion-panel-${section.id}`}
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span>{section.title}</span>
                      <svg
                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`accordion-panel-${section.id}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${section.id}`}
                    hidden={!isOpen}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Native details/summary accordion */
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {sections.map((section) => (
              <details
                key={section.id}
                className="group"
                open={openSections.has(section.id)}
                onToggle={(e) => {
                  const isNowOpen = (e.target as HTMLDetailsElement).open;
                  setOpenSections((prev) => {
                    const next = new Set(prev);
                    if (isNowOpen) {
                      if (!allowMultiple) next.clear();
                      next.add(section.id);
                    } else {
                      next.delete(section.id);
                    }
                    return next;
                  });
                }}
              >
                <summary className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 list-none [&::-webkit-details-marker]:hidden">
                  <span>{section.title}</span>
                  <svg
                    className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </details>
            ))}
          </div>
        )}

        <p className="mt-3 text-xs text-gray-400 text-center">
          Implementation: {variant === 'button' ? 'button + aria-expanded' : 'native <details> / <summary>'} | Open sections: {openSections.size === 0 ? 'none' : Array.from(openSections).join(', ')}
        </p>
      </div>
    </DemoContainer>
  );
}
