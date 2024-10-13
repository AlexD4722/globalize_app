import { ImageUpload } from '@/components/form/images-upload'
import { iRoom } from '@/components/type'
import { StateCreator } from 'zustand'

export type listingProcessState = {
    id?: string,
    currentStep?: string,
    propertyName?: string,
    propertyDescription?: string,
    propertyLocation?: {
        provinces: string;
        districts: string;
        wards: string;
    },
    propertyAddress?: string,
    propertyType?: string,
    images?: ImageUpload[],
    coverImage?: ImageUpload,
    facilities?: string[],
    rooms?: iRoom[],
    commonRules?: {
        checkInTime?: string
        checkOutTime?: string
        cancelBeforeDay?: string
        quietTimeFrom?: string
        quietTimeTo?: string
        miniumAllowedAge?: number
        smokingAllowed?: boolean
        partyAllowed?: boolean
        petAllowed?: boolean
    },
    refundPercentage?: number

}

export interface listingProcessSlice {
    listingProcess: listingProcessState,
    setListingProcess: (listingProcess: listingProcessState) => void
}

export const createListingProcessSlice: StateCreator<
    listingProcessSlice
> = (set) => ({
    listingProcess: {},
    setListingProcess: (listingProcess) => set((state) => ({listingProcess: listingProcess}))
})

