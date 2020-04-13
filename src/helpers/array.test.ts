import { head } from './array';

describe('head', () => {
  test('should, when array is not empty, return first one', () => {
    const input = [1, 2, 3];

    const result = head(input);

    expect(result).toBe(1);
  });

  test('should, when array is empty, throw', () => {
    const input = [1, 2, 3];

    const result = head(input);

    expect(result).toBe(1);
  });
});
