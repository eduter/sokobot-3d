import isMoveValid from './isMoveValid';
import { Tile } from './types';


const hole: Tile = { height: 0, objects: [] };
const height1boxes0: Tile = { height: 1, objects: [] };
const height1boxes1: Tile = { height: 1, objects: [{ type: 'box' }] };
const height1boxes2: Tile = { height: 1, objects: [{ type: 'box' }, { type: 'box' }] };
const height2boxes0: Tile = { height: 2, objects: [] };
const height2boxes1: Tile = { height: 2, objects: [{ type: 'box' }] };
const height3boxes0: Tile = { height: 3, objects: [] };
const height5boxes0: Tile = { height: 5, objects: [] };

describe('isMoveValid', () => {

  it('allows movement on flat surfaces, with no obstacles', () => {
    expect(isMoveValid(height1boxes0, height1boxes0, undefined)).toBe(true);
    expect(isMoveValid(height2boxes0, height2boxes0, undefined)).toBe(true);
    expect(isMoveValid(height5boxes0, height5boxes0, undefined)).toBe(true);
  });

  it('does not allow robot to move outside the map', () => {
    expect(isMoveValid(height1boxes0, undefined, undefined)).toBe(false);
  });

  it('does not allow robot to move into a hole', () => {
    expect(isMoveValid(height1boxes0, hole, undefined)).toBe(false);
    expect(isMoveValid(height1boxes0, hole, height1boxes0)).toBe(false);
  });

  it('allows robot to move down', () => {
    expect(isMoveValid(height2boxes0, height1boxes0, undefined)).toBe(true);
    expect(isMoveValid(height3boxes0, height2boxes0, undefined)).toBe(true);
    expect(isMoveValid(height5boxes0, height1boxes0, undefined)).toBe(true);
  });

  it('does not allow robot to move up', () => {
    expect(isMoveValid(height1boxes0, height2boxes0, undefined)).toBe(false);
    expect(isMoveValid(height2boxes0, height3boxes0, undefined)).toBe(false);
    expect(isMoveValid(height1boxes0, height5boxes0, undefined)).toBe(false);
  });

  it('allows robot to move on boxes', () => {
    expect(isMoveValid(height1boxes1, height1boxes1, undefined)).toBe(true);
    expect(isMoveValid(height2boxes0, height1boxes1, undefined)).toBe(true);
    expect(isMoveValid(height1boxes1, height2boxes0, undefined)).toBe(true);
    expect(isMoveValid(height3boxes0, height1boxes2, undefined)).toBe(true);
    expect(isMoveValid(height3boxes0, height1boxes1, undefined)).toBe(true);
  });

  it('allows robot to push boxes through flat surfaces', () => {
    expect(isMoveValid(height1boxes0, height1boxes1, height1boxes0)).toBe(true);
    expect(isMoveValid(height1boxes0, height1boxes2, height1boxes0)).toBe(true);
    expect(isMoveValid(height2boxes0, height1boxes2, height1boxes1)).toBe(true);
  });

  it('allows robot to push boxes off higher surfaces', () => {
    expect(isMoveValid(height2boxes0, height2boxes1, height1boxes0)).toBe(true);
    expect(isMoveValid(height2boxes0, height1boxes2, height1boxes0)).toBe(true);
  });

  it('does not allow robot to push boxes off the edge of the map', () => {
    expect(isMoveValid(height1boxes0, height1boxes1, undefined)).toBe(false);
  });

  it('does not allow robot to push boxes into holes', () => {
    expect(isMoveValid(height1boxes0, height1boxes1, hole)).toBe(false);
  });

  it('does not allow robot to push boxes into walls or other boxes', () => {
    expect(isMoveValid(height1boxes0, height1boxes1, height2boxes0)).toBe(false);
    expect(isMoveValid(height1boxes0, height1boxes1, height1boxes1)).toBe(false);
  });

});
