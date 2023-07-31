import { moveRovers, Position, RoverData } from './marsRover';

describe('Mars Rover', () => {
    it('should return the correct final positions for the given test case 1', () => {
      // Test Case 1: Basic test case with two rovers
      const plateauSize: Position = { x: 5, y: 5, orientation: 'N' };
      
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
  
    it('should handle a single rover with no movement instructions', () => {
      // Test Case 2: A single rover with no movement instructions should stay in its initial position.
      const plateauSize: Position = { x: 10, y: 10, orientation: 'N' };
      const rover: RoverData = {
        position: { x: 5, y: 5, orientation: 'E' },
        instructions: '' // Empty instruction string
      };
      const roversData: RoverData[] = [rover];
      const expectedOutput = ['5 5 E']; // Rover should remain in the same position.
  
      const result = moveRovers(plateauSize, roversData);
  
      expect(result).toEqual(expectedOutput);
    });
  
    it('should handle a rover with invalid instructions', () => {
      // Test Case 3: A rover with invalid instructions should be skipped, and its initial position should be returned.
      const plateauSize: Position = { x: 8, y: 8, orientation: 'N' };
      const rover1: RoverData = {
        position: { x: 2, y: 3, orientation: 'S' },
        instructions: 'LRMMMM' // Contains invalid instruction 'M'
      };
      const rover2: RoverData = {
        position: { x: 4, y: 4, orientation: 'W' },
        instructions: 'RMLMLMLM'
      };
      const roversData: RoverData[] = [rover1, rover2];
      const expectedOutput = ['2 0 S', '4 4 E']; // Rover1 should be skipped due to invalid instruction.
  
      const result = moveRovers(plateauSize, roversData);
  
      expect(result).toEqual(expectedOutput);
    });
  
     it('should handle a rover with invalid instructions', () => {
        // Test Case: A rover with invalid instructions should be handled, and it should remain at the initial position.
        const plateauSize: Position = { x: 5, y: 5, orientation: 'N' };
         const rover: RoverData = {
           position: { x: 0, y: 0, orientation: 'S' }, // Rover starts at the lower-left corner and faces South.
         instructions: 'MMMMMM' // Attempting to move 6 steps South, but it should stop at the boundary.
         };
         const roversData: RoverData[] = [rover];
         const expectedOutput = ['0 0 S']; // Rover should remain at the lower-left corner.
      
         const result = moveRovers(plateauSize, roversData);
      
         expect(result).toEqual(expectedOutput);
       });
      
    it('should handle rovers colliding with each other', () => {
      // Test Case 5: Two rovers starting at the same position should not collide with each other.
      const plateauSize: Position = { x: 5, y: 5, orientation: 'N' };
      const rover1: RoverData = {
        position: { x: 3, y: 3, orientation: 'E' },
        instructions: 'MM' // Move East twice
      };
      const rover2: RoverData = {
        position: { x: 3, y: 3, orientation: 'W' }, // Rover2 starts at the same position as Rover1 and faces West.
        instructions: 'MM' // Move West twice
      };
      const roversData: RoverData[] = [rover1, rover2];
      const expectedOutput = ['5 3 E', '1 3 W']; // Both rovers move away from each other.
  
      const result = moveRovers(plateauSize, roversData);
  
      expect(result).toEqual(expectedOutput);
    });
  });
  