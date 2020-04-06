import { editor, languages } from 'monaco-editor';

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorkerUrl(moduleId: string, label: string): string;
    };
  }
}

export const TYPESCRIPT_WORKER_URL = '../ts.worker.js';

export function createEditor(container: HTMLDivElement): editor.IStandaloneCodeEditor {
  if (!self.MonacoEnvironment) {
    self.MonacoEnvironment = {
      getWorkerUrl: (): string => TYPESCRIPT_WORKER_URL,
    };
  }

  return editor.create(container, {
    value: [
      'function x(): void {',
      '  console.log("Hello world!");',
      '}',
    ].join('\n'),
    language: 'typescript',
    theme: 'vs-dark',
    minimap: { enabled: false },
  });
}

export function getRunnableJavaScript(editorInstance: editor.IStandaloneCodeEditor): Promise<string> {
  const model = editorInstance.getModel();
  if (!model) throw new Error('editorInstance passed must have a model');

  return languages.typescript.getTypeScriptWorker()
    .then((worker) => worker(model.uri))
    .then(({ getEmitOutput }) => getEmitOutput(model.uri.toString()))
    .then(({ outputFiles }: languages.typescript.EmitOutput) => outputFiles[0].text);
}
