import { Input } from '@/components/features/form/Input';
import React from 'react';
import { formatPrice } from '@/lib/booking-utils';

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
        <div className="flex items-start gap-1">
            <div className="flex flex-col items-center h-full">
                <div className="h-[25px]" />
                <div className="w-5 h-5 rounded-full border-4 border-black bg-white z-10 flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                    Stop {index + 1}
                    {stopFeePerStop > 0 ? <span className="text-primary ml-1">({formatPrice(stopFeePerStop)} Extra)</span> : ''}
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

