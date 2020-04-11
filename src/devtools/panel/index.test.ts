import { editor } from 'monaco-editor';
import { createEditor } from '../../helpers/editor/editor';
import { getElementById } from './document';

jest.mock('../../helpers/editor/editor');
jest.mock('./document');

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

  (getElementById as jest.MockedFunction<typeof getElementById>)
    .mockReturnValueOnce(editorElement)
    .mockReturnValueOnce(runButtonElement);

  const run = jest.fn();
  const instance = { getAction: jest.fn(() => ({ run })) } as unknown as editor.IStandaloneCodeEditor;
  (createEditor as jest.MockedFunction<typeof createEditor>)
    .mockReturnValueOnce(instance);

  await import('./index');

  expect(createEditor).toHaveBeenCalledWith(editorElement, expect.any(Function));

  if (!runButtonElement.onclick) fail();
  await runButtonElement.onclick({} as MouseEvent);

  expect(run).toHaveBeenCalled();
});
