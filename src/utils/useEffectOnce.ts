import React, { useEffect } from 'react';


/**
 * Same as {@link useEffect}, but for side effects that should only happen once, when the component is first rendered.
 */
function useEffectOnce(effect: React.EffectCallback) {
  useEffect(effect, []);
}


export default useEffectOnce;
