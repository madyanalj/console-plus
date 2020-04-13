import { editor } from 'monaco-editor';
import { TypeScriptWorker } from '../../editor/worker';
import { createCodeEvaluator } from './evaluator';

describe('createCodeEvaluator', () => {
  test('should, given editor with model, evaluate code using temporary cloned model', async () => {
    const expected = 'const foo = 3';
    const dispose: () => void = jest.fn();
    const modelCreator = (): editor.ITextModel => ({ dispose }) as editor.ITextModel;
    const workerGetter = (): Promise<TypeScriptWorker> => Promise.resolve({} as TypeScriptWorker);
    const runnableCodeGetter = () => (): Promise<string> => Promise.resolve('');
    const codeTransformer = (): string => expected;
    const chromeEval = jest.fn();
    const model = { getValue: (): string => '', getModeId: (): string => '' };
    const actionEditor = { getModel: () => model } as editor.ICodeEditor;

    await createCodeEvaluator(
      modelCreator,
      workerGetter,
      runnableCodeGetter,
      codeTransformer,
      chromeEval,
    )(actionEditor);

    expect(chromeEval).toHaveBeenCalledWith(expected);
    expect(dispose).toHaveBeenCalled();
  });

  test('should, given editor with no model, throw', () => {
    const modelCreator = (): editor.ITextModel => ({}) as editor.ITextModel;
    const workerGetter = (): Promise<TypeScriptWorker> => Promise.resolve({} as TypeScriptWorker);
    const runnableCodeGetter = () => (): Promise<string> => Promise.resolve('');
    const codeTransformer = (): string => '';
    const chromeEval = jest.fn();
    const actionEditor = { getModel: () => null } as editor.ICodeEditor;

    expect(() => createCodeEvaluator(
      modelCreator,
      workerGetter,
      runnableCodeGetter,
      codeTransformer,
      chromeEval,
    )(actionEditor)).toThrow();
    expect(chromeEval).not.toHaveBeenCalled();
  });
});
