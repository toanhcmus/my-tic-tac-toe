import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ squares, onClick, winningSquares }) => {
  const renderSquare = (i, j) => {
    const index = i * 3 + j;
    const isWinningSquare = winningSquares.includes(index);
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onClick(index)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const boardSize = 3;
  const boardRows = [];

  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(renderSquare(i, j));
    }
    boardRows.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return <div>{boardRows}</div>;
};

export default Board;
