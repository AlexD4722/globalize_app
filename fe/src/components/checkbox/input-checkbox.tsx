import { CheckBoxIcon } from "@/components/svg";
import React, { use, useState, useEffect } from "react";
type CheckboxProps = {
  item: {
    id: number;
    name: string;
    status: boolean
  }
  listenSelect: (value: any) => void; // Specify the function signature
};
const Checkbox: React.FC<CheckboxProps> = (props) => {
  //value input initial

  const [inputCheckBox, setInputCheckBox] = useState<CheckboxProps>(props);
  useEffect(() => {
    setInputCheckBox(props);
  }, [props]);
  return (
    <div className="relative my-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={inputCheckBox.item.status}
          onChange={() => {
            setInputCheckBox({
              ...inputCheckBox,
              item: {
                ...inputCheckBox.item,
                status: !inputCheckBox.item.status,
              },
            });

            //value return

            props.listenSelect({
              ...inputCheckBox.item,
              status: !inputCheckBox.item.status,
            });
          }}
        />
        <span
          className="inline-block p-2 
          border
          border-solid
        border-[#7B7B7B]
          rounded relative
          font-medium"
        >
          {/* {isChecked && (
        
          )} */}
          <div
            className={`opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              inputCheckBox.item.status ? "text-[#F43F5E] opacity-100" : ""
            } transition-all duration-500 ease-in-out`}
          >
            <CheckBoxIcon />
          </div>
        </span>
        <p
          className={`capitalize ${
            inputCheckBox.item.status ? "text-[#F43F5E]" : ""
          } transition-all duration-500 ease-in-out`}
        >
          {inputCheckBox.item.name}
        </p>
      </label>
    </div>
  );
};
export default Checkbox;
