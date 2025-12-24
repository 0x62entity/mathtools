// YES THIS FILE USED AI
"use client";

import { useEffect, useState, useRef } from "react";

type Tile = {
  id: number;
  val: number;
  r: number;
  c: number;
  isNew: boolean;
  toDelete?: boolean;
};

function TileComponent({ tile }: { tile: Tile }) {
  const colors: Record<number, string> = {
    2: "bg-zinc-700",
    4: "bg-gray-800",
    8: "bg-yellow-900",
    16: "bg-amber-900",
    32: "bg-orange-900",
    64: "bg-orange-700",
    128: "bg-red-900",
    256: "bg-red-800",
    512: "bg-red-700",
    1024: "bg-red-600",
    2048: "bg-red-500",
  };
  
  const top = tile.r * (96 + 8) + 12;
  const left = tile.c * (96 + 8) + 12;

  return (
    <div
      className={`absolute w-24 h-24 ${
        colors[tile.val] || "bg-yellow-700"
      } flex items-center justify-center rounded-md transition-all duration-100 ease-in-out z-10`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        opacity: tile.toDelete ? 0 : 1,
        zIndex: tile.toDelete ? 5 : 10,
        transform: tile.isNew ? "scale(1)" : "scale(1)",
      }}
    >
      {tile.val}
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute inset-0 p-2">
      {Array.from({ length: 4 }).map((_, r) => (
        <div key={r} className="flex flex-row">
          {Array.from({ length: 4 }).map((_, c) => (
            <div
              key={c}
              className="w-24 h-24 bg-zinc-800 m-1 rounded-md"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function G2048() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const idCounter = useRef(0);
  const isAnimating = useRef(false);

  const generateId = () => {
    idCounter.current += 1;
    return idCounter.current;
  };

  function addRandomTile(tiles: Tile[]) {
    const filled = new Set(tiles.filter(t => !t.toDelete).map(t => `${t.r},${t.c}`));
    const empty: [number, number][] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!filled.has(`${r},${c}`)) {
          empty.push([r, c]);
        }
      }
    }

    if (empty.length === 0) return tiles;

    const [r, c] = empty[Math.floor(Math.random()*empty.length)];
    return [
      ...tiles, { id: generateId(), val: Math.random() < 0.9 ? 2 : 4, r, c, isNew: true }
    ];
  }

  function reset() {
    let newTiles: Tile[] = [];
    idCounter.current = 0;
    newTiles = addRandomTile(newTiles);
    newTiles = addRandomTile(newTiles);
    setTiles(newTiles);
    setScore(0);
    isAnimating.current = false;
  }

  function canMove(currentTiles: Tile[]): boolean {
    const grid = Array(4).fill(null).map(() => Array(4).fill(0));
    currentTiles.filter(t => !t.toDelete).forEach(t => grid[t.r][t.c] = t.val);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) return true;
        if (c < 3 && grid[r][c] === grid[r][c + 1]) return true;
        if (r < 3 && grid[r][c] === grid[r + 1][c]) return true;
      }
    }
    return false;
  }

  function move(direction: "up" | "down" | "left" | "right") {
    if (isAnimating.current) return;

    const dr = direction === "down" ? 1 : direction === "up" ? -1 : 0;
    const dc = direction === "right" ? 1 : direction === "left" ? -1 : 0;

    let newTiles = tiles.map(t => ({ ...t, isNew: false as boolean }));
    let moved = false;
    let points = 0;
    const mergedIds = new Set<number>();

    const sortedTiles = [...newTiles].sort((a, b) => {
      if (dr === 1) return b.r - a.r; // Down: bottom first
      if (dr === -1) return a.r - b.r; // Up: top first
      if (dc === 1) return b.c - a.c; // Right: right first
      if (dc === -1) return a.c - b.c; // Left: left first
      return 0;
    });

    const processingGrid = Array(4).fill(null).map(() => Array(4).fill(null) as (Tile | null)[]);

    for (const tile of sortedTiles) {
      let r = tile.r;
      let c = tile.c;
      let nextR = r + dr;
      let nextC = c + dc;

      // Find farthest empty cell
      while (
        nextR >= 0 && nextR < 4 &&
        nextC >= 0 && nextC < 4 &&
        processingGrid[nextR][nextC] === null
      ) {
        r = nextR;
        c = nextC;
        nextR += dr;
        nextC += dc;
      }

      // Check for merge
      if (
        nextR >= 0 && nextR < 4 &&
        nextC >= 0 && nextC < 4 &&
        processingGrid[nextR][nextC] !== null
      ) {
        const other = processingGrid[nextR][nextC]!;
        if (other.val === tile.val && !mergedIds.has(other.id) && !other.toDelete) {
          // Merge
          tile.r = nextR;
          tile.c = nextC;
          tile.toDelete = true;
          
          other.toDelete = true;
          
          const newVal = tile.val * 2;
          const newTile: Tile = {
            id: generateId(),
            val: newVal,
            r: nextR,
            c: nextC,
            isNew: true
          };
          
          newTiles.push(newTile);
          mergedIds.add(newTile.id);
          
          processingGrid[nextR][nextC] = newTile;
          
          points += newVal;
          moved = true;
          continue;
        }
      }

      if (tile.r !== r || tile.c !== c) {
        tile.r = r;
        tile.c = c;
        moved = true;
      }
      processingGrid[r][c] = tile;
    }

    if (moved) {
      setTiles(newTiles);
      setScore(s => s + points);
      isAnimating.current = true;
      
      setTimeout(() => {
        setTiles(prev => {
          const next = prev.filter(t => !t.toDelete);
          const add = addRandomTile(next);
          
          if (!canMove(add)) {
            setTimeout(() => alert(`No moves left! Final Score: ${score + points}`), 100);
          }
          return add;
        });
        isAnimating.current = false;
      }, 100);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft": 
          move("left");
          break;
        case "ArrowRight": 
          move("right");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">{score}</span>
      <div className="relative w-108 h-108 bg-zinc-900 rounded-md">
        <Grid />
        {tiles.map(tile => (
          <TileComponent key={tile.id} tile={tile} />
        ))}
      </div>
      <span>Arrow keys to play</span>
      <button 
        className="bg-zinc-800 hover:bg-zinc-700 p-2 m-1 rounded-md w-min"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}