import { editor } from 'monaco-editor';
import { createEditor, TYPESCRIPT_WORKER_URL } from './editor';

test('createEditor', () => {
  const instance = { id: 'editor-instance' } as unknown as editor.IStandaloneCodeEditor;

  const create = (editor.create as jest.MockedFunction<typeof editor.create>)
    .mockReturnValue(instance);
  const container = { id: 'container-id' } as HTMLDivElement;

  const result = createEditor(container);

  expect(result).toBe(instance);
  expect(self.MonacoEnvironment?.getWorkerUrl('module-id', 'label')).toBe(TYPESCRIPT_WORKER_URL);
  expect(create).toHaveBeenCalledWith<Parameters<typeof editor.create>>(container, expect.any(Object));
});
