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
    <nav ref={ref} className="hidden items-center space-x-2 md:flex" role="menubar">
      {NAV_LINKS.map((link) => {
        const active = isNavActive(pathname, link);

        if (!link.sublinks) {
          return (
            <Link
              key={link.title}
              href={link.path || "#"}
              role="menuitem"
              className={`block px-2 py-2 text-[17px] font-bold transition-colors ${active ? "text-secondary" : "text-white/90 hover:text-white"
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
              className={`flex items-center px-2 py-2 text-[17px] font-bold transition-colors ${active ? "text-secondary" : "text-white/90 hover:text-white"
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
                <div className="relative rounded-md border border-white/10 bg-primary shadow-2xl" role="menu">
                  {/* Dropdown Arrow */}
                  <div className="absolute -top-1.5 left-8 h-3 w-3 rotate-45 border-l border-t border-white/10 bg-primary" />

                  <div className="relative z-10 p-1.5">
                    {link.sublinks.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        role="menuitem"
                        className={`group flex items-center gap-3 rounded-sm px-3.5 py-3 text-[15px] font-medium transition-all duration-300 ${pathname === sub.path
                          ? "bg-secondary/20 text-secondary"
                          : "text-white/80 hover:bg-white/5 hover:text-secondary"
                          }`}
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-secondary/20 shrink-0">
                          <ArrowRight className="h-3 w-3 text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-secondary" />
                        </div>
                        <span className="transition-all duration-300 font-bold group-hover:translate-x-0.5">{sub.title}</span>
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
