import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-row justify-start items-center">
      <Link href="/" className="m-2 font-semibold">MathTools</Link>
      <h1 className="font-bold text-2xl m-2">{title}</h1>
    </header>
  );
}
