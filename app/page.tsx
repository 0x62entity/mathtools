"use client";
import { ChangeEvent, useState } from "react";
import { ToolCard } from "./components/ToolCard";

export default function Home() {
  function handleSearch(e: ChangeEvent) {
    if ((e.target as HTMLInputElement).value === "potato") location.href = "/0x67616d6573"
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-between w-full">
        <h1 className="font-bold text-3xl">MathTools</h1>
        <input className="bg-zinc-900 p-2 m-1 rounded-md" placeholder="Search..." onChange={handleSearch}/>
      </header>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        <ToolCard title="Calculator" desc="Just a calculator" url="/tools/calculator"/>
        <ToolCard title="Converter" desc="Convert between units" url="/tools/converter"/>
        <ToolCard title="Random Generator" desc="Generate random numbers" url="/tools/random"/>
        <ToolCard title="Word Counter" desc="Count words in a text" url="/tools/counter"/>
        <ToolCard title="RegEx" desc="Interpret regular expressions" url="/tools/regex"/>
        <ToolCard title="Text Converter" desc="Text to hex/binary etc" url="/tools/text"/>
        <ToolCard title="JSON Formatter" desc="Formats JSON 🤯" url="/tools/json"/>
        <ToolCard title="Stopwatch/Timer" desc="Stopwatch and Timer" url="/tools/timer"/>
        <ToolCard title="Roman Converter" desc="Converts Roman numerals" url="/tools/roman"/>
        <ToolCard title="Number Base Converter" desc="Convert numbers between bases" url="/tools/base"/>
        <ToolCard title="File Converter" desc="Convert files between formats" url="/tools/files"/>
      </div>
    </div>
  );
}