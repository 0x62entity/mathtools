"use client";

import { Titillium_Web } from "next/font/google";
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