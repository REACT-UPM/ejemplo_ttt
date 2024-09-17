import { useEffect, useState } from "react";
import { checkWinner } from "../utils";

const Game = () => {
  const [matrix, setMatrix] = useState([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  const [turn, setTurn] = useState("0");
  const [moves, setMoves] = useState(0);

  const fetchData = async () => {
    const { gameState } = await fetch(
      "https://api.jsonbin.io/v3/b/66e97e2bacd3cb34a8862286"
    )
      .then((d) => d.json())
      .then((d) => d.record);
    setMatrix(gameState.matrix);
    setTurn(gameState.turn);
    setMoves(gameState.moves);
  };

  const persistData = async () => {
    const data = await fetch(
      "https://api.jsonbin.io/v3/b/66e97e2bacd3cb34a8862286",
      {
        method: "PUT",
        headers: {
          "X-Master-Key":
            "$2a$10$m3SS1jBM6kTBZL.vGXVN/OpOLSNjxPuOnoY/HwDSMj2OKBdT3bPFe",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameState: {
            turn,
            moves,
            matrix,
          },
        }),
      }
    )
      .then((d) => d.json())
      .then((d) => d);

    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateMatrix = async (i, j) => {
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
      await persistData();
    } else {
      setTimeout(() => {
        confirm(`${turn} won`);
        resetGame();
      }, 1);
    }
  };

  const resetGame = async () => {
    setMatrix([
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ]);
    setTurn("0");
    setMoves(0);
    await persistData();
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
