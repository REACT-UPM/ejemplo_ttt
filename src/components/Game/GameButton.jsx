import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const GameButton = ({ cell, updateMatrix, i, j }) => {
  const className = cell == "-" ? "" : "selected";
  return (
    <Button className={className + " d-block w-100 p-4 rounded-0"} variant="primary" onClick={() => updateMatrix(i, j)}>
      {cell}
    </Button>
  );
};

// not needed with TS anymore
// https://www.npmjs.com/package/prop-types
GameButton.propTypes = {
  cell: PropTypes.string.isRequired,
  updateMatrix: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
};

GameButton.defaultProps = {};

export default GameButton;
