import { Direction, Point2D } from './directions';
import { DeepReadonly } from 'utility-types';


export interface LevelMap {
  readonly height: number;
  readonly width: number;
  readonly tiles: Tile[][];
  readonly targets: DeepReadonly<Point2D[]>;
  readonly robot: {
    readonly position: Point2D;
    readonly direction: Direction;
  };
}

export interface Tile {
  readonly height: number;
  readonly objects: MovableObject[];
}

type MovableObject = Box;// | Ramp;

interface Box {
  readonly type: 'box';
}

interface Ramp {
  readonly type: 'ramp';
  readonly direction: Direction;
}