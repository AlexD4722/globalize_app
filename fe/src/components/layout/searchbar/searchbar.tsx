import SearchButton from '@/components/button/search-button'
import DateField from './date-field'
import DestinationField from './destination-field'
import GuestField from './guest-field'
import { DateRange } from 'react-day-picker'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useLocalAppStore from '@/services/zustand/store'
import {
    convertDateToDDMMYYYY,
    convertDDMMYYYYtoDate,
} from '@/function/date-converter'
import { LayoutSearchParamsMapping } from '@/components/type'

export interface Guests {
    adults: number
    children: number
    pets: number
}

export const initialRange: DateRange = {
    from: undefined,
    to: undefined,
}

export const initialGuest: Guests = {
    adults: 0,
    children: 0,
    pets: 0,
}

interface Searchbar {
    glassEffect?: boolean
}

export default function Searchbar({ ...props }: Searchbar) {
    const { glassEffect = true } = props

    const router = useRouter()
    const destination = useLocalAppStore((state) => state.destination)
    const range = useLocalAppStore((state) => state.range)
    const guest = useLocalAppStore((state) => state.guest)
    const setDestination = useLocalAppStore((state) => state.setDestination)
    const setRange = useLocalAppStore((state) => state.setRange)
    const setGuest = useLocalAppStore((state) => state.setGuest)
    const [isDestinationFocus, setIsDestinationFocus] = useState<boolean>(false)
    const [isDestinationError, setIsDestinationError] = useState<string>('')

    const [innerFieldActive, setInnerFieldActive] = useState<boolean>(false)

    const searchTrigger = () => {
        let checkIn: string | null = null
        let checkOut: string | null = null

        if (range) {
            if (range.from) {
                checkIn = convertDateToDDMMYYYY(range.from, '')
            }
            if (range.to) {
                checkOut = convertDateToDDMMYYYY(range.to, '')
            }
        }

        if (destination) {
            let routerObject: any = {
                pathname: '/search',
                query: {
                    city: destination,
                    adults: guest.adults,
                    children: guest.children,
                    pets: guest.pets,
                },
            }
            if (checkIn && checkOut) {
                routerObject.query = {
                    ...routerObject.query,
                    from: checkIn,
                    to: checkOut,
                }
            }
            router.push(routerObject)
        } else {
            //If desination is empty when clicked Search, show error message
            setIsDestinationError(
                'Please enter a destination to start searching.'
            )
        }
    }

    useEffect(() => {
        const {
            city: destination,
            from: checkIn,
            to: checkOut,
            adults,
            children,
            pets,
        } = router.query as LayoutSearchParamsMapping

        setDestination(destination ? destination : '')
        setRange({
            from: checkIn ? convertDDMMYYYYtoDate(checkIn, '') : undefined,
            to: checkOut ? convertDDMMYYYYtoDate(checkOut, '') : undefined,
        })
        setGuest({
            adults: adults ? Number(adults) : 0,
            children: children ? Number(children) : 0,
            pets: pets ? Number(pets) : 0,
        })
    }, [router, setDestination, setRange, setGuest])

    useEffect(() => {
        router.prefetch('/search')
    },[router])

    return (
        <>
            <div id={'searchbar'} className="relative group">
                <div
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none border border-borderDefault group-hover:elevation-shadow-1',
                        'lg:rounded-full',
                        'xs:rounded-3xl'
                    )}
                >
                    <div
                        className={clsx(
                            'absolute top-0 left-0 w-full h-full',
                            glassEffect
                                ? 'glass-effect'
                                : innerFieldActive
                                ? 'bg-[#e9e9e9]'
                                : 'bg-white'
                        )}
                    ></div>
                </div>
                <div
                    className={clsx(
                        'relative items-center text-black',
                        'lg:grid-flow-col lg:grid-cols-[unset] lg:gap-0 lg:p-1',
                        'xs:grid xs:grid-cols-2 xs:gap-2 xs:p-2'
                    )}
                >
                    <DestinationField
                        className={clsx(
                            'lg:col-auto lg:row-auto',
                            'xs:col-[1/2] xs:row-[1/1]'
                        )}
                        destination={destination}
                        setDestination={setDestination}
                        glassEffect={glassEffect}
                        setInnerFieldActive={setInnerFieldActive}
                        setIsFocus={setIsDestinationFocus}
                        isFocus={isDestinationFocus}
                        isError={isDestinationError}
                        setIsError={setIsDestinationError}
                    />
                    <DateField
                        className={clsx(
                            'lg:col-auto lg:row-auto',
                            'xs:col-[1/-1] xs:row-[2/2]'
                        )}
                        range={range}
                        setRange={setRange}
                        glassEffect={glassEffect}
                        setInnerFieldActive={setInnerFieldActive}
                    />
                    <GuestField
                        className={clsx(
                            'lg:col-auto lg:row-auto',
                            'xs:col-[2/2] xs:row-[1/1]'
                        )}
                        guest={guest}
                        setGuest={setGuest}
                        glassEffect={glassEffect}
                        setInnerFieldActive={setInnerFieldActive}
                    />
                    <div
                        className={clsx(
                            'lg:mx-4 lg:col-auto lg:row-auto',
                            'xs:mx-4 xs:col-[1/-1] xs:row-[3/3]'
                        )}
                    >
                        <SearchButton
                            onClick={searchTrigger}
                            className={clsx(
                                'bg-theme text-white px-4 py-3',
                                'lg:rounded-full lg:col-auto lg:row-auto',
                                'xs:rounded-2xl xs:w-full xs:col-[1/-1] xs:row-[3/3]'
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

//Add this component on the very top of the page route
export const SearchbarOnRegularRoute = () => {
    return (
        <>
            <div className="w-full xs:mt-5 lg:mt-0 xs:relative z-10">
                <div
                    className={clsx(
                        'absolute top-1/2 -translate-y-1/2 lg:left-[-21.4%] xs:left-[-12.5%] w-screen h-[1px] z-[-1] bg-borderDefault'
                    )}
                />
                <div
                    className={clsx(
                        'absolute top-0 lg:left-[-21.4%] xs:left-[-12.5%] w-screen h-1/2 z-[-5] glass-effect'
                    )}
                />
                <div className="w-fit mx-auto">
                    <Searchbar glassEffect={false} />
                </div>
            </div>
        </>
    )
}
