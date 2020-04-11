const elementSelector = jest.fn();
jest.mock('../../helpers/document', () => ({
  createElementSelector: (): jest.Mock => elementSelector,
}));

import { getElementById } from './document';

test('getElementById', async () => {
  expect(getElementById).toBe(elementSelector);
});
