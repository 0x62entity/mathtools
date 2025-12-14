"use client";
import { useRef, useState } from "react";

function Cell({ revealed, flagged, value }: { revealed: boolean; flagged: boolean; value: number | "mine" }) {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center text-sm font-bold select-none cursor-pointer
        ${revealed 
          ? "bg-gray-300 border border-gray-400" 
          : "bg-gray-400 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-600 border-b-gray-600"
        }`}
    >
      {flagged && "🚩"}
      {revealed && value === "mine" && "💣"}
      {revealed && typeof value === "number" && value > 0 && (
        <span>{value}</span>
      )}
    </div>
  );
}

export default function Minesweeper() {
  const boardRef = useRef(null);
  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [mines, setMines] = useState(40);

  function fill() {
    return Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => ({
        revealed: false,
        flagged: false,
        value: Math.random() < 0.15 ? "mine" as const : Math.floor(Math.random() * 9)
      }))
    );
  };

  const [board, setBoard] = useState(fill());

  function resize(r: number, c: number, mines: number) {
    setRows(r);
    setCols(c);
    setMines(mines);
    setBoard(Array(r).fill(0).map(() => 
      Array(c).fill(0).map(() => ({
        revealed: false,
        flagged: false,
        value: Math.random() < 0.15 ? "mine" as const : Math.floor(Math.random() * 9)
      }))
    ));
  };

  return (
    <div>
      <div>        
        <div>
          <button
            onClick={() => resize(9, 9, 10)}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-md p-2 m-1"
          >
            Beginner
          </button>
          <button
            onClick={() => resize(16, 16, 40)}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-md p-2 m-1"
          >
            Intermediate
          </button>
          <button
            onClick={() => resize(16, 30, 99)}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-md p-2 m-1"
          >
            Expert
          </button>
        </div>
        <span>Mines: {mines}</span>
      </div>

      <div ref={boardRef}>
        {board.map((r, rI) => (
          <div key={rI} className="flex">
            {r.map((c, cI) => (
              <Cell 
                key={cI} 
                revealed={c.revealed} 
                flagged={c.flagged} 
                value={c.value}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}