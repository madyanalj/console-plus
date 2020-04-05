import { editor } from 'monaco-editor';
import { createEditor, TYPESCRIPT_WORKER_URL } from './editor';

test('createEditor', () => {
  const container = { id: 'container-id' } as HTMLDivElement;

  createEditor(container);

  expect(self.MonacoEnvironment?.getWorkerUrl('module-id', 'label')).toBe(TYPESCRIPT_WORKER_URL);
  expect(editor.create).toHaveBeenCalledWith<Parameters<typeof editor.create>>(container, expect.any(Object));
});
