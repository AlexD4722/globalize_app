import React from "react";
import Link from "next/link";

const SidebarDropdown = ({ item }: any) => {

  return (
    <>
      <div className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <div key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-theme`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SidebarDropdown;
