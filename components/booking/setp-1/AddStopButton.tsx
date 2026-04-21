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
                "inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity focus-visible:outline-primary rounded-md group text-primary font-bold text-[10px] uppercase tracking-wider",
                className
            )}
            aria-label="Add a stop to your journey"
        >
            <Plus className="w-3 h-3 text-inherit" />
            <span className="leading-none cursor-pointer">{displayLabel}</span>
        </button>
    );
};
