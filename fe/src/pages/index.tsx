import DestinationCard from '@/components/card/destination-card'
import PropertyCard from '@/components/card/property-card'
import Carousel, { Slide } from '@/components/carousel/carousel'
import { GuestLayout } from '@/components/layout'
import Searchbar from '@/components/layout/searchbar/searchbar'
import HomeSection from '@/components/pages/home/home-section'
import HomeSectionTitle from '@/components/pages/home/home-section_title'

import clsx from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'

const destinationsStaticAssetsSources = '/images/destinations/'
const destinations = [
    {
        id: 1,
        name: 'Bali, Indonesia',
        image: destinationsStaticAssetsSources + 'bali-indo.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 2,
        name: 'Venice, Italy',
        image: destinationsStaticAssetsSources + 'venice-italy.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 3,
        name: 'Sydney, Australia',
        image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 4,
        name: 'New York, USA',
        image: destinationsStaticAssetsSources + 'newyork-usa.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 5,
        name: 'Tokyo, Japan',
        image: destinationsStaticAssetsSources + 'tokyo-japan.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 6,
        name: 'Paris, France',
        image: destinationsStaticAssetsSources + 'paris-france.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 7,
        name: 'Geneva, Switzerland',
        image: destinationsStaticAssetsSources + 'geneva-switzerland.jpg',
        to: '/search?destination=bali'
    },
    {
        id: 8,
        name: 'Da Nang, Vietnam',
        image: destinationsStaticAssetsSources + 'danang-vietnam.jpg',
        to: '/search?destination=bali'
    },
]

const properties = [
    {
        pid: 1,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.1,
        price: '$89',
    },
    {
        pid: 2,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.3,
        price: '$89',
    },
    {
        pid: 3,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.4,
        price: '$89',
    },
    {
        pid: 4,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.6,
        price: '$89',
    },
    {
        pid: 5,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.86,
        price: '$89',
    },
    {
        pid: 6,
        images: [
            {
                id: 1,
                name: 'Bali, Indonesia',
                image: destinationsStaticAssetsSources + 'bali-indo.jpg',
            },
            {
                id: 2,
                name: 'Venice, Italy',
                image: destinationsStaticAssetsSources + 'venice-italy.jpg',
            },
            {
                id: 3,
                name: 'Sydney, Australia',
                image: destinationsStaticAssetsSources + 'sydney-australia.jpg',
            },
        ],
        address: 'City, Country',
        name: 'Property name',
        rate: 9.5,
        price: '$89',
    },
]

const propertyTypes = [
    {
        id: 1,
        name: 'Bed n Breakfast',
    },
    {
        id: 2,
        name: 'Hotel',
    },
    {
        id: 3,
        name: 'Apartment',
    },
    {
        id: 4,
        name: 'Villa',
    },
    {
        id: 5,
        name: 'Resort',
    },
]

const cities = [
    {
        id: 1,
        name: 'Paris',
    },
    {
        id: 2,
        name: 'Tokyo',
    },
    {
        id: 3,
        name: 'New York',
    },
    {
        id: 4,
        name: 'Sydney',
    },
    {
        id: 5,
        name: 'Geneva',
    },
]

export default function Home() {
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
        propertyTypes[2].name
    )
    const [selectedCity, setSelectedCity] = useState<string>(cities[0].name)

    return (
        <>
            <Head>
                <title>Globalize - Home</title>
            </Head>
            <div className="relative">
                <div
                    className={clsx(
                        'lg:h-[700px] xs:h-[800px] text-white leading-[1.25]'
                    )}
                >
                    <div
                        className={clsx(
                            'pt-20 font-medium',
                            'lg:text-[90px]',
                            'md:text-[75px]',
                            'xs:text-[60px]'
                        )}
                    >
                        <div>Start exploring the world,</div>
                        <div className="scale-90 origin-left leading-[1.125]">
                            <mark className="bg-theme inline-block lg:pb-[50px] md:pb-[40px] xs:pb-[30px] leading-[0] text-white pr-2">
                                Today.
                            </mark>
                        </div>
                    </div>

                    <div className="relative lg:my-20 xs:my-10 w-full h-[1px] bg-[#ffffffcc]"></div>

                    <div className="relative w-full">
                        <div className="w-fit mx-auto">
                            <Searchbar />
                        </div>
                    </div>
                </div>

                <HomeSection>
                    <HomeSectionTitle
                        title="Feature destination"
                        description="These popular destinations have a lot to offer"
                    />
                    <Carousel
                        control={true}
                        options={{ loop: false, align: 'start' }}
                    >
                        {destinations.map((destination) => (
                            <Slide key={destination.id}>
                                <DestinationCard
                                    src={destination.image}
                                    label={destination.name}
                                    to={destination.to}
                                />
                            </Slide>
                        ))}
                    </Carousel>
                </HomeSection>

                <HomeSection>
                    <HomeSectionTitle
                        title="Home people love"
                        description="Property people love to stay in different categories"
                    />
                    <div
                        className={clsx(
                            'flex justify-start mb-8 overflow-auto'
                        )}
                    >
                        {propertyTypes.map((city) => (
                            <div
                                onClick={() =>
                                    setSelectedPropertyType(city.name)
                                }
                                key={city.name}
                                className={clsx(
                                    'mr-2 last:mr-0 px-3 py-1 rounded-full border whitespace-nowrap',
                                    'hover:cursor-pointer hover:border-borderHover',
                                    city.name === selectedPropertyType
                                        ? 'border-theme bg-theme text-white'
                                        : 'border-transparent'
                                )}
                            >
                                {city.name}
                            </div>
                        ))}
                    </div>

                    <Carousel
                        control={true}
                        options={{ loop: false, align: 'start' }}
                    >
                        {properties.map((property) => (
                            <Slide key={property.pid}>
                                <PropertyCard
                                    isFavorite={
                                        property.rate > 9.8 ? true : false
                                    }
                                    {...property}
                                />
                            </Slide>
                        ))}
                    </Carousel>
                </HomeSection>

                <HomeSection>
                    <HomeSectionTitle title="Traveling the most exiting cities" />

                    <div
                        className={clsx(
                            'flex justify-start mb-8 overflow-auto'
                        )}
                    >
                        {cities.map((city) => (
                            <div
                                onClick={() => setSelectedCity(city.name)}
                                key={city.name}
                                className={clsx(
                                    'mr-2 last:mr-0 px-3 py-1 rounded-full border whitespace-nowrap',
                                    'hover:cursor-pointer hover:border-borderHover',
                                    city.name === selectedCity
                                        ? 'border-theme bg-theme text-white'
                                        : 'border-transparent'
                                )}
                            >
                                {city.name}
                            </div>
                        ))}
                    </div>

                    <Carousel
                        control={true}
                        options={{ loop: false, align: 'start' }}
                    >
                        {properties.map((property) => (
                            <Slide key={property.pid}>
                                <PropertyCard
                                    isFavorite={
                                        property.rate >= 9.8 ? true : false
                                    }
                                    {...property}
                                />
                            </Slide>
                        ))}
                    </Carousel>
                </HomeSection>

                <HomeSection>
                    <div className="relative">
                        <div className="grid lg:grid-cols-[38.5%_61.5%] sm:grid-cols-1 gap-8">
                            <div
                                id={'discover-now'}
                                className="group relative xs:w-auto flex justify-center items-center rounded-2xl overflow-hidden lg:row-auto xs:row-[2/2] aspect-video"
                            >
                                <span className="duration-200 absolute top-0 left-0 w-full h-full group-hover:bg-[#00000083]" />
                                <span className="group-hover:opacity-100 opacity-0 text-white font-bold text-5xl z-[5]">
                                    Explore Now
                                </span>
                            </div>
                            <div className="lg:row-auto xs:row-[1/1]">
                                <HomeSectionTitle title="Leverage your experience with us" />
                                <ul className="text-lg list-item [&>li]:list-inside [&>li]:list-disc [&>li]:mt-3">
                                    <li>No hiddens fee.</li>
                                    <li>Secure & convenient payment.</li>
                                    <li>Wide range of choices.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </HomeSection>
            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
      <GuestLayout>
        {page}
      </GuestLayout>
    )
}
  
