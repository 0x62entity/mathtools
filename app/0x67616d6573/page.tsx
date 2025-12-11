"use client";

import { useState } from "react";

export default function Games() {
  const [title, setTitle] = useState("2048");
  const [desc, setDesc] = useState("Combine the tiles to get 2048");

  const games = [
    "2048:Combine the tiles to get 2048",
    "FlappyBird:Flappy Bird",
    "Minesweeper:Minesweeper",
    "Tetris:Stack blocks ig",
    "TicTacToe:Tic Tac Toe",
  ];

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black p-4 w-screen">
      <h1 className="font-bold text-3xl">{title}</h1>
      <p>{desc}</p>
      <div className="flex flex-row w-screen items-start w-screen">
        <div className="h-max bg-zinc-900 w-[10%] rounded-md">
          {games.map(game => (
            <div
              key={game}
              className="hover:bg-zinc-800 rounded-md p-2 m-1"
              onClick={() => {
                setTitle(game.split(':')[0]);
                setDesc(game.split(':')[1]);
                document.getElementById("game-container")?.focus();
              }}
            >
              <span className="text-md font-semibold">{game.split(':')[0]}</span>
            </div>
          ))}
        </div>
        <div className="w-screen">
          <iframe
            className="h-192 w-[100%]"
            src={`/0x67616d6573/${title.toLowerCase()}`}
            id="game-container"
          />
        </div>
      </div>
    </div>
  );
}