"use client";

import { useEffect, useState } from "react";

function Cell({ score }: { score: number }) {
  return (
    <div className="w-24 h-24 bg-zinc-800 m-1 flex items-center justify-center rounded-md">
      {score ? score : ""}
    </div>
  );
}

export default function G2048() {
  const [board, setBoard] = useState<number[][]>([]);

  function tile(board: number[][]) {
    let empty: [number, number][] = [];
    board.forEach((r, i) => {
      r.forEach((c, j) => {
        if (c == 0) empty.push([i, j]);
      });
    });

    if (empty.length == 0) return board;

    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    const board1 = board.map(r => [...r]);
    board1[r][c] = 2;
    return board1;
  }

  function reset() {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(tile(tile(board)));
  }

  function move(row: number[]) {
    let ret: number[] = [];
    row = row.filter(x => x !== 0);
    let i = 0;

    while (i < row.length) {
      if (i + 1 < row.length && row[i] == row[i + 1]) {
        ret.push(row[i] * 2);
        i += 2;
      } else {
        ret.push(row[i]);
        i += 1;
      }
    }

    while(ret.length < 4) ret.push(0);
    return ret;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let next: number[][] | null = null;
      const transpose = (b: number[][]) => b[0].map((_, i) => b.map(r => r[i]));

      switch (e.key) {
        case "ArrowUp": {
          next = transpose(transpose(board).map(row => move(row)));
          break;
        }
        case "ArrowDown": {
          next = transpose(transpose(board).map(row => move([...row].reverse()).reverse()));
          break;
        }
        case "ArrowLeft": {
          next = board.map(row => move(row));
          break;
        }
        case "ArrowRight": {
          next = board.map(row => move([...row].reverse()).reverse());
          break;
        }
        default:
          break;
      }

      if (next && !next.every((row, i) => row.every((v, j) => v === board[i][j]))) {
        setBoard(tile(next));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    reset();
  }, [])

  return (
    <div className="w-108 h-108 flex flex-col items-center justify-center rounded-md bg-zinc-900">
      <div>
        {board.map((row, i) => (
          <div key={i} className="flex flex-row w-96 h-24 m-2">
            {row.map((value, j) => (
              <Cell key={j} score={value} />
            ))}
          </div>
        ))}
      </div>
      <span>Arrow keys to play</span>
    </div>
  );
}