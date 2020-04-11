import { editor, KeyCode, KeyMod } from 'monaco-editor';
import { getRunnableJavaScript } from '../compiler';

export enum EditorAction {
  RunSnippet = 'run-snippet',
}

export const createRunSnippetAction = (runCodeCallback: (code: string) => void): editor.IActionDescriptor => ({
  id: EditorAction.RunSnippet,
  label: 'Run Snippet',
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  contextMenuGroupId: 'run',
  contextMenuOrder: 0,
  run(editor): void {
    getRunnableJavaScript(editor).then(runCodeCallback);
  },
});
