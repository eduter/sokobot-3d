import { useEffect, useRef } from 'react';
import { Maybe } from '../types';


/**
 * Keeps track of the value of a prop, last time the component was rendered.
 *
 * @return the previous value
 */
function usePrevious<T>(currentValue: T): Maybe<T> {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = currentValue;
  });
  return ref.current;
}


export default usePrevious;
