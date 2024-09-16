import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useEffect } from "react";
// Thêm các props min, max, và step vào component DoubleRange
type DoubleRangeProps = {
  min: number;
  max: number;
  step: number;
  dataValues: number[];
  minGap: number; 
  onValuesChange: (values: number[]) => void; // Specify the function signature
};
const DoubleRange: React.FC<DoubleRangeProps> = ({
  min,
  max,
  step,
  dataValues,
  minGap,
  onValuesChange,
}) => {
  const [valuesRange, setValuesRange] = useState([
    Math.ceil(min + (max - min) / 4),
    Math.ceil(min + (3 * (max - min)) / 4),
  ]);
  useEffect(() => {
    setValuesRange(dataValues);
  }, [dataValues]);

  {
    /* use library react-range to create Double Range */
  }

  return (
    <div className="px-3">
      <Range
        values={valuesRange}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
 // Giả sử khoảng cách tối thiểu là 5000
          if (values[1] - values[0] < minGap) {
            // Nếu khoảng cách nhỏ hơn minGap, điều chỉnh values[1] để tạo khoảng cách tối thiểu
            // Điều này giả định rằng bạn muốn giữ nguyên giá trị min và chỉ điều chỉnh giá trị max
            // Đảm bảo rằng values[1] không vượt quá max
            const adjustedMaxValue = Math.min(values[0] + minGap, max);
            if(values[1] - minGap < min) {
              return;
            }
            setValuesRange([values[1] - minGap, adjustedMaxValue]);
            onValuesChange([values[1] - minGap, adjustedMaxValue]);
          } else {
            // Nếu không có vấn đề gì, cập nhật giá trị như bình thường
            setValuesRange(values);
            onValuesChange(values);
          }
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
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: valuesRange,
                  colors: ["#ccc", "#7B7B7B", "#ccc"],
                  min: min,
                  max: max,
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
    </div>
  );
};

export default DoubleRange;
