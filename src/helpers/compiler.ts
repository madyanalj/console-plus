import { editor, languages, Uri } from 'monaco-editor';

export type TypeScriptWorkerGetter = (...uris: Uri[]) => Promise<languages.typescript.TypeScriptWorker>;

export const getRunnableJavaScript = (
  getWorker: TypeScriptWorkerGetter,
  editorInstance: editor.ICodeEditor,
): Promise<string> => {
  const model = editorInstance.getModel();
  if (!model) throw new Error('editorInstance passed must have a model');

  return getWorker(model.uri)
    .then(({ getEmitOutput }) => getEmitOutput(model.uri.toString()))
    .then(({ outputFiles }: languages.typescript.EmitOutput) => outputFiles[0].text);
};

export const transformCodeToLogResult = (code: string): string =>
  `console.log(eval(${JSON.stringify(code)}))`;
