"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SOLID_HEADER_ROUTES } from "./header-constants";
import { useHeaderMenu } from "./use-header-menu";
import { HeaderTopBar } from "./header-top-bar";
import { HeaderDesktopNav } from "./header-desktop-nav";
import { HeaderMobileMenu } from "./header-mobile-menu";

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
        className={`fixed left-0 right-0 top-0 z-[70] border-b text-background transition-all duration-300 ${isSolid ? "border-border/40 bg-secondary shadow-md" : "border-transparent bg-transparent"
          }`}
        role="banner"
      >

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10">
          <HeaderTopBar
            ref={mobileToggleRef}
            isMobileMenuOpen={mobileOpen}
            isAuthenticated={false}
            onMobileMenuToggle={toggleMobile}
          />
          <HeaderDesktopNav
            ref={desktopNavRef}
            pathname={pathname}
            openDropdownId={openDropdownId}
            onDropdownOpen={openDropdown}
            onDropdownClose={scheduleCloseDropdown}
          />
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
