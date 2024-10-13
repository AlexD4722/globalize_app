import Button from '@/components/button/classic-button'
import { ComboBox } from '@/components/form/combo-box'
import { RHFInputField } from '@/components/form/input-field'
import { RHFTextAreaField } from '@/components/form/text_area-field'
import { GuestLayout } from '@/components/layout'
import { Check, ChevronRight, Person, StarRate } from '@/components/svg'
import {
    iPropertyReservationInfo,
    iReservationInfo,
    ReservationParamsMapping,
} from '@/components/type'
import { CheckoutPage } from '@/components/ui/CheckoutPage'

import { convertDDMMYYYYtoDate } from '@/function/date-converter'
import { DayCounterBetweenDateRange } from '@/function/day-counter'
import { matchRatingRank } from '@/function/rank-matching-description'
import { ReserveRoomOptions } from '@/services/react_query/functions/mutations'
import { GuestProfile } from '@/services/react_query/functions/types'
import queryClient from '@/services/react_query/QueryClient/queryClient'
import { JAVA_URL } from '@/settings/fe_config'
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
    createContext,
    Dispatch,
    ReactElement,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type ReservationPhase = 'details' | 'confirmation' | 'notification'

type NotificationPhase = {
    status: 'success' | 'failed' | 'pending' | 'error'
    message: string
}

type ConfirmationFormValues = {}

type ReservationFormValues = {
    fullname: string
    'email-reservation': string
    phone: string
    address: string
    'special-requests': string
    'arrival-time': string
}

type ReservationContextState = {
    setPhase: Dispatch<SetStateAction<ReservationPhase>>
    currentReservationInfo: iReservationInfo | undefined
    reservationFormData: ReservationFormValues | undefined
    setReservationFormData: Dispatch<
        SetStateAction<ReservationFormValues | undefined>
    >
    confirmationStatus: NotificationPhase | undefined
    setConfirmationStatus: Dispatch<
        SetStateAction<NotificationPhase | undefined>
    >
    currentPropertyInfo: iPropertyReservationInfo | undefined
    reserveMutation: UseMutationResult<any, Error, ReserveRoomOptions>
}

export const ReservationContext = createContext<ReservationContextState | null>(
    null
)

const arrivalTimeArray = () => {
    const arrivalTimes = [...Array(24)].map((_, index) => {
        return {
            id: `${index > 9 ? '' : '0'}${index}-${index > 9 ? '' : '0'}${
                index + 1
            }`,
            value: `${index > 9 ? '' : '0'}${index}:00 - ${
                index + 1 > 9 ? '' : '0'
            }${index + 1}:00`,
        }
    })

    return arrivalTimes
}

const arrivalTime = [...arrivalTimeArray()]

export default function Reservation() {
    const { query, isReady, push, back } = useRouter()
    const [phase, setPhase] = useState<ReservationPhase>('details')
    const [currentPropertyInfo, setCurrentPropertyInfo] =
        useState<iPropertyReservationInfo>()
    const [currentReservationInfo, setCurrentReservationInfo] =
        useState<iReservationInfo>()
    const [DetailedReserve, setDetailedReserve] = useState<boolean>(false)
    const [pricePerNight, setPriceBeforeTaxAndCharge] = useState<number>(0)
    const [lengthOfStays, setTaxAndCharge] = useState<number>(0)
    const [totalPrice, setPriceAfterTaxAndCharge] = useState<number>(0)
    const [reservationFormData, setReservationFormData] =
        useState<ReservationFormValues>()
    const [confirmationStatus, setConfirmationStatus] =
        useState<NotificationPhase>()
    const reserveMutation = useMutation<unknown, Error, ReserveRoomOptions>({
        mutationKey: ['reserveRoom'],
    })

    useEffect(() => {
        if (isReady) {
            const { propertyReservationInfo, reservationInfo } =
                query as ReservationParamsMapping

            if (propertyReservationInfo && reservationInfo) {
                setCurrentPropertyInfo(JSON.parse(propertyReservationInfo))
                setCurrentReservationInfo(JSON.parse(reservationInfo))
            } else {
                push({
                    pathname: '/',
                })
            }
        }
    }, [query, isReady, push])

    useEffect(() => {
        if (currentReservationInfo) {
            const lengthOfStays = DayCounterBetweenDateRange(
                convertDDMMYYYYtoDate(currentReservationInfo.checkIn, ''),
                convertDDMMYYYYtoDate(currentReservationInfo.checkOut, '')
            )
            const pricePerNight =
                currentReservationInfo.summary.totalPricePerNight
            const totalPrice = pricePerNight * lengthOfStays

            setPriceBeforeTaxAndCharge(pricePerNight)
            setTaxAndCharge(lengthOfStays)
            setPriceAfterTaxAndCharge(totalPrice)
        }
    }, [currentReservationInfo])

    return (
        <ReservationContext.Provider
            value={{
                setPhase,
                currentReservationInfo,
                currentPropertyInfo,
                reservationFormData,
                setReservationFormData,
                confirmationStatus,
                setConfirmationStatus,
                reserveMutation,
            }}
        >
            <Head>
                <title>Reservation</title>
            </Head>

            <div className="relative my-10 xs:hidden md:block">
                <div className="absolute top-1/2 left-0 border-t border-borderDefault h-[1px] w-full my-auto -z-10"></div>
                <div className="flex justify-between [&>div]:bg-white z-10 lg:text-lg xs:text-sm font-medium">
                    <div className="flex items-center pr-3">
                        <span className="mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full bg-theme text-white flex items-center justify-center lg:text-base xs:text-sm font-bold border border-transparent">
                            <Check />
                        </span>
                        <span>Selection</span>
                    </div>
                    <div className="flex items-center px-3">
                        <span className="mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full bg-theme text-white flex items-center justify-center lg:text-base xs:text-sm font-bold border border-transparent">
                            {phase === 'details' ? <>2</> : <Check />}
                        </span>
                        <span>Details</span>
                    </div>
                    <div className="flex items-center pl-3">
                        <span
                            className={clsx(
                                'mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full flex items-center justify-center lg:text-base xs:text-sm font-bold border border-theme',
                                phase === 'details' && 'bg-white text-theme',
                                phase === 'confirmation' &&
                                    'bg-theme text-white',
                                phase === 'notification' &&
                                    'bg-theme text-white'
                            )}
                        >
                            {phase === 'notification' ? <Check /> : <>3</>}
                        </span>
                        <span>Confirmation</span>
                    </div>
                </div>
            </div>

            {currentPropertyInfo && currentReservationInfo && (
                <div className="mb-20 mt-10 grid lg:grid-cols-[40%_60%] xs:grid-cols-1 gap-5 lg:pr-5 items-start">
                    <div className="border border-borderDefault rounded-2xl p-8 w-full hover:elevation-shadow-2 duration-200">
                        <div>
                            <div className="text-3xl font-medium">
                                {currentPropertyInfo.propertyName}
                            </div>
                            <div className="my-3">
                                {currentPropertyInfo.propertyAddress}
                            </div>
                            <div className="py-3">
                                <Image
                                    src={`${JAVA_URL}/${currentPropertyInfo.propertyFeaturedImage}`}
                                    alt={currentPropertyInfo.propertyName}
                                    width={50}
                                    height={50}
                                    className="w-1/2 h-auto aspect-video rounded-lg"
                                />
                            </div>
                            <div className="flex items-center mt-3 text-lg mb-1">
                                <div className="flex items-center mr-5">
                                    <span className="mr-1 text-theme">
                                        <StarRate />
                                    </span>
                                    <span>
                                        {currentPropertyInfo.propertyReview.averageRating.toFixed(
                                            1
                                        )}
                                    </span>
                                </div>
                                <div className="font-medium">
                                    {matchRatingRank(
                                        currentPropertyInfo.propertyReview
                                            .averageRating
                                    )}
                                </div>
                            </div>
                            <div className="text-textUnfocus">
                                from{' '}
                                {
                                    currentPropertyInfo.propertyReview
                                        .totalReviews
                                }{' '}
                                verified guests reviews
                            </div>
                        </div>

                        <div className="w-full h-[1px] border-t border-borderDefault my-8" />

                        <div>
                            <div className="text-xl mb-5">
                                Rerservation details
                            </div>

                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="text-base">Check-in</div>
                                    <div className="font-medium text-lg">
                                        {convertDDMMYYYYtoDate(
                                            currentReservationInfo.checkIn,
                                            ''
                                        ).toDateString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-base">Check-out</div>
                                    <div className="font-medium text-lg">
                                        {convertDDMMYYYYtoDate(
                                            currentReservationInfo.checkOut,
                                            ''
                                        ).toDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div>Total length of stays</div>
                                <div className="font-medium text-lg">
                                    {DayCounterBetweenDateRange(
                                        convertDDMMYYYYtoDate(
                                            currentReservationInfo.checkIn,
                                            ''
                                        ),
                                        convertDDMMYYYYtoDate(
                                            currentReservationInfo.checkOut,
                                            ''
                                        )
                                    )}{' '}
                                    night(s).
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xl mb-2">
                                        Your selection
                                    </div>
                                    <div className="font-medium text-lg">
                                        <span>
                                            {
                                                currentReservationInfo.summary
                                                    .totalRooms
                                            }{' '}
                                            room(s) for&nbsp;
                                        </span>
                                        <span>
                                            {currentReservationInfo.adults}{' '}
                                            {currentReservationInfo.adults > 1
                                                ? 'adults'
                                                : 'adult'}
                                        </span>
                                        {currentReservationInfo.children >
                                            0 && (
                                            <span>
                                                ,{' '}
                                                {
                                                    currentReservationInfo.children
                                                }{' '}
                                                {currentReservationInfo.children >
                                                1
                                                    ? 'children'
                                                    : 'child'}
                                            </span>
                                        )}
                                        <span>.</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        setDetailedReserve(!DetailedReserve)
                                    }
                                    className="text-2xl p-2 rounded-full hover:bg-theme hover:text-white hover:cursor-pointer active:scale-10"
                                >
                                    <ChevronRight
                                        className={clsx(
                                            DetailedReserve
                                                ? 'rotate-90'
                                                : 'rotate-[-90deg]'
                                        )}
                                    />
                                </button>
                            </div>
                            <div>
                                {DetailedReserve && (
                                    <div className="border border-borderDefault rounded-lg py-3 px-4 mt-5 elevation-color-2">
                                        <div className="mb-2">
                                            Rooms selection summary:
                                        </div>
                                        {currentReservationInfo.details.map(
                                            (room) => (
                                                <div
                                                    key={room.roomName}
                                                    className="mb-2 last:mb-0"
                                                >
                                                    <div className="text-lg font-medium">
                                                        x {room.roomAmount}{' '}
                                                        {room.roomName}
                                                    </div>
                                                    <div className="">
                                                        for ${room.pricePerRoom}{' '}
                                                        per night
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-[1px] border-t border-borderDefault my-8" />

                        <div>
                            <div className="text-xl mb-5">Price summary</div>
                            <table className="[&_th]:text-left [&_th]:text-lg [&_th]:font-medium [&_th]:p-2 [&_td]:p-2 [&_td]:text-xl [&_td]:font-medium  table-fixed w-full">
                                <tbody>
                                    <tr>
                                        <th>Price</th>
                                        <td>${pricePerNight}</td>
                                    </tr>
                                    <tr>
                                        <th>Nights</th>
                                        <td>{lengthOfStays}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-xl">Total</th>
                                        <td>${totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {phase === 'details' && <DetailsPhase />}

                    {phase === 'confirmation' && (
                        <ConfirmationPhase price={totalPrice} />
                    )}

                    {phase === 'notification' && <NotificationPhase />}
                </div>
            )}
        </ReservationContext.Provider>
    )
}

//Notification Phase
const NotificationPhase = () => {
    const router = useRouter()
    const { confirmationStatus, setConfirmationStatus, reserveMutation } =
        useContext(ReservationContext)!

    const statusColor = new Map<string, string>([
        ['success', 'text-green-500'],
        ['failed', 'text-red-500'],
        ['pending', 'text-gray-500'],
        ['error', 'text-red-500'],
    ])

    const statusTitle = new Map<string, string>([
        ['success', 'Success'],
        ['failed', 'Failed'],
        ['pending', 'Pending'],
        ['error', 'Error'],
    ])

    useEffect(() => {
        switch (reserveMutation.status) {
            case 'success':
                setConfirmationStatus({
                    status: 'success',
                    message: 'Your reservation is successfully confirmed!',
                })
                break
            case 'idle':
                setConfirmationStatus({
                    status: 'pending',
                    message: 'Your request is about to send.',
                })
            case 'pending':
                setConfirmationStatus({
                    status: 'pending',
                    message:
                        'Wait a minute, your booking request is being processed.',
                })
                break
            case 'error':
                setConfirmationStatus({
                    status: 'error',
                    message: 'An error occurred, please try again later!',
                })
                break
            default:
                setConfirmationStatus({
                    status: 'error',
                    message: 'An error occurred, please try again later!!',
                })
                break
        }
    }, [reserveMutation.status])

    return (
        <>
            <div className="border border-borderDefault rounded-2xl grid grid-flow-row gap-5">
                <div className="lg:p-8 sm:p-3">
                    <div className="text-2xl mb-3">
                        <span>Reservation status: </span>
                        <span
                            className={statusColor.get(
                                confirmationStatus?.status!
                            )}
                        >
                            {statusTitle.get(confirmationStatus?.status!)}
                        </span>
                    </div>
                    <div className="text-lg mb-5">
                        {confirmationStatus?.message}
                    </div>

                    <Button
                        intent={'secondary'}
                        rounded={'regular'}
                        onClick={() => {
                            router.push('/')
                        }}
                    >
                        Go to Homepage!
                    </Button>
                </div>
            </div>
        </>
    )
}
interface ConfirmationPhaseProps {
    price: number
}
//Confirmation Phase
const ConfirmationPhase: React.FC<ConfirmationPhaseProps> = ({ price }) => {
    const router = useRouter()
    const methods = useForm<ConfirmationFormValues>()
    const {
        setPhase,
        setReservationFormData,
        reservationFormData,
        currentReservationInfo,
        currentPropertyInfo,
        setConfirmationStatus,
        reserveMutation,
    } = useContext(ReservationContext)!
    const [reservationOptions, setReservationOptions] =
        useState<ReserveRoomOptions>({
            checkInDate: currentReservationInfo?.checkIn ?? '',
            checkOutDate: currentReservationInfo?.checkOut ?? '',
            roomId: currentReservationInfo?.details[0].roomId ?? '',
        })
    const onSubmit = async (data: ConfirmationFormValues) => {
        const reservationOptions: ReserveRoomOptions = {
            checkInDate: currentReservationInfo?.checkIn ?? '',
            checkOutDate: currentReservationInfo?.checkOut ?? '',
            roomId: currentReservationInfo?.details[0].roomId ?? '',
        }
        // Call reserveMutation here
        reserveMutation.mutate(reservationOptions)

        // Change the phase to notification
        setPhase('notification')
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        })
    }
    const movePageNotification = () => {
        setPhase('notification')
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        })
    }

    const [paymentMethod, setPaymentMethod] = useState<string>()

    const payment = [
        { id: 1, value: 'Visa/MasterCard' },
        { id: 2, value: 'Paypal' },
    ]

    return (
        <>
            <FormProvider {...methods}>
                <div>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="border border-borderDefault rounded-2xl grid grid-flow-row gap-5">
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Your informations:
                                </div>
                                <ul className="grid-flow-row grid gap-5 [&>div]:w-full">
                                    <li>
                                        <span>Fullname: </span>
                                        <span className="font-medium">
                                            {reservationFormData?.fullname}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Email: </span>
                                        <span className="font-medium">
                                            {
                                                reservationFormData?.[
                                                    'email-reservation'
                                                ]
                                            }
                                        </span>
                                    </li>
                                    <li>
                                        <span>Phone: </span>
                                        <span className="font-medium">
                                            {reservationFormData?.phone}
                                        </span>
                                    </li>
                                    <li>
                                        <span>City/Region: </span>
                                        <span className="font-medium">
                                            {reservationFormData?.address}
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="h-[1px] w-full border-t border-borderDefault"></div>
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Special Requests
                                </div>
                                <div className="mb-5 text-sm text-textUnfocus">
                                    Special requests cannot be guaranteed - but
                                    the property will do its best to meet your
                                    needs. You can always make a special request
                                    after your booking is complete!
                                </div>
                                <div>
                                    <p>
                                        {
                                            reservationFormData?.[
                                                'special-requests'
                                            ]
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="h-[1px] w-full border-t border-borderDefault"></div>
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Your arrival time
                                </div>
                                <div>
                                    <span>Estimated arrival time: </span>
                                    <span className="font-medium">
                                        {reservationFormData?.['arrival-time']}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="mt-5 border border-borderDefault rounded-2xl grid grid-flow-row gap-5">
                        <div className="lg:p-8 sm:p-3">
                            <div className="text-2xl mb-5">Payment method</div>
                            <p className="text-xl mb-5">
                                You must deposit 25% of the total order in
                                advance.
                            </p>
                            <div></div>{' '}
                            {reservationOptions && (
                                <CheckoutPage
                                    amount={Math.floor(price * 0.25)}
                                    reservationOrder={reservationOptions}
                                    move={movePageNotification}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full flex items-end justify-between mt-5">
                        <Button
                            type="button"
                            intent={'secondary'}
                            rounded={'regular'}
                            onClick={() => setPhase('details')}
                        >
                            To Previous Step
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </>
    )
}

//Details Phase
const DetailsPhase = () => {
    const {
        setPhase,
        setReservationFormData,
        reservationFormData,
        currentReservationInfo,
    } = useContext(ReservationContext)!

    const methods = useForm<ReservationFormValues>()

    const profileQuery = useQuery<unknown, Error, GuestProfile>({
        queryKey: ['guestProfile'],
    })

    const onSubmit = async (data: ReservationFormValues) => {
        //Handle submitted data here
        //Push data to back-end on return reservation id
        //Redirect to Confirmation page only when received reservation id

        setReservationFormData(data)
        setPhase('confirmation')
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        })
    }

    return (
        <>
            {' '}
            {profileQuery.isSuccess && (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="border border-borderDefault rounded-2xl grid grid-flow-row gap-5">
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Your informations:
                                </div>
                                <div className="grid-flow-row grid gap-5 [&>div]:w-full">
                                    <div>
                                        <RHFInputField
                                            inputName="fullname"
                                            label="Your fullname"
                                            registerOptions={{
                                                value: reservationFormData
                                                    ? reservationFormData[
                                                          'fullname'
                                                      ]
                                                    : `${profileQuery.data?.firstName} ${profileQuery.data?.lastName}`,
                                                required: {
                                                    value: true,
                                                    message:
                                                        'This field is required!',
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5">
                                        <RHFInputField
                                            inputName="email-reservation"
                                            label="Email address"
                                            registerOptions={{
                                                value: reservationFormData
                                                    ? reservationFormData[
                                                          'email-reservation'
                                                      ]
                                                    : profileQuery.data?.email,
                                                pattern: {
                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                    message:
                                                        'Email must in correct format!',
                                                },
                                                required: {
                                                    value: true,
                                                    message:
                                                        'This field is required!',
                                                },
                                            }}
                                        />
                                        <RHFInputField
                                            inputName="phone"
                                            label="Phone number"
                                            registerOptions={{
                                                value: reservationFormData
                                                    ? reservationFormData[
                                                          'phone'
                                                      ]
                                                    : profileQuery.data
                                                          ?.phoneNumber,
                                                pattern: {
                                                    value: /^[0-9]{10,}$/,
                                                    message:
                                                        'Phone number must atleast 10 digits!',
                                                },
                                                required: {
                                                    value: true,
                                                    message:
                                                        'This field is required!',
                                                },
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <RHFInputField
                                            inputName="address"
                                            label="Where you from? (City/Region)"
                                            registerOptions={{
                                                value: reservationFormData
                                                    ? reservationFormData[
                                                          'address'
                                                      ]
                                                    : '',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="text-2xl mb-5 mt-10">
                                    Your rooms:
                                </div>
                                <div>
                                    {currentReservationInfo &&
                                        currentReservationInfo.details.map(
                                            (room) => (
                                                <div
                                                    key={room.roomId}
                                                    className="pb-5 border-b border-borderDefault last:border-0 mb-5 last:mb-0"
                                                >
                                                    <div>
                                                        <div className="text-2xl mb-2 font-bold">
                                                            {room.roomName}{' '}
                                                            {room.roomAmount >
                                                                1 && (
                                                                <span>
                                                                    x{' '}
                                                                    {
                                                                        room.roomAmount
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="py-3">
                                                            <Image
                                                                src={`${JAVA_URL}/${room.roomFeaturedImage}`}
                                                                alt={
                                                                    room.roomName
                                                                }
                                                                width={50}
                                                                height={50}
                                                                className="w-1/3 h-auto aspect-video rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="flex items-center mt-2">
                                                            <span>
                                                                <Person />
                                                            </span>
                                                            <span>
                                                                &nbsp;Guests: x
                                                                {room.maxGuests}{' '}
                                                                adults
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>

                            <div className="h-[1px] w-full border-t border-borderDefault"></div>
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Special Requests
                                </div>
                                <div className="mb-5">
                                    Special requests cannot be guaranteed - but
                                    the property will do its best to meet your
                                    needs. You can always make a special request
                                    after your booking is complete!
                                </div>
                                <div>
                                    <RHFTextAreaField
                                        inputName="special-requests"
                                        label="Your request"
                                        rows={3}
                                        registerOptions={{
                                            value: reservationFormData
                                                ? reservationFormData[
                                                      'special-requests'
                                                  ]
                                                : '',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="h-[1px] w-full border-t border-borderDefault"></div>
                            <div className="lg:p-8 sm:p-3">
                                <div className="text-2xl mb-5">
                                    Your arrival time
                                </div>
                                <div className="mb-5">
                                    Add your estimated arrival time{' '}
                                    <span className="text-theme">*</span>
                                </div>
                                <div>
                                    <ComboBox
                                        width={'fit'}
                                        name="arrival-time"
                                        defaultValue={
                                            reservationFormData
                                                ? reservationFormData[
                                                      'arrival-time'
                                                  ]
                                                : ''
                                        }
                                        options={arrivalTime}
                                        required={{
                                            value: true,
                                            message: 'This field is required!',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-end justify-end mt-5">
                            <Button type="submit" rounded={'regular'}>
                                To Next Step
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

Reservation.getLayout = function getLayout(page: ReactElement) {
    return <GuestLayout>{page}</GuestLayout>
}
