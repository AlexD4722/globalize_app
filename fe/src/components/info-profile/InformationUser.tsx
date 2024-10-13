import { useState } from "react";
import {
  EnvelopeIcon,
  GeoAltIcon,
  JournalBookmarkIcon,
  PencilSquareIcon,
  TelephoneIcon,
  UserBaseIcon,
} from "../svg";
import Modal from "@/components/modal/modal";
import useStoreModal from "@/data/store/modal-store";
import EditUser from "../form/edit-user";
import { useQuery } from "@tanstack/react-query";
const InformationUser = () => {

  const { display, open, close } = useStoreModal();
  const {data} = useQuery<any, Error, any>({queryKey: ['guestProfile']})

  const handleClick = () => {
    display ? close() : open();
  };
  return (
    <>
      <Modal isOpen={display} close={close} open={open}>
        <EditUser />
      </Modal>
      <div className="w-full p-6 bg-[#f43f5e] rounded-lg">
        <div>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 text-[#fff]"
              onClick={handleClick}
            >
              <span>
                <PencilSquareIcon />
              </span>
              <p>Edit</p>
            </button>
          </div>
          <div className="my-16 text-center">
            <h1 className="my-3 text-xl font-medium text-[#fff]">
              {data && `${data.firstName} ${data.lastName}`}
            </h1>
            <p className="my-3 text-sm font-medium text-[#fff]">
              {data && data.username}
            </p>
          </div>
        </div>
        <div className="my-8 py-5 border-y border-[#f3f0f0]">
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <GeoAltIcon />
            </span>
            <p className="font-normal text-base">123 Main Street, New York</p>
          </div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <EnvelopeIcon />
            </span>
            <p className="font-normal text-base">{data && data.email}</p>
          </div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <TelephoneIcon />
            </span>
            <p className="font-normal text-base">{data && data.phoneNumber}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <JournalBookmarkIcon />
            </span>
            <div className="flex items-center">
              <p>ID number: </p>
              <span className="ml-1">{data && data.idNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InformationUser;
