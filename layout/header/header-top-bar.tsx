import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_HREF, COMPANY_WHATSAPP_HREF, SOCIAL_LINKS } from "@/constants/app-default";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { InstagramIcon } from "@/components/icons";

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
          className="inline-flex items-center gap-2 text-sm font-medium text-background/90 transition-colors hover:text-secondary md:text-base"
        >
          <Phone className="h-4 w-4 text-secondary" />
          <span>{COMPANY_PHONE}</span>
        </a>
      </div>

      {/* Logo */}
      <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
        <Link
          href="/"
          className="relative h-12 w-32 cursor-pointer transition-all duration-300 hover:scale-105 md:h-14"
        >
          <Image
            src="/assets/logo/logo-white.png"
            alt="AMS Airport Transfer"
            fill
            sizes="(max-width: 767px) 96px, 80px"
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-4">
        <a
          href={COMPANY_PHONE_HREF}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md md:hidden"
          aria-label={`Call ${COMPANY_PHONE}`}
        >
          <Phone className="h-5 w-5" strokeWidth={2.5} />
        </a>

        {/* Social Icons Container */}
        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href={COMPANY_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#1ebe57] hover:shadow-md"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md overflow-hidden"
            aria-label="Follow on Instagram"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
            />
            <InstagramIcon className="relative h-5 w-5" />
          </a>
        </div>

        {/* <Link
          href={isAuthenticated ? "/dashboard" : "/auth/login"}
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-sm bg-secondary px-3.5 text-[11px] font-semibold tracking-wide text-white transition-all hover:bg-secondary-600 sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">{isAuthenticated ? "ACCOUNT" : "SIGN IN"}</span>
          <span className="hidden sm:inline">{isAuthenticated ? "MY ACCOUNT" : "SIGN IN"}</span>
        </Link> */}

        <button
          ref={mobileToggleRef}
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 bg-primary/30 text-background transition-all duration-200 hover:border-secondary/70 hover:text-secondary md:hidden"
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
