"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id") || searchParams.get("id") || "";

  return (
    <div className="w-full bg-secondary min-h-[50vh]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-5 px-4 py-16 text-center lg:py-24">
        <XCircle className="text-destructive" size={52} />
        <h1 className="text-2xl font-bold text-foreground lg:text-4xl">Payment was cancelled</h1>
        <p className="max-w-2xl text-foreground/70">
          Your payment was not completed. No worries, you can retry your booking whenever you are ready.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {bookingId ? (
            <Link
              href={`/book-ride/order-details/${bookingId}`}
              className="rounded-md border border-primary px-4 py-2 font-semibold text-primary"
            >
              View Booking Details
            </Link>
          ) : null}
          <Link href="/" className="rounded-md bg-primary px-4 py-2 font-semibold text-background">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <React.Suspense fallback={null}>
      <PaymentCancelContent />
    </React.Suspense>
  );
}
