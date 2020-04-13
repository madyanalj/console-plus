import { editor } from 'monaco-editor';
import { TypeScriptWorker } from '../../helpers/editor/worker';
import { createCodeEvaluator } from './evaluator';

describe('createCodeEvaluator', () => {
  test('should, given editor with model, evaluate code', async () => {
    const expected = 'const foo = 3';
    const workerGetter = (): Promise<TypeScriptWorker> => Promise.resolve({} as TypeScriptWorker);
    const runnableCodeGetter = () => (): Promise<string> => Promise.resolve('');
    const codeTransformer = (): string => expected;
    const chromeEval = jest.fn();
    const actionEditor = { getModel: () => ({}) } as editor.ICodeEditor;

    await createCodeEvaluator(
      workerGetter,
      runnableCodeGetter,
      codeTransformer,
      chromeEval,
    )(actionEditor);

    expect(chromeEval).toHaveBeenCalledWith(expected);
  });

  test('should, given editor with no model, throw', () => {
    const workerGetter = (): Promise<TypeScriptWorker> => Promise.resolve({} as TypeScriptWorker);
    const runnableCodeGetter = () => (): Promise<string> => Promise.resolve('');
    const codeTransformer = (): string => '';
    const chromeEval = jest.fn();
    const actionEditor = { getModel: () => null } as editor.ICodeEditor;

    expect(() => createCodeEvaluator(
      workerGetter,
      runnableCodeGetter,
      codeTransformer,
      chromeEval,
    )(actionEditor)).toThrow();
    expect(chromeEval).not.toHaveBeenCalled();
  });
});
