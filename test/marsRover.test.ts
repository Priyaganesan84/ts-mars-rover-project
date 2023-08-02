import { moveRovers, Position, RoverData } from '../src/marsRover';

describe('Mars Rover', () => {
  it('should return the correct final positions for the given test case', () => {
    const plateauSize: Position = { x: 5, y: 5 , orientation: 'N'};
    
    const rover1: RoverData = {
      position: { x: 1, y: 2, orientation: 'N' },
      instructions: 'LMLMLMLMM'
    };

    const rover2: RoverData = {
      position: { x: 3, y: 3, orientation: 'E' },
      instructions: 'MMRMMRMRRM'
    };

    const roversData: RoverData[] = [rover1, rover2];
    const expectedOutput = ['1 3 N', '5 1 E'];

    const result = moveRovers(plateauSize, roversData);

    expect(result).toEqual(expectedOutput);
  });
});
