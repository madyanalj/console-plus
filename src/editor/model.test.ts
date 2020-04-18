import { editor } from 'monaco-editor';
import { createRangeForNonWhitespaceLineContent } from './model';

test('createRangeForNonWhitespaceLineContent', () => {
  const lineNumber = 5;
  const model = {
    getLineFirstNonWhitespaceColumn: (_lineNumber) => 3,
    getLineLastNonWhitespaceColumn: (_lineNumber) => 10,
  } as editor.ITextModel;

  const actual = createRangeForNonWhitespaceLineContent(lineNumber)(model);

  expect(actual).toEqual({
    startLineNumber: 5,
    startColumn: 3,
    endLineNumber: 5,
    endColumn: 10,
  });
});
