import { DateRange } from 'react-day-picker';
import { StateCreator } from 'zustand'

export interface Guests {
    adults: number,
    children: number,
    pets: number
}

export const initialRange: DateRange = {
    from: undefined,
    to: undefined
};

export const initialGuest: Guests = {
    adults: 0,
    children: 0,
    pets: 0
};

export interface SearchBarSlice {
    destination: string,
    setDestination: (destination: string) => void,
    range: DateRange | undefined,
    setRange: (range: DateRange | undefined) => void,
    guest: Guests,
    setGuest: (guest: Guests) => void,
    updateGuestAdults: (adults: number) => void,
    updateGuestChildren: (children: number) => void,
    updateGuestPets: (pets: number) => void,
}
  
export const createSearchbarSlice: StateCreator<
  SearchBarSlice
> = (set) => ({
    destination: "",
    range: undefined,
    guest: initialGuest,
    setDestination: (destination) =>  set((state) => ({ destination: destination })),
    setRange: (range) => set((state) => ({range: range})),
    setGuest: (guest) => set((state) => ({guest: guest})),
    updateGuestAdults: (adults) => set((state) => ({guest : {...state.guest, adults: adults} })),
    updateGuestChildren: (children) => set((state) => ({guest : {...state.guest, children: children} })),
    updateGuestPets: (pets) => set((state) => ({guest : {...state.guest, adults: pets} }))

})

