"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { loadGoogleMaps } from "@/lib/google-maps-loader"

export interface LocationInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export const LocationInput = React.forwardRef<HTMLInputElement, LocationInputProps>(
    ({ value, onChange, placeholder, className }, ref) => {
        const localInputRef = React.useRef<HTMLInputElement | null>(null)
        const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null)
        const onChangeRef = React.useRef(onChange)

        React.useImperativeHandle(
            ref,
            () => localInputRef.current as HTMLInputElement
        )

        React.useEffect(() => {
            onChangeRef.current = onChange
        }, [onChange])

        React.useEffect(() => {
            let mounted = true
            let placeChangedListener: google.maps.MapsEventListener | null = null

            const initAutocomplete = async () => {
                if (!localInputRef.current || autocompleteRef.current) return

                try {
                    await loadGoogleMaps()
                } catch {
                    return
                }

                if (!mounted || !localInputRef.current || !window.google?.maps?.places) return

                const instance = new window.google.maps.places.Autocomplete(localInputRef.current, {
                    fields: ["formatted_address", "name", "address_components", "geometry", "types"],
                    componentRestrictions: { country: "us" },
                })

                autocompleteRef.current = instance

                placeChangedListener = instance.addListener("place_changed", () => {
                    const place = instance.getPlace()
                    const isNamedPlace = place?.types?.some((type: string) =>
                        ['airport', 'lodging', 'establishment', 'point_of_interest'].includes(type)
                    )

                    let nextValue = ""
                    if (isNamedPlace && place?.name && place?.formatted_address) {
                        nextValue = `${place.name}, ${place.formatted_address}`
                    } else {
                        nextValue = place?.formatted_address || place?.name || ""
                    }

                    if (nextValue) {
                        onChangeRef.current(nextValue)
                    }
                })
            }

            void initAutocomplete()

            return () => {
                mounted = false
                if (placeChangedListener) {
                    window.google?.maps?.event?.removeListener(placeChangedListener)
                }
                autocompleteRef.current = null
            }
        }, [])

        return (
            <input
                type="text"
                ref={localInputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                className={cn(className)}
            />
        )
    }
)

LocationInput.displayName = "LocationInput"