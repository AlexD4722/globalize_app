import useStoreModal from "@/data/store/modal-store";
import React from "react";
type BoxMessageState = {
  message: string;
  icon: React.ReactNode;
};
const BoxMessage: React.FC<BoxMessageState> = (props) => {
  const { display, open, close } = useStoreModal();
  return (
    <div className="relative">
      <div className="flex items-center justify-center mt-10 w-full text-[#f43f5e] xl:text-[7rem] xs:text-[4.5rem]">
        <span>{props.icon}</span>
      </div>
      <div className="flex items-center justify-center w-full">
        <h5 className="text-2xl font-medium capitalize">{props.message ? props.message : ""}</h5>
      </div>
      <div className="flex items-center justify-end mt-10">
        <button onClick={close} className="py-2 px-4 rounded-md text-[#fff] bg-[#f43f5e] text-md font-medium capitalize">
          <span>OK</span>
        </button>
      </div>
    </div>
  );
};
export default BoxMessage;
