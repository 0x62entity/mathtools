"use client";

import Link from "next/link";
import Counter from "@/app/components/Counter";

export default function CounterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">Word Counter</h1>
      </header>
      <div>
        <Counter/>
      </div>
    </div>
  )
}