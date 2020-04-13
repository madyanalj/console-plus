import { ensureNonNullable } from './type';

describe('ensureNonNullable', () => {
  test('should, when input is non nullable, return it', () => {
    const input = 'hello';

    ensureNonNullable(input);

    expect(input).toBe(input);
  });

  test('should, when input is null, throw error', () => {
    expect(() => ensureNonNullable(null))
      .toThrow('Expected input to be defined. null given');
  });

  test('should, when input is undefined, throw error', () => {
    expect(() => ensureNonNullable(undefined))
      .toThrow('Expected input to be defined. undefined given');
  });
});
