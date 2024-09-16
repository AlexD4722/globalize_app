import React, { useState, useEffect, use } from "react";
import { selectBox } from "../../components/type";
import DoubleRange from "../../components/input-range/double-range";
import SelectBoxFilter from "../../components/selectbox/selectbox-filter";
import { ParameterFilterSide } from "../../components/type";

type FilterSideProps = {
  //   dataFilter: ParameterToFilter;
  dataConfigFilter: {
    min: number;
    max: number;
    distanceMin: number;
    step: number;
    listSelectBox: selectBox[];
  };
  valueFilter: ParameterFilterSide;
  handleFilterSide: (value: any) => void;
  handleSubmitFilter: () => void;
};
const FilterSide: React.FC<FilterSideProps> = (props) => {
  const [dataFilter, setDataFilter] = useState<ParameterFilterSide>({
    doubleRange: [props.dataConfigFilter.min, props.dataConfigFilter.max],
    selectBox: [],
  });
  useEffect(() => {
    setDataFilter(props.valueFilter);
  }, [props.valueFilter]);
  //index 0 is min, index 1 is max
  const [initialInputRange, setInitialInputRange] = useState<number[]>([0, 0]);
  // handle when range change
  const handleValuesChange = (newValues: any) => {
    setDataFilter((prev) => {
      props.handleFilterSide({
        ...prev,
        doubleRange: newValues,
      });
      return {
        ...prev,
        doubleRange: newValues,
      };
    });
  };

  //function handle when select form checkbox
  const handleSelectBoxFilter = (item: any) => {
    const filteredItems = dataFilter.selectBox.filter(
      (dataItem) => dataItem.id !== item.id && dataItem.labelList.length > 0
    );

    if (item.labelList.length > 0) {
      filteredItems.push(item);
    }

    // check if filteredItems is []

    if (filteredItems) {
      setDataFilter((prev) => {
        props.handleFilterSide({
          ...prev,
          selectBox: filteredItems,
        });
        return {
          ...prev,
          selectBox: filteredItems,
        };
      });
    } else {
      setDataFilter((prev) => {
        props.handleFilterSide({
          ...prev,
          selectBox: [],
        });
        return {
          ...prev,
          selectBox: [],
        };
      });
    }
  };
  useEffect(() => {
    setInitialInputRange(dataFilter.doubleRange);
  }, [dataFilter.doubleRange]);
  const [dataFilterSelectBox, setDataFilterSelectBox] = useState<selectBox[]>(
    props.dataConfigFilter.listSelectBox
  );
  useEffect(() => {
    dataFilterSelectBox.map((selectBoxItem) => {
      const selectBoxFilter = dataFilter.selectBox.find(
        (item) => item.id === selectBoxItem.id
      );
      if (selectBoxFilter) {
        selectBoxItem.labelList = selectBoxItem.labelList.map((item) => {
          const selectBoxFilterItem = selectBoxFilter?.labelList.find(
            (filterItem) => filterItem.id === item.id
          );
          if (selectBoxFilterItem) {
            return selectBoxFilterItem;
          }
          return item;
        });

      }
      return selectBoxItem;
    });
  }, [dataFilter.selectBox, dataFilterSelectBox]);

  return (
    <div className="relative h-fit p-5 border border-[#D3D3D3] rounded-md">
      <h3 className="mb-3 text-[1.375rem] font-normal overflow-hidden text-ellipsis whitespace-nowrap">
        Filter
      </h3>
      <div className="relative py-4 border-t border-[#D3D3D3] ">
        <div className="flex flex-nowrap mb-6 justify-between items-center cursor-pointer">
          <h4 className="block text-lg font-normal capitalize text-ellipsis overflow-hidden whitespace-nowrap">
            Budget (per night)
          </h4>
          <div>
            <button
              className="px-4 py-1 text-md border text-white bg-theme border-transparent rounded-lg cursor-pointer  hover:elevation-shadow-2 duration-300"
              onClick={() => {
                props.handleSubmitFilter();
              }}
            >
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center flex-nowrap">
            <div className="relative">
              <input
                className="max-w-28 w-full pl-8 pr-5 py-2 border rounded-md border-[#D3D3D3] overflow-hidden text-ellipsis whitespace-nowrap"
                min={2}
                type="number"
                value={initialInputRange[0]}
                onBlur={(e) => {
                  let valueInput = parseInt(e.target.value);
                  if (!valueInput || valueInput < props.dataConfigFilter.min) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        props.dataConfigFilter.min,
                        dataFilter.doubleRange[1],
                      ]);
                      return {
                        ...prev,
                        doubleRange: [
                          props.dataConfigFilter.min,
                          dataFilter.doubleRange[1],
                        ],
                      };
                    });
                  } else if (
                    valueInput >
                    dataFilter.doubleRange[1] -
                      props.dataConfigFilter.distanceMin
                  ) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        dataFilter.doubleRange[1] -
                          props.dataConfigFilter.distanceMin,
                        dataFilter.doubleRange[1],
                      ]);
                      return {
                        ...prev,
                        doubleRange: [
                          dataFilter.doubleRange[1] -
                            props.dataConfigFilter.distanceMin,
                          dataFilter.doubleRange[1],
                        ],
                      };
                    });
                  }
                }}
                onChange={(e) => {
                  let valueInput = parseInt(e.target.value);
                  setInitialInputRange([valueInput, dataFilter.doubleRange[1]]);

                  if (
                    valueInput &&
                    valueInput >= props.dataConfigFilter.min &&
                    valueInput <=
                      dataFilter.doubleRange[1] -
                        props.dataConfigFilter.distanceMin
                  ) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        valueInput,
                        dataFilter.doubleRange[1],
                      ]);
                      return {
                        ...prev,
                        doubleRange: [valueInput, dataFilter.doubleRange[1]],
                      };
                    });
                    return;
                  }
                }}
              />
              <p className="absolute left-5 top-1/2 -translate-y-1/2">$</p>
            </div>
            <div className="relative">
              <input
                className="max-w-28 w-full pl-8 pr-5 py-2 border rounded-md border-[#D3D3D3] overflow-hidden text-ellipsis whitespace-nowrap"
                type="number"
                value={initialInputRange[1]}
                onBlur={(e) => {
                  let valueInput = parseInt(e.target.value);
                  if (!valueInput || valueInput > props.dataConfigFilter.max) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        dataFilter.doubleRange[0],
                        props.dataConfigFilter.max,
                      ]);
                      return {
                        ...prev,
                        doubleRange: [
                          dataFilter.doubleRange[0],
                          props.dataConfigFilter.max,
                        ],
                      };
                    });
                  } else if (
                    valueInput <
                    dataFilter.doubleRange[0] +
                      props.dataConfigFilter.distanceMin
                  ) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        dataFilter.doubleRange[0],
                        dataFilter.doubleRange[0] +
                          props.dataConfigFilter.distanceMin,
                      ]);
                      return {
                        ...prev,
                        doubleRange: [
                          dataFilter.doubleRange[0],
                          dataFilter.doubleRange[0] +
                            props.dataConfigFilter.distanceMin,
                        ],
                      };
                    });
                  }
                }}
                onChange={(e) => {
                  let valueInput = parseInt(e.target.value);
                  setInitialInputRange([dataFilter.doubleRange[0], valueInput]);

                  if (
                    valueInput &&
                    valueInput >=
                      dataFilter.doubleRange[0] +
                        props.dataConfigFilter.distanceMin &&
                    valueInput <= props.dataConfigFilter.max
                  ) {
                    setDataFilter((prev) => {
                      handleValuesChange([
                        dataFilter.doubleRange[0],
                        valueInput,
                      ]);
                      return {
                        ...prev,
                        doubleRange: [dataFilter.doubleRange[0], valueInput],
                      };
                    });
                    return;
                  }
                }}
              />
              <p className="absolute left-5 top-1/2 -translate-y-1/2">$</p>
            </div>
          </div>
        </div>
      </div>

      <DoubleRange
        min={props.dataConfigFilter.min}
        max={props.dataConfigFilter.max}
        step={props.dataConfigFilter.step}
        minGap={props.dataConfigFilter.distanceMin}
        dataValues={dataFilter.doubleRange}
        onValuesChange={handleValuesChange}
      />
      {props.dataConfigFilter.listSelectBox &&
        props.dataConfigFilter.listSelectBox.map((item, index) => (
          <SelectBoxFilter
            key={index}
            item={item}
            onListenSelectBoxFilter={handleSelectBoxFilter}
          />
        ))}
    </div>
  );
};
export default FilterSide;
