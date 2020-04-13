import { editor } from 'monaco-editor';
import { transformCodeToLogResult } from '../../helpers/compiler';
import { getRunnableCode, getUriWorkerGetter } from '../../helpers/editor/worker';
import { ensureNonNullable } from '../../helpers/type';

export const createCodeEvaluator = (
  modelCreator: typeof editor.createModel,
  workerGetter: ReturnType<typeof getUriWorkerGetter>,
  runnableCodeGetter: typeof getRunnableCode,
  emittedCodeTransformer: typeof transformCodeToLogResult,
  chromeEval: typeof chrome.devtools.inspectedWindow.eval,
) => (actionEditor: editor.ICodeEditor): Promise<void> => {
  const model = ensureNonNullable(actionEditor.getModel());
  const temporaryModel = modelCreator(model.getValue(), model.getModeId());

  return workerGetter(temporaryModel.uri)
    .then(runnableCodeGetter(temporaryModel.uri))
    .then(emittedCodeTransformer)
    .then(chromeEval)
    .then(() => temporaryModel.dispose());
};