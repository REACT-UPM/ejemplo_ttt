import { useState } from "react";
import { checkWinner } from "../utils";

const Game = () => {
  const [matrix, setMatrix] = useState([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  const [turn, setTurn] = useState("0");
  const [moves, setMoves] = useState(0);

  const updateMatrix = (i, j) => {
    if (matrix[i][j] !== "-") {
      return;
    }
    const newMatrix = [...matrix];
    newMatrix[i][j] = turn;
    setMatrix(newMatrix);
    setMoves((moves) => moves + 1);
    const winner = checkWinner(matrix);
    if (!winner) {
      setTurn(turn == "0" ? "X" : "0");
    } else {
      setTimeout(() => {
        confirm(`${turn} won`);
        resetGame();
      }, 1);
    }
  };

  const resetGame = () => {
    setMatrix([
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ]);
    setTurn("0");
    setMoves(0);
  };

  return (
    <div className="game">
      <div className="game_header">Turn: Player {turn}</div>
      <div className="game_body">
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <button key={`${i}-${j}`} onClick={() => updateMatrix(i, j)}>
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="game_footer">
        <p>Total moves: {moves}</p>
        <div className="buttons">
          <button onClick={() => resetGame()}>Reset game</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
