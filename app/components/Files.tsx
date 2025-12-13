"use client";

import { useState } from "react";

export default function Files() {
  const [from, setFrom] = useState("avif");
  const [to, setTo] = useState("avif");
  const formats = ["avif", "bmp", "png", "gif", "jpeg", "heic", "tif", "tiff", "webp"];

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        className="bg-zinc-800 p-2 m-1 rounded-md w-min"
      />

      <b>From</b>
      <select
        className="bg-zinc-800 p-2 m-1 rounded-md w-min"
        onChange={(e) => setFrom(e.target.value)}
      >
        {formats.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      <b>To</b>
      <select
        className="bg-zinc-800 p-2 m-1 rounded-md w-min"
        onChange={(e) => setTo(e.target.value)}
      >
        {formats.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      <button className="bg-blue-600 rounded-md p-2 m-1 w-min">
        Convert
      </button>
    </div>
  );
}