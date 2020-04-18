import { editor, IRange } from 'monaco-editor';

export const createRangeForNonWhitespaceLineContent = (lineNumber: number) =>
  (model: editor.ITextModel): IRange => ({
    startLineNumber: lineNumber,
    startColumn: model.getLineFirstNonWhitespaceColumn(lineNumber),
    endLineNumber: lineNumber,
    endColumn: model.getLineLastNonWhitespaceColumn(lineNumber),
  });
