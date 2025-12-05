"use client";

import { useEffect, useState } from "react";

export default function Roman() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    let num = Number.parseInt(input);
    if (Number.isNaN(num)) {
      const map: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      };

      let ret = 0;
      let prev = 0;

      for (let i = input.length - 1; i >= 0; i--) {
        const curr = map[input[i].toUpperCase()];
        if (!curr) {
          setOutput("Error");
        }
        if (curr < prev) {
          ret -= curr;
        } else {
          ret += curr;
        }
        prev = curr;
      }
      setOutput(ret.toString());
    } else {
      const map: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
      ];
      if (num <= 0) {
        setOutput("Error");
        return;
      }

      let ret = "";
      for (const [key, value] of map) {
        while (num >= key) {
          ret += value;
          num -= key;
        }
      }
      setOutput(ret);
    }
  }, [input])

  return (
    <div className="flex flex-col">
      <input className="bg-zinc-800 p-2 m-1 rounded-md" placeholder="From..." onChange={(e) => setInput(e.target.value)}/>
      <label>The type of numeral is auto-detected</label>
      <div className="m-1 p-2 flex flex-col">
        <b>Output</b>
        <label>{output}</label>
      </div>
    </div>
  )
}