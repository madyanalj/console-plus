import { Uri } from 'monaco-editor';
import { getRunnableCode, getUriWorkerGetter, TypeScriptWorker, TypeScriptWorkerGetter } from './worker';

test('getUriWorkerGetter', () => {
  const uri = {} as Uri;
  const expected = {} as TypeScriptWorker;

  const workerGetter: TypeScriptWorkerGetter = () => Promise.resolve(
    (givenUri) => Promise.resolve(
      givenUri === uri
        ? expected
        : {} as TypeScriptWorker,
    ),
  );

  const result = getUriWorkerGetter(workerGetter)(uri);

  expect(result).resolves.toBe(expected);
});

describe('getRunnableCode', () => {
  test('should, given worker that emits files, return its text', () => {
    const expected = 'some.code()';
    const uri = { toString: () => '' } as Uri;
    const getEmitOutput: TypeScriptWorker['getEmitOutput'] = () => Promise.resolve({
      outputFiles: [{ text: expected }],
    });
    const worker = { getEmitOutput: getEmitOutput } as TypeScriptWorker;

    const result = getRunnableCode(uri)(worker);

    expect(result).resolves.toBe(expected);
  });

  test('should, given worker that emits no file, throw', () => {
    const uri = { toString: () => '' } as Uri;
    const getEmitOutput: TypeScriptWorker['getEmitOutput'] = () => Promise.resolve({
      outputFiles: [],
    });
    const worker = { getEmitOutput: getEmitOutput } as TypeScriptWorker;

    expect(getRunnableCode(uri)(worker)).rejects.toThrow();
  });
});
