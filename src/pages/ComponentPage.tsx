import { useParams, Link } from 'react-router-dom';
import { Suspense, useEffect, useState, lazy } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { components } from '../data/components';
import { useProgress } from '../hooks/useProgress';
import { CodeBlock } from '../components/ui/CodeBlock';
import { LearningChecklist } from '../components/ui/LearningChecklist';

const demoRegistry: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  button: lazy(() => import('../components/demos/ButtonDemo')),
  'text-input': lazy(() => import('../components/demos/TextInputDemo')),
  checkbox: lazy(() => import('../components/demos/CheckboxDemo')),
  select: lazy(() => import('../components/demos/SelectDemo')),
  toggle: lazy(() => import('../components/demos/ToggleDemo')),
  tabs: lazy(() => import('../components/demos/TabsDemo')),
  alert: lazy(() => import('../components/demos/AlertDemo')),
  toast: lazy(() => import('../components/demos/ToastDemo')),
  modal: lazy(() => import('../components/demos/ModalDemo')),
  accordion: lazy(() => import('../components/demos/AccordionDemo')),
  card: lazy(() => import('../components/demos/CardDemo')),
  badge: lazy(() => import('../components/demos/BadgeDemo')),
};

type Tab = 'overview' | 'demo' | 'code' | 'accessibility' | 'checklist';

export function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { markVisited, isObjectiveComplete, toggleObjective } = useProgress();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const comp = components.find((c) => c.slug === slug);

  useEffect(() => {
    if (slug) markVisited(slug);
  }, [slug, markVisited]);

  if (!comp) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 text-sm">Component not found.</p>
        <Link to="/catalog" className="text-amber-700 text-sm mt-2 inline-block">
          Back to catalog
        </Link>
      </div>
    );
  }

  const DemoComponent = comp.hasDemo ? demoRegistry[comp.slug] : null;

  const tabs: { id: Tab; label: string; disabled?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'demo', label: 'Demo', disabled: !comp.hasDemo },
    { id: 'code', label: 'Code', disabled: !comp.demoConfig },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'checklist', label: 'Checklist' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link
          to="/catalog"
          className="flex items-center gap-1 hover:text-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Catalog
        </Link>
        <span>/</span>
        <span className="text-zinc-700">{comp.name}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium text-zinc-900">{comp.name}</h1>
          {comp.aliases.length > 0 && (
            <p className="text-xs text-zinc-400 mt-0.5">
              Also: {comp.aliases.join(', ')}
            </p>
          )}
        </div>
        <a
          href={comp.componentGalleryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          {comp.exampleCount} examples
        </a>
      </div>

      <div className="border-b border-zinc-200">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`px-3 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-600 text-amber-800'
                  : tab.disabled
                    ? 'border-transparent text-zinc-300 cursor-not-allowed'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-600">{comp.description}</p>
              <p className="text-xs text-zinc-400 mt-1">
                <span className="font-medium">Purpose:</span> {comp.purpose}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  When to use
                </h3>
                <ul className="space-y-1">
                  {comp.whenToUse.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-600 flex gap-2">
                      <span className="text-emerald-600 font-mono text-xs mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  When not to use
                </h3>
                <ul className="space-y-1">
                  {comp.whenNotToUse.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-600 flex gap-2">
                      <span className="text-red-500 font-mono text-xs mt-0.5">&minus;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                Best practices
              </h3>
              <ul className="space-y-1">
                {comp.bestPractices.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-600 flex gap-2">
                    <span className="text-zinc-400 font-mono text-xs mt-0.5">*</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-100 pt-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                Common mistakes
              </h3>
              <ul className="space-y-1">
                {comp.commonMistakes.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-600 flex gap-2">
                    <span className="text-amber-600 font-mono text-xs mt-0.5">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {comp.relatedComponents.length > 0 && (
              <div className="border-t border-zinc-100 pt-4">
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  Related
                </h3>
                <div className="flex gap-1.5 flex-wrap">
                  {comp.relatedComponents.map((slug) => {
                    const related = components.find((c) => c.slug === slug);
                    if (!related) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/component/${slug}`}
                        className="text-xs bg-zinc-100 text-zinc-600 hover:text-amber-700 hover:bg-amber-50 px-2 py-0.5 rounded-sm transition-colors"
                      >
                        {related.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'demo' && (
          <div>
            {DemoComponent ? (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20 text-zinc-400 text-sm">
                    Loading...
                  </div>
                }
              >
                <DemoComponent />
              </Suspense>
            ) : (
              <div className="text-center py-20 text-zinc-400 text-sm">
                <p>Demo coming soon.</p>
                <a
                  href={comp.componentGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 text-sm mt-2 inline-block"
                >
                  View examples on component.gallery
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'code' && comp.demoConfig && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                React / JSX
              </h3>
              <CodeBlock code={comp.demoConfig.codeExample} />
            </div>
            {comp.demoConfig.htmlEquivalent && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  HTML equivalent
                </h3>
                <CodeBlock code={comp.demoConfig.htmlEquivalent} language="html" />
              </div>
            )}
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div className="space-y-5">
            {comp.accessibility.ariaRoles.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  ARIA roles & attributes
                </h3>
                <div className="flex gap-1.5 flex-wrap">
                  {comp.accessibility.ariaRoles.map((role) => (
                    <code
                      key={role}
                      className="text-xs font-mono bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded-sm"
                    >
                      {role}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {comp.accessibility.keyboardInteraction.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  Keyboard interaction
                </h3>
                <div className="border border-zinc-200 rounded-sm overflow-hidden">
                  {comp.accessibility.keyboardInteraction.map((item, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 text-sm text-zinc-600 ${
                        i > 0 ? 'border-t border-zinc-100' : ''
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                Screen reader notes
              </h3>
              <p className="text-sm text-zinc-600">
                {comp.accessibility.screenReaderNotes}
              </p>
            </div>

            {comp.accessibility.commonPitfalls.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  Accessibility pitfalls
                </h3>
                <ul className="space-y-1">
                  {comp.accessibility.commonPitfalls.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-600 flex gap-2">
                      <span className="text-amber-600 font-mono text-xs mt-0.5">!</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checklist' && (
          <LearningChecklist
            slug={comp.slug}
            objectives={comp.learningObjectives}
            isComplete={isObjectiveComplete}
            onToggle={toggleObjective}
          />
        )}
      </div>
    </div>
  );
}
