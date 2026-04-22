import { Metadata } from "next";
import OrderPage from "./OrderPage";
import { generateMetadata as generateSEOMetadata } from "@/components/SEO/SEO";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  return generateSEOMetadata({
    title: `Order #${id} | DSL Limo`,
    description: `View your order details for booking #${id} with DSL Limo Services.`,
    pageUrl: `/order/${id}`,
    noindex: true, // Order pages should be noindex for privacy
  });
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <OrderPage id={id} />;
}
