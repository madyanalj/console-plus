import { languages, Uri } from 'monaco-editor';
import { head } from '../helpers/array';

export type TypeScriptWorkerGetter = typeof languages.typescript.getTypeScriptWorker;
export type TypeScriptWorker = languages.typescript.TypeScriptWorker;
type EmitOutput = languages.typescript.EmitOutput;

export const getUriWorkerGetter = (typeScriptWorkerGetter: TypeScriptWorkerGetter) =>
  (uri: Uri): Promise<TypeScriptWorker> =>
    typeScriptWorkerGetter()
      .then((getSpecificWorker) => getSpecificWorker(uri));

export const getRunnableCode = (uri: Uri) =>
  ({ getEmitOutput }: TypeScriptWorker): Promise<string> =>
    getEmitOutput(uri.toString())
      .then(({ outputFiles }: EmitOutput) => head(outputFiles).text);
