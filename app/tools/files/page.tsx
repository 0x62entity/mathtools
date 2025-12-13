"use client";
import Files from "@/app/components/Files";
import Link from "next/link";

export default function FilesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">File Converter</h1>
      </header>
      <div>
        <Files/>
      </div>
    </div>
  )
}