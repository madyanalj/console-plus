import { getRunnableJavaScript } from '../../helpers/compiler';
import { createElementSelector } from '../../helpers/document';
import { createEditor } from '../../helpers/editor';

const { getElementById } = createElementSelector<{
  editor: HTMLDivElement;
  'run-button': HTMLButtonElement;
}>();

const editorInstance = createEditor(getElementById('editor'));

getElementById('run-button').onclick = (): void => {
  getRunnableJavaScript(editorInstance)
    .then(chrome.devtools.inspectedWindow.eval);
};
