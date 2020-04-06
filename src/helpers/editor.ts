import { editor, KeyCode, KeyMod } from 'monaco-editor';
import { getRunnableJavaScript } from './compiler';

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorkerUrl(moduleId: string, label: string): string;
    };
  }
}

export enum EditorAction {
  RunSnippet = 'run-snippet',
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

  instance.addAction({
    id: EditorAction.RunSnippet,
    label: 'Run Snippet',
    keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
    contextMenuGroupId: 'run',
    contextMenuOrder: 0,
    run(editor): void {
      getRunnableJavaScript(editor).then(runCodeCallback);
    },
  });

  return instance;
}
