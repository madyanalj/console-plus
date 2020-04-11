import { EditorAction } from '../../helpers/editor/action';
import { createEditor } from '../../helpers/editor/editor';
import { getElementById } from './document';

const editorInstance = createEditor(getElementById('editor'), chrome.devtools.inspectedWindow.eval);

getElementById('run-button').onclick = async (): Promise<void> =>
  await editorInstance.getAction(EditorAction.RunSnippet).run();
