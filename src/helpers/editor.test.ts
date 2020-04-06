import { editor } from 'monaco-editor';
import { getRunnableJavaScript } from './compiler';
import { createEditor, EditorAction } from './editor';

jest.mock('./compiler');

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
    create = (editor.create as jest.MockedFunction<typeof editor.create>).mockReturnValueOnce(instance);
  });

  test('should define worker URL', () => {
    createEditor(container, runCodeCallback);

    expect(self.MonacoEnvironment?.getWorkerUrl('module-id', 'label')).toBeDefined();
  });

  test('should create editor and return instance', () => {
    const result = createEditor(container, runCodeCallback);

    expect(result).toBe(instance);
    expect(create).toHaveBeenCalledWith<Parameters<typeof editor.create>>(container, expect.any(Object));
  });

  test('should add RunSnippet action to editor', async () => {
    createEditor(container, runCodeCallback);

    const runEditor = { id: 'run-editor' } as unknown as editor.ICodeEditor;
    const code = 'code!';
    (getRunnableJavaScript as jest.MockedFunction<typeof getRunnableJavaScript>).mockResolvedValueOnce(code);

    const { id, run } = addAction.mock.calls[0][0];
    expect(id).toBe(EditorAction.RunSnippet);

    await run(runEditor);

    expect(getRunnableJavaScript).toHaveBeenCalledWith(runEditor);
    expect(runCodeCallback).toHaveBeenCalledWith(code);
  });
});
