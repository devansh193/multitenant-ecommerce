import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) gap-2 mx-auto flex items-center h-full px-4 lg:px-12 py-6">
        <p>Powered by</p>
        <Link href={"/"}>
          <span className={cn("text-2xl font-semibold", poppins.className)}>
            Silk Route
          </span>
        </Link>
      </div>
    </footer>
  );
};
