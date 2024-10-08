import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import './Game.css';

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = (index) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[index]) {
      return;
    }

    squares[index] = xIsNext ? 'X' : 'O';
    const location = getLocation(index);

    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          location: location,
        },
      ])
    );
    setStepNumber(currentHistory.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const current = history[stepNumber];
  const result = calculateWinner(current.squares);
  const winner = result.winner;
  const winningSquares = result.line || [];

  const moves = history.map((step, move) => {
    const desc = move
      ? `Move ${move}: (${step.location.row}, ${step.location.col})`
      : 'Go to game start';
    if (move === stepNumber) {
      return (
        <li key={move}>
          <strong>You are at move #{move}</strong>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleSortOrder}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
};

const getLocation = (index) => {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return { row, col };
};

export default Game;
