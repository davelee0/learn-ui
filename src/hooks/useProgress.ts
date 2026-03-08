import { useState, useCallback } from 'react';
import type { LearningProgress } from '../types/component';

const STORAGE_KEY = 'ui-learn-progress';

function loadProgress(): LearningProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    completedObjectives: {},
    visitedComponents: [],
    lastVisited: null,
    startedAt: new Date().toISOString(),
  };
}

function saveProgress(progress: LearningProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<LearningProgress>(loadProgress);

  const markVisited = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        lastVisited: slug,
        visitedComponents: prev.visitedComponents.includes(slug)
          ? prev.visitedComponents
          : [...prev.visitedComponents, slug],
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleObjective = useCallback((slug: string, objective: string) => {
    setProgress((prev) => {
      const current = prev.completedObjectives[slug] || [];
      const updated = current.includes(objective)
        ? current.filter((o) => o !== objective)
        : [...current, objective];
      const next = {
        ...prev,
        completedObjectives: { ...prev.completedObjectives, [slug]: updated },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const isObjectiveComplete = useCallback(
    (slug: string, objective: string) => {
      return (progress.completedObjectives[slug] || []).includes(objective);
    },
    [progress]
  );

  const getComponentProgress = useCallback(
    (slug: string, totalObjectives: number) => {
      const completed = (progress.completedObjectives[slug] || []).length;
      return totalObjectives > 0 ? completed / totalObjectives : 0;
    },
    [progress]
  );

  return {
    progress,
    markVisited,
    toggleObjective,
    isObjectiveComplete,
    getComponentProgress,
  };
}
