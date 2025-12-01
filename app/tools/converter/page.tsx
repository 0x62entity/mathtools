import Link from "next/link";

export default function Converter() {
  const units = [
    "nm", "μm", "mm", "cm", "m", "km", // metric distance values
    "th", "in", "hh", "ft", "ch", "yd", "fur", "mi", "lea", // stupid distance values
    "nL", "μL", "mL", "cL", "L", "kL", // metric volume values
    "fl oz", "gi", "pt", "qt", "gal", // stupid volume values
    "ng", "μg", "mg", "cg", "g", "kg", "t", // metric weight values
    "gr", "dr", "oz", "lb", "st", "qtr", "cwt", "ton", // stupid volume values
  ]
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">Converter</h1>
      </header>
      <div>
        <h3 className="text-lg font-semibold">Convert from</h3>
        <input type="text" className="bg-zinc-900 m-1 p-2 rounded-md"/>
        <select className="bg-zinc-900 m-1 p-2 rounded-md">
          {units.map(u => (
            <option>{u}</option>
          ))}
        </select>
        <h3 className="text-lg font-semibold">Convert to</h3>
        <input type="text" className="bg-zinc-900 m-1 p-2 rounded-md"/>
        <select className="bg-zinc-900 m-1 p-2 rounded-md">
          {units.map(u => (
            <option>{u}</option>
          ))}
        </select>
      </div>
    </div>
  )
}