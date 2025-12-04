"use client";

import { useState } from "react";

export default function Text() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [from1, setFrom1] = useState<string>("");
  const [to1, setTo1] = useState<string>("");

  function convert() {
    switch (from1) {
      case "text":
        if (to1 == 'hexadecimal') {
          setTo(from.split('').map(c => {
            return c.charCodeAt(0).toString(16).padStart(2, '0');
          }).join(' '));
        } else if (to1 == 'binary') {
          setTo(from.split('').map(c => {
            return c.charCodeAt(0).toString(2).padStart(8, '0');
          }).join(' '));
        } else {
          setTo(from);
        }
        break;
      case "hexadecimal":
        setFrom(from.replaceAll(" ", ""));
        if (!/^[0-9a-fA-F]+$/.test(from) || from.length % 2 !== 0) {
          setTo("Error");
          break;
        }
        let ret = "";

        if (to1 == "text") {
          for (let i = 0; i < from.length; i += 2) {
            ret += String.fromCharCode(parseInt(from.substr(i, 2), 16));
          }
          setTo(ret);
        } else if (to1 == "binary") {
          setTo(from.split('').map(char =>
            parseInt(char, 16).toString(2).padStart(4, '0')
          ).join(''));
        } else {
          setTo(from);
        }
        break;
      case "binary":
        setFrom(from.replaceAll(" ", ""));
        if (to1 == "text") {
          setTo(from.split(' ')
            .map(a => String.fromCharCode(parseInt(a, 2)))
            .join(''));
        } else if (to1 == "hexadecimal") {
          setTo(parseInt(from, 2).toString(16));
        } else {
          setTo(from);
        }
        break;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <textarea className="bg-zinc-900 p-2 m-1 w-[40%] sm:w-full h-48" placeholder="From..." onChange={(e) => setFrom(e.target.value)}/>
      <div className="flex flex-col items-center">
        <div>
          <b>From</b>
          <select className="bg-zinc-900 p-2 m-1 rounded-md w-max" onChange={(e) => setFrom1(e.target.value)}>
            <option>binary</option>
            <option>text</option>
            <option>hexadecimal</option>
          </select>
        </div>
        <button className="bg-blue-600 p-2 m-1 rounded-md h-12" onClick={convert}>Convert</button>
        <div>
          <b>To</b>
          <select className="bg-zinc-900 p-2 m-1 rounded-md w-max" onChange={(e) => setTo1(e.target.value)}>
            <option>binary</option>
            <option>text</option>
            <option>hexadecimal</option>
          </select>
        </div>
      </div>
      <textarea className="bg-zinc-900 p-2 m-1 w-[40%] sm:w-full h-48" placeholder="To..." value={to} readOnly/>
    </div>
  )
}