import { Loop } from 'redux-loop';


/**
 * Generic type for when a function may return a value or not.
 */
export type Maybe<T> = T | undefined;

/**
 * Use this function in the case default of a switch that should exhaustively check all possible values.
 * It has no effect in runtime, but TS can catch in compile time if one possible value was forgotten.
 */
export function assertNever(value: never) {
  return value;
}

/**
 * Type for Redux actions.
 */
export type Action<T, P = void> = P extends void
  ? { type: T }
  : { type: T, payload: P };

/**
 * Type for reducers using redux-loop.
 *
 * @param HA - type of actions the reducer handles
 * @param TA - type of actions the reducer may trigger
 */
export type Reducer<S, HA extends Action<any, any>, LA extends Action<any, any> = HA> = (state: S | undefined, action: HA) => S | Loop<S, LA>;
