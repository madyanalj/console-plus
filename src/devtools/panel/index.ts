import { createElementSelector } from '../../helpers/document';
import { createEditor } from '../../helpers/editor';

const { getElementById } = createElementSelector<{
  editor: HTMLDivElement;
  'run-button': HTMLButtonElement;
}>();

createEditor(getElementById('editor'));
