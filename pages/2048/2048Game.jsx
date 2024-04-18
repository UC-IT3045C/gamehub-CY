import React, { useState, useEffect } from "react";
import "./styles.css";

const BoardSize = 4;

const initialBoard = Array(BoardSize).fill().map(() => Array(BoardSize).fill(0));

const generateRandomPosition = () => [
  Math.floor(Math.random() * BoardSize),
  Math.floor(Math.random() * BoardSize),
];

const generateRandomTile = () => (Math.random() < 0.9 ? 2 : 4);

const addRandomTile = (board) => {
  const emptyTiles = [];
  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === 0) {
        emptyTiles.push([rowIndex, colIndex]);
      }
    });
  });

  const [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  const newBoard = [...board];
  newBoard[row][col] = generateRandomTile();
  return newBoard;
};

const move = (board, direction) => {
  const rotatedBoard =
    direction === "up"
      ? board
      : direction === "down"
      ? rotateBoard(board, 2)
      : direction === "right"
      ? rotateBoard(board, 1)
      : rotateBoard(board, 3);

  let newBoard = rotateAndMoveTiles(rotatedBoard);

  if (direction === "left") {
    newBoard = rotateBoard(newBoard, 3);
  } else if (direction === "right") {
    newBoard = rotateBoard(newBoard, 1);
  } else if (direction === "down") {
    newBoard = rotateBoard(newBoard, 2);
  }

  return newBoard;
};

const rotateBoard = (board, times) => {
  const rotatedBoard = [...board];
  for (let t = 0; t < times; t++) {
    const newBoard = [];
    for (let i = 0; i < BoardSize; i++) {
      const newRow = [];
      for (let j = BoardSize - 1; j >= 0; j--) {
        newRow.push(rotatedBoard[j][i]);
      }
      newBoard.push(newRow);
    }
    rotatedBoard.splice(0, rotatedBoard.length, ...newBoard);
  }
  return rotatedBoard;
};

const rotateAndMoveTiles = (board) => {
  let newBoard = board.map((row) => [...row]);
  for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize - 1; j++) {
      if (newBoard[i][j] !== 0) {
        let k = j;
        while (k > 0 && newBoard[i][k - 1] === 0) {
          k--;
        }
        if (k !== j) {
          newBoard[i][k] = newBoard[i][j];
          newBoard[i][j] = 0;
        }
        if (k > 0 && newBoard[i][k] === newBoard[i][k - 1]) {
          newBoard[i][k] *= 2;
          newBoard[i][k - 1] = 0;
        }
      }
    }
  }
  return newBoard;
};

const hasWon = (board) => {
  for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
};

const Game2048 = () => {
  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    setBoard(addRandomTile(initialBoard));
  }, []);

  const handleKeyDown = (event) => {
    event.preventDefault();
    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const direction = keyMap[event.key];
    if (direction) {
      const newBoard = move(board, direction);
      if (!isBoardEqual(board, newBoard)) {
        setBoard(newBoard);
        setBoard(addRandomTile(newBoard));
      }
    }
  };

  const isBoardEqual = (board1, board2) => {
    for (let i = 0; i < BoardSize; i++) {
      for (let j = 0; j < BoardSize; j++) {
        if (board1[i][j] !== board2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const isGameOver = (board) => {
    for (let i = 0; i < BoardSize; i++) {
      for (let j = 0; j < BoardSize - 1; j++) {
        if (board[i][j] === 0 || board[i][j] === board[i][j + 1]) {
          return false;
        }
      }
    }
    for (let i = 0; i < BoardSize - 1; i++) {
      for (let j = 0; j < BoardSize; j++) {
        if (board[i][j] === 0 || board[i][j] === board[i + 1][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard([...initialBoard]);
  };

  return (
    <>
      <h1>2048</h1>
      <div className="board" tabIndex="0" onKeyDown={handleKeyDown}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((tile, colIndex) => (
              <div key={colIndex} className={`tile tile-${tile}`}>
                {tile !== 0 ? tile : ""}
              </div>
            ))}
          </div>
        ))}
        {hasWon(board) && (
          <div className="game-over">Congratulations! You won!</div>
        )}
        {isGameOver(board) && !hasWon(board) && (
          <div className="game-over">Game Over!</div>
        )}
        <button onClick={resetGame}>Restart</button>
      </div>
    </>
  );
};

export default Game2048;