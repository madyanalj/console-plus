import { editor, languages } from 'monaco-editor';
import { RUN_SNIPPET_ACTION_OPTIONS } from '../../editor/action';
import { EDITOR_OPTIONS, setupMonacoEnvironment } from '../../editor/setup';
import { getRunnableCode, getUriWorkerGetter } from '../../editor/worker';
import { transformCodeToLogResult } from '../../helpers/code';
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
  run: createCodeEvaluator(
    editor.createModel,
    getUriWorkerGetter(languages.typescript.getTypeScriptWorker),
    getRunnableCode,
    transformCodeToLogResult,
    chrome.devtools.inspectedWindow.eval,
  ),
};
editorInstance.addAction(runSnippetAction);

runButtonElement.onclick = async (): Promise<void> =>
  await editorInstance.getAction(runSnippetAction.id).run();
