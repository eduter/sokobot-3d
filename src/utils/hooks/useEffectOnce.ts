import React, { useEffect } from 'react';


/**
 * Same as {@link useEffect}, but for side effects that should only happen once
 * (when the component is mounted) and that don't require any cleanup.
 */
function useEffectOnce(effect: React.EffectCallback) {
  useEffect(() => {
    effect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}


export default useEffectOnce;
