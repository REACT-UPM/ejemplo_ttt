// import "./Game.sass";
import { Alert, Button, Col, Container, Row, Stack } from "react-bootstrap";
import GameButton from "./GameButton";
import { useGame } from "./useGame";
import { createPortal } from "react-dom";

const Game = () => {
  const { gameState, resetGame, updateMatrix, alert, setAlert } = useGame();
  return (
    <>
      <Stack className="game" gap={1}>
        <div className="game_header mb-1 fw-bold">
          Turn: Player {gameState.turn}
        </div>
        <Container className="game_body" fluid>
          {gameState.matrix.map((row, i) => (
            <Row key={i} className="gap-1">
              {row.map((cell, j) => (
                <Col key={j} className="p-0 mb-1">
                  <GameButton
                    cell={cell}
                    i={i}
                    j={j}
                    updateMatrix={updateMatrix}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <Stack direction="verticaol" gap={3} className="game_footer">
          <p className="m-0">Total moves: {gameState.moves}</p>
          <div className="buttons mr-auto d-flex justify-content-end">
            <Button variant="primary" onClick={() => resetGame()}>
              Reset game
            </Button>
          </div>
        </Stack>
      </Stack>
      {createPortal(
        <>
          {alert && (
            <Alert variant="danger" className="position-fixed top-0 start-50 translate-middle-x" dismissible onClose={() => setAlert(false)}>
              {gameState.turn} ha ganado!!
            </Alert>
          )}
        </>,
        document.body
      )}
    </>
  );
};

export default Game;
