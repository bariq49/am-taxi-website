export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string }[];
}


export const SOLID_HEADER_ROUTES = [
  "/contact",
  "/auth/login",
  "/dashboard",
  "/services",
  "/hourly-hire-service",
  "/airport-transfer-service",
  "/as-directed-service",
  "/jfk-airport-service",
  "/newark-airport-service",
  "/laguardia-airport-service",
  "/teterboro-airport-service",
  "/westchester-airport-service",
];

export const NAV_LINKS: NavLink[] = [
  { title: "HOME", path: "/" },
  {
    title: "SERVICES",
    path: "/services",
    sublinks: [
      { title: "Point-to-Point", path: "/point-to-point-car-service" },
      { title: "Hourly Hire", path: "/hourly-hire-service" },
      { title: "Airport Transfers", path: "/airport-transfer-service" },
      { title: "As Directed", path: "/as-directed-service" },
    ],
  },
  { title: "FLEET", path: "/fleet" },
  { title: "ABOUT", path: "/about" },
  { title: "CONTACT", path: "/contact" },
];

/** Check if a nav link (or any of its sublinks) is active */
export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && pathname === link.path) return true;
  return link.sublinks?.some((sub) => pathname.startsWith(sub.path)) ?? false;
}
