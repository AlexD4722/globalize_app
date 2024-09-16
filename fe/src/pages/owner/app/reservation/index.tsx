import { OwnerLayout } from "@/components/layout";
import { ReactElement, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "../../../../components/svg"; // Add this import
import { useQuery } from "@tanstack/react-query";
import { JAVA_URL } from "@/settings/fe_config";
import { Spinner } from "@/components/ui/spinner";
interface Reservation {
  id: String;
  img: string;
  title: string;
  name: string;
  dateFrom: string;
  dateTo: string;
}

export default function OwnerReservation() {
  const [activeTab, setActiveTab] = useState(0);
  const OwnerReservationsActive = useQuery<unknown, Error, Object[]>({
    queryKey: ["reservations", "owner", "active"],
  });
  const OwnerReservationsPaid = useQuery<unknown, Error, Object[]>({
    queryKey: ["reservations", "owner", "paid"],
  });

  const OwnerReservationsCancelled = useQuery<unknown, Error, Object[]>({
    queryKey: ["reservations", "owner", "cancelled"],
  });
  const tabs = [
    { title: "Active", query: OwnerReservationsActive },
    { title: "Paid", query: OwnerReservationsPaid },
    { title: "Cancelled", query: OwnerReservationsCancelled },
  ];

  const renderReservations = (query: typeof OwnerReservationsActive) => {
    if (query.isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-12 h-12 text-[#f43f5e]" />
        </div>
      );
    }

    if (query.isError) {
      return (
        <div className="text-center text-red-500">
          Error: {query.error.message}
        </div>
      );
    }

    if (query.data && query.data.length === 0) {
      return (
        <div className="text-center text-gray-500">
          No reservations found.
        </div>
      );
    }

    return (
      <div className="space-y-4">
         {query.data?.map((reservation: any) => (
          <div
            key={reservation.id}
            className="bg-white p-2 md:p-4 rounded-lg shadow flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 relative"
          >
            <div className="md:absolute top-2 right-2 md:top-4 md:right-4 w-full text-end">
              <span className="text-sm font-medium text-gray-500 border-b border-gray-300">
                # {reservation.id}
              </span>
            </div>
            <div className="flex-shrink-0 mt-10 w-full md:w-24 h-48 md:h-24 relative">
              <Image
                src={`${JAVA_URL}/${reservation.roomPicture}`}
                alt={reservation.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow text-center md:text-left mt-8 md:mt-0">
              <h3 className="text-lg font-semibold">{reservation.title}</h3>
              <p className="text-gray-600">Guest: {reservation.name}</p>
              <p className="text-md text-gray-500">
                From: {reservation.dateCheckIn} - To: {reservation.dateCheckOut}
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button className="flex items-center justify-center space-x-2 bg-[#f43f5e] text-white px-4 py-2 rounded-lg hover:bg-[#e11d48] transition-colors duration-300">
            <span>Show More</span>
            <ChevronDownIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row w-full border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 md:py-4 text-center font-semibold transition-all duration-300 ${
              activeTab === index
                ? "bg-[#f43f5e] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-2 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f43f5e]">
          {tabs[activeTab].title}
        </h2>
        <div className="bg-gray-50 rounded-lg p-2 md:p-4">
        {renderReservations(tabs[activeTab].query)}
        </div>
      </div>
    </div>
  );
}

// ... existing getLayout function ...

OwnerReservation.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OwnerLayout>{page}</OwnerLayout>
    </>
  );
};
