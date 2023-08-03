// Definition of the Position interface representing the rover's position
export interface Position {
  x: number;  // x co-ordinate
  y: number;  // y co - ordinate
}

// Definition of the RoverData interface
export interface RoverData {
  position: Position;   // Initial position of the rover
  orientation: 'N' | 'E' | 'S' | 'W';  // Orientation: North, East, South, or West
  instructions: string; // Instructions to guide the rover's movement
}

// Function to validate if an instruction is valid (consists only of 'L', 'R', and 'M' characters)
function isValidInstruction(instruction: string): boolean {
  return /^[LRM]+$/.test(instruction);
}

// Main function to move multiple rovers on the plateau
export function moveRovers(plateauSize: Position, roversData: RoverData[]): string[] {
  const { x: maxX, y: maxY } = plateauSize;

  // Function to move a single rover based on its instructions and return its final position
  function moveRover(position: Position, orientation: 'N' | 'E' | 'S' | 'W', instructions: string): Position {
    let { x, y } = position;
    const directions: Array<'N' | 'E' | 'S' | 'W'> = ['N', 'E', 'S', 'W'];

    function turnLeft(): void {
      orientation = directions[(directions.indexOf(orientation) - 1 + 4) % 4];
    }

    function turnRight(): void {
      orientation = directions[(directions.indexOf(orientation) + 1) % 4];
    }

    function moveForward(): void {
      switch (orientation) {
        case 'N':
          y = Math.min(y + 1, maxY); // Constrain the movement within the maxY boundary
          break;
        case 'E':
          x = Math.min(x + 1, maxX); // Constrain the movement within the maxX boundary
          break;
        case 'S':
          y = Math.max(y - 1, 0); // Constrain the movement within the lower boundary (y=0)
          break;
        case 'W':
          x = Math.max(x - 1, 0); // Constrain the movement within the left boundary (x=0)
          break;
      }
      // Additional step to ensure the rover doesn't go beyond the lower-left boundary
      x = Math.max(x, 0);
      y = Math.max(y, 0);
    }

    for (const instruction of instructions) {
      if (!isValidInstruction(instruction)) {
        // Invalid instruction found, skip this rover's instructions
        console.warn(`Skipping rover's instructions due to invalid instruction: ${instruction}`);
        break;
      }
      switch (instruction) {
        case 'L':
          turnLeft();
          break;
        case 'R':
          turnRight();
          break;
        case 'M':
          moveForward();
          break;
      }
    }

    return { x, y };
  }

  return roversData.map(({ position, orientation, instructions }) => {
    const finalPosition = moveRover(position, orientation, instructions);
    return `${finalPosition.x} ${finalPosition.y} ${orientation}`;
  });
}


