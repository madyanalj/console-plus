import { ensureNonNullable } from './type';

export const head = <T>(input: T[]): T =>
  ensureNonNullable(input[0]);
