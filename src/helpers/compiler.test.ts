import { transformCodeToLogResult } from './compiler';

test('transformCodeToLogResult', () => {
  const code = 'const foo = "Hello"; `${foo} +  world!`';

  const result = transformCodeToLogResult(code);

  expect(result).toBe('console.log(eval("const foo = \\"Hello\\"; `${foo} +  world!`"))');
});
