"use client";

export function VehicleCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="flex flex-col px-2.5 py-2 sm:px-3 sm:py-3 md:px-3.5">
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex w-24 flex-shrink-0 items-center justify-center sm:w-28 md:w-36">
            <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200 sm:h-28 md:h-32" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 sm:gap-1.5">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 sm:h-5 sm:w-32 md:h-6 md:w-40" />

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="h-3 w-8 animate-pulse rounded bg-gray-200 sm:h-3.5 sm:w-10" />
              <div className="h-3 w-3 animate-pulse rounded-full bg-gray-200 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <div className="h-3 w-2 animate-pulse rounded bg-gray-200 sm:h-3.5 sm:w-3" />
              <div className="h-3 w-3 animate-pulse rounded-full bg-gray-200 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <div className="h-3 w-2 animate-pulse rounded bg-gray-200 sm:h-3.5 sm:w-3" />
            </div>

            <div className="h-3 w-36 animate-pulse rounded bg-gray-200 sm:h-3.5 sm:w-40 md:h-4 md:w-52" />
          </div>

          <div className="flex flex-shrink-0 flex-col items-end justify-center gap-0.5">
            <div className="flex flex-col items-end gap-0.5">
              <div className="mb-0.5 h-2.5 w-14 animate-pulse rounded bg-gray-200 sm:h-3 sm:w-16 md:h-3.5 md:w-20" />
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200 sm:h-6 sm:w-20 md:h-8 md:w-24" />
            </div>
            <div className="mt-0.5 h-2.5 w-12 animate-pulse rounded bg-gray-200 sm:mt-1 sm:h-3 sm:w-16" />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-200">
        <div className="w-full px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3">
          <div className="h-7 w-full animate-pulse rounded bg-gray-200 sm:h-8 md:h-9" />
        </div>
      </div>
    </div>
  );
}
