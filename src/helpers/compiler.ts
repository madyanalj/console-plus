export const transformCodeToLogResult = (code: string): string =>
  `console.log(eval(${JSON.stringify(code)}))`;
