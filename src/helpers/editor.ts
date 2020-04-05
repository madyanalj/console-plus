import { editor } from 'monaco-editor';

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorkerUrl(moduleId: string, label: string): string;
    };
  }
}

export const TYPESCRIPT_WORKER_URL = '../ts.worker.js';

export function createEditor(container: HTMLDivElement): void {
  if (!self.MonacoEnvironment) {
    self.MonacoEnvironment = {
      getWorkerUrl: (): string => TYPESCRIPT_WORKER_URL,
    };
  }

  editor.create(container, {
    value: [
      'function x(): void {',
      '  console.log("Hello world!");',
      '}',
    ].join('\n'),
    language: 'typescript',
    theme: 'vs-dark',
  });
}
