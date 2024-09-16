import CheckBox from "../checkbox/input-checkbox";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../svg";
import { title } from "process";
import { da } from "date-fns/locale";
type SelectBoxFilterProps = {
  item: {
    id: Number;
    titleBox: String;
    labelList: {
      id: number;
      name: string;
      status: boolean;
      value: number;
    }[];
    multiSelect: boolean;
  };
  onListenSelectBoxFilter: (values: any) => void; // Specify the function signature
};
const SelectBoxFilter: React.FC<SelectBoxFilterProps> = (props) => {
  const [showCheckBoxes, setShowCheckBoxes] = useState(true);

  const toggleCheckBoxes = () => setShowCheckBoxes(!showCheckBoxes);

  // data input initial

  const [dataCheckbox, setDataCheckbox] = useState<SelectBoxFilterProps>(props);

  const handleChooseCheckbox = (item: any) => {
    //check if multiSelect is false
    if (!props.item.multiSelect) {
      let listItem = [...props.item.labelList];
      const index = listItem.findIndex(
        (dataItem: any) => dataItem.id === item.id
      );
      if (index !== -1) {
        listItem[index] = item;
        const filteredItems = listItem.filter((input) => input.status);

        setDataCheckbox((prev) => ({
          ...prev,
          item: {
            ...prev.item,
            labelList: listItem,
          },
        }));
        props.onListenSelectBoxFilter({
          id: dataCheckbox.item.id,
          titleBox: dataCheckbox.item.titleBox,
          labelList: filteredItems,
        });
      }
    } else {
      let listItem = dataCheckbox.item.labelList;
      const index = dataCheckbox.item.labelList.findIndex(
        (dataItem: any) => dataItem.id === item.id
      );
      if (index !== -1) {
        // If an item with the same id is found, replace it
        listItem[index] = item;
        const filteredItems = listItem.filter((item) => item.status);
        setDataCheckbox((prev) => ({
          ...prev,
          item: {
            ...prev.item,
            labelList: listItem,
          },
        }));

        props.onListenSelectBoxFilter({
          id: dataCheckbox.item.id,
          titleBox: dataCheckbox.item.titleBox,
          labelList: filteredItems,
        });
      }
    }
  };
  return (
    <>
      <div className="relative py-4 border-t border-[#D3D3D3] ">
        <div
          className="flex flex-nowrap justify-between items-center cursor-pointer"
          onClick={toggleCheckBoxes}
        >
          <h4 className="block mb-4 text-lg font-normal capitalize text-ellipsis overflow-hidden whitespace-nowrap">
            {props.item.titleBox ? props.item.titleBox : ""}
          </h4>
          <div
            className={`transition-all duration-500 ease-in-out ${
              showCheckBoxes ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDownIcon />
          </div>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            showCheckBoxes
              ? "max-h-max opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {showCheckBoxes && (
            <div className="mt-2">
              {dataCheckbox.item.labelList &&
                dataCheckbox.item.labelList.map((item, index) => (
                  <CheckBox
                    item={item}
                    key={index}
                    listenSelect={handleChooseCheckbox}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SelectBoxFilter;
