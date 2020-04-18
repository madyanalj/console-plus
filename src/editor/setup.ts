declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorkerUrl(moduleId: string, label: string): string;
    };
  }
}

export const setupMonacoEnvironment = (window: Window): void => {
  window.MonacoEnvironment = {
    getWorkerUrl: (): string => '../ts.worker.js',
  };
};

export const EDITOR_OPTIONS = {
  language: 'typescript',
  theme: 'vs-dark',
  minimap: { enabled: false },
};
