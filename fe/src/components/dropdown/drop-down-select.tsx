import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ArrowUpDownIcon, CheckBoxIcon } from "../svg";
import { DropdownOption } from "../type";
type ItemChoice = {
  key: number;
  name: string;
  icon: React.ReactNode;
};
type DropdownSelectProps = {
  titleBox: String;
  labelList: ItemChoice[];
  valueSelected: ItemChoice;
  handleChooseDropdown: (item: DropdownOption) => void; // Specify the function signature
};
const DropdownSelect: React.FC<DropdownSelectProps> = (props) => {
  // Specify the type of elements the ref will refer to
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside of dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowCheckBoxes(false);
    }
  };

  useEffect(() => {
    // Add event listener When component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.labelList[0]);
  useEffect(() => {
    setSelectedItem(props.valueSelected);
  }, [props.valueSelected]);
  const handleSelectItem = (item: any) => {
    setSelectedItem(item); // set selected item
    setShowCheckBoxes(false)
  }; 
  return (
    <div
      ref={dropdownRef} // Bind the ref to the dropdown container
      className="relative w-max"
    >
      {/* Dropdown Container */}
      <div className="relative inline-block text-left">
        {/* Dropdown Button */}
        <div className="max-w-[18rem] lg:w-[18rem] xs:w-[14.25rem] overflow-hidden ">
          <button
            type="button"
            className="inline-flex items-center justify-between gap-6 w-full px-4 py-2 text-base font-normal bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setShowCheckBoxes(!showCheckBoxes)}
          >
            <div className="inline-flex items-center justify-space-between gap-1">
              <div>
                {selectedItem
                  ? selectedItem.icon
                  : props.labelList[0].icon}
              </div>
              <h5 className="lg:w-[12rem] xs:w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap">
                Sort By:{" "}
                {selectedItem ? selectedItem.name : props.labelList[0].name}
              </h5>
            </div>
            <div
              className={`transition-all duration-500  ease-in-out  ${
                showCheckBoxes ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDownIcon />
            </div>
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute max-w-[18rem] lg:w-[18rem] xs:w-[13.25rem] left-0-0 z-10 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden  focus:outline-none transition-all duration-500  ease-in-out  ${
            showCheckBoxes ? " opacity-100 max-h-max" : "opacity-0 h-0"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {props.labelList &&
            props.labelList.map((item, index) => (
              <div
                className="relative w-full text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                id={`menu-item-${index}`}
                key={index}
                onBlur={() => setShowCheckBoxes(false)}
                onClick={() => {
                  handleSelectItem(item);
                  props.handleChooseDropdown(item);
                }}
              >
                {selectedItem.key === item.key && (
                  <div className="absolute top-1/2 -translate-y-1/2">
                    <CheckBoxIcon />
                  </div>
                )}
                <div className="pl-5 font-normal text-[1rem]">{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default DropdownSelect;
