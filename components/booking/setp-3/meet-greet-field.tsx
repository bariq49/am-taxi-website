"use client";

import React from "react";
import { Input } from "@/components/form/Input";
import { useBookingStore } from "@/store/use-booking-store";

interface MeetGreetFieldProps {
  mode?: "outbound" | "return";
}

export const MeetGreetField = ({ mode = "outbound" }: MeetGreetFieldProps) => {
  const bookingSettings = useBookingStore((state) => state.bookingSettings);
  const isReturnMode = mode === "return";
  const fieldName = isReturnMode ? "isReturnMeetGreet" : "isMeetGreet";
  const price = isReturnMode
    ? (bookingSettings?.return?.meetAndGreet?.price ?? 0)
    : (bookingSettings?.outbound?.meetAndGreet?.price ?? 0);
  const label = isReturnMode
    ? `Return Meet & Greet ($${price.toFixed(2)})`
    : `Meet & Greet ($${price.toFixed(2)})`;

  return <Input name={fieldName} type="toggle" label={label} />;
};

