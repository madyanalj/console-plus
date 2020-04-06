import { editor, languages } from 'monaco-editor';
import { getRunnableJavaScript } from './compiler';

describe('getRunnableJavaScript', () => {
  test('should, given instance with model, return runnable JS code', async () => {
    const text = 'Foo!';
    const uriString = 'uri';
    const uri = { toString: (): string => uriString };
    const instance = { getModel: () => ({ uri }) } as editor.IStandaloneCodeEditor;

    const getEmitOutput: jest.MockedFunction<languages.typescript.TypeScriptWorker['getEmitOutput']> =
      jest.fn().mockResolvedValueOnce({ outputFiles: [{ text }] });
    const worker: jest.MockedFunction<() => Promise<languages.typescript.TypeScriptWorker>> =
      jest.fn().mockResolvedValueOnce({ getEmitOutput });
    (languages.typescript.getTypeScriptWorker as jest.MockedFunction<typeof languages.typescript.getTypeScriptWorker>)
      .mockResolvedValueOnce(worker);

    const result = await getRunnableJavaScript(instance);

    expect(result).toBe(text);
    expect(worker).toHaveBeenCalledWith(uri);
    expect(getEmitOutput).toHaveBeenCalledWith(uriString);
  });

  test('should, given instance without model, throw error', () => {
    const instance = { getModel: () => null } as editor.IStandaloneCodeEditor;

    expect(() => {
      getRunnableJavaScript(instance);
    }).toThrow('editorInstance passed must have a model');
  });
});
