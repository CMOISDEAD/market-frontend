import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="">
        <Image
          src="/logo.png"
          alt="SDFM 2520"
          className="object-contain"
          width={200}
          height={200}
          priority
        />
      </div>
    </Link>
  );
}
