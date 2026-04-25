import { addMinutes, parse, format, isValid, parseISO } from "date-fns";

export function formatPrice(value: number | undefined | null, currencySign: string = "€"): string {
  const numericValue = Number(value ?? 0);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  return `${currencySign}${safeValue.toFixed(2)}`;
}

export interface AddressInfo {
  name: string;
  detail: string;
}

export function parseAddress(address: string | undefined | null): AddressInfo {
  if (!address) return { name: "", detail: "" };
  const parts = address.split(",");
  if (parts.length > 1) {
    return {
      name: parts[0].trim(),
      detail: parts.slice(1).join(",").trim(),
    };
  }
  return { name: address, detail: "" };
}

export function calculateArrivalTime(time: string | undefined, durationMinutes: number | undefined): string {
  if (!time || typeof durationMinutes !== "number") return "—";
  try {
    let date = parse(time, "hh:mm a", new Date());
    if (!isValid(date)) {
      date = parse(time, "HH:mm", new Date());
    }
    if (!isValid(date)) return "—";

    const arrivalDate = addMinutes(date, durationMinutes);
    return format(arrivalDate, "hh:mm a");
  } catch {
    return "—";
  }
}

export function formatTripDate(dateStr: string | undefined): string {
  if (!dateStr) return "—";
  try {
    const isoDate = parseISO(dateStr);
    if (isValid(isoDate)) return format(isoDate, "MM/dd/yyyy");
    const fallbackDate = parse(dateStr, "yyyy-MM-dd", new Date());
    if (isValid(fallbackDate)) return format(fallbackDate, "MM/dd/yyyy");
    return dateStr;
  } catch {
    return dateStr || "—";
  }
}

export const getPackageSelectOptions = (hourlyData: any) => {
  const rawData = Array.isArray(hourlyData) ? hourlyData : (hourlyData as any)?.data;
  const preDefinedOptions = (hourlyData as any)?.options;
  if (!rawData) return [];
  if (preDefinedOptions && preDefinedOptions.length > 0) {
    return preDefinedOptions.map((o: any) => ({ label: o.label, value: o.value }));
  }

  const optionsMap = new Map<string, { label: string; value: string }>();

  const scoreMap: Record<string, number> = { hourly: 1, day: 2, week: 3 };

  [...rawData]
    .filter((p: any) => p?.isActive)
    .sort((a: any, b: any) => {
      const typeScore = scoreMap[a.packageType] || 4;
      const bScore = scoreMap[b.packageType] || 4;
      if (typeScore !== bScore) return typeScore - bScore;
      if (a.duration !== b.duration) return a.duration - b.duration;
      return a.price - b.price;
    })
    .forEach((pkg: any) => {
      let unit = "Hour";
      if (pkg.packageType === "day") unit = "Day";
      if (pkg.packageType === "week") unit = "Week";

      const label = `${pkg.duration} ${unit}${pkg.duration > 1 ? "s" : ""}`;
      if (!optionsMap.has(label)) {
        optionsMap.set(label, {
          label,
          value: JSON.stringify(pkg),
        });
      }
    });

  return Array.from(optionsMap.values());
};


