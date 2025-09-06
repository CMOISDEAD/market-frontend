import Link from "next/link";
import { Logo } from "@/components/navbar/logo";
import { ProfileButton } from "./profile-button";
import { CartButton } from "./cart-button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-input">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            className="transition-colors cursor-not-allowed opacity-50"
          >
            Collections
          </Link>
          <Link
            href="#"
            className="transition-colors cursor-not-allowed opacity-50"
          >
            Explore
          </Link>
          <Link
            href="#"
            className="transition-colors cursor-not-allowed opacity-50"
          >
            Categories
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ProfileButton />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
