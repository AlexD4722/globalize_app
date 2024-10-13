import { GuestLayout } from '@/components/layout'
import { SearchbarOnRegularRoute } from '@/components/layout/searchbar/searchbar'
import AvailabilitySection from '@/components/pages/property/availability-section'
import IntroduceSection from '@/components/pages/property/introduce-section'
import { StarRate } from '@/components/svg'
import {
    iProperty,
    iPropertyReservationInfo,
    iReservationInfo,
    iReservationRoomsInfo,
    iRoom,
    LayoutSearchParamsMapping,
} from '@/components/type'

import {
    convertDateToDDMMYYYY,
    convertDDMMYYYYtoDate,
} from '@/function/date-converter'
import { DayCounterBetweenDateRange } from '@/function/day-counter'

import { matchRatingRank } from '@/function/rank-matching-description'
import {
    Guests,
    initialGuest,
    initialRange,
} from '@/services/zustand/layout_searchbar-slice'
import useLocalAppStore from '@/services/zustand/store'
import { useQuery } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    createContext,
    Dispatch,
    ReactElement,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { DateRange } from 'react-day-picker'

type isAvailabilityError = {
    errorScrope: 'dateField' | 'guestField'
    message: string
}

type PropertyContextState = {
    defaultRange: DateRange | undefined
    defaultGuests: Guests
    range: DateRange | undefined
    setRange: Dispatch<SetStateAction<DateRange | undefined>>
    guests: Guests
    setGuests: Dispatch<SetStateAction<Guests>>
    onApplyChange: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void
    currentRooms: iRoom[]
    setCurrentRooms: Dispatch<SetStateAction<iRoom[]>>
    onReserveRooms: (reservationRoomsInfo: iReservationRoomsInfo) => void
    isAvailabilityError: isAvailabilityError | undefined
    setIsAvailabilityError: Dispatch<
        SetStateAction<isAvailabilityError | undefined>
    >
}

export const PropertyContext = createContext<PropertyContextState | null>(null)


type CommonRuleProps = {
    title: string
    content: string | undefined
}

export const CommonRule = ({ title, content }: CommonRuleProps) => {
    return (
        <>
            {content && (
                <div className="grid grid-cols-[40%_60%] gap-3 py-5 border-b last:border-b-0 border-borderDefault">
                    <div className="font-medium">{title}</div>
                    <div>{content}</div>
                </div>
            )}
        </>
    )
}

//Searchbar values must be persistence from Search page to Property page
//In order for Property page to get the values and paste down availability-searchbar
export default function PropertyDetails() {
    const router = useRouter()
    const propertyQuery = useQuery({
        queryKey: ['propertyDetails', router.query.id],
    })
    const property = propertyQuery.data as iProperty
    const propertyRoomsQuery = useQuery({
        queryKey: ['propertyRooms', router.query.id, router.query.from, router.query.to],
    })
    const propertyRooms = propertyRoomsQuery.data as Array<iRoom>
    const [currentRooms, setCurrentRooms] =
        useState<Array<iRoom>>(propertyRooms)

    //This is the persistense searchbar values, get it from query in URI
    const defaultRange = useLocalAppStore((state) => state.range)
    const defaultGuests = useLocalAppStore((state) => state.guest)
    const setDefaultRange = useLocalAppStore((state) => state.setRange)
    const setDefaultGuests = useLocalAppStore((state) => state.setGuest)

    //This is the availability-searchbar values, it may change when users interact
    const [range, setRange] = useState<DateRange | undefined>(initialRange)
    const [guests, setGuests] = useState<Guests>(initialGuest)

    const [isAvailabilityError, setIsAvailabilityError] =
        useState<isAvailabilityError>()

    useEffect(() => {
        if (propertyRoomsQuery.isSuccess) {
            setCurrentRooms(propertyRooms)
        }
    }, [propertyRooms, propertyRoomsQuery.isSuccess])

    //When click search on in searchbar in property page
    //Should handle fetch new room result base on search input (range, guest)
    const onApplyChange = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setIsAvailabilityError(undefined)

        //Fetch new room result base on availabity-searchbar input (range, guest)

        //Also sync the availability-searchbar values (range, guests) with persistense searchbar values (defaultRange, defaultGuests)
        //persistense searchbar values (defaultRange, defaultGuests) will be used to get to Reservation
        setDefaultRange(range)
        setDefaultGuests(guests)
    }

    //When users selected their rooms and click Reserve, this function handle logic before navigate to Reservation page
    const onReserveRooms = (reservationRoomsInfo: iReservationRoomsInfo) => {
        //Before reservation, availability searchbar must be filled
        //Otherwise, show error
        if (!range || !range?.from || !range?.to) {
            scrollToAvailabilitySearchbar()
            setIsAvailabilityError({
                errorScrope: 'dateField',
                message: 'Please select check-in and check-out date',
            })
        } else if (guests.adults === 0) {
            scrollToAvailabilitySearchbar()
            setIsAvailabilityError({
                errorScrope: 'guestField',
                message: 'Please add guest info',
            })
        }

        //Only navigate to Reservation page if availability searchbar is filled
        if (range && range.from && range.to && guests.adults > 0) {
            // Always use the values from defaultRange and defaultGuest to get to Reservation page
            // because its the value that fetch the rooms data in the first place

            //If users "Apply Change" to availability-searchbar
            //then defaultRange and defaultGuest and availability-searchbar values will be in sync

            //Incase defaultRange and defaultGuest is empty
            if (!defaultRange || !defaultRange?.from || !defaultRange?.to) {
                scrollToAvailabilitySearchbar()
                setIsAvailabilityError({
                    errorScrope: 'dateField',
                    message: 'Apply change first.',
                })
            } else if (defaultGuests.adults === 0) {
                scrollToAvailabilitySearchbar()
                setIsAvailabilityError({
                    errorScrope: 'guestField',
                    message: 'Apply change first.',
                })
            } else {
                router.push({
                    pathname: '/reservation',
                    query: {
                        propertyReservationInfo: JSON.stringify({
                            propertyId: property.id,
                            propertyName: property.name,
                            propertyAddress:
                                property.addressSpecific +
                                ', ' +
                                property.ward +
                                ', ' +
                                property.district +
                                ', ' +
                                property.province,
                            propertyReview: {
                                averageRating: property.avgRating,
                                totalReviews: property.reviews.length,
                            },
                            propertyRules: property.propertyCommonRules,
                            propertyFeaturedImage: property.featured_picture,
                        } as iPropertyReservationInfo),
                        reservationInfo: JSON.stringify({
                            checkIn: convertDateToDDMMYYYY(
                                defaultRange.from as Date,
                                ''
                            ),
                            checkOut: convertDateToDDMMYYYY(
                                defaultRange.to as Date,
                                ''
                            ),
                            adults: defaultGuests.adults,
                            children: defaultGuests.children,
                            pets: defaultGuests.pets,
                            summary: reservationRoomsInfo.summary,
                            details: reservationRoomsInfo.details,
                        } as iReservationInfo),
                    },
                })
            }
        }
    }

    const scrollToAvailabilitySearchbar = () => {
        document
            .getElementById('availability-searchbar')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const introduceProps = ({ property }: { property: iProperty }) => {
        return {
            id: property.id,
            name: property.name,
            featured_picture: property.featured_picture,
            pictures: property.pictures,
            description: property.description,
            address: property.addressSpecific,
            city: property.province,
            district: property.district,
            ward: property.ward,
            price: property.minPrice,
            average_rating: property.avgRating,
            total_reviews: property.reviews.length,
            facilities: property.facilities,
        }
    }

    const availabilityProps = ({
        property,
        propertyRooms,
    }: {
        property: iProperty
        propertyRooms: Array<iRoom>
    }) => {
        return {
            id: property.id,
            name: property.name,
            address:
                property.addressSpecific +
                ', ' +
                property.ward +
                ', ' +
                property.district +
                ', ' +
                property.province +
                '.',
            featuredFacilities: property.featured_facilities,
            averageRating: property.avgRating,
            totalReviews: property.reviews.length,
            propertyRooms: propertyRooms,
        }
    }

    //Auto fetch params from query in URI into availability-searchbar
    useEffect(() => {
        const {
            from: checkIn,
            to: checkOut,
            adults,
            children,
            pets,
        } = router.query as LayoutSearchParamsMapping

        setRange({
            from: checkIn ? convertDDMMYYYYtoDate(checkIn, '') : undefined,
            to: checkOut ? convertDDMMYYYYtoDate(checkOut, '') : undefined,
        })
        setGuests({
            adults: adults ? Number(adults) : 0,
            children: children ? Number(children) : 0,
            pets: pets ? Number(pets) : 0,
        })
    }, [router, setRange, setGuests])

    return (
        <>
            {(property && propertyRooms) && (
                <PropertyContext.Provider
                    value={{
                        range,
                        setRange,
                        guests,
                        setGuests,
                        onApplyChange,
                        currentRooms,
                        setCurrentRooms,
                        onReserveRooms,
                        isAvailabilityError,
                        setIsAvailabilityError,
                        defaultGuests,
                        defaultRange,
                    }}
                >
                    <Head>
                        <title>{property.name}</title>
                    </Head>
                    <main className="min-h-screen my-20">
                        {/** Introduction: Images, Address, Overall rating, Price, Description, Featured facilities*/}
                        <IntroduceSection {...introduceProps({ property })} />

                        {/**Booking (Reserve) */}
                        <AvailabilitySection
                            {...availabilityProps({ property, propertyRooms })}
                        />

                        {/**Facilities */}
                        {/* <div id={'facility-section'} className="mt-16">
                            <div className="text-2xl font-medium mb-5">
                                All facilities in {property.name}
                            </div>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-5">
                                {property.facilities.map((facility) => (
                                <div key={facility.id}>
                                    {facility.name}
                                </div>
                            ))}
                            </div>
                        </div> */}

                        {/**Guest Review */}
                        <div id="review-section" className="mt-20">
                            <div className="text-2xl font-medium mb-5">
                                Guest Reviews
                            </div>
                            <div className="border border-borderDefault rounded-xl p-5">
                                <div className="flex items-center">
                                    <div className="aspect-square rounded-full bg-theme text-white w-[100px] flex items-center justify-center text-2xl font-bold mr-10">
                                        <div className="aspect-square flex items-center justify-center rounded-full w-[80px] border-4 border-white">
                                            {(property.avgRating).toFixed(1)}
                                        </div>
                                    </div>

                                    <div className="h-full">
                                        <div className="text-3xl font-medium">
                                            {matchRatingRank(
                                                property.avgRating
                                            )}
                                        </div>
                                        <div className="mt-5">
                                            from{' '}
                                            <span className="font-medium">
                                                {property.reviews.length}
                                            </span>{' '}
                                            verified guest reviews
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="mb-7 text-xl">
                                        See what guests actually say:
                                    </div>
                                    <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5">
                                        {property.reviews.map((comment) => (
                                            <div key={comment.id} className="p-5 border border-borderDefault rounded-xl hover:elevation-shadow-2 duration-200">
                                                {/* <div className="text-sm text-textUnfocus mb-3">{comment.date}</div> */}
                                                <div className="flex justify-between">
                                                    {/* <div className="font-medium">{comment.full_name}</div> */}
                                                    <div className="flex items-center"><StarRate/> <span className="ml-2">{comment.rating === 10 ? (comment.rating).toFixed(0) : (comment.rating).toFixed(1)} / 10</span></div>
                                                </div>
                                                <p className="mt-3">{comment.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 text-textUnfocus">
                                    <p>View all reviews...</p>
                                </div>
                            </div>
                        </div>

                        {/**Common Rules */}
                        <div className="mt-20">
                            <div className="text-2xl font-medium mb-5">
                                House Rules
                            </div>
                            <div className="flex flex-col p-5 border border-borderDefault rounded-xl">
                                <CommonRule
                                    title="Check in"
                                    content={
                                        property.propertyCommonRules.checkInTime?.slice(0,5)
                                    }
                                />
                                <CommonRule
                                    title="Check out"
                                    content={
                                        property.propertyCommonRules
                                            .checkOutTime?.slice(0,5)
                                    }
                                />
                                <CommonRule
                                    title="Refund before days"
                                    content={
                                        property.propertyCommonRules
                                            .cancelBeforeHour
                                    }
                                />
                                <CommonRule
                                    title="Quite time from"
                                    content={
                                        property.propertyCommonRules
                                            .quietTimeFrom?.slice(0,5)
                                    }
                                />
                                <CommonRule
                                    title="Quite time to"
                                    content={
                                        property.propertyCommonRules.quietTimeTo?.slice(0,5)
                                    }
                                />
                                <CommonRule
                                    title="Minium age"
                                    content={
                                        property.propertyCommonRules
                                            .miniumAllowedAge
                                            ? property.propertyCommonRules.miniumAllowedAge.toString() +
                                              ' years old.'
                                            : undefined
                                    }
                                />
                                <CommonRule
                                    title="Smooking"
                                    content={
                                        property.propertyCommonRules
                                            .smokingAllowed
                                            ? 'Smooking allowed in some area!'
                                            : 'Smooking is not allowed!'
                                    }
                                />
                                <CommonRule
                                    title="Pets"
                                    content={
                                        property.propertyCommonRules.petAllowed
                                            ? 'Pets is allowed!'
                                            : 'Pets is not allowed!'
                                    }
                                />
                                <CommonRule
                                    title="Party"
                                    content={
                                        property.propertyCommonRules
                                            .partyAllowed
                                            ? 'Party is allowed!'
                                            : 'Party is not allowed!'
                                    }
                                />
                            </div>
                        </div>
                    </main>
                </PropertyContext.Provider>
            )}
        </>
    )
}

PropertyDetails.getLayout = function getLayout(page: ReactElement) {
    return (
      <GuestLayout>
        <SearchbarOnRegularRoute />
        {page}
      </GuestLayout>
    )
}