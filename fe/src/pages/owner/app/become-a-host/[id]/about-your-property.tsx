import { ReactElement, useEffect, useRef, useState } from "react"
import { AddNewListingLayout } from ".."
import Head from "next/head"
import Button from "@/components/button/classic-button";
import { useRouter } from "next/router";
import useLocalAppStore from "@/services/zustand/store";
import { FormProvider, useForm } from "react-hook-form";
import { RHFInputField } from "@/components/form/input-field";
import { RHFTextAreaField } from "@/components/form/text_area-field";
import { ComboBox, IOption } from "@/components/form/combo-box";
import { listingProcessState } from "@/services/zustand/listing_process-slice";
import AddressSelector from "@/components/form/adddress";
interface Address {
    provinces: string;
    districts: string;
    wards: string;
}

interface IOptionProperty extends IOption {
    type: "multiple" | "single"
}

export const propertyTypeOptions : IOptionProperty[] = [
    {
        id: 1,
        value: 'Hotel',
        type: 'multiple'
    },
    {
        id: 2,
        value: 'Break n Breakfast',
        type: 'single'
    },
    {
        id: 3,
        value: 'Resort',
        type: 'multiple'
    },
    {
        id: 4,
        value: 'Apartment',
        type: 'single'
    },
    {
        id: 5,
        value: 'Villa',
        type: 'single'
    },

]

export default function AboutYourProperty () {
    const listingProcess = useLocalAppStore((state) => state.listingProcess);
    const setListingProcess = useLocalAppStore((state) => state.setListingProcess);
    const videoRef = useRef<HTMLVideoElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const { id } = router.query;
    const methods = useForm();
    const [address, setAddress] = useState<Address>({
        provinces: '',
        districts: '',
        wards: ''
    });
    const handeleGetLocation = (data: any) => {
        setAddress(data);
    }
    const processToNextStep = (data: listingProcessState) => {
        data.propertyLocation = address;
        setListingProcess({...listingProcess, ...data, id: id as string});
        router.push(`/owner/app/become-a-host/${id}/make-your-property-standout`);
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

    useEffect(() => {
        playVideo();
    },[])


    return (
        <>
        <Head>
            <title>About your property</title>
        </Head>
        {(listingProcess && Object.hasOwn(listingProcess, 'id') && listingProcess.id === id) &&
        <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(processToNextStep)}>
        <main>
            <div className="min-h-[calc(100vh_-_170px)] lg:pb-[85px] xs:pb-[100px] w-full grid lg:grid-cols-2 xs:grid-cols-1">
                <div className="py-10 lg:sticky xs:relative lg:top-[85px] h-fit">
                    <div>
                        <h1 className="text-2xl font-medium mb-3">Step 1</h1>
                        <h2 className="text-5xl font-medium">Tell us about your property</h2>
                    </div>
                    <div className="w-[80%] mx-auto mt-10">
                        <video ref={videoRef} muted autoPlay className="w-full"> 
                            <source src="/videos/about-your-place.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="rounded-xl">
                    <div
                    className="w-[90%] mx-auto py-10 grid grid-flow-row gap-5"
                    >
                        <h3 className="text-3xl font-medium mb-5">Describes your property</h3>

                        <RHFInputField
                        defaultValue={listingProcess.propertyName}
                        inputName="propertyName" label="Property Name" 
                        registerOptions={{
                            required: {value: true, message: "This field is required!"}
                        }}
                        />
                        <RHFTextAreaField
                        defaultValue={listingProcess.propertyDescription}
                        inputName="propertyDescription" label="Property Description" 
                        registerOptions={{
                            required: {value: true, message: "This field is required!"}
                        }}
                        />
                        <AddressSelector onLocations={handeleGetLocation} />
                        <RHFInputField
                        defaultValue={listingProcess.propertyAddress}
                        inputName="propertyAddress" label="Address" 
                        registerOptions={{
                            required: {value: true, message: "This field is required!"}
                        }}
                        />
                        <div className="h-[1px] w-full border-t border-borderDefault"></div>
                        <div className="w-full z-20">
                            <label htmlFor="propertyType" className="inline-block mb-1 text-textUnfocus">Property type <span className="text-theme">*</span></label>
                            <p className="text-textUnfocus text-sm mb-3">Choose the type of property you want to list</p>
                            <ComboBox width={"full"} name="propertyType" options={propertyTypeOptions} defaultValue={listingProcess.propertyType}
                            required={{value: true, message: "This field is required!"}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-screen lg:h-[85px] xs:h-[100px] bg-white flex items-center justify-end px-[5%] border-t border-borderDefault">
                <Button type="submit" intent={'primary'} rounded={'regular'}>Next Step</Button>
            </div>
        </main>
        </form>
        </FormProvider>
        }
        </>
    )
}

AboutYourProperty.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <AddNewListingLayout>
            {page}
        </AddNewListingLayout>
        </>
    )
}