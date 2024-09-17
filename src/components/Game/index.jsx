import "./Game.sass";
import GameButton from "./GameButton";
import { useGame } from "./useGame";

const Game = () => {
  const { matrix, moves, turn, resetGame, updateMatrix } = useGame();
  return (
    <div className="game">
      <div className="game_header">Turn: Player {turn}</div>
      <div className="game_body">
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <GameButton
              key={`${i}-${j}`}
              cell={cell}
              i={i}
              j={j}
              updateMatrix={updateMatrix}
            />
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
