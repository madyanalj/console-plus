import { createElementSelector } from './document';

describe('createElementSelector', () => {
  let getElementById: jest.SpiedFunction<typeof document.getElementById>;
  let elementSelector: ReturnType<typeof createElementSelector>;

  beforeEach(() => {
    getElementById = jest.spyOn(document, 'getElementById').mockClear();
    elementSelector = createElementSelector<{ 'foo-button': HTMLButtonElement }>();
  });

  test('should, when element with matching ID exists, return the element', () => {
    const element = {} as HTMLButtonElement;
    getElementById.mockReturnValue(element);

    const result = elementSelector('foo-button');

    expect(result).toBe(element);
    expect(getElementById).toHaveBeenCalledWith('foo-button');
  });

  test('should, when no element with matching ID exists, throw error', () => {
    getElementById.mockReturnValueOnce(null);

    expect(() => {
      elementSelector('foo-button');
    }).toThrow('Missing element with id="foo-button"');
    expect(getElementById).toHaveBeenCalledWith('foo-button');
  });
});
