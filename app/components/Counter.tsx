import { ChangeEvent, useState } from "react";

export default function Counter() {
  const [chars, setChars] = useState<string>("0");
  const [words, setWords] = useState<string>("0");
  function change(e: ChangeEvent) {
    const text = (e.target as HTMLTextAreaElement).value || "";

    if (text == "potato are tasty") location.href = "/0x67616d6573"

    setChars(text.length.toString());
    setWords(text.split(" ").length.toString());
  }

  return (
    <div>
      <textarea className="bg-zinc-900 m-2 p-2 w-256 h-128" placeholder="Type here..." id="textfield" onChange={change}/>
      <br/>
      Chars: {chars} Words: {words}
    </div>
  )
}