import { useState, useRef, useCallback } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

type TabVariant = 'underline' | 'pills' | 'boxed';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

const tabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Project Overview</h3>
        <p className="text-sm text-gray-600">
          This is the overview panel. Tabs organize content into separate views
          where only one view is visible at a time. They reduce clutter and help
          users find what they need quickly.
        </p>
        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">12 tasks</span>
        </div>
      </div>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    content: (
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Key Features</h3>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            Keyboard navigation with arrow keys
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            ARIA roles for screen reader support
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            Multiple visual variants
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            Content association via aria-labelledby
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Settings Panel</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Email notifications</span>
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600" />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Weekly digest</span>
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Dark mode</span>
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
          </label>
        </div>
      </div>
    ),
  },
];

export default function TabsDemo() {
  const [variant, setVariant] = useState<TabVariant>('underline');
  const [activeTab, setActiveTab] = useState('overview');
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setTabRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current.set(id, el);
    } else {
      tabRefs.current.delete(id);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabIds = tabs.map((t) => t.id);
    const currentIndex = tabIds.indexOf(activeTab);
    let newIndex: number | null = null;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabIds.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabIds.length - 1;
    }

    if (newIndex !== null) {
      setActiveTab(tabIds[newIndex]);
      tabRefs.current.get(tabIds[newIndex])?.focus();
    }
  };

  const getTabListClasses = (): string => {
    switch (variant) {
      case 'underline':
        return 'flex gap-0 border-b border-gray-200';
      case 'pills':
        return 'flex gap-1 bg-gray-100 p-1 rounded-lg';
      case 'boxed':
        return 'flex gap-0 bg-gray-100 p-0.5 rounded-lg';
    }
  };

  const getTabClasses = (isActive: boolean): string => {
    switch (variant) {
      case 'underline':
        return `px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
          isActive
            ? 'border-indigo-600 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`;
      case 'pills':
        return `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`;
      case 'boxed':
        return `px-4 py-2 text-sm font-medium rounded-md transition-colors flex-1 text-center ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`;
    }
  };

  return (
    <DemoContainer
      controls={
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Variant
          </label>
          <div className="flex gap-2">
            {(['underline', 'pills', 'boxed'] as TabVariant[]).map((v) => (
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
            ))}
          </div>
        </div>
      }
      tips={[
        'Use Left/Right arrow keys to move between tabs when the tab list is focused -- this is the expected keyboard pattern.',
        'Each tab uses role="tab" and aria-selected, while the panel uses role="tabpanel" with aria-labelledby linking back to its tab.',
        'The tablist uses roving tabindex: only the active tab has tabindex="0", others have tabindex="-1".',
        'Home and End keys jump to the first and last tabs respectively.',
      ]}
    >
      <div className="w-full max-w-lg">
        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Project tabs"
          onKeyDown={handleKeyDown}
          className={getTabListClasses()}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => setTabRef(tab.id, el)}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={getTabClasses(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
            className="p-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-b-lg"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </DemoContainer>
  );
}
