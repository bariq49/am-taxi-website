export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string }[];
}


export const SOLID_HEADER_ROUTES = [
  "/contact",
  "/book-ride/select-vehicle",
  "/book-ride/passenger-details",
  "/book-ride/payment-success",
  "/book-ride/payment-cancel",
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
      { title: "Airport Taxi", path: "/airport-taxi" },
      { title: "Local Taxi", path: "/local-taxi" },
      { title: "Healthcare Transport", path: "/healthcare-transport" },
      { title: "Event Transport", path: "/event-transport" },
      { title: "Business Transport", path: "/business-transport" },
    ],
  },
  { title: "FLEET", path: "/fleet" },
  { title: "ABOUT", path: "/about" },
  { title: "CONTACT", path: "/contact" },
];
export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && pathname === link.path) return true;
  return link.sublinks?.some((sub) => pathname.startsWith(sub.path)) ?? false;
}
