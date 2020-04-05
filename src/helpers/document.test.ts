import { createElementSelector } from './document';

describe('createElementSelector', () => {
  let nativeGetElementById: jest.SpiedFunction<typeof document.getElementById>;
  let elementSelector: ReturnType<typeof createElementSelector>;

  beforeEach(() => {
    nativeGetElementById = jest.spyOn(document, 'getElementById');
    elementSelector = createElementSelector<{ 'foo-button': HTMLButtonElement }>();
  });

  test('should, when element with matching ID exists, return the element', () => {
    const element = {} as HTMLButtonElement;
    nativeGetElementById.mockReturnValueOnce(element);

    const result = elementSelector.getElementById('foo-button');

    expect(result).toBe(element);
    expect(nativeGetElementById).toHaveBeenCalledWith('foo-button');
  });

  test('should, when no element with matching ID exists, throw error', () => {
    nativeGetElementById.mockReturnValueOnce(null);

    expect(() => {
      elementSelector.getElementById('foo-button');
    }).toThrow('Missing element with id="foo-button"');
    expect(nativeGetElementById).toHaveBeenCalledWith('foo-button');
  });
});
