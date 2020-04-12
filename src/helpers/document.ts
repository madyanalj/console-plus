export const createElementSelector =
  <Map extends { [elementId: string]: HTMLElement }>(getElementById: typeof document.getElementById) =>
    <Id extends keyof Map & string>(elementId: Id): Map[Id] => {
      const element = getElementById(elementId);
      if (!element) throw new Error(`Missing element with id="${elementId}"`);
      return element as Map[Id];
    };
