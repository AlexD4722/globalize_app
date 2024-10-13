import Button from "@/components/button/classic-button";
import { ArrowUp, StarRate } from "@/components/svg";
import clsx from "clsx";
import ImageSection from "./introduce-section-images";
import { matchRatingRank } from "@/function/rank-matching-description";
import { JAVA_URL } from "@/settings/fe_config";


interface IntroduceSectionProps {
    id: string,
    name: string,
    featured_picture: string,
    pictures: Array<string>,
    description: string,
    address: string,
    city: string,
    district: string,
    ward: string,
    price: number,
    average_rating: number,
    total_reviews: number,
    facilities: {
        id: string
        name: string
        description: string
    }[]
}

export default function IntroduceSection ({...props} : IntroduceSectionProps) {
    
    const {name, featured_picture, facilities, pictures, description, address, city, district, ward, price, average_rating, total_reviews} = props;
    
    const scrollToAvailabilitySection = () => {
        document.getElementById("availability-section")?.scrollIntoView({behavior: "smooth", block: 'start'})
    }

    const scrollToFacilitySection = () => {
        document.getElementById("facility-section")?.scrollIntoView({behavior: "smooth", block: 'start'})
    }

    const scrollToReviewSection = () => {
        document.getElementById("review-section")?.scrollIntoView({behavior: "smooth", block: 'start'})
    }

    return (
        <>
        <div>
            <h1 className="font-medium text-4xl mb-10">{name}</h1>
            <div className={clsx(
                "flex",
                "xxl:flex-row xxl:items-stretch",
                "xs:flex-col"
            )}>
                {/** Left Section - Images */}
                <ImageSection featured_picture={featured_picture} pictures={pictures} name={name}/>

                {/** Right - Basic info */}
                <div className={clsx(
                    "flex flex-col p-5 border border-borderDefault rounded-2xl",
                    "xxl:w-[45%] xxl:ml-5 xxl:mt-0",
                    "xs:w-full xs:mt-5"
                )}>
                    <div className="flex h-fit items-end justify-between w-full">
                        <div>
                            <h3 className="text-sm text-textUnfocus">Price/room/night starts from</h3>
                            <h2 className="text-3xl font-medium mt-1">$USD {price}</h2>
                        </div>
                        <div>
                            <Button onClick={scrollToAvailabilitySection} rounded={"regular"} intent={"secondary"}>Reserve</Button>
                        </div>
                    </div>

                    <div className="xxl:mt-auto xxl:pt-5 xs:mt-10 xs:pt-0">
                        <div className="border border-borderDefault rounded-2xl px-5 py-4">
                            <div className="text-lg font-medium flex items-center">
                                <span className="flex items-center">
                                    <span className="mr-0.5 text-theme"><StarRate/></span>
                                    <span>{average_rating.toFixed(1)}</span>
                                </span>
                                <span className="ml-auto rotate-90" onClick={scrollToReviewSection}><ArrowUp/></span>
                            </div>
                            <div className="text-xl font-medium mb-1">{matchRatingRank(average_rating)}</div>
                            <div className="text-textUnfocus">from <span className="font-medium">{total_reviews}</span> verified guests reviews.</div>
                        </div>
                        <div className="border border-borderDefault rounded-2xl px-5 py-4 mt-5">
                            <div className="text-xl font-medium flex items-center mb-1">
                                <span>Location</span>
                                <span className="ml-auto rotate-90"><ArrowUp/></span>
                            </div>
                            <div>{address + ", " + ward + ", " + district + ", " + city + "." }</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <p className="text-xl">{description}</p>
            </div>

            <div className="mt-10">
                <div className="text-2xl font-medium">What this place offers:</div>
                <div className="flex mt-5 lg:w-1/2 xs:w-full items-start flex-wrap">
                    {facilities.map((facility) => (
                        <div key={facility.id} className="w-fit py-2 px-3 border border-borderDefault rounded-full mr-3 last:mr-0 text-lg xs:mt-3 hover:elevation-shadow-1 cursor-default">{facility.name}</div>
                    ))}
                </div>
                <div className="mt-5 text-textUnfocus text-lg" onClick={scrollToFacilitySection}>View all facilities...</div>
            </div>
        </div>
        </>
    )
}

