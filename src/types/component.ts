export type CategoryId =
  | 'form-input'
  | 'navigation-layout'
  | 'feedback-status'
  | 'interactive'
  | 'content-display'
  | 'specialized-utility';

export interface AccessibilityInfo {
  ariaRoles: string[];
  keyboardInteraction: string[];
  screenReaderNotes: string;
  commonPitfalls: string[];
}

export interface DemoVariant {
  name: string;
  description: string;
  props: Record<string, unknown>;
}

export interface DemoConfig {
  variants: DemoVariant[];
  codeExample: string;
  htmlEquivalent?: string;
}

export interface ComponentData {
  slug: string;
  name: string;
  aliases: string[];
  category: CategoryId;
  description: string;
  purpose: string;
  whenToUse: string[];
  whenNotToUse: string[];
  accessibility: AccessibilityInfo;
  bestPractices: string[];
  commonMistakes: string[];
  hasDemo: boolean;
  demoConfig?: DemoConfig;
  learningObjectives: string[];
  relatedComponents: string[];
  componentGalleryUrl: string;
  exampleCount: number;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface LearningProgress {
  completedObjectives: Record<string, string[]>;
  visitedComponents: string[];
  lastVisited: string | null;
  startedAt: string;
}
