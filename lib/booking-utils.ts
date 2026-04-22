import { HourlyPricingPackage } from "./api/fleets";
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
        .filter((p: any) => p.isActive)
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
