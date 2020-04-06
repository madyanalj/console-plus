import { editor } from 'monaco-editor';
import { createElementSelector } from '../../helpers/document';
import { createEditor } from '../../helpers/editor';

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

  const run = jest.fn();
  const instance = { getAction: jest.fn(() => ({ run })) } as unknown as editor.IStandaloneCodeEditor;
  (createEditor as jest.MockedFunction<typeof createEditor>)
    .mockReturnValueOnce(instance);

  await import('./index');

  expect(createEditor).toHaveBeenCalledWith(editorElement, expect.any(Function));
  expect(runButtonElement.onclick).toBeDefined();

  await runButtonElement.onclick?.({} as MouseEvent);

  expect(run).toHaveBeenCalled();
});
