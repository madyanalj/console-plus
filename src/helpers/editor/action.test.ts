import { editor } from 'monaco-editor';
import { getRunnableJavaScript } from '../compiler';
import { createRunSnippetAction } from './action';

jest.mock('../compiler');

test('createRunSnippetAction', async () => {
  const runCodeCallback: jest.MockedFunction<(code: string) => void> = jest.fn();

  const { run } = createRunSnippetAction(runCodeCallback);

  const runEditor = { id: 'run-editor' } as unknown as editor.ICodeEditor;
  const code = 'code!';
  (getRunnableJavaScript as jest.MockedFunction<typeof getRunnableJavaScript>)
    .mockResolvedValueOnce(code);

  await run(runEditor);

  expect(getRunnableJavaScript).toHaveBeenCalledWith<Parameters<typeof getRunnableJavaScript>>(runEditor);
  expect(runCodeCallback).toHaveBeenCalledWith<Parameters<typeof runCodeCallback>>(code);
});
