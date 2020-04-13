import { editor } from 'monaco-editor';
import { transformCodeToLogResult } from '../../helpers/compiler';
import { getRunnableCode, getUriWorkerGetter } from '../../helpers/editor/worker';
import { ensureNonNullable } from '../../helpers/type';

export const createCodeEvaluator = (
  workerGetter: ReturnType<typeof getUriWorkerGetter>,
  runnableCodeGetter: typeof getRunnableCode,
  emittedCodeTransformer: typeof transformCodeToLogResult,
  chromeEval: typeof chrome.devtools.inspectedWindow.eval,
) => (actionEditor: editor.ICodeEditor): Promise<void> => {
  const model = ensureNonNullable(actionEditor.getModel());

  return workerGetter(model.uri)
    .then(runnableCodeGetter(model.uri))
    .then(emittedCodeTransformer)
    .then(chromeEval);
};
