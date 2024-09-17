import PropTypes from "prop-types";

const GameButton = ({ cell, updateMatrix, i, j }) => {
  const className = cell == "-" ? "" : "selected";
  return (
    <button className={className} onClick={() => updateMatrix(i, j)}>
      {cell}
    </button>
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
