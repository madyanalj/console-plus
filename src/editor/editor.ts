import { editor } from 'monaco-editor';
import { ensureNonNullable } from '../helpers/type';
import { createRangeForNonWhitespaceLineContent } from './model';

export const hasSelection = (editorInstance: editor.IEditor): boolean => {
  const selection = editorInstance.getSelection();
  return !!selection && !selection.isEmpty();
};

export const getCurrentLineNumberOrLastOne = (editorInstance: editor.IEditor, model: editor.ITextModel): number =>
  editorInstance.getPosition()?.lineNumber ?? model.getLineCount();

export const ensureHasSelection = (
  editorInstance: editor.IEditor,
  model: editor.ITextModel,
  editorSelectionChecker: typeof hasSelection,
  backupSelectionRangeCreator: ReturnType<typeof createRangeForNonWhitespaceLineContent>,
): void => {
  if (!editorSelectionChecker(editorInstance)) {
    editorInstance.setSelection(backupSelectionRangeCreator(model));
  }
};

export const getSelectionValueOrThrow = (editorInstance: editor.IEditor, model: editor.ITextModel): string => {
  const selection = ensureNonNullable(editorInstance.getSelection());
  return model.getValueInRange(selection);
};
