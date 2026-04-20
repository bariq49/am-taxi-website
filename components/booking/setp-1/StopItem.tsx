import { Input } from '@/components/ui/Input';
import React from 'react';
interface StopItemProps {
    index: number;
    onRemove: (index: number) => void;
    stopFeePerStop?: number;
}

export const StopItem: React.FC<StopItemProps> = ({
    index,
    onRemove,
    stopFeePerStop = 0,
}) => {

    return (
        <div className="flex items-start gap-3">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-primary bg-white z-10 flex-shrink-0 mt-3" />
            <div className="flex-1">
                <div className="text-sm font-semibold text-black mb-1">
                    Stop {index + 1}
                    {stopFeePerStop > 0 ? ` ($${stopFeePerStop.toFixed(2)} Extra)` : ''}
                </div>
                <Input
                    name={`stops.${index}.address`}
                    type="location"
                    placeholder="Stop Address"
                    className="flex-1"
                    onRemove={() => onRemove(index)}
                />

            </div>
        </div>
    );
};
