"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SOLID_HEADER_ROUTES } from "./header-constants";
import { useHeaderMenu } from "./use-header-menu";
import { HeaderDesktopNav } from "./header-desktop-nav";
import { HeaderMobileMenu } from "./header-mobile-menu";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Globe, Menu, Phone, X } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_HREF, COMPANY_WHATSAPP_HREF, SOCIAL_LINKS } from "@/constants/app-default";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { InstagramIcon } from "@/components/icons";

const SCROLL_THRESHOLD = 50;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const {
    mobileOpen,
    openDropdownId,
    closeAll,
    openDropdown,
    scheduleCloseDropdown,
    toggleMobile,
    toggleDropdown,
    mobileMenuRef,
    mobileToggleRef,
    desktopNavRef,
  } = useHeaderMenu(pathname);

  const needsSolidHeader =
    SOLID_HEADER_ROUTES.some((route) => pathname?.startsWith(route));
  const isSolid = mobileOpen || scrolled || needsSolidHeader;
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[70] transition-all duration-300 ${isSolid ? "bg-black shadow-md" : "bg-black/80 backdrop-blur-md"
          }`}
        role="banner"
      >

        <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo Section - Left */}
            <div className="flex items-center">
              <Link
                href="/"
                className="relative h-8 w-32 cursor-pointer transition-all duration-300 hover:scale-105 md:h-10 md:w-36"
              >
                <Image
                  src="/assets/logo/logo-white.png"
                  alt="AMS Airport Transfer"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right Side: Navigation & Actions */}
            <div className="flex items-center gap-10">
              <HeaderDesktopNav
                ref={desktopNavRef}
                pathname={pathname}
                openDropdownId={openDropdownId}
                onDropdownOpen={openDropdown}
                onDropdownClose={scheduleCloseDropdown}
              />

              {/* Actions Section */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                {/* Language Selector - Desktop Only */}
                <div className="hidden items-center gap-2 text-[17px] font-bold text-white transition-colors hover:text-secondary cursor-pointer md:flex">
                  <Globe className="h-5 w-5" />
                  <span>EN</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </div>

                {/* Action Icons - Mobile Only */}
                <div className="flex items-center gap-2 sm:gap-3 md:hidden">
                  <a
                    href={COMPANY_PHONE_HREF}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-all duration-300 hover:scale-110"
                    aria-label={`Call ${COMPANY_PHONE}`}
                  >
                    <Phone className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                  <a
                    href={COMPANY_WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#1ebe57]"
                    aria-label="Chat on WhatsApp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  ref={mobileToggleRef}
                  className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-sm text-white transition-all duration-200 md:hidden"
                  onClick={toggleMobile}
                  aria-label="Toggle menu"
                  aria-expanded={mobileOpen}
                >
                  <div className="relative h-6 w-6">
                    <Menu
                      className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      strokeWidth={2.5}
                    />
                    <X
                      className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                        }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <HeaderMobileMenu
        ref={mobileMenuRef}
        isOpen={mobileOpen}
        pathname={pathname}
        openDropdownId={openDropdownId}
        onClose={closeAll}
        onToggleDropdown={toggleDropdown}
      />
    </>
  );
}
