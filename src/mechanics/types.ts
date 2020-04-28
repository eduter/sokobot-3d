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
    readonly key?: string;
  };
}

export interface Tile {
  readonly height: number;
  readonly objects: MovableObject[];
}

export type MovableObject = Box;// | Ramp;

interface Box {
  readonly type: 'box';
  key?: string;
}

interface Ramp {
  readonly type: 'ramp';
  readonly direction: Direction;
}
