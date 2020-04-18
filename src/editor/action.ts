import { KeyCode, KeyMod } from 'monaco-editor';

export enum EditorAction {
  RunSnippet = 'run-snippet',
  RunSelectionOrLine = 'run-selection-or-line',
}

const RUN_GROUP_ID = 'run';

export const RUN_SNIPPET_ACTION_OPTIONS = {
  id: EditorAction.RunSnippet,
  label: 'Run Snippet',
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  contextMenuGroupId: RUN_GROUP_ID,
  contextMenuOrder: 0,
};

export const RUN_SELECTION_OR_LINE_ACTION_OPTIONS = {
  id: EditorAction.RunSelectionOrLine,
  label: 'Run Selection/Line',
  keybindings: [KeyMod.Alt | KeyCode.Enter],
  contextMenuGroupId: RUN_GROUP_ID,
  contextMenuOrder: 10,
};
