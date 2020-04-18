import { editor, languages } from 'monaco-editor';
import { getRunnableCode, getUriWorkerGetter } from '../../editor/worker';
import { transformCodeToLogResult } from '../../helpers/code';
import { ensureNonNullable } from '../../helpers/type';

export const createCodeEvaluator = (modelValueGetter: (model: editor.ITextModel) => string) =>
  (actionEditor: editor.ICodeEditor): Promise<void> => {
    const model = ensureNonNullable(actionEditor.getModel());
    const temporaryModel = editor.createModel(modelValueGetter(model), model.getModeId());

    return getUriWorkerGetter(languages.typescript.getTypeScriptWorker)(temporaryModel.uri)
      .then(getRunnableCode(temporaryModel.uri))
      .then(transformCodeToLogResult)
      .then(chrome.devtools.inspectedWindow.eval)
      .then(() => temporaryModel.dispose());
  };
