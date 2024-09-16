import React, { useEffect, useRef, useState } from "react";
import useStoreModal from "@/data/store/modal-store";
import { Close } from "../svg";
import ReactDOM from "react-dom";
import { set } from "date-fns";
type MyComponentProps = {
  children: React.ReactNode;
  isOpen: boolean;
};
const Modal: React.FC<MyComponentProps> = ({ children, isOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { display, open, close } = useStoreModal();
  const [isDisplay, setIsDisplay] = useState(isOpen);
  useEffect(() => {
    setIsDisplay(isOpen);
  }, [isOpen]);
  useEffect(() => {
    isDisplay ? open() : close();
  }, [isDisplay]);
  // Specify the type of elements the ref will refer to
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside of dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDisplay(false);
      close();
    }
  };
  useEffect(() => {
    setIsMounted(true);
    // Add event listener When component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!isMounted) {
    return null; // Return null if component is not mounted
  }

  return ReactDOM.createPortal(
    <div>
      <div
        className={`fixed top-0 left-0 w-screen bg-black bg-opacity-50 h-screen ${
          display ? " z-50 opacity-100" : "z-0 opacity-0"
        } transition-all duration-200 ease-in-out`}
      >
        <div
          className={`absolute right-1/2 top-1/2 p-4 -translate-y-1/2 translate-x-1/2 bg-white  rounded-xl h-100% ${
            display ? "block" : "hidden"
          } transition-all duration-200 ease-in-out w-full md:max-w-[30rem] xs:max-w-[20rem]`}
          ref={dropdownRef} // Bind the ref to the modal container
        >
          <div className="relative">
            <div className="absolute right-0 z-50">
              <button
                className="p-2 text-xl text-[#808080] rounded hover:bg-[#0000000f] hover:text-[#000000] transition-all duration-500 ease-in-out"
                onClick={close}
              >
                <Close />
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
export default Modal;
