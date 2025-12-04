"use client";

import { useEffect, useState } from "react";

export default function Bases() {
  const [from, setFrom] = useState<string>("0");
  const [to, setTo] = useState<string>("0");
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(10);

  let bases = [];
  for (let i = 1; i < 36; i++) {
    bases.push(i+1);
  }

  useEffect(() => {
    const num = parseInt(from.toString(), fromBase);
    if (isNaN(num)) {
      setTo("Error");
      return;
    }
    setTo(num.toString(toBase));
  }, [from, fromBase, toBase])

  return (
    <div className="flex flex-row w-full justify-between">
      <div>
        <input type="text" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="From" onChange={(e) => setFrom(e.target.value)}/>
        <select className="bg-zinc-800 m-1 p-2 rounded-md" defaultValue="10" onChange={(e) => setFromBase(Number.parseInt(e.target.value))}>
          {bases.map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <b className="m-1">From Base</b>
      </div>
      <div>
        <b className="m-1">To Base</b>
        <select className="bg-zinc-800 m-1 p-2 rounded-md" defaultValue="10" onChange={(e) => setToBase(Number.parseInt(e.target.value))}>
          {bases.map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <input type="text" className="bg-zinc-800 m-1 p-2 rounded-md" placeholder="To" value={to} readOnly/>
      </div>
    </div>
  )
}