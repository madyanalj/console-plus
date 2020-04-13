import { editor, languages } from 'monaco-editor';
import { transformCodeToLogResult } from '../../helpers/compiler';
import { createElementSelector } from '../../helpers/document';
import { createRunSnippetAction } from '../../helpers/editor/action';
import { EDITOR_OPTIONS, setupMonacoEnvironment } from '../../helpers/editor/editor';
import { getRunnableCode, getUriWorkerGetter } from '../../helpers/editor/worker';
import { createCodeEvaluator } from './evaluator';

export const getElementById = createElementSelector<{
  'editor': HTMLDivElement;
  'run-button': HTMLButtonElement;
}>((elementId) => document.getElementById(elementId));

const editorElement = getElementById('editor');
const runButtonElement = getElementById('run-button');

setupMonacoEnvironment(window);
const editorInstance = editor.create(editorElement, EDITOR_OPTIONS);
const runSnippetAction = createRunSnippetAction(createCodeEvaluator(
  getUriWorkerGetter(languages.typescript.getTypeScriptWorker),
  getRunnableCode,
  transformCodeToLogResult,
  chrome.devtools.inspectedWindow.eval,
));
editorInstance.addAction(runSnippetAction);

runButtonElement.onclick = async (): Promise<void> =>
  await editorInstance.getAction(runSnippetAction.id).run();
