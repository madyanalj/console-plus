import { KeyCode, KeyMod } from 'monaco-editor';

export enum EditorAction {
  RunSnippet = 'run-snippet',
}

export const RUN_SNIPPET_ACTION_OPTIONS = {
  id: EditorAction.RunSnippet,
  label: 'Run Snippet',
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  contextMenuGroupId: 'run',
  contextMenuOrder: 0,
};
