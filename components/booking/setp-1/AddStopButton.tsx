import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddStopButtonProps {
    onAdd: () => void;
    className?: string;
    label?: string;
}

export const AddStopButton: React.FC<AddStopButtonProps> = ({
    onAdd,
    className,
    label
}) => {
    const displayLabel = label || "Add Stop";

    return (
        <button
            type="button"
            onClick={onAdd}
            className={cn(
                "inline-flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-primary rounded-md group",
                className
            )}
            aria-label="Add a stop to your journey"
        >
            <Plus className="w-5 h-5 p-[2px] text-primary bg-white rounded-full border-2 border-primary group-hover:scale-110 transition-transform cursor-pointer" />
            <span className="text-primary font-semibold text-sm leading-none cursor-pointer">{displayLabel}</span>
        </button>
    );
};
