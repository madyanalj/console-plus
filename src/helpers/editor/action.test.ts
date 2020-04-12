import { createRunSnippetAction } from './action';

test('createRunSnippetAction', () => {
  const onRun = jest.fn();

  const { run } = createRunSnippetAction(onRun);

  expect(run).toBe(onRun);
});
