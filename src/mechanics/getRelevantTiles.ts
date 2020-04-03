import { Maybe } from '../utils/types';
import { Direction, move, Point2D } from './directions';
import { Tile } from './types';


function getRelevantTiles(tiles: Tile[][], robotPosition: Point2D, moveDirection: Direction) {
  const targetPosition = move(robotPosition, moveDirection);
  const pushedObjectsPosition = move(targetPosition, moveDirection);

  return [
    getTile(tiles, robotPosition),
    getTile(tiles, targetPosition),
    getTile(tiles, pushedObjectsPosition)
  ] as [Tile, Maybe<Tile>, Maybe<Tile>];
}

function getTile(tiles: Tile[][], [x, y]: Point2D): Maybe<Tile> {
  return tiles[x] ? tiles[x][y] : undefined;
}


export default getRelevantTiles;
