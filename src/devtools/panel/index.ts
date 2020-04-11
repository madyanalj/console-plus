import { createEditor, EditorAction } from '../../helpers/editor';
import { getElementById } from './document';

const editorInstance = createEditor(getElementById('editor'), chrome.devtools.inspectedWindow.eval);

getElementById('run-button').onclick = async (): Promise<void> =>
  await editorInstance.getAction(EditorAction.RunSnippet).run();
