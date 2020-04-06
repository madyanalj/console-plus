import { editor } from 'monaco-editor';
import { getRunnableJavaScript } from '../../helpers/compiler';
import { createElementSelector } from '../../helpers/document';
import { createEditor } from '../../helpers/editor';

jest.mock('../../helpers/compiler');
jest.mock('../../helpers/document');
jest.mock('../../helpers/editor');

test('index', async () => {
  globalThis.chrome = {
    devtools: {
      inspectedWindow: {
        eval: jest.fn(),
      },
    },
  } as unknown as typeof chrome;

  const editorElement = { id: 'editor' } as HTMLDivElement;
  const runButtonElement = { id: 'run-button' } as HTMLButtonElement;

  const getElementById = (jest.fn() as jest.MockedFunction<ReturnType<typeof createElementSelector>['getElementById']>)
    .mockReturnValueOnce(editorElement)
    .mockReturnValueOnce(runButtonElement);

  (createElementSelector as jest.MockedFunction<typeof createElementSelector>)
    .mockReturnValueOnce({ getElementById });

  const instance = { id: 'editor-instance' } as unknown as editor.IStandaloneCodeEditor;
  (createEditor as jest.MockedFunction<typeof createEditor>)
    .mockReturnValueOnce(instance);

  const code = 'some.code()';
  (getRunnableJavaScript as jest.MockedFunction<typeof getRunnableJavaScript>)
    .mockResolvedValueOnce(code);

  await import('./index');

  expect(createEditor).toHaveBeenCalledWith(editorElement);
  expect(runButtonElement.onclick).toBeDefined();

  await runButtonElement.onclick?.({} as MouseEvent);

  expect(getRunnableJavaScript).toHaveBeenCalledWith(instance);
  expect(chrome.devtools.inspectedWindow.eval).toHaveBeenCalledWith(code);
});
