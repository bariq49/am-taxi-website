import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterLinksColumn, { FooterLinkItem } from "./FooterLinksColumn";
import FooterBottomBar from "./FooterBottomBar";
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
    { href: "/fleet", label: "Fleet" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const airportLinks: FooterLinkItem[] = [
    { href: "/airport-transfer-service", label: "Airport Transfer Service" },
    { href: "/newark-airport-service", label: "Newark Airport (EWR)" },
    { href: "/teterboro-airport-service", label: "Teterboro Airport (TEB)" },
    { href: "/westchester-airport-service", label: "Westchester County (HPN)" },
    { href: "/jfk-airport-service", label: "John F. Kennedy Airport (JFK)" },
    { href: "/laguardia-airport-service", label: "LaGuardia Airport (LGA)" },
  ];

  const serviceLinks: FooterLinkItem[] = [
    { href: "/point-to-point-car-service", label: "Point-To-Point" },
    { href: "/hourly-hire-service", label: "Hourly Hire" },
    { href: "/airport-transfer-service", label: "Airport Transfers" },
    { href: "/as-directed-service", label: "As Directed" },
  ];

  return (
    <footer className="bg-[#252525] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Logo + About */}
          <div className="flex flex-col items-start lg:col-span-4">
            <div className="mb-5">
              <Link href="/">
                <Image src="/assets/brand/logo.png" alt="Logo" width={96} height={80} className="h-[72px] w-auto sm:h-[80px]" />
              </Link>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-300">{COMPANY_DESCRIPTION}</p>
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title="Quick Links" links={quickLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title="Services" links={serviceLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title="Airports We Serve" links={airportLinks} />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold tracking-[0.08em] text-white uppercase">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {COMPANY_ADDRESS}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <a
                  href={COMPANY_PHONE_HREF}
                  className="text-gray-300 text-sm hover:text-white"
                >
                  {COMPANY_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <a
                  href={COMPANY_EMAIL_HREF}
                  className="text-gray-300 text-sm hover:text-white"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <FooterBottomBar />
    </footer>
  );
}
