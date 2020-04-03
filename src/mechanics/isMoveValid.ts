import { Maybe } from '../utils/types';
import { Tile } from './types';


function isMoveValid(currentTile: Tile, targetTile: Maybe<Tile>, pushedObectsTile: Maybe<Tile>): boolean {
  if (!isValidTile(targetTile)) {
    // target is beyond the edge or is a hole
    return false;
  } else if (targetTile.height > currentTile.height + currentTile.objects.length) {
    // trying to move toward a wall
    return false;
  }

  const height = currentTile.height + currentTile.objects.length;
  const pushedObjects = targetTile.objects.slice(height - targetTile.height);

  if (pushedObjects.length > 0) {
    if (!isValidTile(pushedObectsTile)) {
      // trying to push objects into the void
      return false;
    } else if (pushedObectsTile.height + pushedObectsTile.objects.length > height) {
      // trying to push objects into a wall/object
      return false;
    }
  }
  return true;
}

function isValidTile(tile: Maybe<Tile>): tile is Tile {
  return tile !== undefined && tile.height > 0;
}


export default isMoveValid;
