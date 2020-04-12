import { setupMonacoEnvironment } from './editor';

test('setupMonacoEnvironment', () => {
  const window = {} as Window;

  setupMonacoEnvironment(window);

  if (!window.MonacoEnvironment) fail();
  expect(typeof window.MonacoEnvironment.getWorkerUrl('', '')).toBe('string');
});
