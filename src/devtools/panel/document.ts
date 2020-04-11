import { createElementSelector } from '../../helpers/document';

export const getElementById = createElementSelector<{
  editor: HTMLDivElement;
  'run-button': HTMLButtonElement;
}>();
