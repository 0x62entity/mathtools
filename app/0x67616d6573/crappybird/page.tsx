"use client";

import { useEffect, useRef, useState } from "react";

export default function CrappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <canvas
        ref={canvasRef}
        className="border-4 border-zinc-700"
      />
      <span>Use Spacebar or click to jump</span>
    </div>
  );
}