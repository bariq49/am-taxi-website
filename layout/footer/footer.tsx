import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterLinksColumn, { FooterLinkItem } from "./FooterLinksColumn";
import FooterBottomBar from "./FooterBottomBar";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import {
  COMPANY_ADDRESS,
  COMPANY_DESCRIPTION,
  COMPANY_EMAIL,
  COMPANY_EMAIL_HREF,
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
  SOCIAL_LINKS,
} from "@/constants/app-default";

export default function Footer() {
  const quickLinks: FooterLinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/fleet", label: "Fleet" },
    { href: "/partner-with-us", label: "Partner With Us" },
    { href: "/contact-us", label: "Contact" },
  ];

  const airportLinks: FooterLinkItem[] = [
    { href: "/amsterdam-schiphol-airport", label: "Amsterdam Schiphol Airport" },
    { href: "/", label: "Eindhoven Airport" },
    { href: "/", label: "Rotterdam The Hague Airport" },
    { href: "/", label: "Groningen Airport Eelde" },
    { href: "/", label: "Maastricht Airport" },
  ];

  const serviceLinks: FooterLinkItem[] = [
    { href: "/airport-ride", label: "Airport Ride" },
    { href: "/airline-crew", label: "Airline Crew" },
    { href: "/city-rides", label: "City Rides" },
    { href: "/hourly-ride", label: "Hourly Rides" },
    { href: "/private-jet-transfer", label: "Private Jet Transfer" },
    { href: "/cargo-crew-transportation", label: "Cargo Crew Transportation" },

  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12 px-4 sm:py-16">
        <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-3">
            <div className="mb-5">
              <Link href="/">
                <Image src="/assets/logo/logo-white.png" alt="Logo" width={96} height={80} className="h-[72px] w-auto sm:h-[60px]" />
              </Link>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-300">{COMPANY_DESCRIPTION}</p>
            {/* <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-[#1877F2]"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5 text-gray-300 transition-colors duration-300 group-hover:text-white" />
              </a>
            </div> */}
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title="Quick Links" links={quickLinks} />
          </div>
          <div className="lg:col-span-3">
            <FooterLinksColumn title="Popular Airports" links={airportLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinksColumn title="Our Services" links={serviceLinks} />
          </div>



          {/* Contact Info */}
          <div className="flex flex-col items-start lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold tracking-[0.08em] text-white uppercase">
              Contact Info
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: COMPANY_ADDRESS,
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`,
                },
                {
                  icon: Phone,
                  text: COMPANY_PHONE,
                  href: COMPANY_PHONE_HREF,
                },
                {
                  icon: Mail,
                  text: COMPANY_EMAIL,
                  href: COMPANY_EMAIL_HREF,
                },
              ].map((item, index) => (
                <div key={index} className="group flex items-start gap-3">
                  <item.icon className="h-4 w-4 shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-secondary" />
                  <a
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 hover:text-secondary"
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterBottomBar />
    </footer>
  );
}
