import Button from '@/components/button/classic-button'
import { OwnerLayout } from '@/components/layout'
import ImageSection from '@/components/pages/property/introduce-section-images'
import { Close, Person, StarRate } from '@/components/svg'
import { iListingDetails, iListingReview, iRoom } from '@/components/type'
import { matchRatingRank } from '@/function/rank-matching-description'
import { CommonRule } from '@/pages/property/[id]'
import { JAVA_URL } from '@/settings/fe_config'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PropertyListingDetails() {
    const router = useRouter()
    const { id } = router.query
    const [reviewModal, setReviewModal] = useState<boolean>(false)
    const {isSuccess, data} = useQuery<unknown, Error, iListingDetails>({
        queryKey: ['propertyDetails', id],
    })
    const propertyRooms = useQuery<unknown, Error, Array<iRoom>>({queryKey: ['propertyRooms', id]})

    console.log(propertyRooms.data)
    const openRatingModal = () => {
        setReviewModal(true)
    }

    const toggleRatingModal = (state: boolean) => {
        setReviewModal(state)
    }

    useEffect(() => {
        if (reviewModal) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [reviewModal])

    return (
        <>
            <Head>
                <title>
                    {isSuccess
                        ? data.name
                        : 'Loading'}
                </title>
            </Head>
            <main className="lg:my-20 xs:my-10">
                {isSuccess && data && (
                    <div>
                        <div className="text-textUnfocus">
                            <span
                                className="hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    router.push('/owner/app/listings')
                                }}
                            >
                                Listings
                            </span>
                            <span>/</span>
                        </div>
                        <div className="flex lg:flex-row xs:flex-col lg:items-center justify-between sticky lg:top-[85px] xs:top-[100px] z-10 py-5 bg-white border-b border-borderDefault">
                            <div>
                                <h1 className="font-medium lg:text-3xl xs:text-2xl">
                                    {data.name}
                                </h1>
                                <div className="mt-2 xs:text-sm">
                                    {data.addressSpecific}{' '}
                                    {data.ward}{' '}
                                    {data.district}{' '}
                                    {data.province}
                                </div>
                            </div>
                            <div className="lg:mt-0 xs:mt-5">
                                <Button
                                    className="mr-2"
                                    intent={'secondary'}
                                    rounded={'regular'}
                                    onClick={() => openRatingModal()}
                                >
                                    View reviews
                                </Button>
                                <Button intent={'primary'} rounded={'regular'}>
                                    Edit listing details
                                </Button>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <ImageSection
                                smallImages={5}
                                name={data.name}
                                featured_picture={
                                    data.featured_picture
                                }
                                pictures={data.pictures}
                            />
                        </div>
                        <div className="mt-5 mb-10">
                            <div className="font-medium text-lg">
                                Description:
                            </div>
                            <p className="mt-1 border border-borderDefault p-3 rounded-lg">
                                {data.description}
                            </p>
                        </div>
                        {data.facilities.length > 0 && (
                            <div className="mt-10">
                                <div className="text-2xl font-medium">
                                    Facilities:
                                </div>
                                <div className="flex mt-5 lg:w-1/2 xs:w-full items-start flex-wrap">
                                    {data.facilities.map(
                                        (facility) => (
                                            <div
                                                key={facility.id}
                                                className="w-fit py-2 px-3 border border-borderDefault rounded-full mr-3 last:mr-0 text-lg xs:mt-3 hover:elevation-shadow-1 cursor-default"
                                            >
                                                {facility.name}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="my-10">
                            <div className="text-2xl font-medium mb-5">
                                Rooms:
                            </div>
                            <div className="grid xxl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1 gap-5">
                                {propertyRooms.isSuccess && propertyRooms.data.map(
                                    (room) => (
                                        <div
                                            key={room.id}
                                            className="rounded-xl border border-borderDefault p-5 hover:elevation-shadow-2 hover:cursor-pointer duration-200"
                                        >
                                            <div
                                                className={clsx(
                                                    'grid gap-5 justify-start',
                                                    'lg:grid-flow-col lg:grid-cols-none',
                                                    'xs:grid-cols-1'
                                                )}
                                            >
                                                <div>
                                                    <Image
                                                        src={`${JAVA_URL}/${room.picture}`}
                                                        alt={room.name}
                                                        width={50}
                                                        height={50}
                                                        className="lg:aspect-square xs:aspect-video rounded-md lg:w-[200px] xs:w-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-2xl font-medium">
                                                        {room.name}
                                                    </div>
                                                    <div className="border border-theme px-1.5 py-0.5 rounded-md text-sm mt-2 w-fit">
                                                        {room.type || 'Hotel'}
                                                    </div>
                                                    <ul className="xs:mt-3 lg:mt-auto grid grid-flow-row gap-2">
                                                        <li>
                                                            <span className="font-medium">
                                                                Price:
                                                            </span>{' '}
                                                            ${room.price}
                                                        </li>
                                                        <li>
                                                            <span className="font-medium">
                                                                Area:
                                                            </span>{' '}
                                                            {room.area}
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="font-medium">
                                                                Max guest:
                                                            </span>
                                                            &nbsp; x
                                                            {room.maxGuest}{' '}
                                                            <Person className="ml-1" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="font-medium">
                                                    Bedrooms:
                                                </div>
                                                <div className="flex mt-2">
                                                    {propertyRooms.isSuccess && room.bedrooms.map(
                                                        (bedroom, index) => (
                                                            <span
                                                                key={index}
                                                                className="mr-2 last:mr-0 border border-borderDefault rounded-md px-2 py-0.5"
                                                            >
                                                                x{bedroom.bedroomDetail.quantity}{' '}
                                                                {bedroom.bedroomDetail.bedType.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="font-medium">
                                                    Amentities:
                                                </div>
                                                <div className="flex mt-2 flex-wrap">
                                                    {room.amenities.map(
                                                        (amenity, index) => (
                                                            <span
                                                                key={index}
                                                                className="mr-2 last:mr-0 mt-2 border border-borderDefault rounded-md px-2 py-0.5"
                                                            >
                                                                {amenity.amenityCategory.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-medium mb-5">
                                House Rules:
                            </div>
                            <div className="flex flex-col p-5 border border-borderDefault rounded-xl">
                                <CommonRule
                                    title="Check in"
                                    content={data.propertyCommonRules.checkInTime?.slice(
                                        0,
                                        5
                                    )}
                                />
                                <CommonRule
                                    title="Check out"
                                    content={data.propertyCommonRules.checkOutTime?.slice(
                                        0,
                                        5
                                    )}
                                />
                                <CommonRule
                                    title="Cancel before hour"
                                    content={
                                        data
                                            .propertyCommonRules
                                            .cancelBeforeHour
                                    }
                                />
                                <CommonRule
                                    title="Quite time from"
                                    content={data.propertyCommonRules.quietTimeFrom?.slice(
                                        0,
                                        5
                                    )}
                                />
                                <CommonRule
                                    title="Quite time to"
                                    content={data.propertyCommonRules.quietTimeTo?.slice(
                                        0,
                                        5
                                    )}
                                />
                                <CommonRule
                                    title="Minium age"
                                    content={
                                        data
                                            .propertyCommonRules
                                            .miniumAllowedAge
                                            ? data.propertyCommonRules.miniumAllowedAge.toString() +
                                              ' years old.'
                                            : undefined
                                    }
                                />
                                <CommonRule
                                    title="Smooking"
                                    content={
                                        data
                                            .propertyCommonRules.smokingAllowed
                                            ? 'Smooking allowed in some area!'
                                            : 'Smooking is not allowed!'
                                    }
                                />
                                <CommonRule
                                    title="Pets"
                                    content={
                                        data
                                            .propertyCommonRules.petAllowed
                                            ? 'Pets is allowed!'
                                            : 'Pets is not allowed!'
                                    }
                                />
                                <CommonRule
                                    title="Party"
                                    content={
                                        data
                                            .propertyCommonRules.partyAllowed
                                            ? 'Party is allowed!'
                                            : 'Party is not allowed!'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}

                {reviewModal &&
                    createPortal(
                        <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000ab] z-20 flex items-start justify-center py-[10%]">
                            <div
                                className="absolute top-0 left-0 w-full h-full"
                                onClick={() => toggleRatingModal(false)}
                            />
                            <div className="w-[60%] bg-white h-auto rounded-xl p-5 z-10 overflow-auto">
                                <div className="relative border-b border-borderDefault px-5 py-2">
                                    <div
                                        className="absolute top-0 right-0 w-fit p-2 rounded-full hover:bg-slate-100 hover:cursor-pointer text-lg"
                                        onClick={() => {
                                            toggleRatingModal(false)
                                        }}
                                    >
                                        <Close />
                                    </div>
                                    <div className="text-2xl font-medium text-center mb-2">
                                        Guest reviews
                                    </div>
                                </div>
                                <div className="mt-5 px-5">
                                    {isSuccess && data.reviews.length > 0 && (
                                        <div className="">
                                            <div className="flex items-center">
                                                <div className="aspect-square rounded-full bg-theme text-white w-[100px] flex items-center justify-center text-2xl font-bold mr-10">
                                                    <div className="aspect-square flex items-center justify-center rounded-full w-[80px] border-4 border-white">
                                                        {data.avgRating.toFixed(
                                                            1
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="h-full">
                                                    <div className="text-3xl font-medium">
                                                        {matchRatingRank(
                                                            data.avgRating
                                                        )}
                                                    </div>
                                                    <div className="mt-5">
                                                        <span className="font-medium">
                                                            {
                                                                data.reviews
                                                                    .length
                                                            }
                                                        </span>
                                                        <span>
                                                            {' '}
                                                            verified guest
                                                            reviews
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 grid lg:grid-cols-2 xs:grid-cols-1 gap-5">
                                                {data.reviews.map(
                                                    (review) => (
                                                        <div
                                                            key={review.id}
                                                            className="p-5 border border-borderDefault rounded-xl hover:elevation-shadow-2 duration-200"
                                                        >
                                                            {/* <div className="text-sm text-textUnfocus mb-3">{comment.date}</div> */}
                                                            <div className="flex justify-between">
                                                                {/* <div className="font-medium">{comment.full_name}</div> */}
                                                                <div className="flex items-center">
                                                                    <StarRate />{' '}
                                                                    <span className="ml-2">
                                                                        {review.rating ===
                                                                        10
                                                                            ? review.rating.toFixed(
                                                                                  0
                                                                              )
                                                                            : review.rating.toFixed(
                                                                                  1
                                                                              )}{' '}
                                                                        / 10
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p className="mt-3">
                                                                {review.content}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-10 px-5 w-full">
                                    <Button
                                        intent={'secondary'}
                                        rounded={'regular'}
                                    >
                                        View more..
                                    </Button>
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}
            </main>
        </>
    )
}

PropertyListingDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <OwnerLayout>{page}</OwnerLayout>
        </>
    )
}
