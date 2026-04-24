"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, CreditCard, Headset, RefreshCcw } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-44 px-3 sm:px-4 pb-10">
      <div className="mx-auto w-full container max-w-3xl">
        <div className="rounded-2xl border border-border bg-background shadow-sm p-5 sm:p-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-error text-white flex items-center justify-center shadow-md">
            <AlertTriangle className="h-8 w-8" strokeWidth={2.3} />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Payment Canceled
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Your payment did not complete, and no charge was made. You can retry securely now or return to your booking flow to review trip details first.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Retry Checkout</p>
              <p className="mt-1 text-sm text-gray-600">
                Return to payment and complete your booking securely.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-secondary">
                <RefreshCcw className="h-3.5 w-3.5" />
                Fast retry available
              </div>
            </div>
            <div className="rounded-xl border border-border bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Need Help?</p>
              <p className="mt-1 text-sm text-gray-600">
                Our support team can help if your payment keeps failing.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                <Headset className="h-3.5 w-3.5" />
                24/7 support
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/book-ride/select-vehicle"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-4 py-3 text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              Retry Payment
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
