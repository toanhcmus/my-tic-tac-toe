import React from 'react';
import './Square.css';

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
