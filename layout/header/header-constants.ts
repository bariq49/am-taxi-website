import { Globe, Briefcase, HelpCircle, LayoutDashboard, User, Plane, UserCheck, MapPin, Clock, Truck, Navigation } from "lucide-react";

export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string; icon?: React.ComponentType<{ className?: string }> }[];
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
      { title: "Airport Ride", path: "/airport-ride", icon: Plane },
      { title: "Airline Crew", path: "/airline-crew", icon: UserCheck },
      { title: "City Rides", path: "/city-rides", icon: MapPin },
      { title: "Hourly Ride", path: "/hourly-ride", icon: Clock },
      { title: "Cargo Crew", path: "/cargo-crew-transportation", icon: Truck },
      { title: "Private Jet Transfer", path: "/private-jet-transfer", icon: Navigation },
    ],
  },
  { title: "Fleets", path: "/fleets" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact-us" },
  {
    title: "Business",
    sublinks: [
      {
        title: "Travel Agencies",
        path: "/partner-with-us",
        icon: Globe,
      },
    ],
  },
];
export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && pathname === link.path) return true;
  return link.sublinks?.some((sub) => pathname.startsWith(sub.path)) ?? false;
}
