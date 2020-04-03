import { Direction, move, Point2D } from './directions';
import { Tile } from './types';


function pushObjects(tiles: Tile[][], robotPosition: Point2D, direction: Direction): Tile[][] {
  const from = move(robotPosition, direction);
  const [robotX, robotY] = robotPosition;
  const [fromX, fromY] = from;
  const [toX, toY] = move(from, direction);
  const robotTile = tiles[robotX][robotY];
  const height = robotTile.height + robotTile.objects.length;

  return tiles.map((column, x) => (
    column.map((tile, y) => {
      if (x === fromX && y === fromY) {
        return {
          ...tile,
          objects: tile.objects.slice(0, height - tile.height)
        };
      } else if (x === toX && y === toY) {
        const fromTile = tiles[fromX][fromY];
        return {
          ...tile,
          objects: [...tile.objects, ...fromTile.objects.slice(height - fromTile.height)]
        };
      }
      return tile;
    })
  ))
}


export default pushObjects;
