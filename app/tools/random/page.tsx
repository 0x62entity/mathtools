"use client";

import Link from "next/link";
import { useState } from "react";

export default function Random() {
  const [num, setNum] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">Random Generator</h1>
      </header>
      <div>
        <input type="number" placeholder="Minimum" onChange={(e) => setMin(Number.parseInt(e.target.value))} className="bg-zinc-900 p-2 m-1 rounded-md"/>
        <br/>
        <input type="number" placeholder="Maximum" onChange={(e) => setMax(Number.parseInt(e.target.value))} className="bg-zinc-900 p-2 m-1 rounded-md"/>
        <br/>
        <button onClick={() => setNum(Math.floor(Math.random() * (max - min)) + min)} className="bg-blue-600 p-2 m-1 rounded-md">Generate</button>
        <br/>
        <label>{num}</label>
      </div>
    </div>
  )
}