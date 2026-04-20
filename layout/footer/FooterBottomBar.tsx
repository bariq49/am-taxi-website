import Link from "next/link";

export default function FooterBottomBar() {
  return (
    <div className="bg-[#0F0F0F]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <p className="text-xs text-gray-400 sm:text-sm">
          Copyright © {new Date().getFullYear()} <span className="font-bold text-primary">DSL Limo Services.</span> All Rights Reserved
        </p>

        <p className="text-xs text-gray-400 sm:text-sm">
          Developed by,
          <a href="https://thedevsquare.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary transition-colors hover:text-primary/80">
            {" "}
            The DevSquare
          </a>
          {" | "}
          <Link href="/privacy-policy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
