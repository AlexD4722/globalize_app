import React from "react";
type PaginationProps = {
  totalPage: number;
  currentPage: number;
  handleClickPagination: (value: number) => void; // Specify the function signature
};
const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {props.totalPage > 1 &&
        Array.from({ length: props.totalPage }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium text-black rounded-md 
              border border-[#D3D3D3] hover:border-[#F43F5E] transition-all duration-500 ease-in-out
              ${
                props.currentPage === index + 1
                  ? "border-[#F43F5E] bg-[#F43F5E] text-white"
                  : ""
              }
              `}
            onClick={() => props.handleClickPagination(index + 1)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};
export default Pagination;
