import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Head from "next/head";
import Button from "@/components/button/classic-button";
import { useRouter } from "next/router";
import useLocalAppStore from "@/services/zustand/store";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { listingProcessState } from "@/services/zustand/listing_process-slice";
import { RHFInputField } from "@/components/form/input-field";
import { iBedroom, iRoom } from "@/components/type";
import { RHFTextAreaField } from "@/components/form/text_area-field";
import { Minus, Plus } from "@/components/button/calculation-button";
import { ComboBox, IOption } from "@/components/form/combo-box";
import { ErrorOutlineRounded, Person, ThreeDotsFill } from "@/components/svg";
import clsx from "clsx";
import { AddNewListingLayout } from "../..";
import { propertyTypeOptions } from "../about-your-property";
import ImagesUpload, { ImageUpload } from "@/components/form/images-upload";
import AddImage from "@/components/form/inputAddImage";
import { set } from "date-fns";
import { Store } from "react-notifications-component";

const checkListingType = (type: string): string => {
  let x = "";

  propertyTypeOptions.forEach((element) => {
    if (element.value === type) {
      x = element.type;
      return;
    }
  });

  return x;
};

const generateUniqueId = (): number => {
  return Math.floor(Math.random() + Date.now());
};

const bedTypes: IOption[] = [
  { id: 1, value: "Single Bed" },
  { id: 2, value: "Double Bed" },
  { id: 3, value: "Queen Bed" },
];

type FinshUpContextState = {
  rooms: iRoom[];
  setRooms: Dispatch<SetStateAction<iRoom[]>>;
  currentBedrooms: iBedroom[];
  setCurrentBedrooms: Dispatch<SetStateAction<iBedroom[]>>;
  indirectSubmitRef: React.RefObject<HTMLButtonElement>;
  processToNextStep: () => void;
};

export const FinshUpContext = createContext<FinshUpContextState | null>(null);

export default function FinishUp() {
  const listingProcess = useLocalAppStore((state) => state.listingProcess);
  const finshUpContext = useContext(FinshUpContext)!;
  const setListingProcess = useLocalAppStore(
    (state) => state.setListingProcess
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const [rooms, setRooms] = useState<iRoom[]>([]);
  const [currentBedrooms, setCurrentBedrooms] = useState<iBedroom[]>([]);

  const indirectSubmitRef = useRef<HTMLButtonElement>(null);

  const processToNextStep = () => {
    setListingProcess({ ...listingProcess, rooms: rooms, id: id as string });
    router.push(`/owner/app/become-a-host/${id}/finish-up/rules`);
  };

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
    <>
      <Head>
        <title>Finish up - Stay Info</title>
      </Head>
      {listingProcess &&
        Object.hasOwn(listingProcess, "id") &&
        listingProcess.id === id && (
          <FinshUpContext.Provider
            value={{
              rooms,
              setRooms,
              currentBedrooms,
              setCurrentBedrooms,
              indirectSubmitRef,
              processToNextStep,
            }}
          >
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
                      3.1 Add details, set up pricing
                    </h3>

                    <div className="h-[1px] w-full border-t border-borderDefault mb-10" />

                    <div>
                      <div className="text-2xl">
                        Your property type is{" "}
                        <span className="font-medium">
                          {listingProcess.propertyType!}
                        </span>
                      </div>
                      <RoomMultiple />
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
                <Button
                  type="button"
                  intent={"primary"}
                  rounded={"regular"}
                  onClick={() => {
                    if (rooms && rooms.length > 0) {
                      indirectSubmitRef.current?.click();
                    } else {
                      Store.addNotification({
                        title: "Error!",
                        message: "Please add atleast 1 room for your property.",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true,
                        },
                      });
                    }
                  }}
                >
                  Next Step
                </Button>
              </div>
            </main>
          </FinshUpContext.Provider>
        )}
    </>
  );
}

type RoomMultipleContextState = {
  addRoomModal: boolean;
  setAddRoomModal: Dispatch<SetStateAction<boolean>>;
  removeRoom: (id: string) => void;
  addNewRoom: (room: iRoom) => void;
};

export const RoomMultipleContext =
  createContext<RoomMultipleContextState | null>(null);

const RoomMultiple = () => {
  const { rooms, setRooms, indirectSubmitRef, processToNextStep } =
    useContext(FinshUpContext)!;
  const router = useRouter();
  const { id } = router.query;

  const [addRoomModal, setAddRoomModal] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const listingProcess = useLocalAppStore((state) => state.listingProcess);

  const removeRoom = useCallback(
    (id: string) => {
      setRooms(rooms.filter((room) => room.id !== id));
    },
    [rooms, setRooms]
  );

  const addNewRoom = useCallback(
    (room: iRoom) => {
      setRooms([...rooms, room]);
    },
    [rooms, setRooms]
  );

  useEffect(() => {
    if (isFirstTime) {
      if (!listingProcess.rooms && rooms.length === 0) {
        // addNewRoom({
        //   id: String(generateUniqueId()),
        //   type: "",
        //   picture: "",
        //   name: "Default Room",
        //   description: "The most basic room",
        //   price: 200,
        //   maxGuest: 2,
        //   area: String(50),
        //   bedrooms: [
        //     {
        //       bedroomDetail: {
        //         bedType: {
        //           name: "Double Bed",
        //           description: "Bed for 2 people",
        //         },
        //         quantity: 1,
        //       },
        //     },
        //   ],
        //   amenities: [],
        // });
      }
      if (listingProcess.rooms && listingProcess.rooms.length > 0) {
        setRooms(listingProcess.rooms);
      }
      setIsFirstTime(false);
    }
  }, [isFirstTime]);

  return (
    <RoomMultipleContext.Provider
      value={{
        addRoomModal,
        setAddRoomModal,
        removeRoom,
        addNewRoom,
      }}
    >
      <div className="mt-2">
        <div className="text-textUnfocus mb-10">
          You can add different room options with different prices
        </div>
        <div>
          <div className="text-2xl font-medium">Room options:</div>
          {rooms.map((room, index) => (
            <RoomMultipleDetails index={index + 1} key={room.id} room={room} />
          ))}
          {addRoomModal ? (
            <RoomMultipleCreateNew />
          ) : (
            <Button
              className="mt-5"
              type="button"
              intent={"primary"}
              rounded={"regular"}
              onClick={() => setAddRoomModal(true)}
            >
              Add more room
            </Button>
          )}
        </div>
        <button
          ref={indirectSubmitRef}
          className="hidden"
          onClick={() => {
            processToNextStep();
          }}
        >
          Process
        </button>
      </div>
    </RoomMultipleContext.Provider>
  );
};

const RoomMultipleCreateNew = () => {
  const methods = useForm();
  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = methods;

  const { rooms, setRooms, currentBedrooms, setCurrentBedrooms } =
    useContext(FinshUpContext)!;
  const { setAddRoomModal, addNewRoom } = useContext(RoomMultipleContext)!;

  const formRef = useRef<HTMLFormElement>(null);

  const [bedroomError, setBedroomError] = useState<string | undefined>();
  const [bedRoomModal, setBedRoomModal] = useState<boolean>();
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageError(null);
    } else {
      setImageError("Please select an image.");
    }
  };
  const [imageError, setImageError] = useState<string | null>(null);
  const setDefaultBedChoice = useCallback(() => {
    setCurrentBedrooms([
      {
        id: generateUniqueId(),
        bedroomDetail: {
          bedType: {
            name: "Single Bed",
            description: "Bed for 1 people",
          },
          quantity: 1,
        },
      },
    ]);
  }, [setCurrentBedrooms]);
  const handellUploadFile = (file: File) => {
    setImage(file);
    console.log("Image:", file);
  };
  const resetRoomFormValue = () => {
    reset();
    setDefaultBedChoice();
  };

  const resetBedroomFormValue = () => {
    setValue("bedType", "");
    setValue("bedAmount", 0);
  };

  const onCreateNewRoow = (data: any) => {
    if (!image) {
      Store.addNotification({
        title: "Error!",
        message: "Please upload an image for room.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } else {
      if (currentBedrooms.length > 0) {
        addNewRoom({
          id: String(generateUniqueId()),
          type: "",
          picture: { image: image, url: URL.createObjectURL(image) },
          name: data["roomName"],
          description: data["roomDesc"],
          price: data["price"],
          maxGuest: data["maxGuest"],
          area: String(data["area"]),
          bedrooms: currentBedrooms,
          amenities: [],
        });
        setAddRoomModal(false);
        resetRoomFormValue();
        setImage(null);
      }
    }
  };

  const updateBedroom = (id: number, newBedroomValue: iBedroom) => {
    setCurrentBedrooms(
      currentBedrooms.map((bedroom) => {
        if (bedroom.id === id) {
          return newBedroomValue;
        } else {
          return bedroom;
        }
      })
    );
  };

  const addNewBedroom = () => {
    const bedType = getValues("bedType");
    const bedAmount = getValues("bedAmount");

    if (bedType === "") {
      setBedroomError("Fill the information!");
    } else if (bedAmount === 0) {
      setBedroomError("Bed amount must bigger than 0.");
    } else {
      setCurrentBedrooms([
        ...currentBedrooms,
        {
          id: generateUniqueId(),
          bedroomDetail: {
            bedType: {
              name: bedType,
              description: "",
            },
            quantity: bedAmount,
          },
        },
      ]);
      setBedRoomModal(false);
      resetBedroomFormValue();
    }
  };

  const removeBedroom = (id: number) => {
    setCurrentBedrooms(currentBedrooms.filter((bedroom) => bedroom.id !== id));
  };

  useEffect(() => {
    setDefaultBedChoice();
  }, [setDefaultBedChoice]);

  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form
            ref={formRef}
            onSubmit={methods.handleSubmit(onCreateNewRoow)}
            className="p-5 border border-borderDefault rounded-xl mt-5 hover:elevation-shadow-2"
          >
            <div>
              <h1 className="text-base font-bold mb-5">
                Room #{rooms.length + 1}
              </h1>
              <div className="grid grid-cols-1 gap-5">
                <RHFInputField
                  inputName="roomName"
                  label="Room Name"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
                <RHFTextAreaField
                  inputName="roomDesc"
                  label="Room Description"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
                <div>
                  <ul>
                    <li>
                      {imageError && (
                        <div className="mt-3 text-red-500 font-medium flex items-center border border-red-500 rounded-lg p-3 mb-5 elevation-shadow-2">
                          <ErrorOutlineRounded className="mr-1" />
                          <span>{imageError}</span>
                        </div>
                      )}
                      <AddImage setPicture={handellUploadFile} />
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="text-lg text-textUnfocus mb-1">
                    Room Area:
                  </div>
                  <div className="flex items-center gap-2 text-4xl">
                    <span className="flex font-medium">
                      <span className="relative mr-1">&#13217;</span>
                      <input
                        type="number"
                        className="min-w-[2rem] focus:outline-0"
                        {...register("area", {
                          value: 30,
                          onBlur: () => {
                            if (getValues("area") === "") {
                              setValue("area", 0);
                            }
                          },
                          onChange: () => {
                            setValue("area", parseFloat(getValues("area")));
                            clearErrors("area");
                          },
                          validate: (v) => parseInt(v) > 0,
                        })}
                      />
                    </span>
                  </div>
                  {errors["area"] && (
                    <div className="text-red-500 pt-3 flex items-center">
                      <ErrorOutlineRounded className="mr-1" />
                      Room area must be a valid number!
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-lg text-textUnfocus mb-1">Price:</div>
                  <div className="flex items-center gap-2 text-4xl">
                    <span className="flex font-medium">
                      <span className="mr-1">$</span>
                      <input
                        type="number"
                        className="min-w-[2rem] focus:outline-0"
                        {...register("price", {
                          value: 10,
                          onBlur: () => {
                            if (getValues("price") === "") {
                              setValue("price", 0);
                            }
                          },
                          onChange: () => {
                            setValue("price", parseFloat(getValues("price")));
                            clearErrors("price");
                          },
                          validate: (v) => parseInt(v) > 0,
                        })}
                      />
                    </span>
                  </div>
                  {errors["price"] && (
                    <div className="text-red-500 pt-3 flex items-center">
                      <ErrorOutlineRounded className="mr-1" />
                      Price must be a valid number!
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-lg text-textUnfocus mb-1">
                    Max Guest:
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-medium">
                    <Minus
                      type="button"
                      onClick={() => {
                        setValue(
                          "maxGuest",
                          getValues("maxGuest") > 1
                            ? Number(getValues("maxGuest")) - 1
                            : Number(getValues("maxGuest"))
                        );
                      }}
                    />
                    <input
                      type="number"
                      className="w-[3rem] focus:outline-0 text-center"
                      {...register("maxGuest", {
                        value: 1,
                        validate: (v) => parseInt(v) > 0,
                        onChange: () => clearErrors("maxGuest"),
                      })}
                    />
                    <Plus
                      type="button"
                      onClick={() => {
                        setValue("maxGuest", Number(getValues("maxGuest")) + 1);
                        clearErrors("maxGuest");
                      }}
                    />
                  </div>
                  {errors["maxGuest"] && (
                    <div className="text-red-500 pt-3 flex items-center">
                      <ErrorOutlineRounded className="mr-1" />
                      Max guest allowed must be atleast 1!
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-lg text-textUnfocus mb-1">Beds:</div>
                  {currentBedrooms.length > 0 &&
                    currentBedrooms.map((bedroom, index) => (
                      <Bedroom
                        type="single"
                        index={index + 1}
                        removeBedroom={removeBedroom}
                        updateBedroom={updateBedroom}
                        key={bedroom.id}
                        bedroom={bedroom}
                      />
                    ))}
                  {currentBedrooms.length === 0 && (
                    <div className="text-red-500 py-3 flex items-center">
                      <ErrorOutlineRounded className="mr-1" />
                      Your room must have atleast 1 type of bed for guest.
                    </div>
                  )}
                  {bedRoomModal ? (
                    <div className="p-5 border border-theme elevation-shadow-2 rounded-lg my-2">
                      <div
                        className={clsx("text-base font-medium mb-2", "hidden")}
                      >
                        Bedroom #{currentBedrooms.length + 1}
                      </div>
                      <section className="grid grid-cols-2 gap-5">
                        <div>
                          <div className="mb-2">Bed type:</div>
                          <ComboBox
                            width={"full"}
                            name="bedType"
                            options={bedTypes}
                            defaultValue={bedTypes[0].value}
                            onChange={() => {
                              setBedroomError("");
                            }}
                            required={{
                              value: true,
                              message: "This field is required!",
                            }}
                          />
                        </div>
                        <div className="mt-3">
                          <div className="mb-2">Bed amount:</div>
                          <div className="flex items-center gap-2 text-xl font-medium">
                            <Minus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "bedAmount",
                                  getValues("bedAmount") > 1
                                    ? Number(getValues("bedAmount")) - 1
                                    : Number(getValues("bedAmount"))
                                );
                                setBedroomError("");
                              }}
                            />
                            <input
                              type="number"
                              className="w-[3rem] focus:outline-0 text-center"
                              {...register("bedAmount", { value: 1 })}
                            />
                            <Plus
                              type="button"
                              onClick={() => {
                                setValue(
                                  "bedAmount",
                                  Number(getValues("bedAmount")) + 1
                                );
                                setBedroomError("");
                              }}
                            />
                          </div>
                        </div>
                      </section>
                      {bedroomError && (
                        <div className="py-3 text-red-500">
                          <span>{bedroomError}</span>
                        </div>
                      )}
                      <div className="mt-5 w-full grid grid-cols-2 gap-5">
                        <Button
                          className="w-full"
                          type="button"
                          intent={"secondary"}
                          rounded={"regular"}
                          onClick={() => setBedRoomModal(false)}
                        >
                          Back
                        </Button>
                        <Button
                          className="w-full"
                          type="button"
                          intent={"primary"}
                          rounded={"regular"}
                          onClick={() => addNewBedroom()}
                        >
                          Add new bed
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-fit my-2"
                      type="button"
                      intent={"primary"}
                      rounded={"regular"}
                      onClick={() => {
                        setBedRoomModal(true);
                      }}
                    >
                      Add Bed
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full border-t border-borderDefault my-10" />

            <div className="mt-5 w-full grid grid-cols-2 gap-5">
              <Button
                className="w-full"
                type="button"
                intent={"secondary"}
                rounded={"regular"}
                onClick={() => setAddRoomModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                type="submit"
                intent={"primary"}
                rounded={"regular"}
              >
                Add new room
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

//For display single room in Hotel n Resorts type, can enter Edit mode
const RoomMultipleDetails = ({
  room,
  index,
}: {
  room: iRoom;
  index: number;
}) => {
  const { rooms, setRooms } = useContext(FinshUpContext)!;
  const { removeRoom } = useContext(RoomMultipleContext)!;

  const roomRef = useRef<HTMLDivElement>(null);
  const [roomToggle, setRoomToggle] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (roomRef.current && !roomRef.current.contains(event.target)) {
        setRoomToggle(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        key={room.id}
        className="relative border border-borderDefault p-5 rounded-xl mt-5 last:mt-0"
      >
        <div className="flex justify-between items-center">
          <div className="text-base font-bold">
            Room {index}{" "}
            <span className="text-textUnfocus opacity-25 pointer-events-none">
              &nbsp;- #{room.id}
            </span>
          </div>

          <div
            ref={roomRef}
            onClick={() => setRoomToggle(!roomToggle)}
            className="relative p-2 bg-white border border-borderDefault rounded-full hover:cursor-pointer group"
          >
            <ThreeDotsFill className="group-hover:scale-110 duration-200" />
            <ul
              className={clsx(
                "border border-borderDefault z-20 absolute top-full right-0 text-sm rounded-md overflow-hidden bg-white mt-1 elevation-shadow-2 w-auto [&>li]:whitespace-nowrap [&>li]:p-2 [&>li]:px-3",
                roomToggle
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none select-none duration-150",
                "[&>li]:border-b [&>li]:border-borderDefault"
              )}
            >
              <li
                className="hover:bg-slate-100"
                onClick={() => removeRoom(room.id)}
              >
                Remove
              </li>
            </ul>
          </div>
        </div>
        {room.picture && (
          <div className="flex flex-col items-center">
            <img
              src={room.picture.url}
              alt="Uploaded"
              className="max-w-full max-h-[150px] rounded-lg mt-5"
            />
          </div>
        )}
        <div className="h-[1px] w-full border-t border-borderDefault my-3" />
        <div className="text-2xl py-2">
          <div className="text-sm text-textUnfocus">Name:</div>
          <div className="font-medium">{room.name}</div>
        </div>
        <div className="py-2">
          <div className="text-sm text-textUnfocus">Description:</div>
          <p>{room.description}</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="py-2">
            <div className="text-sm text-textUnfocus">Area:</div>
            <div className="text-2xl">{room.area}&#13217;</div>
          </div>
          <div className="py-2">
            <div className="text-sm text-textUnfocus">Max guest:</div>
            <div className="text-2xl flex items-center">
              {room.maxGuest}&nbsp;
              <Person />
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm text-textUnfocus">Price:</div>
            <div className="text-3xl font-medium">{room.price}$</div>
          </div>
          <div className="py-2">
            <div className="text-sm text-textUnfocus">Beds:</div>
            <div className="grid grid-flow-row">
              {room.bedrooms.map((bedroom) => (
                <span key={bedroom.id}>
                  x{bedroom.bedroomDetail.quantity}{" "}
                  {bedroom.bedroomDetail.bedType.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// const RoomSingle = () => {
//   const {
//     rooms,
//     setRooms,
//     indirectSubmitRef,
//     processToNextStep,
//     currentBedrooms,
//     setCurrentBedrooms,
//   } = useContext(FinshUpContext)!;
//   const [image, setImage] = useState<File | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setImageError(null);
//     } else {
//       setImageError("Please select an image.");
//     }
//   };
//   const [imageError, setImageError] = useState<string | null>(null);
//   const [bedroomError, setBedroomError] = useState<string | undefined>();
//   const [bedRoomModal, setBedRoomModal] = useState<boolean>();
//   const [triggerProcess, setTriggerProcess] = useState(false);
//   const methods = useForm();
//   const {
//     register,
//     getValues,
//     setValue,
//     reset,
//     clearErrors,
//     formState: { errors },
//   } = methods;
//   const formRef = useRef<HTMLFormElement>(null);
//   const listingProcess = useLocalAppStore((state) => state.listingProcess);

//   const onSubmit = (data: any) => {
//     setRooms([
//       {
//         id: String(generateUniqueId()),
//         type: "",
//         picture: "",
//         name: data["roomName"],
//         description: data["roomDesc"],
//         price: data["price"],
//         maxGuest: data["maxGuest"],
//         area: String(data["area"]),
//         bedrooms: currentBedrooms,
//         amenities: [],
//       },
//     ]);
//   };

//   useEffect(() => {
//     if (rooms.length > 0) {
//       processToNextStep();
//     }
//   }, [rooms]);

//   const resetBedroomFormValue = () => {
//     setValue("bedType", "");
//     setValue("bedAmount", 0);
//   };

//   const addNewBedroom = (id: number) => {
//     const bedType = getValues("bedType");
//     const bedAmount = getValues("bedAmount");

//     if (bedType === "") {
//       setBedroomError("Fill the information!");
//     } else if (bedAmount === 0) {
//       setBedroomError("Bed amount must bigger than 0.");
//     } else {
//       setCurrentBedrooms([
//         ...currentBedrooms,
//         {
//           id: Date.now() + Math.random(),
//           bedroomDetail: {
//             bedType: {
//               name: bedType,
//               description: "",
//             },
//             quantity: bedAmount,
//           },
//         },
//       ]);
//       setBedRoomModal(false);
//       resetBedroomFormValue();
//     }
//   };

//   const updateBedroom = (id: number, newBedroomValue: iBedroom) => {
//     setCurrentBedrooms(
//       currentBedrooms.map((bedroom) => {
//         if (bedroom.id === id) {
//           return newBedroomValue;
//         } else {
//           return bedroom;
//         }
//       })
//     );
//   };

//   const removeBedroom = (id: number) => {
//     setCurrentBedrooms(currentBedrooms.filter((bedroom) => bedroom.id !== id));
//   };

//   useEffect(() => {
//     if (listingProcess.rooms && listingProcess.rooms.length > 0) {
//       setCurrentBedrooms(listingProcess.rooms[0].bedrooms);
//     }
//   }, [listingProcess, setCurrentBedrooms]);

//   return (
//     <>
//       <div className="mt-2">
//         <div className="text-textUnfocus mb-10">
//           Add more infomation about your place:
//         </div>
//         <div>
//           <FormProvider {...methods}>
//             <form
//               ref={formRef}
//               onSubmit={methods.handleSubmit(onSubmit)}
//               className="p-5 border border-borderDefault rounded-xl mt-5"
//             >
//               <div className="grid grid-cols-1 gap-5">
//                 <RHFInputField
//                   inputName="roomName"
//                   label="Place Name"
//                   defaultValue={
//                     listingProcess.rooms && listingProcess.rooms.length > 0
//                       ? listingProcess.rooms[0].name
//                       : ""
//                   }
//                   registerOptions={{
//                     required: {
//                       value: true,
//                       message: "This field is required!",
//                     },
//                   }}
//                 />
//                 <RHFTextAreaField
//                   inputName="roomDesc"
//                   label="Place Description"
//                   defaultValue={
//                     listingProcess.rooms && listingProcess.rooms.length > 0
//                       ? listingProcess.rooms[0].description
//                       : ""
//                   }
//                   registerOptions={{
//                     required: {
//                       value: true,
//                       message: "This field is required!",
//                     },
//                   }}
//                 />
//                 <div>
//                   <ul>
//                     <li>
//                       <h5 className="text-lg text-textUnfocus mb-5">
//                         You'll need 1 photos to get started. You can add more or
//                         make changes later.
//                       </h5>
//                       {imageError && (
//                         <div className="mt-3 text-red-500 font-medium flex items-center border border-red-500 rounded-lg p-3 mb-5 elevation-shadow-2">
//                           <ErrorOutlineRounded className="mr-1" />
//                           <span>{imageError}</span>
//                         </div>
//                       )}
//                       <div
//                         className={clsx(
//                           `w-full min-h-[200px] border border-borderDefault rounded-xl bg-slate-100 p-10`,
//                           !image && "flex items-center justify-center"
//                         )}
//                       >
//                         <input
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           onChange={handleImageChange}
//                           ref={inputRef}
//                         />
//                         {!image && (
//                           <Button
//                             type="button"
//                             intent={"primary"}
//                             rounded={"regular"}
//                             onClick={() => {
//                               inputRef.current!.click();
//                             }}
//                           >
//                             Add image
//                           </Button>
//                         )}
//                         {image && (
//                           <div className="flex flex-col items-center">
//                             <img
//                               src={URL.createObjectURL(image)}
//                               alt="Uploaded"
//                               className="max-w-full max-h-[400px] rounded-lg mt-5"
//                             />
//                             <Button
//                               type="button"
//                               intent={"secondary"}
//                               rounded={"regular"}
//                               onClick={() => {
//                                 inputRef.current!.click();
//                               }}
//                             >
//                               Change image
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </li>
//                   </ul>
//                 </div>

//                 <div>
//                   <div className="text-lg text-textUnfocus mb-1">
//                     Room Area:
//                   </div>
//                   <div className="flex items-center gap-2 text-4xl">
//                     <span className="flex font-medium">
//                       <span className="relative mr-1">&#13217;</span>
//                       <input
//                         type="number"
//                         className="min-w-[2rem] focus:outline-0"
//                         {...register("area", {
//                           value:
//                             listingProcess.rooms &&
//                             listingProcess.rooms.length > 0
//                               ? listingProcess.rooms[0].area
//                               : 30,
//                           onBlur: () => {
//                             if (getValues("area") === "") {
//                               setValue("area", 0);
//                             }
//                           },
//                           onChange: () => {
//                             setValue("area", parseFloat(getValues("area")));
//                             clearErrors("area");
//                           },
//                           validate: (v) => parseInt(v) > 0,
//                         })}
//                       />
//                     </span>
//                   </div>
//                   {errors["area"] && (
//                     <div className="text-red-500 pt-3 flex items-center">
//                       <ErrorOutlineRounded className="mr-1" />
//                       Room area must be a valid number!
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <div className="text-lg text-textUnfocus mb-1">Price:</div>
//                   <div className="flex items-center gap-2 text-4xl">
//                     <span className="flex font-medium">
//                       <span className="mr-1">$</span>
//                       <input
//                         type="number"
//                         className="min-w-[2rem] focus:outline-0"
//                         {...register("price", {
//                           value:
//                             listingProcess.rooms &&
//                             listingProcess.rooms.length > 0
//                               ? listingProcess.rooms[0].price
//                               : 10,
//                           onBlur: () => {
//                             if (getValues("price") === "") {
//                               setValue("price", 0);
//                             }
//                           },
//                           onChange: () => {
//                             setValue("price", parseFloat(getValues("price")));
//                             clearErrors("price");
//                           },
//                           validate: (v) => parseInt(v) > 0,
//                         })}
//                       />
//                     </span>
//                   </div>
//                   {errors["price"] && (
//                     <div className="text-red-500 pt-3 flex items-center">
//                       <ErrorOutlineRounded className="mr-1" />
//                       Price must be a valid number!
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <div className="text-lg text-textUnfocus mb-1">
//                     Max Guest:
//                   </div>
//                   <div className="flex items-center gap-2 text-2xl font-medium">
//                     <Minus
//                       type="button"
//                       onClick={() => {
//                         setValue(
//                           "maxGuest",
//                           getValues("maxGuest") > 0
//                             ? Number(getValues("maxGuest")) - 1
//                             : Number(getValues("maxGuest"))
//                         );
//                       }}
//                     />
//                     <input
//                       type="number"
//                       className="w-[3rem] focus:outline-0 text-center"
//                       {...register("maxGuest", {
//                         value:
//                           listingProcess.rooms &&
//                           listingProcess.rooms.length > 0
//                             ? listingProcess.rooms[0].maxGuest
//                             : 1,
//                         validate: (v) => parseInt(v) > 0,
//                         onChange: () => clearErrors("maxGuest"),
//                       })}
//                     />
//                     <Plus
//                       type="button"
//                       onClick={() => {
//                         setValue("maxGuest", Number(getValues("maxGuest")) + 1);
//                         clearErrors("maxGuest");
//                       }}
//                     />
//                   </div>
//                   {errors["maxGuest"] && (
//                     <div className="text-red-500 pt-3 flex items-center">
//                       <ErrorOutlineRounded className="mr-1" />
//                       Max guest allowed must be atleast 1!
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <div className="text-lg text-textUnfocus mb-1">Bedrooms:</div>
//                   {currentBedrooms.length > 0 &&
//                     currentBedrooms.map((bedroom, index) => (
//                       <Bedroom
//                         type="multiple"
//                         index={index + 1}
//                         removeBedroom={removeBedroom}
//                         updateBedroom={updateBedroom}
//                         key={bedroom.id}
//                         bedroom={bedroom}
//                       />
//                     ))}
//                   {bedRoomModal ? (
//                     <div className="p-5 border border-theme elevation-shadow-2 rounded-lg my-2">
//                       <div className={clsx("text-base font-medium mb-2")}>
//                         Bedroom #{rooms.length + 1}
//                       </div>
//                       <section className="grid grid-cols-2 gap-5">
//                         <div>
//                           <div className="mb-2">Bed type:</div>
//                           <ComboBox
//                             width={"full"}
//                             name="bedType"
//                             options={bedTypes}
//                             onChange={() => {
//                               setBedroomError("");
//                             }}
//                             required={{
//                               value: true,
//                               message: "This field is required!",
//                             }}
//                           />
//                         </div>
//                         <div className="mt-3">
//                           <div className="mb-2">Bed amount:</div>
//                           <div className="flex items-center gap-2 text-xl font-medium">
//                             <Minus
//                               type="button"
//                               onClick={() => {
//                                 setValue(
//                                   "bedAmount",
//                                   getValues("bedAmount") > 0
//                                     ? Number(getValues("bedAmount")) - 1
//                                     : Number(getValues("bedAmount"))
//                                 );
//                                 setBedroomError("");
//                               }}
//                             />
//                             <input
//                               type="number"
//                               className="w-[3rem] focus:outline-0 text-center"
//                               {...register("bedAmount", { value: 0 })}
//                             />
//                             <Plus
//                               type="button"
//                               onClick={() => {
//                                 setValue(
//                                   "bedAmount",
//                                   Number(getValues("bedAmount")) + 1
//                                 );
//                                 setBedroomError("");
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </section>
//                       {bedroomError && (
//                         <div className="py-3 text-red-500">
//                           <span>{bedroomError}</span>
//                         </div>
//                       )}
//                       <div className="mt-5 w-full grid grid-cols-2 gap-5">
//                         <Button
//                           className="w-full"
//                           type="button"
//                           intent={"secondary"}
//                           rounded={"regular"}
//                           onClick={() => setBedRoomModal(false)}
//                         >
//                           Back
//                         </Button>
//                         <Button
//                           className="w-full"
//                           type="button"
//                           intent={"primary"}
//                           rounded={"regular"}
//                           onClick={() =>
//                             addNewBedroom(currentBedrooms.length + 1)
//                           }
//                         >
//                           Add new bedroom
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <Button
//                       className="w-fit my-2"
//                       type="button"
//                       intent={"primary"}
//                       rounded={"regular"}
//                       onClick={() => setBedRoomModal(true)}
//                     >
//                       Add Bedroom
//                     </Button>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-5 w-full grid grid-cols-1 gap-5">
//                 <button
//                   ref={indirectSubmitRef}
//                   className="w-full hidden"
//                   type="submit"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </form>
//           </FormProvider>
//         </div>
//       </div>
//     </>
//   );
// };

const Bedroom = ({
  bedroom,
  removeBedroom,
  updateBedroom,
  index,
  type,
}: {
  bedroom: iBedroom;
  removeBedroom: (id: number) => void;
  index?: number;
  updateBedroom: (id: number, newBedroomValue: iBedroom) => void;
  type: "single" | "multiple";
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [bedroomError, setBedroomError] = useState<string | undefined>();
  const { register, getValues, setValue } = useFormContext();
  const bedTypeInput = "bedType_edit" + bedroom.id;
  const bedAmountInput = "bedAmount_edit" + bedroom.id;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateBedroomExtend = (id: number) => {
    updateBedroom(id, {
      id: bedroom.id,
      bedroomDetail: {
        bedType: {
          name: getValues(bedTypeInput),
          description: "",
        },
        quantity: getValues(bedAmountInput),
      },
    });
    setEditMode(false);
  };

  return (
    <>
      <div className="relative p-3 border border-borderDefault rounded-lg mb-3 last:mb-0 hover:elevation-shadow-2 duration-150 group">
        {editMode ? (
          <>
            <div
              className={clsx(
                "absolute bottom-2 right-3 text-sm text-textUnfocus opacity-35 pointer-events-none"
              )}
            >
              #{bedroom.id}
            </div>
            {index && (
              <div
                className={clsx("font-medium text-xl group-hover:text-theme")}
              >
                #{index}
              </div>
            )}
            {type === "multiple" && (
              <div className="h-[1px] w-full border-t border-borderDefault my-2" />
            )}
            <section className="grid grid-cols-2 gap-5">
              <div className="z-10">
                <div className="mb-2">Bed type:</div>
                <ComboBox
                  width={"full"}
                  name={bedTypeInput}
                  options={bedTypes}
                  onChange={() => {
                    setBedroomError("");
                  }}
                  defaultValue={bedroom.bedroomDetail.bedType.name}
                  required={{
                    value: true,
                    message: "This field is required!",
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="mb-2">Bed amount:</div>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Minus
                    type="button"
                    onClick={() => {
                      setValue(
                        bedAmountInput,
                        getValues(bedAmountInput) > 1
                          ? Number(getValues(bedAmountInput)) - 1
                          : Number(getValues(bedAmountInput))
                      );
                      setBedroomError("");
                    }}
                  />
                  <input
                    type="number"
                    className="w-[3rem] focus:outline-0 text-center"
                    {...register(bedAmountInput, {
                      value: bedroom.bedroomDetail.quantity,
                    })}
                  />
                  <Plus
                    type="button"
                    onClick={() => {
                      setValue(
                        bedAmountInput,
                        Number(getValues(bedAmountInput)) + 1
                      );
                      setBedroomError("");
                    }}
                  />
                </div>
              </div>
            </section>
            {bedroomError && (
              <div className="py-3 text-red-500">
                <span>{bedroomError}</span>
              </div>
            )}
            <div className="mt-5 w-full grid grid-cols-2 gap-5">
              <Button
                className="w-full"
                type="button"
                intent={"secondary"}
                rounded={"regular"}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                type="button"
                intent={"primary"}
                rounded={"regular"}
                onClick={() => updateBedroomExtend(Number(bedroom.id))}
              >
                Update {type === "single" ? <>bed</> : <>bedroom</>}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              className={clsx(
                "absolute bottom-2 right-3 text-sm text-textUnfocus opacity-35 pointer-events-none"
              )}
            >
              #{bedroom.id}
            </div>
            {index && (
              <div
                className={clsx("font-medium text-xl group-hover:text-theme")}
              >
                #{index}
              </div>
            )}
            {type === "multiple" && (
              <div className="h-[1px] w-full border-t border-borderDefault my-2" />
            )}
            <div className="text-xl">
              {bedroom.bedroomDetail.bedType.name} x
              {bedroom.bedroomDetail.quantity}{" "}
            </div>
            <div
              ref={ref}
              onClick={() => setToggle(!toggle)}
              className="absolute top-2 right-2 p-2 bg-white border border-borderDefault rounded-full hover:cursor-pointer group"
            >
              <ThreeDotsFill className="group-hover:scale-110 duration-200" />
              <ul
                className={clsx(
                  "border border-borderDefault z-20 absolute top-full right-0 text-sm rounded-md overflow-hidden bg-white mt-1 elevation-shadow-2 w-auto [&>li]:whitespace-nowrap [&>li]:p-2 [&>li]:px-3",
                  toggle
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none select-none duration-150",
                  "[&>li]:border-b [&>li]:border-borderDefault"
                )}
              >
                <li
                  className="hover:bg-slate-100"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Edit
                </li>
                <li
                  className="hover:bg-slate-100"
                  onClick={() => {
                    removeBedroom(Number(bedroom.id));
                  }}
                >
                  Remove
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

FinishUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <AddNewListingLayout>{page}</AddNewListingLayout>
    </>
  );
};
