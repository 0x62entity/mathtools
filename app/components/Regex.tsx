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
    <div>
      <input className="bg-zinc-900 p-2 m-1 rounded-md w-full" placeholder="RegEx..." onChange={(e) => setInput(e.target.value)}/>
      <div>
        {output}
      </div>
      <textarea className="bg-zinc-900 p-2 m-1 w-full h-64" placeholder="Test Matches (newline seperated)" onChange={(e) => setTests(e.target.value)}/>
    </div>
  )
}