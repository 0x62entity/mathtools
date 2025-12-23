"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function CounterPage() {
    const [chars, setChars] = useState<string>("0");
    const [words, setWords] = useState<string>("0");
    function change(e: ChangeEvent) {
      const text = (e.target as HTMLTextAreaElement).value || "";

      if (text.length == 0) {
        setWords("0");
        setChars("0");
        return;
      }

      setChars(text.length.toString());
      setWords(text.trimEnd().trimStart().split(" ").length.toString());
    }
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header title="Word Counter"/>
      <div>
        <div>
          <textarea className="bg-zinc-900 m-2 p-2 w-256 h-128" placeholder="Type here..." id="textfield" onChange={change}/>
          <br/>
          Chars: {chars} Words: {words}
        </div>
      </div>
    </div>
  )
}