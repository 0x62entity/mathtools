"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as math from "mathjs";

export default function Converter() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>("nm");
  const [toUnit, setToUnit] = useState<string>("nm");

  function convert() {
    try {
      setTo(math.unit(`${from} ${fromUnit}`).toNumeric(toUnit).toString());
    } catch {
      setTo("Error");
    }
  }

  useEffect(() => {
    convert();
  }, [from, fromUnit, toUnit]);

  const units = [
    "nm", "um", "mm", "cm", "m", "km", // metric distance values
    "th", "in", "hh", "ft", "ch", "yd", "fur", "mi", "lea", // stupid distance values
    "nL", "uL", "mL", "cL", "L", "kL", // metric volume values
    "fl oz", "gi", "pt", "qt", "gal", // stupid volume values
    "ng", "ug", "mg", "cg", "g", "kg", "t", // metric weight values
    "gr", "dr", "oz", "lb", "st", "qtr", "cwt", "ton", // stupid volume values
  ]
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">Converter</h1>
      </header>
      <div>
        <h3 className="text-lg font-semibold">Convert from</h3>
        <input type="number" className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFrom(Number.parseInt(e.target.value));}}/>
        <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFromUnit(e.target.value);}}>
          {units.map(u => (
            <option key={u}>{u}</option>
          ))}
        </select>
        <h3 className="text-lg font-semibold">Convert to</h3>
        <input type="number" readOnly className="bg-zinc-900 m-1 p-2 rounded-md" value={to}/>
        <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setToUnit(e.target.value)}}>
          {units.map(u => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </div>
    </div>
  )
}