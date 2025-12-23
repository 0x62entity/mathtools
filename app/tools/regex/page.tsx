"use client";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";

export default function RegexPage() {
  const [input, setInput] = useState<string>("");
  const [tests, setTests] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const re = new RegExp(input);
      const lines = tests.split('\n');
      let result = "";
      
      for (const line of lines) {
        if (re.test(line)) {
          result += line + '\n';
        }
      }
      
      setOutput(result);
      setError("");
    } catch (e) {
      setError("invalid regex");
      setOutput("");
    }
  }, [input, tests]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="RegEx"/>
      <div>
        <div className="flex flex-row">
          <div className="w-full m-4">
            <input 
              className="bg-zinc-900 p-2 m-1 rounded-md w-full" 
              placeholder="RegEx..." 
              onChange={(e) => setInput(e.target.value)}
            />
            <textarea 
              className="bg-zinc-900 p-2 m-1 w-full h-64 rounded-md" 
              placeholder="Test strings (newline separated)" 
              onChange={(e) => setTests(e.target.value)}
            />
          </div>
          <div className="m-4 w-[30%]">
            <h3 className="text-xl font-semibold mb-2">Matches</h3>
            {error && (
              <div className="text-red-500">{error}</div>
            )}
            <pre className="bg-zinc-900 p-2 rounded-md whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}