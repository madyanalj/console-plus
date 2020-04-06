import { editor, languages } from 'monaco-editor';

export function getRunnableJavaScript(editorInstance: editor.ICodeEditor): Promise<string> {
  const model = editorInstance.getModel();
  if (!model) throw new Error('editorInstance passed must have a model');

  return languages.typescript.getTypeScriptWorker()
    .then((worker) => worker(model.uri))
    .then(({ getEmitOutput }) => getEmitOutput(model.uri.toString()))
    .then(({ outputFiles }: languages.typescript.EmitOutput) => outputFiles[0].text);
}
