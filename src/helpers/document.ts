import { ensureNonNullable } from './type';

export const createElementSelector =
  <Map extends { [elementId: string]: HTMLElement }>(getElementById: typeof document.getElementById) =>
    <Id extends keyof Map & string>(elementId: Id): Map[Id] =>
      ensureNonNullable(getElementById(elementId)) as Map[Id];
