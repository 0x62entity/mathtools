"use client";

import Header from "@/app/components/Header";
import * as math from "mathjs";
import Link from "next/link";
import { FormEvent } from "react";

export default function CalculatorPage() {
  function submit(e: FormEvent) {
    e.preventDefault();
    const input = ((e.target as HTMLFormElement).children[0] as HTMLInputElement);
    input.value = math.evaluate(input.value);
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="Calculator"/>
        <div className="w-[50%]">
          <div>
            <form className="w-full" onSubmit={submit}>
              <input type="text" className="bg-zinc-900 p-2 m-1 rounded-md w-full" placeholder="Calculate..." id="calculation"/>
              <input type="submit" hidden id="calculate"/>
            </form>
            <div className="grid grid-cols-5">
              {["+", "-", "*", "/",      "sin(",
                "9", "8", "7", "^",      "cos(",
                "6", "5", "4", "%",      "tan(",
                "3", "2", "1", "sqrt(", "(",
                "!", "0", ".", "cbrt(", ")"].map(a => (
                <button
                  key={a}
                  className="bg-zinc-900 hover:bg-zinc-800 p-2 m-1 rounded-sm"
                  onClick={() => (document.getElementById("calculation") as HTMLInputElement).value += a}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5">
              <button
                className="bg-zinc-900 hover:bg-zinc-800 p-2 m-1 rounded-sm"
                onClick={() => (document.getElementById("calculation") as HTMLInputElement).value = ""}
              >
                C
              </button>
              <button
                className="bg-zinc-900 hover:bg-zinc-800 p-2 m-1 rounded-sm"
                onClick={() => (document.getElementById("calculate") as HTMLButtonElement).click()}
              >
                =
              </button>
              <button
                className="bg-zinc-900 hover:bg-zinc-800 p-2 m-1 rounded-sm"
                onClick={() => 
                  (document.getElementById("calculation") as HTMLInputElement).value =
                    (document.getElementById("calculation") as HTMLInputElement).value.substring(
                      0,
                      (document.getElementById("calculation") as HTMLInputElement).value.length-1
                    )
                }
              >
                &lt;-
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}