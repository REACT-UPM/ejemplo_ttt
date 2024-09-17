export const checkWinner = (matrix) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      matrix[i][0] !== "-" &&
      matrix[i][0] === matrix[i][1] &&
      matrix[i][1] === matrix[i][2]
    ) {
      return matrix[i][0]; // Return 'X' or 'O'
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      matrix[0][i] !== "-" &&
      matrix[0][i] === matrix[1][i] &&
      matrix[1][i] === matrix[2][i]
    ) {
      return matrix[0][i]; // Return 'X' or 'O'
    }
  }

  // Check diagonals
  if (
    matrix[0][0] !== "-" &&
    matrix[0][0] === matrix[1][1] &&
    matrix[1][1] === matrix[2][2]
  ) {
    return matrix[0][0]; // Return 'X' or 'O'
  }

  if (
    matrix[0][2] !== "-" &&
    matrix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0]
  ) {
    return matrix[0][2]; // Return 'X' or 'O'
  }

  // No winner
  return null;
};
