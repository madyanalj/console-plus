import { createElementSelector } from '../../helpers/document';
import { createEditor } from '../../helpers/editor';

jest.mock('../../helpers/document');
jest.mock('../../helpers/editor');

test('index', async () => {
  const createElementSelectorMock = createElementSelector as jest.MockedFunction<typeof createElementSelector>;

  const getElementById: jest.MockedFunction<ReturnType<typeof createElementSelector>['getElementById']> = jest.fn();
  createElementSelectorMock.mockReturnValue({ getElementById });

  const editorElement = { id: 'editor' } as HTMLDivElement;
  getElementById.mockReturnValue(editorElement);

  await import('./index');

  expect(createEditor).toHaveBeenCalledWith(editorElement);
});