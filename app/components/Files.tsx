"use client";

import Bowser from "bowser";
import { useEffect, useState } from "react";

export default function Files() {
  const [to, setTo] = useState("avif");
  const [file, setFile] = useState<File|null>(null);
  const [error, setError] = useState("");
  const [converted, setConverted] = useState("");
  const formats = ["bmp", "png", "gif", "jpeg", "tiff", "webp"];

  function convert() {
    if (!file) {
      setError("no file");
      return;
    }

    setError("");
    setConverted("");

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      context?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setConverted(URL.createObjectURL(blob));
          } else {
            setError("conversion failed");
          }
        },
        `image/${to}`
      );
    }

    img.src = url;
  }

  return (
    <div className="flex flex-col">
      <span>Note: For best compatibility please use Chromium based browsers</span>
      <input
        type="file"
        accept="image/*"
        className="bg-zinc-800 p-2 m-1 rounded-md w-min"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <b>To</b>
      <select
        className="bg-zinc-800 p-2 m-1 rounded-md w-min"
        onChange={(e) => setTo(e.target.value)}
      >
        {formats.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      <button className="bg-blue-600 rounded-md p-2 m-1 w-min" onClick={convert}>
        Convert
      </button>

      {converted && (
        <div>
          <img src={converted}/>
          <span>Save from right click menu</span>e
        </div>
      )}
    </div>
  );
}