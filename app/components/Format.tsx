"use client";
import { useEffect, useState } from "react";
import ReactJsonView from '@microlink/react-json-view'

export default function Format() {
  const [json, setJson] = useState<string>("");
  const [formatted, setFormatted] = useState({});

  useEffect(() => {
    try {
      setFormatted(JSON.parse(json));
    } catch {
      setFormatted({});
    }
  }, [json])

  return (
    <div className="flex flex-row justify-between w-full">
      <textarea className="bg-zinc-900 w-[40%] h-screen" onChange={(e) => setJson(e.target.value)} />
      <button className="bg-blue-600 p-2 m-1 rounded-md h-12">Format</button>
      <div className="bg-zinc-900 w-[40%] h-screen">
        <ReactJsonView 
          src={formatted}
          theme="apathy"
        />
      </div>
    </div>
  )
}