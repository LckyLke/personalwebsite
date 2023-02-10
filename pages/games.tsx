// pages/games.tsx
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChessBoard from "../components/ChessGame";
import NavLink from "../components/NavLink";
import SquareRow from "../components/SquareRow";

const Game: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    checkForWinner();
  }, [board]);

  const handleClick = (index: number) => {
    if (winner) return;

    const newBoard = [...board];
    if (newBoard[index]) return;

    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkForWinner = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    }
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className="flex items-center justify-center w-32 h-32 bg-white border rounded-md text-7xl"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div>
      <div className="container flex flex-col items-center justify-around px-4 py-8 mx-auto">
        <Head>
          <title>Luke Friedrichs | Games</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="mb-4 text-4xl font-bold">Tic Tac Toe</h1>
        <div className="flex justify-center">
          <div className="flex flex-col flex-wrap">
            <SquareRow>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </SquareRow>
            <SquareRow>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </SquareRow>
            <SquareRow>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </SquareRow>
          </div>
        </div>
        {winner && <p className="mt-8 text-2xl font-bold">{winner} has won!</p>}

        {!winner && board.every((square) => square) && (
          <p className="mt-8 text-2xl font-bold">It's a draw!</p>
        )}

        <button
          className="px-4 py-2 mt-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={resetGame}
        >
          Reset
        </button>

        <NavLink href="/" label="Back to Home" className="mt-4 " />
      </div>
      <ChessBoard />
    </div>
  );
};

export default Game;
