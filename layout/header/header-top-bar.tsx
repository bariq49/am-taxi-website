import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_HREF } from "@/constants/app-default";

interface HeaderTopBarProps {
  isMobileMenuOpen: boolean;
  isAuthenticated: boolean;
  onMobileMenuToggle: () => void;
}

export const HeaderTopBar = forwardRef<HTMLButtonElement, HeaderTopBarProps>(
  ({ isMobileMenuOpen, isAuthenticated, onMobileMenuToggle }, mobileToggleRef) => (
    <div className="relative flex items-center justify-between border-b border-border/30 py-2.5 md:py-6">
      {/* Desktop phone */}
      <div className="hidden flex-col items-start gap-1 md:flex">
        <a
          href={COMPANY_PHONE_HREF}
          className="inline-flex items-center gap-2 text-sm font-medium text-background/90 transition-colors hover:text-primary md:text-base"
        >
          <Phone className="h-4 w-4 text-primary" />
          <span>{COMPANY_PHONE}</span>
        </a>
      </div>

      {/* Logo */}
      <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
        <Link
          href="/"
          className="relative h-11 w-24 cursor-pointer transition-all duration-300 hover:scale-105 md:h-16 md:w-20"
        >
          <Image
            src="/assets/brand/logo.png"
            alt="AMS Airport Transfer"
            fill
            sizes="(max-width: 767px) 96px, 80px"
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-6 md:ml-0 md:gap-4">
        <a
          href={COMPANY_PHONE_HREF}
          className="inline-flex h-10 items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:text-primary/80 md:hidden"
          aria-label={`Call ${COMPANY_PHONE}`}
        >
          <Phone className="phone-vibrate h-[22px] w-[22px]" strokeWidth={2.4} />
        </a>
        <Link
          href={isAuthenticated ? "/dashboard" : "/auth/login"}
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-3.5 text-[11px] font-semibold tracking-wide text-background transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">{isAuthenticated ? "ACCOUNT" : "SIGN IN"}</span>
          <span className="hidden sm:inline">{isAuthenticated ? "MY ACCOUNT" : "SIGN IN"}</span>
        </Link>
        <button
          ref={mobileToggleRef}
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary/30 text-background transition-all duration-200 hover:border-primary/70 hover:text-primary md:hidden"
          onClick={onMobileMenuToggle}

          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="relative h-6 w-6">
            <Menu
              className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              strokeWidth={2.5}
            />
            <X
              className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              strokeWidth={2.5}
            />
          </div>
        </button>
      </div>
    </div>
  )
);

HeaderTopBar.displayName = "HeaderTopBar";
