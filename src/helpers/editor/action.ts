import { editor, KeyCode, KeyMod } from 'monaco-editor';

export enum EditorAction {
  RunSnippet = 'run-snippet',
}

export const createRunSnippetAction = (onRun: (editor: editor.ICodeEditor) => void): editor.IActionDescriptor => ({
  id: EditorAction.RunSnippet,
  label: 'Run Snippet',
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  contextMenuGroupId: 'run',
  contextMenuOrder: 0,
  run: onRun,
});
