import { useState } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type CardVariant = 'basic' | 'image' | 'clickable' | 'horizontal';

export default function CardDemo() {
  const [variant, setVariant] = useState<CardVariant>('basic');
  const [clickCount, setClickCount] = useState(0);

  const renderCard = () => {
    switch (variant) {
      case 'basic':
        return (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-sm w-full overflow-hidden">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Basic Card
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                The simplest card pattern. A container with padding, border,
                and shadow to visually group related content. Cards work well
                for displaying discrete units of information.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                  Design
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  Layout
                </span>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-sm w-full overflow-hidden">
            {/* Image placeholder with aspect ratio */}
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
                <p className="mt-1 text-xs text-indigo-400">16:9 aspect ratio</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Tutorial
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                Card with Image
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Images are constrained by aspect-ratio to prevent layout shift.
                The image area uses a gradient placeholder.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                  <p className="text-xs text-gray-400">Mar 4, 2026</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'clickable':
        return (
          <button
            onClick={() => setClickCount((c) => c + 1)}
            className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-sm w-full overflow-hidden text-left transition-all hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:translate-y-0 active:shadow-sm"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Clickable Card
                </h3>
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                The entire card is a single click target. Notice the hover
                lift effect, the focus ring for keyboard users, and the
                active press-down state. This uses a button element for
                proper semantics.
              </p>
              <p className="mt-3 text-xs text-indigo-600 font-medium">
                Clicked {clickCount} time{clickCount !== 1 ? 's' : ''}
              </p>
            </div>
          </button>
        );

      case 'horizontal':
        return (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-lg w-full overflow-hidden">
            <div className="flex">
              {/* Side image / media area */}
              <div className="w-40 shrink-0 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              {/* Content area */}
              <div className="p-5 flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Document
                </p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">
                  Horizontal Layout
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  Side-by-side layout with a fixed-width media area and
                  flexible content. Great for list items.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs text-gray-400">2.4 MB</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">PDF</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DemoContainer
      controls={
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Card Variant
          </label>
          <div className="flex gap-2 flex-wrap">
            {(['basic', 'image', 'clickable', 'horizontal'] as CardVariant[]).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => {
                    setVariant(v);
                    setClickCount(0);
                  }}
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
      }
      tips={[
        'Clickable cards should use a <button> or <a> element, not a div with onClick -- this ensures keyboard accessibility and proper semantics.',
        'Image cards use aspect-ratio (aspect-video) to reserve space before the image loads, preventing layout shift.',
        'The horizontal variant works well for list-like displays such as file lists, search results, or product catalogs.',
        'Watch the hover, focus, and active states on the clickable card -- each provides distinct feedback to the user.',
      ]}
    >
      {renderCard()}
    </DemoContainer>
  );
}
