export const ensureNonNullable = <T>(input: T | null | undefined): T => {
  if (input === null || typeof input === 'undefined')
    throw new Error(`Expected input to be defined. ${input} given`);
  return input;
};
