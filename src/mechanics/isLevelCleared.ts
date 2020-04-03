import { LevelMap, Tile } from './types';


function isLevelCleared(levelMap: LevelMap): boolean {
  const hasBox = (tile: Tile) => tile.objects.some(o => o.type === 'box');

  // checks for a target without a box
  if (levelMap.targets.some(([x, y]) => !hasBox(levelMap.tiles[x][y]))) {
    return false;
  }

  // checks for a box without a target
  return !levelMap.tiles.some((column, x) => (
    column.some((tile, y) => (
      hasBox(tile) && !levelMap.targets.some(([targetX, targetY]) => targetX === x && targetY === y)
    ))
  ));
}


export default isLevelCleared;
