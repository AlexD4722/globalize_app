import { ImageUpload } from "./form/images-upload"

export type iImage = {
    src: string
    label: string
    to: string
}

export type iGuest = {
    adults: number
    children: number
    infants: number
    pets: number
}
export interface iSearch {
    destination: string
    checkin: typeof Date
    checkout: typeof Date
    guest: iGuest
}

export interface iCommonRules  {
    id?: string
    checkInTime?: string
    checkOutTime?: string
    cancelBeforeHour?: string
    quietTimeFrom?: string
    quietTimeTo?: string
    miniumAllowedAge?: number
    smokingAllowed?: boolean
    partyAllowed?: boolean
    petAllowed?: boolean
}

export interface iProperty {
    id: string
    name: string
    description: string
    addressSpecific: string
    province: string
    district: string
    ward: string
    featured_picture: string
    pictures: string[]
    propertyCommonRules: iCommonRules
    featured_facilities: string[]
    facilities: iFacility[]
    minPrice: number
    reviews: {
        id: number
        rating: number
        content: string
    }[]
    avgRating: number
}
export type iBedRoomDetail = {
    id?: number
    bedType: iBedType
    quantity: number
}
export type iBedType = {
    id?: number
    name: string
    description: string
}
export type iBedroom = {
    id?: number
    bedroomDetail: iBedRoomDetail
}
export interface iRoom {
    id: string
    type: string
    name: string
    description: string
    price: number
    maxGuest: number
    available?: number
    area: string
    picture: ImageUpload
    amenities: iAmenity[]
    bedrooms: iBedroom[]
}

export type iAmenity = {
    id: string
    name?: string
    amenityCategory: iAmenityCategory
}

export type iAmenityCategory = {
    id: string
    name: string
}

export type selectBox = {
    id: number
    titleBox: string
    labelList: {
        id: number
        name: string
        status: boolean
        value: number
    }[]
    multiSelect: boolean
}
export type ParameterFilterSide = {
    doubleRange: number[]
    selectBox: selectBox[]
}
export type DropdownOption = {
    name: string
    icon: React.ReactNode
    key: number
}
export type ItemResultFilter = {
    id: string
    name: string
    address: string
    rating: number
    review: number
    price: number
    img: string
}

export type iPropertyReservationInfo = {
    propertyId: string
    propertyName: string
    propertyAddress: string
    propertyReview: {
        averageRating: number
        totalReviews: number
    }
    propertyRules: {
        check_in_time?: string
        check_out_time?: string
        cancel_before_hour?: string
        quite_time_from?: string
        quite_time_to?: string
        minium_allowed_age?: number
        is_smoking_allowed?: boolean
        is_party_allowed?: boolean
        is_pet_allowed?: boolean
    }
    propertyFeaturedImage: string
}

export type iReservationBookingInfo = {
    checkIn: string
    checkOut: string
    adults: number
    children: number
    pets: number
}

export type iReservationRoomsInfo = {
    summary: {
        totalRooms: number
        totalPricePerNight: number
    }
    details: iReservedRoom[]
}

export interface iReservationInfo
    extends iReservationBookingInfo,
        iReservationRoomsInfo {}

export type iReservedRoom = {
    roomId: string
    roomName: string
    roomAmount: number
    roomFeaturedImage: string
    pricePerRoom: number
    maxGuests: number
    bedroom: {
        bed_type: string
        quantity: number
    }[]
}

export type LayoutSearchParamsMapping = {
    city: string
    from: string
    to: string
    adults: string
    children: string
    pets: string
}

export type ReservationParamsMapping = {
    propertyReservationInfo: string
    reservationInfo: string
}

export interface iListing {
    id: string
    name: string
    description: string
    addressSpecific: string
    locationGps: string
    picture: string
    status: string
}

export interface iFacility {
    id?: string
    name: string
    description?: string
}

export interface iListingDetails {
    id: string
    name: string
    description: string
    addressSpecific: string
    province: string
    district: string
    ward: string
    featured_picture: string
    pictures: string[]
    facilities?: iFacility[]
    propertyCommonRules: iCommonRules
    propertyRoom: iRoom[]
    reviews: iListingReview[]
    avgRating: number
}

export interface iListingReview {
    id: number
    rating: number
    content: string
}

export type createPropertyDto = {
    commonRules: iCommonRules
    coverImage: File
    facilities: iFacility[]
    images: File[]
    address: string
    description: string
    name: string
    type: string
    rooms: iRoom[]
}
