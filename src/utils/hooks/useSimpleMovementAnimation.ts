import { SpringUpdateFn } from '@react-spring/core';
import { useSpring } from '@react-spring/three';
import { usePrevious } from './index';


interface SimpleMovementAnimationProps {
  position: [number, number, number];
  [prop: string]: any;
}

/**
 * Uses very simple animations to smoothly transition between states.
 */
function useSimpleMovementAnimation<T extends SimpleMovementAnimationProps>(currentProps: T) {
  const { position } = currentProps;
  const previousProps = usePrevious(currentProps);

  return useSpring<any>({
    from: previousProps ?? currentProps,
    to: async (next: SpringUpdateFn<T>) => {
      // Handles falls
      if (previousProps && position[2] < previousProps.position[2]) {

        // moves horizontally
        await next({
          ...currentProps,
          position: [position[0], position[1], previousProps.position[2]]
        });

        // falls
        await next({
          ...currentProps,
          config: {
            duration: 100
          }
        });
        return;
      }

      // Handles simple movements (rotation and horizontal move)
      await next(currentProps);
    }
  });
}


export default useSimpleMovementAnimation;
