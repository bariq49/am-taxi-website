import { forwardRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, isNavActive } from "./header-constants";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  pathname: string | null;
  openDropdownId: string | null;
  onClose: () => void;
  onToggleDropdown: (id: string) => void;
}

export const HeaderMobileMenu = forwardRef<HTMLDivElement, HeaderMobileMenuProps>(
  ({ isOpen, pathname, openDropdownId, onClose, onToggleDropdown }, ref) => (
    <div
      ref={ref}
      className={`fixed inset-0 z-[60] transition-all duration-300 ease-in-out md:hidden ${
        isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0"
      }`}
      role="dialog"
      aria-modal={isOpen}
      aria-label="Mobile navigation menu"
    >
      <div className="flex h-full flex-col overflow-hidden bg-secondary">

        <nav className="flex-1 divide-y divide-border/40 overflow-y-auto px-4 pt-20 sm:px-6" role="menu">
          {NAV_LINKS.map((link) => {
            const active = isNavActive(pathname, link);

            if (!link.sublinks) {
              return (
                <div key={link.title}>
                  <Link
                    href={link.path || "#"}
                    onClick={onClose}
                    role="menuitem"
                    className={`block py-4 text-base font-medium transition-colors ${
                      active ? "text-primary" : "text-background hover:text-primary"
                    }`}
                  >
                    {link.title}
                  </Link>
                </div>
              );
            }

            const isDropdownOpen = openDropdownId === link.title;

            return (
              <div key={link.title}>
                <button
                  onClick={() => onToggleDropdown(link.title)}
                  className={`flex w-full items-center justify-between py-4 text-left text-base font-medium transition-colors ${
                    active ? "text-primary" : "text-background hover:text-primary"
                  }`}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  {link.title}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  role="menu"
                >
                  <div className="space-y-1 pb-3 pl-4">
                    {link.sublinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={onClose}
                        role="menuitem"
                        className={`block py-2 text-sm transition-colors ${
                          pathname === sub.path ? "text-primary" : "text-background/80 hover:text-primary"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  )
);

HeaderMobileMenu.displayName = "HeaderMobileMenu";
