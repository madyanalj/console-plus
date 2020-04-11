import { editor } from 'monaco-editor';
import { createRunSnippetAction } from './action';

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorkerUrl(moduleId: string, label: string): string;
    };
  }
}

export function createEditor(
  container: HTMLDivElement,
  runCodeCallback: (code: string) => void,
): editor.IStandaloneCodeEditor {
  if (!self.MonacoEnvironment) {
    self.MonacoEnvironment = {
      getWorkerUrl: (): string => '../ts.worker.js',
    };
  }

  const instance = editor.create(container, {
    value: [
      'function x(): void {',
      '  console.log("Hello world!");',
      '}',
    ].join('\n'),
    language: 'typescript',
    theme: 'vs-dark',
    minimap: { enabled: false },
  });

  instance.addAction(createRunSnippetAction(runCodeCallback));

  return instance;
}
