"use client";

import { useEffect, useRef, useState } from "react";

export default function CrappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const WIDTH = 384;
    const HEIGHT = 640;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let start = false;

    const bird = {
      x: 80,
      y: HEIGHT / 2,
      radius: 15,
      velocity: 0,
      gravity: 0.08,
      jump: -5,
    };

    const PIPE_WIDTH = 60;
    const PIPE_GAP = 300;
    const PIPE_SPEED = 2;
    const PIPE_SPACING = 300;

    interface Pipe {
      x: number;
      topHeight: number;
    }

    let pipes: Pipe[] = [];
    let frameCount = 0;
    const PIPE_SPAWN_INTERVAL = PIPE_SPACING / PIPE_SPEED;

    function spawnPipe() {
      const minHeight = 50;
      const maxHeight = HEIGHT - PIPE_GAP - minHeight;
      const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

      pipes.push({
        x: WIDTH,
        topHeight,
      });
    }

    function handleInput(e: KeyboardEvent | MouseEvent) {
      if (e instanceof KeyboardEvent && e.code !== "Space") return;
      if (!start) {
        start = true;
      }
      bird.velocity = bird.jump;
    }

    function handleClick(e: MouseEvent) {
      handleInput(e);
    }

    window.addEventListener("keydown", handleInput);
    canvas.addEventListener("click", handleClick);

    function gameLoop() {
      if (!ctx) return;
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (start) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y - bird.radius < 0) {
          die();
        }

        if (bird.y + bird.radius > HEIGHT) {
          die();
        }

        frameCount++;
        if (frameCount % PIPE_SPAWN_INTERVAL === 0) {
          spawnPipe();
        }

        pipes.forEach((pipe) => {
          pipe.x -= PIPE_SPEED;

          checkCollided(pipe);
        });

        // clear off-screen
        pipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);
      }

      ctx.fillStyle = "#228B22";
      pipes.forEach((pipe) => {
        ctx.fillRect(
          pipe.x,
          0,
          PIPE_WIDTH,
          pipe.topHeight
        );

        ctx.fillRect(
          pipe.x,
          pipe.topHeight + PIPE_GAP,
          PIPE_WIDTH,
          HEIGHT - pipe.topHeight - PIPE_GAP
        );
      });

      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(gameLoop);
    }

    function checkCollided(pipe: Pipe) {
      // if x and y line up then thing die :thumbup:
      if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + PIPE_WIDTH) {
        if (bird.y - bird.radius < pipe.topHeight || 
            bird.y + bird.radius > pipe.topHeight + PIPE_GAP) {
          die();
        }
      }
    }

    function die() {
      start = false;
      bird.x = 80;
      bird.y = HEIGHT / 2;
      pipes = [];
      frameCount = 0;
    }

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleInput);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <canvas
        ref={canvasRef}
        className="border-4 border-zinc-700 w-96 h-160 bg-blue-400 cursor-pointer"
      />
      <span>Use Spacebar or click to jump</span>
    </div>
  );
}