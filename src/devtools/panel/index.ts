import { createElementSelector } from '../../helpers/document';
import { createEditor, getRunnableJavaScript } from '../../helpers/editor';

const { getElementById } = createElementSelector<{
  editor: HTMLDivElement;
  'run-button': HTMLButtonElement;
}>();

const editorInstance = createEditor(getElementById('editor'));

getElementById('run-button').onclick = (): void => {
  getRunnableJavaScript(editorInstance)
    .then(console.log);
};
