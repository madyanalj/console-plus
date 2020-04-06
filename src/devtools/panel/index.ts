import { createElementSelector } from '../../helpers/document';
import { createEditor, EditorAction } from '../../helpers/editor';

const { getElementById } = createElementSelector<{
  editor: HTMLDivElement;
  'run-button': HTMLButtonElement;
}>();

const editorInstance = createEditor(getElementById('editor'), chrome.devtools.inspectedWindow.eval);

getElementById('run-button').onclick = async (): Promise<void> => {
  await editorInstance.getAction(EditorAction.RunSnippet).run();
};
