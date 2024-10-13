import Button from "@/components/button/classic-button";
import useLocalAppStore from "@/services/zustand/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import { AddNewListingLayout } from "../..";
import TimeField from "@/components/form/time-field";
import { FormProvider, useForm } from "react-hook-form";
import { Minus, Plus } from "@/components/button/calculation-button";
import { ErrorOutlineRounded } from "@/components/svg";
import { iFacility } from "@/components/type";
import { ImageUpload } from "@/components/form/images-upload";
import { useMutation } from "@tanstack/react-query";
import { Range, getTrackBackground } from "react-range";
import { Spinner } from "@/components/ui/spinner";
export default function Rules() {
  const listingProcess = useLocalAppStore((state) => state.listingProcess);
  const setListingProcess = useLocalAppStore(
    (state) => state.setListingProcess
  );
  const [valuesRange, setValuesRange] = useState([25]);
  const upload = useMutation<any, Error, FormData>({
    mutationKey: ["properties"],
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const methods = useForm();
  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = methods;

  register("party", {
    required: { value: true, message: "Select an option!" },
  });
  register("pets", {
    required: { value: true, message: "Select an option!" },
  });
  register("smoking", {
    required: { value: true, message: "Select an option!" },
  });

  const onSubmit = (data: any) => {
    setListingProcess({
      ...listingProcess,
      commonRules: {
        checkInTime: data["checkIn"],
        checkOutTime: data["checkOut"],
        cancelBeforeDay: data["hourCancel"],
        quietTimeFrom: data["quiteFrom"],
        quietTimeTo: data["quiteTo"],
        miniumAllowedAge: data["miniumAge"],
        partyAllowed: data["party"] === "allowed" ? true : false,
        petAllowed: data["pets"] === "allowed" ? true : false,
        smokingAllowed: data["smoking"] === "allowed" ? true : false,
      },
      refundPercentage: valuesRange[0],
    });
    let facilities: iFacility[] = [];
    listingProcess.facilities?.forEach((facility) =>
      facilities.push({ name: facility })
    );
    let requestBody = {
      facilities,
      commonRules: {
        checkInTime: data["checkIn"],
        checkOutTime: data["checkOut"],
        quietTimeFrom: data["quiteFrom"],
        quietTimeTo: data["quiteTo"],
        minimumAllowedAge: data["miniumAge"],
        partyAllowed: data["party"] === "allowed" ? true : false,
        petAllowed: data["pets"] === "allowed" ? true : false,
        smokingAllowed: data["smoking"] === "allowed" ? true : false,
      },
      refundAllowedDays: data["hourCancel"],
      coverImage: listingProcess.coverImage!.image,
      images: listingProcess.images!.map((image) => image.image),
      address: listingProcess.propertyAddress!,
      description: listingProcess.propertyDescription!,
      name: listingProcess.propertyName!,
      type: listingProcess.propertyType!,
      rooms: listingProcess.rooms!.map(({ id, ...rest }) => rest),
      propertyLocation: listingProcess.propertyLocation!,
      refundPercentage: listingProcess.refundPercentage
        ? listingProcess.refundPercentage
        : 25,
    };
    let formData = new FormData();
    formData.append("facilities", JSON.stringify(requestBody.facilities));
    formData.append("commonRules", JSON.stringify(requestBody.commonRules));
    formData.append("address", requestBody.address);
    formData.append("description", requestBody.description);
    formData.append("name", requestBody.name);
    formData.append("type", requestBody.type);
    formData.append("rooms", JSON.stringify(requestBody.rooms));
    formData.append("coverImage", requestBody.coverImage);
    formData.append(
      "refundPercentage",
      JSON.stringify(requestBody.refundPercentage)
    );
    formData.append("refundAllowedDays", requestBody.refundAllowedDays);
    formData.append("wardCode", requestBody.propertyLocation.wards);
    requestBody.images.forEach((image) => formData.append("images", image));
    upload.mutate(formData);
  };

  useEffect(() => {
    if (upload.isSuccess) router.push("/owner/app/listings");
  }, [upload.isSuccess]);

  useEffect(() => {
    if (!listingProcess || listingProcess.id !== id) {
      router.push(`/owner/app/become-a-host`);
    }
  }, [listingProcess, router, id]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    playVideo();
  }, []);

  return (
    <div>
      <Head>
        <title>Finish up - Rules</title>
      </Head>
      {listingProcess &&
        Object.hasOwn(listingProcess, "id") &&
        listingProcess.id === id && (
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
                        <source src="/videos/finish-up.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="rounded-xl">
                    <div className="w-[90%] mx-auto py-10 grid grid-flow-row gap-5">
                      <h3 className="text-2xl font-medium mb-5">
                        3.2 Add house rules
                      </h3>

                      <div className="h-[1px] w-full border-t border-borderDefault mb-10" />

                      <div className="text-2xl font-medium">House rules:</div>
                      <div className="text-textUnfocus mb-10">
                        Your house rules set expectations for guests and help
                        them to decide whether your property is a good fit
                        before they book.
                      </div>
                      <div className="grid grid-cols-1 gap-8 border border-borderDefault p-5 rounded-lg">
                        <div className="flex items-center">
                          <TimeField
                            className="mr-5"
                            defaultValue={"07:00"}
                            inputName="checkIn"
                            label="Checkin time:"
                            registerOptions={{
                              required: {
                                value: true,
                                message: "This field is required!",
                              },
                            }}
                          />
                          <TimeField
                            defaultValue={"23:00"}
                            inputName="checkOut"
                            label="Checkout time:"
                            registerOptions={{
                              required: {
                                value: true,
                                message: "This field is required!",
                              },
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-lg text-textUnfocus mb-1">
                            Refund percentage:
                          </div>
                          <Range
                            step={1}
                            min={25}
                            max={100}
                            values={valuesRange}
                            onChange={(values) => {
                              setValuesRange(values);
                              setListingProcess({
                                ...listingProcess,
                                refundPercentage: values[0],
                              });
                            }}
                            renderTrack={({ props, children }) => (
                              <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                  ...props.style,
                                  height: "36px",
                                  display: "flex",
                                  width: "100%",
                                }}
                              >
                                <div
                                  ref={props.ref}
                                  style={{
                                    height: "3px",
                                    width: "60%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                      values: valuesRange,
                                      colors: ["#F43F5E", "#7B7B7B", "#ccc"],
                                      min: 25,
                                      max: 100,
                                    }),
                                    alignSelf: "center",
                                  }}
                                >
                                  {children}
                                </div>
                              </div>
                            )}
                            renderThumb={({ props }) => (
                              <div
                                {...props}
                                key={props.key}
                                style={{
                                  ...props.style,
                                  height: "20px",
                                  width: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "#F43F5E",
                                }}
                              />
                            )}
                          />
                          <span className="font-medium">{valuesRange}%</span>
                        </div>

                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div>
                          <div className="text-lg text-textUnfocus mb-1">
                            Refund before days:
                          </div>
                          <div className="flex items-center gap-2 font-medium">
                            <Minus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "hourCancel",
                                  getValues("hourCancel") > 1
                                    ? Number(getValues("hourCancel")) - 1
                                    : Number(getValues("hourCancel"))
                                );
                              }}
                            />
                            <div className="px-3 lg:text-2xl xs:text-base">
                              <input
                                type="number"
                                className="w-[3rem] focus:outline-0 text-center"
                                {...register("hourCancel", {
                                  value: 1,
                                  validate: (v) => parseInt(v) > 0,
                                  onChange: () => {
                                    if (getValues("hourCancel") > 999) {
                                      setValue("hourCancel", 999);
                                    }
                                  },
                                })}
                              />
                              <span className="ml-1">
                                {getValues("hourCancel") > 1 ? "Days" : "Day"}
                              </span>
                            </div>
                            <Plus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "hourCancel",
                                  Number(getValues("hourCancel")) + 1
                                );
                                clearErrors("hourCancel");
                              }}
                            />
                          </div>
                        </div>
                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div className="flex items-center">
                          <TimeField
                            className="mr-5"
                            defaultValue={"23:00"}
                            inputName="quiteFrom"
                            label="Quite time from:"
                            registerOptions={{
                              required: {
                                value: true,
                                message: "This field is required!",
                              },
                            }}
                          />
                          <TimeField
                            defaultValue={"07:00"}
                            inputName="quiteTo"
                            label="Quite time to:"
                            registerOptions={{
                              required: {
                                value: true,
                                message: "This field is required!",
                              },
                            }}
                          />
                        </div>
                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div>
                          <div className="text-lg text-textUnfocus mb-1">
                            Minimum allowed age:
                          </div>
                          <div className="flex items-center gap-2 font-medium">
                            <Minus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "miniumAge",
                                  getValues("miniumAge") > 0
                                    ? Number(getValues("miniumAge")) - 1
                                    : Number(getValues("miniumAge"))
                                );
                              }}
                            />
                            <div className="px-3 lg:text-2xl xs:text-base">
                              <input
                                type="number"
                                className="w-[3rem] focus:outline-0 text-center"
                                {...register("miniumAge", {
                                  value: 1,
                                  validate: (v) => parseInt(v) >= 0,
                                  onChange: () => {
                                    if (getValues("miniumAge") > 999) {
                                      setValue("miniumAge", 999);
                                    }
                                  },
                                })}
                              />
                            </div>
                            <Plus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "miniumAge",
                                  Number(getValues("miniumAge")) + 1
                                );
                                clearErrors("miniumAge");
                              }}
                            />
                          </div>
                        </div>
                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div>
                          <div className="text-lg text-textUnfocus mb-1">
                            Party:
                          </div>
                          <div className="flex">
                            <div className="mr-3">
                              <input
                                {...register("party")}
                                className="peer hidden"
                                type="radio"
                                value="allowed"
                                id="party-allowed"
                              />
                              <label
                                htmlFor="party-allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
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
                              <label
                                htmlFor="party-not_allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
                                Not Allowed
                              </label>
                            </div>
                          </div>
                          {errors["party"] && (
                            <div className="text-red-500 pt-3 flex items-center">
                              <ErrorOutlineRounded className="mr-1" />
                              {errors["party"].message as string}
                            </div>
                          )}
                        </div>
                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div>
                          <div className="text-lg text-textUnfocus mb-1">
                            Smoking:
                          </div>
                          <div className="flex">
                            <div className="mr-3">
                              <input
                                {...register("smoking")}
                                className="peer hidden"
                                type="radio"
                                value="allowed"
                                id="smoking-allowed"
                              />
                              <label
                                htmlFor="smoking-allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
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
                              <label
                                htmlFor="smoking-not_allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
                                Not Allowed
                              </label>
                            </div>
                          </div>
                          {errors["smoking"] && (
                            <div className="text-red-500 pt-3 flex items-center">
                              <ErrorOutlineRounded className="mr-1" />
                              {errors["smoking"].message as string}
                            </div>
                          )}
                        </div>
                        <div className="h-[1px] w-full border-t border-borderDefault" />
                        <div>
                          <div className="text-lg text-textUnfocus mb-1">
                            Pets:
                          </div>
                          <div className="flex">
                            <div className="mr-3">
                              <input
                                {...register("pets")}
                                className="peer hidden"
                                type="radio"
                                value="allowed"
                                id="pets-allowed"
                              />
                              <label
                                htmlFor="pets-allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
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
                              <label
                                htmlFor="pets-not_allowed"
                                className="inline-block border-2 border-borderDefault rounded-lg px-3 py-2 peer-checked:border-theme hover:cursor-pointer"
                              >
                                Not Allowed
                              </label>
                            </div>
                          </div>
                          {errors["pets"] && (
                            <div className="text-red-500 pt-3 flex items-center">
                              <ErrorOutlineRounded className="mr-1" />
                              {errors["pets"].message as string}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 w-screen lg:h-[85px] xs:h-[100px] bg-white flex items-center justify-between px-[5%] border-t border-borderDefault">
                  <Button
                    type="button"
                    intent={"secondary"}
                    rounded={"regular"}
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Back
                  </Button>
                  <Button type="submit" intent={"primary"} rounded={"regular"} disabled={upload.isPending}>
                    {upload.isPending ? (
                      <div className="flex items-center">
                        <Spinner className="w-5 h-5 text-[#ffffff] mr-2" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </div>
              </main>
            </form>
          </FormProvider>
        )}
    </div>
  );
}

Rules.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <AddNewListingLayout>{page}</AddNewListingLayout>
    </>
  );
};
