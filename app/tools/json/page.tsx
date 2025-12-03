"use client";
import Format from "@/app/components/Format";
import Link from "next/link";

export default function JSONPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">JSON Formatter</h1>
      </header>
      <div>
        <Format/>
      </div>
    </div>
  )
}