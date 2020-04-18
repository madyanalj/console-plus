import { editor } from 'monaco-editor';
import { RUN_SELECTION_OR_LINE_ACTION_OPTIONS, RUN_SNIPPET_ACTION_OPTIONS } from '../../editor/action';
import {
  ensureHasSelection,
  getCurrentLineNumberOrLastOne,
  getSelectionValueOrThrow,
  hasSelection,
} from '../../editor/editor';
import { createRangeForNonWhitespaceLineContent } from '../../editor/model';
import { EDITOR_OPTIONS, setupMonacoEnvironment } from '../../editor/setup';
import { createElementSelector } from '../../helpers/document';
import { createCodeEvaluator } from './evaluator';

export const getElementById = createElementSelector<{
  'editor': HTMLDivElement;
  'run-button': HTMLButtonElement;
}>((elementId) => document.getElementById(elementId));

const editorElement = getElementById('editor');
const runButtonElement = getElementById('run-button');

setupMonacoEnvironment(window);
const editorInstance = editor.create(editorElement, EDITOR_OPTIONS);

const runSnippetAction = {
  ...RUN_SNIPPET_ACTION_OPTIONS,
  run: createCodeEvaluator((model) => model.getValue()),
};
editorInstance.addAction(runSnippetAction);
const runSelectionOrLineAction = {
  ...RUN_SELECTION_OR_LINE_ACTION_OPTIONS,
  run: createCodeEvaluator(
    (model) => {
      const lineNumber = getCurrentLineNumberOrLastOne(editorInstance, model);
      const backupSelectionRangeCreator = createRangeForNonWhitespaceLineContent(lineNumber);
      ensureHasSelection(editorInstance, model, hasSelection, backupSelectionRangeCreator);
      return getSelectionValueOrThrow(editorInstance, model);
    },
  ),
};
editorInstance.addAction(runSelectionOrLineAction);

runButtonElement.onclick = async (): Promise<void> =>
  await editorInstance.getAction(runSnippetAction.id).run();
