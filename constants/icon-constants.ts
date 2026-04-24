import { 
    Tag, 
    ShieldCheck, 
    PhoneCall, 
    MapPin, 
    Car, 
    Clock, 
    Globe,
    CheckCircle2,
    Users,
    PlaneTakeoff,
    Shield,
    Calendar,
    Search
} from "lucide-react";

export const ICON_COMPONENTS = {
    Tag,
    ShieldCheck,
    PhoneCall,
    MapPin,
    Car,
    Clock,
    Globe,
    CheckCircle2,
    Users,
    PlaneTakeoff,
    Shield,
    Calendar,
    Search
} as const;

export type IconName = keyof typeof ICON_COMPONENTS;

export const ICONS: Record<string, IconName> = {
    TAG: "Tag",
    SHIELD_CHECK: "ShieldCheck",
    PHONE_CALL: "PhoneCall",
    MAP_PIN: "MapPin",
    CAR: "Car",
    CLOCK: "Clock",
    GLOBE: "Globe",
    CHECK_CIRCLE: "CheckCircle2",
    USERS: "Users",
    PLANE: "PlaneTakeoff",
    SHIELD: "Shield",
    CALENDAR: "Calendar",
    SEARCH: "Search",
} as const;
