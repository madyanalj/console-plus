import { editor, languages } from 'monaco-editor';
import { getRunnableJavaScript, transformCodeToLogResult, TypeScriptWorkerGetter } from './compiler';

type TypeScriptWorker = languages.typescript.TypeScriptWorker;
type getEmitOutput = TypeScriptWorker['getEmitOutput'];

describe('getRunnableJavaScript', () => {
  test('should, given instance with model, return runnable JS code', async () => {
    const expected = 'Foo!';
    const getEmitOutput = (jest.fn() as jest.MockedFunction<getEmitOutput>)
      .mockResolvedValueOnce({ outputFiles: [{ text: expected }] });
    const getWorker = (jest.fn() as jest.MockedFunction<TypeScriptWorkerGetter>)
      .mockResolvedValueOnce({ getEmitOutput: getEmitOutput as getEmitOutput } as TypeScriptWorker);
    const instance = { getModel: () => ({ uri: { toString: (): string => 'uri' } }) } as editor.IStandaloneCodeEditor;

    const result = await getRunnableJavaScript(getWorker, instance);

    expect(result).toBe(expected);
  });

  test('should, given instance without model, throw error', () => {
    const instance = { getModel: () => null } as editor.IStandaloneCodeEditor;

    expect(() => getRunnableJavaScript(jest.fn(), instance))
      .toThrow('editorInstance passed must have a model');
  });
});

test('transformCodeToLogResult', () => {
  const code = 'const foo = "Hello"; `${foo} +  world!`';

  const result = transformCodeToLogResult(code);

  expect(result).toBe('console.log(eval("const foo = \\"Hello\\"; `${foo} +  world!`"))');
});
