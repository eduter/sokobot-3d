/**
 * Generic type for when a function may return a value or not.
 */
export type Maybe<T> = T | undefined;

/**
 * Use this function in the case default of a switch that should exhaustively check all possible values.
 * It has no effect in runtime, but TS can catch in compile time if one possible value was forgotten.
 */
function assertNever(value: never) {
  return value;
}

export {
  assertNever
};
