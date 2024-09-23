import { useCallback, useEffect, useState } from "react";
import { checkWinner } from "../../utils";
import { API_ENDPOINT, API_KEY } from "../../constants";

export const useGame = () => {
  const [gameState, setGameState] = useState({
    matrix: [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ],
    turn: "0",
    moves: 0,
  });

  /**
   *
   */
  const fetchData = useCallback(async () => {
    // const gameState = await fetch(API_ENDPOINT)
    //   .then((d) => d.json())
    //   .then((d) => d.record);
    let savedGameState = localStorage.getItem("gameState");
    if (savedGameState) {
      setGameState(JSON.parse(savedGameState));
    }
  }, []);

  /**
   *
   */
  const persistData = useCallback(async () => {
    // await fetch(API_ENDPOINT, {
    //   method: "PUT",
    //   headers: {
    //     "X-Master-Key": API_KEY,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(gameState),
    // });
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  /**
   *
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   *
   */
  useEffect(() => {
    persistData();
  }, [gameState, persistData]);

  /**
   *
   * @param {*} i
   * @param {*} j
   * @returns
   */
  const updateMatrix = async (i, j) => {
    if (gameState.matrix[i][j] !== "-") {
      return;
    }
    const newMatrix = [...gameState.matrix];
    newMatrix[i][j] = gameState.turn;
    const winner = checkWinner(gameState.matrix);
    setGameState((oldGameState) => ({
      matrix: [...newMatrix],
      turn: oldGameState.turn == "0" ? "X" : "0",
      moves: oldGameState.moves + 1,
    }));

    if (!winner) {
      await persistData();
    } else {
      setTimeout(() => {
        confirm(`${gameState.turn} won`);
      }, 10);
      await resetGame();
    }
  };

  /**
   *
   */
  const resetGame = async () => {
    setGameState({
      matrix: [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ],
      turn: "0",
      moves: 0,
    });
  };

  return {
    gameState,
    resetGame,
    updateMatrix,
  };
};
