import React, { ReactElement, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  ErrorIcon,
} from "../../components/svg";
import DropdownSelect from "../../components/dropdown/drop-down-select";
import FilterSide from "@/components/filter/filter-side";
import {
  selectBox,
  ParameterFilterSide,
  DropdownOption,
  ItemResultFilter,
} from "../../components/type";
import ItemResultSearch from "@/components/filter/item-result";
import Pagination from "@/components/pagination/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "@/components/modal/modal";
import useStoreModal from "@/data/store/modal-store";
import BoxMessage from "@/components/alert-message/box-message";
import { set } from "date-fns";
import { JAVA_URL } from "@/settings/fe_config";
import { GuestLayout } from "@/components/layout";

type ParameterToSearch = {
  dataFilter: ParameterFilterSide;
  dropdownSelect: DropdownOption;
  part: number;
};

interface LabelItem {
  name: string;
  value: string;
  status: boolean;
}
export default function Search() {
  const { display, open, close } = useStoreModal();
  const [boxMessage, setBoxMessage] = useState<{
    icon: React.ReactNode;
    message: string;
  }>({
    icon: <ErrorIcon />,
    message: "error",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { city } = router.query;
  const search = useMutation<unknown, Error, string, unknown>({
    mutationKey: ["search"],
  });
  const updatePath = (url: URLSearchParams) => {
    router.push(
      {
        pathname: router.pathname,
        query: url.toString(),
      },
      undefined,
      { shallow: true }
    );
    // Fetch data here
  };
  const updateSearchParams = (
    id: number,
    paramName: string,
    labelProp: keyof LabelItem,
    searchParamsWindow: URLSearchParams
  ) => {
    const item = dataParameterSearch.dataFilter.selectBox.find(
      (item) => item.id === id
    );
    if (item) {
      if (item.labelList.length > 0) {
        searchParamsWindow.delete(paramName);
        switch (item.id) {
          case 1:
            item.labelList.forEach((labelItem) => {
              if (labelItem.status) {
                searchParamsWindow.append(paramName, labelItem.name);
              }
            });
            break;
          case 2:
            item.labelList.forEach((labelItem) => {
              if (labelItem.status) {
                searchParamsWindow.append(
                  paramName,
                  labelItem.value.toString()
                );
              }
            });
            break;
          case 3:
            item.labelList.forEach((labelItem) => {
              if (labelItem.status) {
                searchParamsWindow.append(paramName, labelItem.name);
              }
            });
            break;
        }
      } else {
        searchParamsWindow.delete(paramName);
      }
    } else {
      searchParamsWindow.delete(paramName);
    }
  };
  // Data config filter
  const dataConfigSearch = {
    dataFilter: {
      min: 1,
      max: 3000,
      distanceMin: 20,
      step: 20,
      listSelectBox: [
        {
          id: 1,
          titleBox: "Room type",
          labelList: [
            {
              id: 1,
              name: "Hotels",
              status: false,
              value: 0,
            },
            {
              id: 2,
              name: "Apartments",
              status: false,
              value: 0,
            },
            {
              id: 3,
              name: "Resorts",
              status: false,
              value: 0,
            },
            {
              id: 4,
              name: "Villas",
              status: false,
              value: 0,
            },
            {
              id: 5,
              name: "Bed Breakfasts",
              status: false,
              value: 0,
            },
          ],
          multiSelect: true,
        },
        {
          id: 2,
          titleBox: "Review score",
          labelList: [
            {
              id: 1,
              name: "Excellent: 9+",
              status: false,
              value: 9,
            },
            {
              id: 2,
              name: "Very good: 8+",
              status: false,
              value: 8,
            },
            {
              id: 3,
              name: "Good: 7+",
              status: false,
              value: 7,
            },
            {
              id: 4,
              name: "Pleasant: 6+",
              status: false,
              value: 6,
            },
            {
              id: 5,
              name: "Pleasant: 5+",
              status: false,
              value: 5,
            },
          ],
          multiSelect: false,
        },
        {
          id: 3,
          titleBox: "Facilities",
          labelList: [
            {
              id: 1,
              name: "Non-smooking room",
              status: false,
              value: 0,
            },
            {
              id: 2,
              name: "Pets allowed",
              status: false,
              value: 0,
            },
            {
              id: 3,
              name: "Parking",
              status: false,
              value: 0,
            },
            {
              id: 4,
              name: "Free WiFi",
              status: false,
              value: 0,
            },
            {
              id: 5,
              name: "Spa and wellness centre",
              status: false,
              value: 0,
            },
            {
              id: 6,
              name: "Fitness centre",
              status: false,
              value: 0,
            },
            {
              id: 7,
              name: "Restaurant",
              status: false,
              value: 0,
            },
            {
              id: 8,
              name: "Swimming Pool",
              status: false,
              value: 0,
            },
          ],
          multiSelect: true,
        },
      ],
    } as {
      min: number;
      max: number;
      distanceMin: number;
      step: number;
      listSelectBox: selectBox[];
    },
    DropdownSelect: {
      titleBox: "Our top picks",
      labelList: [
        {
          key: 1,
          name: "Our top picks",
          icon: <ArrowUpDownIcon />,
        },
        {
          key: 2,
          name: "Price (low to high)",
          icon: <ArrowUpIcon />,
        },
        {
          key: 3,
          name: "Price (high to low)",
          icon: <ArrowDownIcon />,
        },
        {
          key: 4,
          name: "Top reviewed",
          icon: <StarIcon />,
        },
      ],
    },
  };

  // Data config pagination
  const dataConfigPagination = {
    perPage: 3,
  };
  // state dataResultFilter
  const [dataResultFilter, setDataResultFilter] = useState<ItemResultFilter[]>(
    []
  );
  const [perItemResultRef, setPerItemResultRef] = useState<ItemResultFilter[]>(
    []
  );
  const [totalPage, setTotalPage] = useState<number>(
    dataResultFilter.length / dataConfigPagination.perPage
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  // state parameter Search
  const [dataParameterSearch, setDataParameterSearch] =
    useState<ParameterToSearch>({
      dataFilter: {
        doubleRange: [
          dataConfigSearch.dataFilter.min,
          dataConfigSearch.dataFilter.max,
        ],
        selectBox: [],
      },
      dropdownSelect: {
        name: dataConfigSearch.DropdownSelect.labelList[0].name,
        icon: dataConfigSearch.DropdownSelect.labelList[0].icon,
        key: dataConfigSearch.DropdownSelect.labelList[0].key,
      },
      part: currentPage,
    });

  // handle when state dataFilter change

  useEffect(() => {
    setTotalPage(
      Math.ceil(dataResultFilter.length / dataConfigPagination.perPage)
    );
  }, [dataResultFilter]);
  //handle when choose dropdown
  const handleChooseDropdown = (item: DropdownOption) => {
    setDataParameterSearch((prev) => ({
      ...prev,
      dropdownSelect: item,
    }));
  };

  // handle when click button pagination

  const handleClickPagination =
    (pageNumber: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setCurrentPage(pageNumber);
      setPerItemResultRef(
        dataResultFilter.slice(
          (currentPage - 1) * dataConfigPagination.perPage,
          (currentPage - 1) * dataConfigPagination.perPage +
            dataConfigPagination.perPage
        )
      );
    };
  const handleListSlice = (data: ItemResultFilter[], page: number) => {
    return data.slice(
      (page - 1) * dataConfigPagination.perPage,
      (page - 1) * dataConfigPagination.perPage + dataConfigPagination.perPage
    );
  };

  //handel when filter side change
  const handleFilterSide = (value: ParameterFilterSide) => {
    setDataParameterSearch((prev) => ({
      ...prev,
      dataFilter: value,
    }));
  };

  //handle when Submit filter change
  const onSubmitFilter = () => {
    const searchParamsWindow = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams(router.query as any);
    if (searchParamsWindow.size) {
      searchParams.set(
        "minPrice",
        dataParameterSearch.dataFilter.doubleRange[0].toString()
      );
      searchParams.set(
        "maxPrice",
        dataParameterSearch.dataFilter.doubleRange[1].toString()
      );
      updateSearchParams(1, "type", "name", searchParams);
      updateSearchParams(2, "minRating", "value", searchParams);
      updateSearchParams(3, "facility", "name", searchParams);
      updatePath(searchParams);
    }
  };

  // handle when choose dropdown
  useEffect(() => {
    const searchParamsWindow = new URLSearchParams(window.location.search);
    if (searchParamsWindow.size) {
      dataParameterSearch.dropdownSelect.key &&
        searchParamsWindow.set(
          "sort",
          dataParameterSearch.dropdownSelect.name.toString()
        );
      updatePath(searchParamsWindow);
    }
    // need fetch data here
  }, [dataParameterSearch.dropdownSelect]);

  //run when first load ex http://localhost:3000/search
  useEffect(() => {
    const searchParamsWindow = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams(router.query as any);
    if (!searchParamsWindow.size) {
      searchParams.set(
        "minPrice",
        dataParameterSearch.dataFilter.doubleRange[0].toString()
      );
      searchParams.set(
        "maxPrice",
        dataParameterSearch.dataFilter.doubleRange[1].toString()
      );
      updateSearchParams(1, "type", "name", searchParams);
      updateSearchParams(2, "minRating", "value", searchParams);
      updateSearchParams(3, "facility", "name", searchParams);

      dataParameterSearch.dropdownSelect.key &&
        searchParams.set(
          "sort",
          dataParameterSearch.dropdownSelect.name.toString()
        );
      // Cập nhật URL mà không tải lại trang
      updatePath(searchParams);
      // need fetch data here
    } else {
      let min = parseInt(
        searchParamsWindow.get("minPrice") ||
          dataConfigSearch.dataFilter.min.toString()
      );
      let max = parseInt(
        searchParamsWindow.get("maxPrice") ||
          dataConfigSearch.dataFilter.max.toString()
      );
      searchParamsWindow.set("minPrice", min.toString());
      searchParamsWindow.set("maxPrice", max.toString());
      setDataParameterSearch((prev) => {
        if (
          min >= dataConfigSearch.dataFilter.min &&
          min <= max - dataConfigSearch.dataFilter.distanceMin &&
          max <= dataConfigSearch.dataFilter.max
        ) {
          return {
            ...prev,
            dataFilter: {
              ...prev.dataFilter,
              doubleRange: [min, max],
            },
          };
        }
        return {
          ...prev,
          dataFilter: {
            ...prev.dataFilter,
            doubleRange: [
              dataConfigSearch.dataFilter.min,
              dataConfigSearch.dataFilter.max,
            ],
          },
        };
      });
      // Simplify the retrieval of search parameters and their splitting
      const getSearchParamList = (param: string) =>
        searchParamsWindow.getAll(param);
      let typeList = getSearchParamList("type");
      let scoreList = getSearchParamList("minRating");
      let facilities = getSearchParamList("facility");

      // Create a new array for updated selectBox items
      let updatedSelectBox = dataConfigSearch.dataFilter.listSelectBox.map(
        (item) => {
          const data = item.labelList.map((labelItem) => {
            // Check if the current item matches any of the search parameters
            const isInTypeList = typeList.includes(labelItem.name);
            const isInScoreList = scoreList.includes(
              labelItem.value.toString()
            );
            const isInFacilities = facilities.includes(labelItem.name);

            // Update status based on the checks above
            return {
              ...labelItem,
              status: isInTypeList || isInScoreList || isInFacilities,
            };
          });
          // Return the updated item with filtered labelList
          return { ...item, labelList: data.filter((item) => item.status) };
        }
      );
      updatedSelectBox.forEach((item) => {
        if (item.id === 1 && item.labelList.length > 0) {
          searchParamsWindow.delete("type");
          item.labelList.forEach((labelItem) => {
            searchParamsWindow.append("type", labelItem.name);
          });
        } else if (item.id === 2 && item.labelList.length > 0) {
          searchParamsWindow.delete("minRating");
          item.labelList.forEach((labelItem) => {
            searchParamsWindow.append("minRating", labelItem.value.toString());
          });
        } else if (item.id === 3 && item.labelList.length > 0) {
          searchParamsWindow.delete("facility");
          item.labelList.forEach((labelItem) => {
            searchParamsWindow.append("facility", labelItem.name);
          });
        }
      });
      // Update the state once with the new selectBox array
      setDataParameterSearch((prev) => ({
        ...prev,
        dataFilter: {
          ...prev.dataFilter,
          selectBox: updatedSelectBox,
        },
      }));

      //handle when choose dropdown
      let itemSort = getSearchParamList("sort");
      if (itemSort.length > 0) {
        let item = dataConfigSearch.DropdownSelect.labelList.find(
          (item) => item.name === itemSort[0]
        );
        if (item) {
          setDataParameterSearch((prev) => ({
            ...prev,
            dropdownSelect: item,
          }));
        }
      } else {
        searchParamsWindow.set(
          "sort",
          dataParameterSearch.dropdownSelect.name.toString()
        );
      }
      updatePath(searchParamsWindow);
      // need fetch data here
    }
  }, []);

  useEffect(() => {
    const { asPath: path } = router;

    // Remove the "/search?" prefix if it exists using regex
    const queryString = path.replace(/^\/search\?/, "");

    // Check if the query string contains the necessary parameters
    if (/minPrice|maxPrice/.test(queryString)) {
      handleFetchData(queryString);
    }
  }, [router.asPath]);
  useEffect(() => {
    if (search.isPending) {
      setLoading(true);
    } else if (search?.isError) {
      setBoxMessage({
        icon: <ErrorIcon />,
        message: "Error",
      });
    } else if (search?.isSuccess) {
      if (Array.isArray(search.data)) {
        const typedData = search.data.map(
          ({
            id,
            name,
            addressSpecific,
            avgRating,
            number,
            minPrice,
            featured_picture
          }: any) => ({
            id,
            name: name,
            address: addressSpecific,
            rating: parseFloat(avgRating?.toFixed(1)),
            review: number,
            price: minPrice,
            img: `${JAVA_URL}/${featured_picture}`,
          })
        );
        setLoading(false);
        setDataResultFilter(typedData);
      }
    }
  }, [search.data]);

  const handleFetchData = (parameter: string) => {
    search.mutate(parameter);
  };
  return (
    <div>
      {/* <Modal isOpen={false} >
        <BoxMessage icon={boxMessage.icon} message={boxMessage.message} />
      </Modal> */}
      <div className="relative grid lg:grid-cols-[25%_75%] sm:grid-cols-1 gap-5 mb-[3rem]">
        {/* Component filter */}

        <FilterSide
          dataConfigFilter={dataConfigSearch.dataFilter}
          valueFilter={dataParameterSearch.dataFilter}
          handleFilterSide={handleFilterSide}
          handleSubmitFilter={onSubmitFilter}
        />

        {loading ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F43F5E]"></div>
          </div>
        ) : (
          <div>
            {dataResultFilter && dataResultFilter.length > 0 ? (
              <div>
                {/*  Component  main */}
                <div className="relative p-5 border border-[#D3D3D3] rounded-md">
                  <h3 className="mb-3 text-[1.375rem] font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                    {city && <span>{decodeURIComponent(city as string)}</span>}:{" "}
                    {dataResultFilter ? dataResultFilter.length : 0} properties
                    found
                  </h3>
                  <div>
                    <DropdownSelect
                      titleBox={dataConfigSearch.DropdownSelect.titleBox}
                      labelList={dataConfigSearch.DropdownSelect.labelList}
                      valueSelected={dataParameterSearch.dropdownSelect}
                      handleChooseDropdown={handleChooseDropdown}
                    ></DropdownSelect>
                  </div>

                  {/* View data item filter */}
                  <div className="relative mb-12">
                    {dataResultFilter &&
                      dataResultFilter.map((item, key) => (
                        <ItemResultSearch key={key} item={item} />
                      ))}
                  </div>
                  <div className="absolute bottom-3 right-1/2 translate-x-1/2">
                    <Pagination
                      totalPage={totalPage}
                      currentPage={currentPage}
                      handleClickPagination={handleClickPagination}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative mb-12">
                <p className="mb-3 text-[1.375rem] font-normal overflow-hidden text-ellipsis underline whitespace-nowrap">
                  Not found result
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
}

