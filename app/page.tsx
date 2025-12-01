import Image from "next/image";
import { ToolCard } from "./components/ToolCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black p-4">
      <h1 className="font-bold text-3xl">MathTools</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        <ToolCard title="Calculator" desc="Just a calculator"/>
        <ToolCard title="Converter" desc="Convert between units"/>
        <ToolCard title="Random Generator" desc="Generate random numbers"/>
        <ToolCard title="Word Counter" desc="Count words in a text"/>
      </div>
    </div>
  );
}
