import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LevelClearedDialog } from './LevelClearedDialog';


describe('<LevelClearedDialog/>', () => {

  const noop = () => undefined;

  it('displays the level cleared message, when there is a next level', () => {
    const { queryByTestId } = render(
      <LevelClearedDialog nextLevel={4} goToLevel={noop} goToLevelSelection={noop}/>
    );
    expect(queryByTestId('message')).toHaveTextContent('Level Cleared')
  });

  it('displays the game finished message, when there is no next level', () => {
    const { queryByTestId } = render(
      <LevelClearedDialog nextLevel={undefined} goToLevel={noop} goToLevelSelection={noop}/>
    );
    expect(queryByTestId('message')).toHaveTextContent('Congratulations, you finished the game!')
  });

  it('displays a button to go to next level, when there is a next level', () => {
    const goToLevel = jest.fn();
    const { getByText } = render(
      <LevelClearedDialog nextLevel={5} goToLevel={goToLevel} goToLevelSelection={noop}/>
    );
    const button = getByText('Go to next level');

    fireEvent.click(button);
    expect(goToLevel).toHaveBeenCalledWith(5);
  });

  it('does not display a button to go to next level, when there is no next level', () => {
    const { queryByText } = render(
      <LevelClearedDialog nextLevel={undefined} goToLevel={noop} goToLevelSelection={noop}/>
    );
    expect(queryByText('Go to next level')).toBeNull();
  });

  it('displays a button to go to level selection screen', () => {
    const goToLevelSelection = jest.fn();
    const { getByText } = render(
      <LevelClearedDialog nextLevel={5} goToLevel={noop} goToLevelSelection={goToLevelSelection}/>
    );
    const button = getByText('Back to level selection');

    fireEvent.click(button);
    expect(goToLevelSelection).toHaveBeenCalledTimes(1);
  });

});
