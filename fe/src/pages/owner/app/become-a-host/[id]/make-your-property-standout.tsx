import { ReactElement, useEffect, useRef, useState } from "react"
import { AddNewListingLayout } from ".."
import Head from "next/head"
import Button from "@/components/button/classic-button";
import { useRouter } from "next/router";
import useLocalAppStore from "@/services/zustand/store";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import RHFCustomCheckbox from "@/components/form/custom-checkbox";
import ImagesUpload, { ImageUpload } from "@/components/form/images-upload";
import { ErrorOutlineRounded } from "@/components/svg";

type iFacility = {
    label: string,
    value: string
}

const facilityOptions : iFacility[] = [
    { label: "Air conditioning", value: "Air Conditioning" },
    { label: "Non-smoking rooms", value: "Non-smoking rooms" },
    { label: "Family rooms", value: "Family rooms" },
    { label: "24-hour front desk", value: "24-hour front desk" },
    { label: "Room service", value: "Room service" },
    { label: "Pets allowed", value: "Pets allowed" },
    { label: "Free WiFi", value: "Free WiFi" },
    { label: "Parking", value: "Parking" },
    { label: "Heating", value: "Heating" },
]

export default function MakeYourPropertyStandOut () {

    const listingProcess = useLocalAppStore((state) => state.listingProcess);
    const setListingProcess = useLocalAppStore((state) => state.setListingProcess);
    const videoRef = useRef<HTMLVideoElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const { id } = router.query;
    const methods = useForm();
    const [images, setImages] = useState<Array<ImageUpload>>([]);
    const [coverImage, setCoverImage] = useState<ImageUpload>();

    const [facilityError, setFacilityError] = useState<string>("");
    const [imageError, setImageError] = useState<string>("");

    const { watch } = methods;

    const processToNextStep = (data: any) => {

        if((data["facility"] && data["facility"].length === 0) || !data["facility"]) {
            setFacilityError("Please select at least one facility");
        }
        if(images && images.length < 8) {
            setImageError("Please upload at least 8 images");
        }
        if(
            !((data["facility"] && data["facility"].length === 0) || !data["facility"]) &&
            !(images && images.length < 8)
        ){
            setListingProcess({...listingProcess, images: images, coverImage: coverImage, facilities: data["facility"]});
            router.push(`/owner/app/become-a-host/${id}/finish-up/rooms`);
        }
     
    }

    useEffect(() => {
        if(!listingProcess || listingProcess.id !== id){
            router.push(`/owner/app/become-a-host`);
        }
    },[listingProcess, router, id]);

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }

    const facility = watch('facility');

    useEffect(() => {
        setFacilityError("");
    },[facility])

    useEffect(() => {
        playVideo();
        if(listingProcess.images){
            setImages(listingProcess.images);
        }
        if(listingProcess.coverImage){
            setCoverImage(listingProcess.coverImage);
        }
    },[listingProcess])

    return (
        <>
        <Head>
            <title>Make your property stand out</title>
        </Head>
        {(listingProcess && Object.hasOwn(listingProcess, 'id') && listingProcess.id === id) &&
        <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(processToNextStep)}>
        <main>
            <div className="min-h-[calc(100vh_-_170px)] lg:pb-[85px] xs:pb-[100px] w-full grid lg:grid-cols-2 xs:grid-cols-1">
                <div className="py-10 lg:sticky xs:relative lg:top-[85px] h-fit">
                    <div>
                        <h1 className="text-2xl font-medium mb-3">Step 2</h1>
                        <h2 className="text-5xl font-medium">Make your property stand out</h2>
                    </div>
                    <div className="w-[80%] mx-auto mt-10">
                        <video ref={videoRef} muted autoPlay className="w-full"> 
                            <source src="/videos/standout.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="rounded-xl">
                    <div
                    className="w-[90%] mx-auto py-10 grid grid-flow-row gap-5"
                    >
                        <h3 className="text-3xl font-medium mb-5">Tell guests what your place has to offer</h3>

                        <ul>
                            <li>
                                <h4 className="text-2xl font-medium mb-5">1. What about your property&apos; facilities?</h4>
                                <h5></h5>
                                <div className="flex flex-wrap">
                                    {facilityOptions.map((facility, index) => (
                                    <RHFCustomCheckbox key={index} name={'facility'} label={facility.label} value={facility.value} checked={listingProcess.facilities ? listingProcess.facilities.includes(facility.value) : false}/>
                                    ))}
                                </div>
                            </li>
                        </ul>

                        {facilityError && 
                        <div className="mt-3 text-red-500 font-medium flex items-center border border-red-500 rounded-lg p-3 elevation-shadow-2">
                            <ErrorOutlineRounded className="mr-1"/>
                            <span>{facilityError}</span>
                        </div>
                        }

                        <div className="h-[1px] w-full border-t border-borderDefault my-10"/>

                        <ul>
                            <li>
                                <h4 className="text-2xl font-medium mb-3">2. Add some photos of your property</h4>
                                <h5 className="text-lg text-textUnfocus mb-5">You&apos;ll need 8 photos to get started. You can add more or make changes later.</h5>
                                {imageError && 
                                <div className="mt-3 text-red-500 font-medium flex items-center border border-red-500 rounded-lg p-3 mb-5 elevation-shadow-2">
                                    <ErrorOutlineRounded className="mr-1"/>
                                    <span>{imageError}</span>
                                </div>
                                }
                                <div>
                                    <ImagesUpload onChange={() => setImageError("")} images={images} setImages={setImages} coverImage={coverImage} setCoverImage={setCoverImage}/>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-screen lg:h-[85px] xs:h-[100px] bg-white flex items-center justify-between px-[5%] border-t border-borderDefault">
                <Button type="button" intent={'secondary'} rounded={'regular'} onClick={() => {router.back()}}>Back</Button>
                <Button type="submit" intent={'primary'} rounded={'regular'}>Next Step</Button>
            </div>
        </main>
        </form>
        </FormProvider>
        }
        </>
    )
}

MakeYourPropertyStandOut.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <AddNewListingLayout>
            {page}
        </AddNewListingLayout>
        </>
    )
}