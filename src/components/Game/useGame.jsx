import { useCallback, useEffect, useState } from "react";
import { checkWinner } from "../../utils";
import { API_ENDPOINT, API_KEY } from "../../constants";

export const useGame = () => {
  const [matrix, setMatrix] = useState([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  const [turn, setTurn] = useState("0");
  const [moves, setMoves] = useState(0);

  const fetchData = useCallback(async () => {
    const { gameState } = await fetch(API_ENDPOINT)
      .then((d) => d.json())
      .then((d) => d.record);
    setMatrix(gameState.matrix);
    setTurn(gameState.turn);
    setMoves(gameState.moves);
  }, []);

  const persistData = useCallback(async () => {
    await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameState: {
          turn: turn,
          moves: moves,
          matrix: matrix,
        },
      }),
    });
  }, [turn, moves, matrix]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    persistData();
  }, [matrix, moves, turn, persistData]);

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
      confirm(`${turn} won`);
      await resetGame();
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
  };


  return {
    matrix, 
    moves, 
    turn, 
    resetGame,
    updateMatrix
  }
};
