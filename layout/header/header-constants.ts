export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string }[];
}


export const SOLID_HEADER_ROUTES = [
  "/",
  "/book-ride/select-vehicle",
  "/book-ride/passenger-details",
  "/book-ride/payment-success",
  "/book-ride/payment-cancel",
  "/auth/login",
  "/dashboard",
];

export const NAV_LINKS: NavLink[] = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    path: "/services",
    sublinks: [
      { title: "Airport Ride", path: "/airport-ride" },
      { title: "Airline Crew", path: "/airline-crew" },
      { title: "City Rides", path: "/city-rides" },
      { title: "Hourly Ride", path: "/hourly-ride" },
      { title: "Cargo Crew", path: "/cargo-crew-transportation" },
      { title: "Private Jet Transfer", path: "/private-jet-transfer" },
    ],
  },
  { title: "Fleets", path: "/fleets" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact-us" },
];
export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && pathname === link.path) return true;
  return link.sublinks?.some((sub) => pathname.startsWith(sub.path)) ?? false;
}
