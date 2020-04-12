import { createElementSelector } from './document';

describe('createElementSelector', () => {
  test('should, when element with matching ID exists, return the element', () => {
    const expected = {} as HTMLButtonElement;
    const getElementById: typeof document.getElementById = () => expected;

    const selector = createElementSelector<{
      'foo-button': HTMLButtonElement;
    }>(getElementById);

    expect(selector('foo-button')).toBe(expected);
  });

  test('should, when no element with matching ID exists, throw error', () => {
    const getElementById: typeof document.getElementById = () => null;

    const selector = createElementSelector<{
      'foo-button': HTMLButtonElement;
    }>(getElementById);

    expect(() => selector('foo-button')).toThrow('Missing element with id="foo-button"');
  });
});
