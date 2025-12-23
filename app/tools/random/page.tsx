"use client";

import Header from "@/app/components/Header";
import Link from "next/link";
import { useState } from "react";

export default function RandomPage() {
  const [num, setNum] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="Random Generator"/>
      <div>
        <div>
          <input type="number" placeholder="Minimum" onChange={(e) => setMin(Number.parseInt(e.target.value))} className="bg-zinc-900 p-2 m-1 rounded-md"/>
          <br/>
          <input type="number" placeholder="Maximum" onChange={(e) => setMax(Number.parseInt(e.target.value))} className="bg-zinc-900 p-2 m-1 rounded-md"/>
          <br/>
          <button 
            onClick={() => {
              setNum(0);
              const number = Math.floor(Math.random() * (max - min)) + min;
              setTimeout(() => setNum(Math.floor(number / 4)), 50)
              setTimeout(() => setNum(Math.floor(number / 3)), 100)
              setTimeout(() => setNum(Math.floor(number / 2)), 150)
              setTimeout(() => setNum(Math.floor(number / 1)), 200)
            }}
            className="bg-blue-600 p-2 m-1 rounded-md"
          >
            Generate
          </button>
          <br/>
          <label className="text-xl">{num}</label>
        </div>
      </div>
    </div>
  )
}