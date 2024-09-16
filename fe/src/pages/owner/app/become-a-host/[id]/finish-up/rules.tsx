import Button from "@/components/button/classic-button";
import useLocalAppStore from "@/services/zustand/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef } from "react";
import { AddNewListingLayout } from "../..";
import TimeField from "@/components/form/time-field";
import { FormProvider, useForm } from "react-hook-form";
import { Minus, Plus } from "@/components/button/calculation-button";
import { ErrorOutlineRounded } from "@/components/svg";

export default function Rules () {

    const listingProcess = useLocalAppStore((state) => state.listingProcess);
    const setListingProcess = useLocalAppStore((state) => state.setListingProcess);

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { id } = router.query;

    const methods = useForm();
    const { register, getValues, setValue, reset, formState: {errors}, clearErrors } = methods;

    register("party", {required: { value: true, message: "Select an option!"}})
    register("pets", {required: { value: true, message: "Select an option!"}})
    register("smoking", {required: { value: true, message: "Select an option!"}})


    const onSubmit = (data: any) => {
        console.log(data);

        setListingProcess({...listingProcess, commonRules: {
            checkInTime: data["checkIn"],
            checkOutTime: data["checkOut"],
            cancelBeforeHour: data["hourCancel"],
            quietTimeFrom: data["quiteFrom"],
            quietTimeTo: data["quiteTo"],
            miniumAllowedAge: data["miniumAge"],
            partyAllowed: data["party"] === 'allowed' ? true : false,
            petAllowed: data["pets"] === 'allowed' ? true : false,
            smokingAllowed: data["smoking"] === 'allowed' ? true : false,
        }})
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

    useEffect(() => {
        console.log(listingProcess)
    },[listingProcess])
 
    return (
        <>
        <Head>
            <title>Finish up - Rules</title>
        </Head>
        {(listingProcess && Object.hasOwn(listingProcess, 'id') && listingProcess.id === id) &&
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <main>
                    <div className="min-h-[calc(100vh_-_170px)] lg:pb-[85px] xs:pb-[100px] w-full grid lg:grid-cols-2 xs:grid-cols-1">
                    <div className="py-10 lg:sticky lg:top-[85px] xs:relative h-fit">
                            <div>
                                <h1 className="text-2xl font-medium mb-3">Step 3</h1>
                                <h2 className="text-5xl font-medium">Finish Up</h2>
                            </div>
                            <div className="w-[80%] mx-auto mt-10">
                                <video ref={videoRef} muted autoPlay className="w-full"> 
                                    <source src="/videos/finish-up.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                        <div className="rounded-xl">
                            <div
                            className="w-[90%] mx-auto py-10 grid grid-flow-row gap-5"
                            >
                                <h3 className="text-2xl font-medium mb-5">3.2 Add house rules</h3>

                                <div className="h-[1px] w-full border-t border-borderDefault mb-10"/>

                                <div className="text-2xl font-medium">House rules:</div>
                                <div className="text-textUnfocus mb-10">Your house rules set expectations for guests and help them to decide whether your property is a good fit before they book.</div>
                                <div className="grid grid-cols-1 gap-8 border border-borderDefault p-5 rounded-lg">
                                    <div className="flex items-center">
                                        <TimeField
                                        className="mr-5"
                                        defaultValue={"07:00"}
                                        inputName="checkIn" label="Checkin time:" 
                                        registerOptions={{
                                            required: {value: true, message: "This field is required!"}
                                        }}/>
                                        <TimeField
                                        defaultValue={"23:00"}
                                        inputName="checkOut" label="Checkout time:" 
                                        registerOptions={{
                                            required: {value: true, message: "This field is required!"}
                                        }}/>
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div>
                                        <div className="text-lg text-textUnfocus mb-1">Cancel before hour:</div>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Minus type="button" onClick={() => {setValue("hourCancel", getValues("hourCancel") > 1 ? Number(getValues("hourCancel")) - 1 : Number(getValues("hourCancel")))}} />
                                                <div className="px-3 lg:text-2xl xs:text-base">
                                                    <input type="number" className="w-[3rem] focus:outline-0 text-center" 
                                                        {...register("hourCancel", {value: 1, validate: v => parseInt(v) > 0, 
                                                        onChange: () => {
                                                            if(getValues("hourCancel") > 999){
                                                                setValue("hourCancel", 999)
                                                            }
                                                        }})}/>
                                                    <span className="ml-1">Hour</span>
                                                </div>
                                            <Plus type="button" onClick={() => {setValue("hourCancel", Number(getValues("hourCancel")) + 1); clearErrors("hourCancel");}}/>
                                        </div>
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div className="flex items-center">
                                        <TimeField
                                        className="mr-5"
                                        defaultValue={"23:00"}
                                        inputName="quiteFrom" label="Quite time from:" 
                                        registerOptions={{
                                            required: {value: true, message: "This field is required!"}
                                        }}/>
                                        <TimeField
                                        defaultValue={"07:00"}
                                        inputName="quiteTo" label="Quite time to:" 
                                        registerOptions={{
                                            required: {value: true, message: "This field is required!"}
                                        }}/>
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div>
                                        <div className="text-lg text-textUnfocus mb-1">Minium allowed age:</div>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Minus type="button" onClick={() => {setValue("miniumAge", getValues("miniumAge") > 0 ? Number(getValues("miniumAge")) - 1 : Number(getValues("miniumAge")))}} />
                                                <div className="px-3 lg:text-2xl xs:text-base">
                                                    <input type="number" className="w-[3rem] focus:outline-0 text-center" 
                                                        {...register("miniumAge", {value: 1, validate: v => parseInt(v) >= 0, 
                                                        onChange: () => {
                                                            if(getValues("miniumAge") > 999){
                                                                setValue("miniumAge", 999)
                                                            }
                                                        }})}/>
                                                    <span className="ml-1">Years old</span>
                                                </div>
                                            <Plus type="button" onClick={() => {setValue("miniumAge", Number(getValues("miniumAge")) + 1); clearErrors("miniumAge");}}/>
                                        </div>
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div>
                                        <div className="text-lg text-textUnfocus mb-1">Party:</div>
                                        <div className="flex">
                                            <div className="mr-3">
                                                <input
                                                    {...register("party")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="allowed"
                                                    id="party-allowed"
                                                    />
                                                <label htmlFor="party-allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Allowed
                                                </label>
                                            </div>
                                                <div>
                                                <input
                                                    {...register("party")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="not-allowed"
                                                    id="party-not_allowed"
                                                />
                                                <label htmlFor="party-not_allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Not Allowed
                                                </label>
                                            </div>
                                        </div>
                                        {errors["party"] &&  <div className="text-red-500 pt-3 flex items-center"><ErrorOutlineRounded className="mr-1"/>{errors["party"].message as string}</div>}
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div>
                                        <div className="text-lg text-textUnfocus mb-1">Smoking:</div>
                                        <div className="flex">
                                            <div className="mr-3">
                                                <input
                                                    {...register("smoking")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="allowed"
                                                    id="smoking-allowed"
                                                    />
                                                <label htmlFor="smoking-allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Allowed
                                                </label>
                                            </div>
                                                <div>
                                                <input
                                                    {...register("smoking")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="not-allowed"
                                                    id="smoking-not_allowed"
                                                />
                                                <label htmlFor="smoking-not_allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Not Allowed
                                                </label>
                                            </div>
                                        </div>
                                        {errors["smoking"] &&  <div className="text-red-500 pt-3 flex items-center"><ErrorOutlineRounded className="mr-1"/>{errors["smoking"].message as string}</div>}
                                    </div>
                                    <div className="h-[1px] w-full border-t border-borderDefault"/>
                                    <div>
                                        <div className="text-lg text-textUnfocus mb-1">Pets:</div>
                                        <div className="flex">
                                            <div className="mr-3">
                                                <input
                                                    {...register("pets")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="allowed"
                                                    id="pets-allowed"
                                                    />
                                                <label htmlFor="pets-allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Allowed
                                                </label>
                                            </div>
                                                <div>
                                                <input
                                                    {...register("pets")}
                                                    className="peer hidden"
                                                    type="radio"
                                                    value="not-allowed"
                                                    id="pets-not_allowed"
                                                />
                                                <label htmlFor="pets-not_allowed" className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer">
                                                    Not Allowed
                                                </label>
                                            </div>
                                        </div>
                                        {errors["pets"] &&  <div className="text-red-500 pt-3 flex items-center"><ErrorOutlineRounded className="mr-1"/>{errors["pets"].message as string}</div>}
                                    </div>
                                </div>

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




Rules.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <AddNewListingLayout>
            {page}
        </AddNewListingLayout>
        </>
    )
}