import Link from "next/link";

export default function FooterBottomBar() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto flex flex-col items-center border-t border-gray-400 justify-between gap-3 py-4 text-center md:flex-row md:text-left">
        <p className="text-xs text-gray-400 sm:text-sm">
          Copyright © {new Date().getFullYear()} <span className="font-bold text-secondary">AMS Airport Transfer.</span> All Rights Reserved
        </p>

        <p className="text-xs text-gray-400 sm:text-sm">
          Developed by,
          <a href="https://thedevsquare.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-secondary transition-colors hover:text-white">
            {" "}
            The DevSquare
          </a>
          <Link href="/privacy-policy" className="transition-colors hover:text-white ml-2">
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
            Terms and Conditions
          </Link>
          {" | "}
          <Link href="/disclaimer" className="transition-colors hover:text-white">
            Disclaimer
          </Link>
        </p>
      </div>
    </div>
  );
}
