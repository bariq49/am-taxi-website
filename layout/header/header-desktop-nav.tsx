import { forwardRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, isNavActive } from "./header-constants";

interface HeaderDesktopNavProps {
  pathname: string | null;
  openDropdownId: string | null;
  onDropdownOpen: (id: string) => void;
  onDropdownClose: () => void;
}

export const HeaderDesktopNav = forwardRef<HTMLElement, HeaderDesktopNavProps>(
  ({ pathname, openDropdownId, onDropdownOpen, onDropdownClose }, ref) => (
    <nav ref={ref} className="hidden items-center justify-center space-x-2 py-3 md:flex" role="menubar">
      {NAV_LINKS.map((link) => {
        const active = isNavActive(pathname, link);

        if (!link.sublinks) {
          return (
            <Link
              key={link.title}
              href={link.path || "#"}
              role="menuitem"
              className={`block px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                active ? "text-secondary" : "text-background/90 hover:text-secondary-400"
              }`}
            >
              {link.title}
            </Link>
          );
        }

        const isOpen = openDropdownId === link.title;

        return (
          <div
            key={link.title}
            className="relative"
            onMouseEnter={() => onDropdownOpen(link.title)}
            onMouseLeave={onDropdownClose}
          >
            <button
              className={`flex items-center px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                active ? "text-secondary" : "text-background/90 hover:text-secondary-400"
              }`}
              aria-haspopup="true"
              aria-expanded={isOpen}
              role="menuitem"
            >
              <span>{link.title}</span>
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div
                className="absolute left-0 top-full w-64 pt-2"
                onMouseEnter={() => onDropdownOpen(link.title)}
                onMouseLeave={onDropdownClose}
              >
                <div className="rounded-md border border-border bg-background shadow-lg" role="menu">

                  <div className="p-2">
                    {link.sublinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        role="menuitem"
                        className={`block rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                          pathname === sub.path
                            ? "bg-secondary/10 text-secondary"
                            : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  )
);

HeaderDesktopNav.displayName = "HeaderDesktopNav";
