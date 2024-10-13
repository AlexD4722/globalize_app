import Button from '@/components/button/classic-button'
import { OwnerLayout } from '@/components/layout'
import { Close } from '@/components/svg'
import { iListing } from '@/components/type'
import { JAVA_URL } from '@/settings/fe_config'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function OwnerListings() {
    const router = useRouter()
    const [properties, setProperties] = useState<Array<iListing>>([])
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [propertyModal, setPropertyModal] = useState<iListing>()
    const [display, setDisplay] = useState<'list' | 'grid'>('grid')

    const propertiesQuery = useQuery<unknown, Error, Array<iListing>>({
        queryKey: ['ownerProperties'],
    })
    const disablePropertyMutation = useMutation<unknown, Error, string>({
        mutationKey: ['disableProperty'],
    })
    const enablePropertyMutation = useMutation<unknown, Error, string>({
        mutationKey: ['enableProperty'],
    })

    const toggleConfirmModal = (state: boolean, property?: iListing) => {
        setConfirmModal(state)
        property && setPropertyModal(property)
    }

    const navigate = (link: string) => {
        router.push(link)
    }

    const changeDisplay = () => {
        if (display === 'grid') {
            setDisplay('list')
        } else {
            setDisplay('grid')
        }
    }

    const toggleListing = (id: string, enable: boolean) => {
        if (!enable) disablePropertyMutation.mutate(id)
        else enablePropertyMutation.mutate(id)
        toggleConfirmModal(false)
    }

    useEffect(() => {
        if (confirmModal) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [confirmModal])

    return (
        <>
            <Head>
                <title>Listings</title>
            </Head>
            <main className="my-20">
                {properties && (
                    <>
                        <div className="flex lg:flex-row xs:flex-col justify-between mb-10">
                            <h1 className="lg:mb-10 xs:mb-5 font-medium text-4xl">
                                Your listing
                            </h1>
                            <div className="grid items-start grid-flow-col gap-3">
                                <Button
                                    intent={'secondary'}
                                    rounded={'regular'}
                                    onClick={changeDisplay}
                                >
                                    {display.charAt(0).toUpperCase() +
                                        display.slice(1)}
                                </Button>
                                <Button
                                    intent={'primary'}
                                    rounded={'regular'}
                                    onClick={() =>
                                        navigate('/owner/app/become-a-host')
                                    }
                                >
                                    Create new listing
                                </Button>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                display === 'list' && 'grid grid-cols-1 gap-5',
                                display === 'grid' &&
                                    'grid lg:grid-cols-3 xs:grid-cols-2 gap-5'
                            )}
                        >
                            {propertiesQuery.isSuccess &&
                                propertiesQuery.data.map((property, index) => (
                                    <div
                                        key={property.id}
                                        className={clsx(
                                            'rounded-xl border border-borderDefault p-5 grid gap-5 justify-start',
                                            display === 'list' &&
                                                'lg:grid-flow-col lg:grid-cols-none',
                                            'xs:grid-cols-1',
                                            'hover:elevation-shadow-2 duration-200'
                                        )}
                                    >
                                        <div>
                                            <Image
                                                src={`${JAVA_URL}/${property.picture}`}
                                                alt={property.name}
                                                width={50}
                                                height={50}
                                                className={clsx(
                                                    'rounded-md xs:w-full',
                                                    display === 'list' &&
                                                        'lg:aspect-square xs:aspect-video lg:w-[200px]',
                                                    display === 'grid' &&
                                                        'lg:aspect-video xs:aspect-square'
                                                )}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-2xl mb-2 font-medium">
                                                {property.name}
                                            </h3>
                                            <h4>{property.addressSpecific}</h4>
                                            <p>
                                                {property.status === 'DISABLED'
                                                    ? 'This property is disabled!'
                                                    : property.description}
                                            </p>

                                            <div className="xs:mt-5 xxl:mt-auto">
                                                <div
                                                    className={clsx(
                                                        'flex flex-wrap gap-2 pt-5',
                                                        'lg:flex-row',
                                                        'xs:flex-col'
                                                    )}
                                                >
                                                    <Button
                                                        intent={'primary'}
                                                        rounded={'regular'}
                                                        onClick={() => {
                                                            navigate(
                                                                `/owner/app/listings/${property.id}`
                                                            )
                                                        }}
                                                    >
                                                        Details
                                                    </Button>
                                                    <Button
                                                        intent={'secondary'}
                                                        rounded={'regular'}
                                                    >
                                                        {property.status}
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            toggleConfirmModal(
                                                                true,
                                                                property
                                                            )
                                                        }}
                                                        intent={'secondary'}
                                                        rounded={'regular'}
                                                    >
                                                        {property.status ===
                                                        'DISABLED'
                                                            ? 'Enable'
                                                            : 'Disable'}{' '}
                                                        listing
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {confirmModal &&
                            propertyModal &&
                            createPortal(
                                <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000ab] z-20 flex items-center justify-center">
                                    <div
                                        className="absolute top-0 left-0 w-full h-full"
                                        onClick={() =>
                                            toggleConfirmModal(false)
                                        }
                                    />
                                    <div className="w-fit bg-white h-auto rounded-xl p-5 z-10">
                                        <div
                                            className="w-fit ml-auto mb-5 p-2 rounded-full hover:bg-slate-100 hover:cursor-pointer text-lg"
                                            onClick={() => {
                                                toggleConfirmModal(false)
                                            }}
                                        >
                                            <Close />
                                        </div>
                                        <div className="text-2xl font-medium text-center mb-2">
                                            {propertyModal.status === 'DISABLED'
                                                ? 'Enable'
                                                : 'Disable'}{' '}
                                            this listing?
                                        </div>
                                        <p className="text-textUnfocus">
                                            This listing will{' '}
                                            {propertyModal.status === 'DISABLED'
                                                ? ''
                                                : 'not'}{' '}
                                            be showed to our customers.
                                        </p>
                                        <div className="flex flex-col items-center justify-center my-5">
                                            <div>
                                                <Image
                                                    src={`${JAVA_URL}/${propertyModal.picture}`}
                                                    alt={propertyModal.name}
                                                    width={50}
                                                    height={50}
                                                    className="aspect-square rounded-md w-[200px]"
                                                />
                                                <div className="mt-2 text-lg font-medium">
                                                    {propertyModal.name}
                                                </div>
                                                <div>
                                                    {
                                                        propertyModal.addressSpecific
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <Button
                                                className="mb-2"
                                                intent={'primary'}
                                                rounded={'regular'}
                                                onClick={() =>
                                                    toggleListing(
                                                        propertyModal.id,
                                                        propertyModal.status ===
                                                            'DISABLED'
                                                    )
                                                }
                                            >
                                                Yes,{' '}
                                                {propertyModal.status ===
                                                'DISABLED'
                                                    ? 'enable'
                                                    : 'disable'}
                                            </Button>
                                            <Button
                                                intent={'secondary'}
                                                rounded={'regular'}
                                                onClick={() =>
                                                    toggleConfirmModal(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>,
                                document.body
                            )}
                    </>
                )}
            </main>
        </>
    )
}

OwnerListings.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <OwnerLayout>{page}</OwnerLayout>
        </>
    )
}
