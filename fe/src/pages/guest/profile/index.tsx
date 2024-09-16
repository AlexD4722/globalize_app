import InformationUser from "@/components/info-profile/InformationUser";
import { GuestLayout } from "@/components/layout";
import TableInvoice from "@/components/table/TableInvoice";
import TableReservation from "@/components/table/TableReservation";
import React, { ReactElement, useEffect, useState } from "react";
type UserInformation = {
  userName: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  phone: string;
  address: string;
};
const Profile = () => {
  const [activeComponent, setActiveComponent] = useState<
    "invoice" | "reservation"
  >("reservation");

  const renderComponent = () => {
    switch (activeComponent) {
      case "invoice":
        return <TableInvoice />;
      case "reservation":
        return <TableReservation />;
      default:
        return <TableReservation />;
    }
  };
  return (
    <div>
      <div className="relative grid lg:grid-cols-[25%_75%] md:grid-cols-[35%_65%] xs:grid-cols-1 gap-5 mb-8">
        <div className="w-full">
          <InformationUser />
        </div>
        <div className="w-[calc(100%-1.25rem)]">
          <div>
            <div className="border rounded-lg">
              <nav className="py-3 px-5 w-full bg-[#F9F9FB]">
                <ul className="flex gap-5">
                  <li
                    className={`${
                      activeComponent === "reservation"
                        ? "text-[#f43f5e]"
                        : "text-[#9c9c9c]"
                    } transition-all `}
                  >
                    <button onClick={() => setActiveComponent("reservation")}>
                      Reservation
                    </button>
                  </li>
                  <li
                    className={`${
                      activeComponent === "invoice"
                        ? "text-[#f43f5e]"
                        : "text-[#9c9c9c]"
                    } transition-all `}
                  >
                    <button onClick={() => setActiveComponent("invoice")}>
                      Invoice
                    </button>
                  </li>
                </ul>
              </nav>
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
}
