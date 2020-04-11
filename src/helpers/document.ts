export const createElementSelector = <Map extends { [elementId: string]: HTMLElement }>() =>
  <Id extends keyof Map & string>(elementId: Id): Map[Id] => {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Missing element with id="${elementId}"`);
    return element as Map[Id];
  };
