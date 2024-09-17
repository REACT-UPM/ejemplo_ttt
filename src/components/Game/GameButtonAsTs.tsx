import PropTypes from "prop-types";
import React, { FC } from "react";

type GameButtonAsTsType = {
  cell: string, 
  updateMatrix: (i: number, j: number) => void, 
  i: number, 
  j: number
}

const GameButtonAsTs: FC<GameButtonAsTsType> = ({ cell, updateMatrix, i, j }) => {
  return (
    <button onClick={() => updateMatrix(i, j)}>
      {cell}
    </button>
  );
};


export default GameButtonAsTs;
