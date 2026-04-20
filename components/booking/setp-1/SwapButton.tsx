import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwapButtonProps {
    onSwap: () => void;
    isSwapping: boolean;
    className?: string;
}

export const SwapButton: React.FC<SwapButtonProps> = ({ onSwap, isSwapping, className }) => {

    return (
        <button
            type="button"
            onClick={onSwap}
            className={cn(
                "p-1 hover:bg-secondary rounded transition-all duration-300 focus-visible:outline-primary",
                className
            )}
            aria-label="Swap locations"
        >
            <ArrowDownUp
                className={cn(
                    "w-5 h-5 text-primary transition-transform duration-300",
                    isSwapping && "rotate-180"
                )}
            />
        </button>
    );
};
