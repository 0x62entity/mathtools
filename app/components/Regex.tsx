"use client";

import { useEffect, useState } from "react";

export default function Regex() {
  const [input, setInput] = useState<string>("");
  const [tests, setTests] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const re = new RegExp(input);
  }, [input]);

  return (
    <div className="flex flex-row">
      <div className="w-full m-4">
        <input className="bg-zinc-900 p-2 m-1 rounded-md w-full" placeholder="RegEx..." onChange={(e) => setInput(e.target.value)}/>
        <textarea className="bg-zinc-900 p-2 m-1 w-full h-64" placeholder="Test strings (newline seperated)" onChange={(e) => setTests(e.target.value)}/>
      </div>
      <div className="m-4 w-[30%]">
        <h3 className="text-xl font-semibold">Matches</h3>
        <div>
          {output}
        </div>
      </div>
    </div>
  )
}