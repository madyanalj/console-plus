import { editor } from 'monaco-editor';
import { createRunSnippetAction } from '../../helpers/editor/action';
import { EDITOR_OPTIONS, setupMonacoEnvironment } from '../../helpers/editor/editor';
import { getElementById } from './document';

const editorElement = getElementById('editor');
const runButtonElement = getElementById('run-button');

setupMonacoEnvironment(window);
const editorInstance = editor.create(editorElement, EDITOR_OPTIONS);
const runSnippetAction = createRunSnippetAction(chrome.devtools.inspectedWindow.eval);
editorInstance.addAction(runSnippetAction);

runButtonElement.onclick = async (): Promise<void> =>
  await editorInstance.getAction(runSnippetAction.id).run();
