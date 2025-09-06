import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="relative w-24 h-24">
        <Image
          src="/logo.png"
          alt="SDFM 2520"
          fill
          className="object-contain invert"
          priority
        />
      </div>
    </Link>
  );
}
