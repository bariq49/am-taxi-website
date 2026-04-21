"use client";

import React, { ReactNode } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useFormContext, ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/utils";
import { LocationInput } from "./location-input";
import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { DEFAULT_PHONE_COUNTRY } from "@/constants/app-default";
import TimePicker from "./time/time-picker";
import DatePicker from "./date/date-picker";

type InputType =
    | "text"
    | "email"
    | "number"
    | "tel"
    | "password"
    | "location"
    | "textarea"
    | "counter"
    | "checkbox"
    | "toggle"
    | "phone"
    | "date"
    | "time"
    | "select";

interface SelectOption {
    label: string;
    value: string | number;
}

interface InputProps {
    name: string;
    type?: InputType;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    rows?: number;
    min?: number;
    max?: number;
    step?: number;
    icon?: ReactNode;
    onRemove?: () => void;
    selectOptions?: SelectOption[];
    selectPlaceholder?: string;
    selectValueAsNumber?: boolean;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    digitsOnly?: boolean;
    inputClassName?: string;
    labelClassName?: string;
}

export const Input: React.FC<InputProps> = ({
    name,
    type = "text",
    placeholder,
    label,
    disabled = false,
    required = false,
    className,
    rows = 6,
    min,
    max,
    step = 1,
    icon,
    onRemove,
    selectOptions = [],
    selectPlaceholder,
    selectValueAsNumber = false,
    maxLength,
    inputMode,
    digitsOnly = false,
    inputClassName,
    labelClassName,
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    const inputBase = cn(
        "w-full py-2 border rounded-lg bg-white text-black appearance-none focus:outline-none focus:ring-0 focus-visible:outline-none transition-all",
        inputClassName
    );
    const inputError = (error: boolean) => error ? "border-red-500" : "border-gray-300";

    const renderInput = (
        field: ControllerRenderProps<FieldValues, string>,
        error: boolean
    ) => {
        switch (type) {

            case "textarea":
                return (
                    <textarea
                        {...field}
                        rows={rows}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(inputBase, "resize-none", inputError(error))}
                    />
                );

            case "phone":
                return (
                    <ReactPhoneInput
                        country={DEFAULT_PHONE_COUNTRY}
                        value={field.value || ""}
                        onChange={(phone) => field.onChange(phone)}
                        containerClass="!w-full phone-input-container"
                        inputClass={cn(
                            "!w-full !h-[46px] !pl-12 !pr-4 !border !rounded-lg !bg-white !text-black",
                            error ? "!border-red-500" : "!border-gray-300"
                        )}
                        buttonClass={cn(
                            "!border !border-r !rounded-l-lg !bg-white",
                            error ? "!border-red-500 !border-r-red-500" : "!border-gray-300 !border-r-gray-300"
                        )}
                    />
                );

            case "location":
                const { ref: _ref, ...locationField } = field;
                return (
                    <LocationInput
                        {...locationField}
                        value={field.value || ""}
                        placeholder={placeholder}
                        className={cn(inputBase, inputError(error))}
                    />
                );

            case "counter":
                const resolvedMin = min ?? 0;
                const resolvedMax = max ?? 999;
                const parsedValue = Number(field.value);
                const value = Number.isNaN(parsedValue)
                    ? resolvedMin
                    : Math.min(resolvedMax, Math.max(resolvedMin, parsedValue));

                return (
                    <div className={cn(
                        "flex h-[46px] items-center border rounded-lg bg-white text-black overflow-hidden",
                        inputError(error)
                    )}>
                        <button
                            type="button"
                            onClick={() => field.onChange(Math.max(resolvedMin, value - step))}
                            disabled={disabled || value <= resolvedMin}
                            className="h-full w-12 shrink-0 flex items-center justify-center border-r border-gray-200 text-base font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label={`Decrease ${label || name}`}
                        >
                            -
                        </button>

                        <span className="flex-1 text-center py-2.5 text-sm font-semibold tabular-nums">
                            {value}
                        </span>

                        <button
                            type="button"
                            onClick={() => field.onChange(Math.min(resolvedMax, value + step))}
                            disabled={disabled || value >= resolvedMax}
                            className="h-full w-12 shrink-0 flex items-center justify-center border-l border-gray-200 text-base font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label={`Increase ${label || name}`}
                        >
                            +
                        </button>
                    </div>
                );

            case "checkbox":
                return (
                    <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                );

            case "toggle":
                return (
                    <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                );

            case "date":
                return (
                    <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        error={error}
                    />
                );

            case "time":
                return (
                    <TimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        error={error}
                    />
                );

            case "select":
                return (
                    <Select
                        value={String(field.value ?? "")}
                        onValueChange={(value) =>
                            field.onChange(selectValueAsNumber ? Number(value) : value)
                        }
                        disabled={disabled}
                    >
                        <SelectTrigger
                            className={cn(
                                "w-full h-[46px] rounded-lg border bg-white text-black shadow-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent",
                                icon ? "pl-10 pr-4" : "px-4",
                                inputError(error)
                            )}
                        >
                            <SelectValue placeholder={selectPlaceholder || placeholder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black border border-gray-200 shadow-md">
                            {selectOptions.map((option) => (
                                <SelectItem key={String(option.value)} value={String(option.value)}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            default:
                const isPasswordField = type === "password";
                const resolvedType = isPasswordField
                    ? showPassword
                        ? "text"
                        : "password"
                    : type;

                return (
                    <div className="relative">
                        <input
                            {...field}
                            type={resolvedType}
                            placeholder={placeholder}
                            disabled={disabled}
                            min={min}
                            max={max}
                            step={step}
                            maxLength={maxLength}
                            inputMode={inputMode}
                            onChange={(event) => {
                                let nextValue = event.target.value;
                                if (digitsOnly) {
                                    nextValue = nextValue.replace(/\D/g, "");
                                }
                                if (typeof maxLength === "number") {
                                    nextValue = nextValue.slice(0, maxLength);
                                }
                                field.onChange(nextValue);
                            }}
                            className={cn(
                                inputBase,
                                isPasswordField && "pr-10",
                                inputError(error)
                            )}
                        />
                        {isPasswordField && (
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                );
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            rules={required ? { required: "This field is required" } : undefined}
            render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;

                if (type === "toggle") {
                    return (
                        <FormItem className={cn("flex flex-col", className)}>
                            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
                                <FormLabel>
                                    {label}
                                    {required && <span className="text-destructive ml-1">*</span>}
                                </FormLabel>
                                <FormControl>
                                    {renderInput(field, hasError)}
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    );
                }

                return (
                    <FormItem className={cn("flex flex-col", className)}>
                        <div className="flex items-start gap-3">
                            {icon && (
                                <div className="mt-1 flex-shrink-0">
                                    {icon}
                                </div>
                            )}
                            <div className="flex flex-col flex-1 min-w-0">
                                {label && (
                                    <FormLabel className={cn(
                                        "text-[10px] uppercase font-bold text-slate-400/80 mb-0.5 tracking-wider",
                                        labelClassName
                                    )}>
                                        {label}
                                        {required && <span className="text-destructive ml-1">*</span>}
                                    </FormLabel>
                                )}
                                <FormControl>
                                    {renderInput(field, hasError)}
                                </FormControl>
                            </div>

                            {onRemove && (
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center ml-2"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};