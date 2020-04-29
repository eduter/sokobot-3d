import { useEffect, useRef } from 'react';
import { minimizeRotation } from '../../mechanics/directions';


/**
 * Keeps track of an angle and minimizes the rotation needed to bring it to the current direction.
 *
 * @param currentDirection - an angle (in radians) indicating the current direction, within a circumference
 * @return the closest angle to the previous, which points in the same direction as {@param currentDirection}
 */
function useMinimalRotation(currentDirection: number): number {
  const ref = useRef<number>();
  const previousAngle = ref.current;
  const currentAngle = previousAngle === undefined ? currentDirection : minimizeRotation(previousAngle, currentDirection);
  useEffect(() => {
    ref.current = currentAngle;
  });
  return currentAngle;
}


export default useMinimalRotation;
