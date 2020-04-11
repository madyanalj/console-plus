import { editor } from 'monaco-editor';
import { createRunSnippetAction } from './action';
import { createEditor } from './editor';

jest.mock('./action');

describe('createEditor', () => {
  let container: HTMLDivElement;
  let runCodeCallback: jest.MockedFunction<(code: string) => void>;
  let addAction: jest.MockedFunction<editor.IStandaloneCodeEditor['addAction']>;
  let instance: editor.IStandaloneCodeEditor;
  let create: jest.MockedFunction<typeof editor.create>;

  beforeEach(() => {
    container = { id: 'container-id' } as HTMLDivElement;
    runCodeCallback = jest.fn();
    addAction = jest.fn();
    instance = { id: 'editor-instance', addAction } as unknown as editor.IStandaloneCodeEditor;
    create = (editor.create as jest.MockedFunction<typeof editor.create>)
      .mockReturnValueOnce(instance);
  });

  test('should define worker URL', () => {
    createEditor(container, runCodeCallback);

    if (!self.MonacoEnvironment) fail();
    expect(typeof self.MonacoEnvironment.getWorkerUrl('module-id', 'label')).toBe('string');
  });

  test('should create editor and return instance', () => {
    const container = { id: 'container-id' } as HTMLDivElement;
    const result = createEditor(container, runCodeCallback);

    expect(result).toBe(instance);
    expect(create).toHaveBeenCalledWith<Parameters<typeof editor.create>>(container, expect.any(Object));
  });

  test('should add run snippet action to editor passing runCodeCallback', async () => {
    const descriptor = { id: 'action-id' } as editor.IActionDescriptor;
    (createRunSnippetAction as jest.MockedFunction<typeof createRunSnippetAction>)
      .mockReturnValueOnce(descriptor);

    createEditor(container, runCodeCallback);

    expect(createRunSnippetAction).toHaveBeenCalledWith<Parameters<typeof createRunSnippetAction>>(runCodeCallback);
    expect(addAction).toHaveBeenCalledWith<Parameters<typeof addAction>>(descriptor);
  });
});
