import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Close } from "../svg";

type MyComponentProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

const Modal: React.FC<MyComponentProps> = ({ children, isOpen, close, open }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      open();
    } else {
      close();
    }
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    // Kiểm tra nếu nhấp chuột bên ngoài modal
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${isOpen ? "z-50 opacity-100" : "z-0 opacity-0"} transition-all duration-200 ease-in-out`}>
      <div
        className={`absolute right-1/2 top-1/2 p-4 -translate-y-1/2 translate-x-1/2 bg-white rounded-xl ${isOpen ? "block" : "hidden"} transition-all duration-200 ease-in-out w-full md:max-w-[30rem] xs:max-w-[20rem]`}
        ref={dropdownRef} // Liên kết ref với modal
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
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
