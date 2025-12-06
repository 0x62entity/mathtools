"use client";

import { useState, useRef, useEffect } from "react";

export default function Timer() {
  const [remain, setRemain] = useState<string>("");
  const [elapsed, setElapsed] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [secs, setSecs] = useState<number>(0);
  const [ms, setMs] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const stopRef = useRef<number | null>(null);

  function convert(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    ms -= hours * 3600000;

    const minutes = Math.floor(ms / 60000);
    ms -= minutes * 60000;

    const seconds = Math.floor(ms / 1000);
    ms -= seconds * 1000;

    return `${hours}h ${minutes}m ${seconds}s ${ms}ms`;
  }

  function countdown(millisecs: number) {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const now = Date.now();
    const to = now + millisecs;

    timerRef.current = window.setInterval(() => {
      if (Date.now() >= to) {
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setRemain(convert(0));
        return;
      }

      let msLeft = to - Date.now();
      setRemain(msLeft < 0 ? convert(0) : convert(msLeft));
    }, 1);
  }

  function stopwatch() {
    const now = Date.now();
    stopRef.current = window.setInterval(() => {
      setElapsed(Date.now() - now);
    })
  }

  function stop() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (stopRef.current !== null) {
      window.clearInterval(stopRef.current);
      stopRef.current = null;
    }
    setRemain(convert(0));
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold">Timer</h3>
      <label>{remain}</label>
      <div>
        <button className="bg-blue-600 m-1 p-2 rounded-md" onClick={() =>
          countdown(
            hours * 60 * 60 * 1000 +
            mins * 60 * 1000 +
            secs * 1000 +
            ms
          )
        }>Start</button>
        <input type="number" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="Hours" defaultValue={0} onChange={(e) => setHours(Number.parseInt(e.target.value))}/>
        <input type="number" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="Mins" defaultValue={0} onChange={(e) => setMins(Number.parseInt(e.target.value))}/>
        <input type="number" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="Secs" defaultValue={0} onChange={(e) => setSecs(Number.parseInt(e.target.value))}/>
        <input type="number" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="Millisecs" defaultValue={0} onChange={(e) => setMs(Number.parseInt(e.target.value))}/>
        <button className="bg-red-600 m-1 p-2 rounded-md" onClick={stop}>Stop</button>
      </div>
      <h3 className="text-xl font-semibold">Stopwatch</h3>
      <label>{convert(elapsed)}</label>
      <div>
        <button className="bg-blue-600 m-1 p-2 rounded-md" onClick={stopwatch}>Start</button>
        <button className="bg-red-600 m-1 p-2 rounded-md" onClick={stop}>Stop</button>
      </div>
    </div>
  )
}