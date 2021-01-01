import { Tile } from './types';
import { Direction, move, Point2D, Point3D } from './directions';
import isMoveValid from './isMoveValid';
import getRelevantTiles from './getRelevantTiles';


type Node = string;

function getPossibleMoves(tiles: Tile[][], robotPosition: Point2D): Point3D[] {
  const closedSet = new Set<Node>();
  const openSet = [pointToNode(robotPosition)];
  const cameFrom = new Map<Node, Node>();
  const gScore = new Map<Node, number>();

  while (openSet.length > 0) {
    const currentNode = openSet.pop()!;
    const neighbors = getNeighbors(tiles, currentNode);

    closedSet.add(currentNode);
    neighbors.forEach(destination => {
      if (!closedSet.has(destination)) {
        const isNewNode = !openSet.includes(destination);
        const tentativeGScore = gScore.get(currentNode)! + 1;

        if (isNewNode) {
          openSet.push(destination);
        }
        if (isNewNode || tentativeGScore < gScore.get(destination)!) {
          cameFrom.set(destination, currentNode);
          gScore.set(destination, tentativeGScore);
        }
      }
    });
  }
  console.log(closedSet);
  return Array.from(closedSet)
    .map(nodeToPoint)
    .filter(([x, y]) => x !== robotPosition[0] || y !== robotPosition[1])
    .map(([x, y]) => [x, y, tileTotalHeight(tiles, x, y)]);
}

function tileTotalHeight(tiles: Tile[][], x: number, y: number) {
  const tile = tiles[x][y];
  return tile.height + tile.objects.length;
}

function getNeighbors(tiles: Tile[][], node: Node): Node[] {
  const point = nodeToPoint(node);

  return Object.values(Direction)
    .filter(direction => {
      const relevantTiles = getRelevantTiles(tiles, point, direction);
      return isMoveValid(false, ...relevantTiles);
    })
    .map(direction => move(point, direction))
    .map(pointToNode)
}

function pointToNode([x, y]: Point2D): Node {
  return `${x}-${y}`;
}

function nodeToPoint(node: Node): Point2D {
  return node.split('-').map(n => parseInt(n)) as [number, number];
}


export default getPossibleMoves;
