import { editor, IRange } from 'monaco-editor';
import { ensureHasSelection, getCurrentLineNumberOrLastOne, getSelectionValueOrThrow, hasSelection } from './editor';
import { createRangeForNonWhitespaceLineContent } from './model';

describe('hasSelection', () => {
  test('should, when selection is not empty, return true', () => {
    const editorInstance = {
      getSelection: () => ({ isEmpty: (): boolean => false }),
    } as editor.IEditor;

    expect(hasSelection(editorInstance)).toBe(true);
  });

  test('should, when selection is empty, return false', () => {
    const editorInstance = {
      getSelection: () => ({ isEmpty: (): boolean => true }),
    } as editor.IEditor;

    expect(hasSelection(editorInstance)).toBe(false);
  });

  test('should, when editor has no selection, return false', () => {
    const editorInstance = {
      getSelection: () => null,
    } as editor.IEditor;

    expect(hasSelection(editorInstance)).toBe(false);
  });
});

describe('getCurrentLineNumberOrLastOne', () => {
  test('should, when editor has a position, return its line number', () => {
    const editorInstance = {
      getPosition: () => ({ lineNumber: 2 }),
    } as editor.IEditor;
    const model = { getLineCount: () => 5 } as editor.ITextModel;

    const actual = getCurrentLineNumberOrLastOne(editorInstance, model);

    expect(actual).toBe(2);
  });

  test('should, when editor has no position, select last line number', () => {
    const editorInstance = {
      getPosition: () => null,
    } as editor.IEditor;
    const model = { getLineCount: () => 5 } as editor.ITextModel;

    const actual = getCurrentLineNumberOrLastOne(editorInstance, model);

    expect(actual).toBe(5);
  });
});

describe('ensureHasSelection', () => {
  test('should, when editor has no selection, select backup range', () => {
    const editorInstance = {
      setSelection: jest.fn() as editor.IEditor['setSelection'],
    } as editor.IEditor;
    const model = {} as editor.ITextModel;
    const editorSelectionChecker: typeof hasSelection = () => false;
    const expectedRange = { startLineNumber: 3 } as IRange;
    const backupSelectionRangeCreator: ReturnType<typeof createRangeForNonWhitespaceLineContent> =
      jest.fn(() => expectedRange);

    ensureHasSelection(
      editorInstance,
      model,
      editorSelectionChecker,
      backupSelectionRangeCreator,
    );

    expect(editorInstance.setSelection).toHaveBeenCalledWith(expectedRange);
  });

  test('should, when editor has selection, take no action', () => {
    const editorInstance = {
      setSelection: jest.fn() as editor.IEditor['setSelection'],
    } as editor.IEditor;
    const model = {} as editor.ITextModel;
    const editorSelectionChecker: typeof hasSelection = () => true;
    const backupSelectionRangeCreator: ReturnType<typeof createRangeForNonWhitespaceLineContent> =
      () => ({} as IRange);

    ensureHasSelection(
      editorInstance,
      model,
      editorSelectionChecker,
      backupSelectionRangeCreator,
    );

    expect(editorInstance.setSelection).not.toHaveBeenCalled();
  });
});

describe('getSelectionValueOrThrow', () => {
  test('should, when selection exists, return its value', () => {
    const editorInstance = {
      getSelection: () => ({}),
    } as editor.IEditor;
    const model = {
      getValueInRange: (_selection) => 'some.code()',
    } as editor.ITextModel;

    const actual = getSelectionValueOrThrow(editorInstance, model);

    expect(actual).toBe('some.code()');
  });

  test('should, when no selection exists, throw', () => {
    const editorInstance = {
      getSelection: () => null,
    } as editor.IEditor;
    const model = {
      getValueInRange: (_selection) => 'some.code()',
    } as editor.ITextModel;

    expect(() => getSelectionValueOrThrow(editorInstance, model)).toThrow();
  });
});
