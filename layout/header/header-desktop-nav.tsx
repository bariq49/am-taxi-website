import { forwardRef } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
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
              className={`block px-3 py-2 text-base font-semibold tracking-wide transition-colors ${active ? "text-secondary" : "text-background/90 hover:text-secondary-400"
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
              className={`flex items-center px-3 py-2 text-base font-semibold tracking-wide transition-colors ${active ? "text-secondary" : "text-background/90 hover:text-secondary-400"
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
                className="absolute left-0 top-full w-60 pt-2 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={() => onDropdownOpen(link.title)}
                onMouseLeave={onDropdownClose}
              >
                <div className="relative rounded-md border border-border bg-background shadow-2xl" role="menu">
                  {/* Dropdown Arrow */}
                  <div className="absolute -top-1.5 left-8 h-3 w-3 rotate-45 border-l border-t border-border bg-background" />

                  <div className="relative z-10 p-2">
                    {link.sublinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        role="menuitem"
                        className={`group flex items-center gap-2 rounded px-3 py-2.5 text-sm font-medium transition-colors ${pathname === sub.path
                          ? "bg-secondary/10 text-secondary"
                          : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                          }`}
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary" />
                        <span className="transition-all duration-200 group-hover:translate-x-1">{sub.title}</span>
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
