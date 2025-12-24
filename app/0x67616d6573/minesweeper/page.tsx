"use client";
import { useRef, useState, useEffect } from "react";

function Cell({ revealed, flagged, value, onClick, onRightClick }: { 
  revealed: boolean; 
  flagged: boolean; 
  value: number | "mine";
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}) {
  const colors: Record<number, string> = {
    1: "text-blue-600",
    2: "text-green-600",
    3: "text-red-600",
    4: "text-purple-600",
    5: "text-yellow-600",
    6: "text-cyan-600",
    7: "text-black",
    8: "text-gray-600"
  };

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      className={`w-8 h-8 flex items-center justify-center text-sm font-bold select-none cursor-pointer
        ${revealed 
          ? "bg-gray-300 border border-gray-400" 
          : "bg-gray-400 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-600 border-b-gray-600 hover:bg-gray-500"
        }`}
    >
      {flagged && !revealed && "🚩"}
      {revealed && value === "mine" && "💣"}
      {revealed && typeof value === "number" && value > 0 && (
        <span className={colors[value]}>{value}</span>
      )}
    </div>
  );
}

export default function Minesweeper() {
  const boardRef = useRef(null);
  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [mines, setMines] = useState(40);
  const [status, setStatus] = useState<"play" | "win" | "lose">("play");
  const [board, setBoard] = useState(fill());
  const [secs, setSecs] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (status !== "play" || !started) return;

    const interval = setInterval(() => {
      setSecs(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [status, started]);

  function generate(r: number, c: number, mines: number) {
    let ret = Array(r).fill(0).map(() => 
      Array(c).fill(0).map(() => ({
        revealed: false,
        flagged: false,
        value: 0 as number | "mine"
      }))
    );

    let n = 0;
    while (n < mines) {
      const r1 = Math.floor(Math.random() * r);
      const c1 = Math.floor(Math.random() * c);
      if (ret[r1][c1].value !== "mine") {
        ret[r1][c1].value = "mine";
        n++;
      }
    }

    // calculate adjacent mines
    for (let r1 = 0; r1 < r; r1++) {
      for (let c1 = 0; c1 < c; c1++) {
        if (ret[r1][c1].value == "mine") continue;
        
        let count = 0;
        for (let r2 = -1; r2 <= 1; r2++) {
          for (let c2 = -1; c2 <= 1; c2++) {
            const r3 = r1 + r2;
            const c3 = c1 + c2;
            if (r3 >= 0 && r3 < r && c3 >= 0 && c3 < c && ret[r3][c3].value == "mine") {
              count++;
            }
          }
        }
        ret[r1][c1].value = count;
      }
    }

    return ret;
  }

  function fill() {
    return generate(rows, cols, mines);
  };

  function resize(r: number, c: number, mineCount: number) {
    setRows(r);
    setCols(c);
    setMines(mineCount);
    setBoard(generate(r, c, mineCount));
    setStatus("play");
    setSecs(0);
    setStarted(false);
  };

  function revealCell(row: number, col: number) {
    if (status !== "play" || board[row][col].revealed || board[row][col].flagged) return;

    if (!started) setStarted(true);

    let ret = board.map(r => r.map(c => ({ ...c })));
    
    if (ret[row][col].value === "mine") {
      // reveal all mines (game over)
      ret.forEach(r => r.forEach(c => {
        if (c.value === "mine") c.revealed = true;
      }));
      setBoard(ret);
      setStatus("lose");
      return;
    }

    // floodfill empty cells
    const stack: [number, number][] = [[row, col]];
    while (stack.length > 0) {
      const [r, c] = stack.pop()!;
      if (r < 0 || r >= rows || c < 0 || c >= cols || ret[r][c].revealed) continue;
      
      ret[r][c].revealed = true;
      
      if (ret[r][c].value === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            stack.push([r + dr, c + dc]);
          }
        }
      }
    }

    setBoard(ret);

    if (ret.every(r => r.every(c => 
      c.revealed || c.value === "mine"
    ))) setStatus("win");
  }

  function flag(row: number, col: number, e: React.MouseEvent) {
    e.preventDefault();
    if (status !== "play" || board[row][col].revealed) return;
    if ((mines - flags) <= 0) return;

    let ret = board.map(r => r.map(c => ({ ...c })));
    ret[row][col].flagged = !ret[row][col].flagged;
    setBoard(ret);
  }

  const flags = board.flat().filter(c => c.flagged).length;

  return (
    <div className="p-4">
      <div className="mb-4">        
        <div className="mb-2">
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
      </div>

      <div className="w-min">
        <div className="bg-gray-400 w-full h-12 flex flex-row justify-between items-center p-2">
          <span className="bg-black text-red-600 text-xl p-1 w-[3em] flex items-center justify-center">{mines - flags}</span>

          <span 
            onClick={() => resize(rows, cols, mines)}
            className="bg-gray-400 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-600 border-b-gray-600 hover:bg-gray-500 w-8 h-8 flex items-center justify-center"
          >
            {status == "win" && "😎"}
            {status == "lose" && "😵"}
            {status == "play" && "🙂"}
          </span>

          <span className="bg-black text-red-600 text-xl p-1 w-[3em] flex items-center justify-center">{secs}</span>
        </div>

        <div ref={boardRef} className="inline-block border-4 border-gray-600">
          {board.map((r, rI) => (
            <div key={rI} className="flex">
              {r.map((c, cI) => (
                <Cell 
                  key={cI} 
                  revealed={c.revealed} 
                  flagged={c.flagged} 
                  value={c.value}
                  onClick={() => revealCell(rI, cI)}
                  onRightClick={(e) => flag(rI, cI, e)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}