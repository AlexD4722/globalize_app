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
const InformationUser = () => {
  const [statusEdit, setStatusEdit] = useState(false);
  const { display, open, close } = useStoreModal();
  const handleClick = () => {
    display ? close() : open();
  };
  return (
    <>
      <Modal isOpen={statusEdit}>
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
              Mrs.Jenny Wilson
            </h1>
            <p className="my-3 text-md text-[#f3f0f0]">22-03-1990</p>
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
            <p className="font-normal text-base">jenny88@gmail.com</p>
          </div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <TelephoneIcon />
            </span>
            <p className="font-normal text-base">0912931239123</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <UserBaseIcon />
            </span>
            <div className="flex items-center">
              <p>Sex:</p>
              <span className="ml-1">Female</span>
            </div>
          </div>
          <div className="flex items-center gap-2 my-5 text-[#fff]">
            <span className="p-2 bg-[#aa2e42] rounded-md">
              <JournalBookmarkIcon />
            </span>
            <div className="flex items-center">
              <p>ID number: </p>
              <span className="ml-1">01293891283</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InformationUser;
