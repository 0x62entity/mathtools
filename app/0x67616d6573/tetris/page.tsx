"use client";

import { useState, useEffect, useCallback } from "react";

const WIDTH = 10;
const HEIGHT = 20;

type Tetromino = number[][];

const TETROMINOS: { [key: string]: { shape: Tetromino; color: string } } = {
  I: { shape: [[1, 1, 1, 1]], color: "bg-cyan-500" },
  O: { shape: [[1, 1], [1, 1]], color: "bg-yellow-500" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "bg-purple-500" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "bg-green-500" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "bg-red-500" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "bg-blue-500" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "bg-orange-500" },
};

export default function Tetris() {
  const [board, setBoard] = useState<string[][]>(createBoard());
  const [piece, setPiece] = useState<{ shape: Tetromino; color: string; x: number; y: number } | null>(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  function createBoard(): string[][] {
    return Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(""));
  }

  function getPiece() {
    const pieces = Object.values(TETROMINOS);
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    return { ...piece, x: Math.floor(WIDTH / 2) - 1, y: 0 };
  }

  const collide = useCallback((p: typeof piece, offsetX = 0, offsetY = 0): boolean => {
    if (!p) return false;

    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) {
          const x1 = p.x + x + offsetX;
          const y1 = p.y + y + offsetY;
          if (x1 < 0 || x1 >= WIDTH || y1 >= HEIGHT) return true;
          if (y1 >= 0 && board[y1][x1]) return true;
        }
      }
    }

    return false;
  }, [board]);

  const rotate = useCallback(() => {
    if (!piece || paused) return;
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );

    const piece1 = { ...piece, shape: rotated };

    if (!collide(piece1)) setPiece(piece1);
  }, [piece, paused, collide]);

  const merge = useCallback(() => {
    if (!piece) return;
    const board1 = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const x1 = piece.x + x;
          const y1 = piece.y + y;
          if (y1 >= 0) board1[y1][x1] = piece.color;
        }
      });
    });
    
    // clear lines immediately
    const board2 = board1.filter(row => row.some(cell => !cell));
    const cleared = HEIGHT - board2.length;
    
    if (cleared > 0) {
      setScore(prev => prev + cleared * 100);
      const empty = Array.from({ length: cleared }, () => Array(WIDTH).fill(""));
      setBoard([...empty, ...board2]);
    } else {
      setBoard(board1);
    }
    }, [piece, board]);

  const move = useCallback((dx: number, dy: number) => {
    if (!piece || paused) return;

    if (!collide(piece, dx, dy)) {
      setPiece({ ...piece, x: piece.x + dx, y: piece.y + dy });
    } else if (dy > 0) {
      merge();
      const piece1 = getPiece();
      if (collide(piece1)) {
        setDone(true);
      } else {
        setPiece(piece1);
      }
    }
  }, [piece, paused, collide, merge]);

  useEffect(() => {
    if (done || paused) return;
    const interval = setInterval(() => move(0, 1), 500);
    return () => clearInterval(interval);
  }, [done, paused, move]);

  useEffect(() => {
    if (!piece && !done) {
      setPiece(getPiece());
    }
  }, [piece, done]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "p" || e.key === "P") {
        setPaused(p => !p);
        return;
      }

      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp" || e.key === " ") rotate();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [done, paused, move, rotate]);

  function reset() {
    setBoard(createBoard());
    setPiece(null);
    setDone(false);
    setScore(0);
    setPaused(false);
  }

  function render() {
    const board1 = board.map(row => [...row]);
    if (piece) {
      piece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = piece.y + y;
            const boardX = piece.x + x;
            if (boardY >= 0 && boardY < HEIGHT && boardX >= 0 && boardX < WIDTH) {
              board1[boardY][boardX] = piece.color;
            }
          }
        });
      });
    }
    return board1;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="text-2xl font-semibold">Score: {score}</div>
      <div className="grid gap-[1px] bg-zinc-700" style={{ gridTemplateColumns: `repeat(${WIDTH}, 24px)` }}>
        {render().map((row, y) =>
          row.map((cell, x) => (
            <div key={`${y}-${x}`} className={`w-6 h-6 ${cell || "bg-zinc-900"}`} />
          ))
        )}
      </div>
      <div className="flex">
        <button onClick={reset} className="p-2 m-1 bg-zinc-700 hover:bg-zinc-600 rounded-md">
          Reset
        </button>
        <button onClick={() => setPaused(prev => !prev)} className="p-2 m-1 bg-zinc-700 hover:bg-zinc-600 rounded-md">
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      {done && <span className="text-2xl font-semibold">Game Over</span>}
    </div>
  );
}