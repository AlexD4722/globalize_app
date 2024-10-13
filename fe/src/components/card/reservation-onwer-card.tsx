import Image from "next/image";
import { DollarIcon } from "@/components/svg";
import { JAVA_URL } from "@/settings/fe_config";
import { useMutation } from "@tanstack/react-query";
import ModalAcceptRefundState from "@/data/store/modal-accept-refund";
import ModalRejectRefundState from "@/data/store/modal-reject-refund";
import Modal from "@/components/modal/modal";
import { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { Spinner } from "../ui/spinner";
import { set } from "date-fns";
interface ReservationOwnerCardProps {
  reservation: any;
  formatPrice: (price: number) => string;
}

const ReservationOwnerCard: React.FC<ReservationOwnerCardProps> = ({
  reservation,
  formatPrice,
}) => {
  const acceptMutation = useMutation<any, Error, any>({
    mutationKey: ["reservation", "request-accept"],

  });
  const rejectMutation = useMutation<any, Error, any>({
    mutationKey: ["reservation", "request-reject"],
  });
  const useStoreModalAccept = ModalAcceptRefundState();
  const useStoreModalReject = ModalRejectRefundState();
  const [selectedAcceptId, setSelectedAcceptId] = useState("");
  const [selectedRejectId, setSelectedRejectId] = useState("");
  const handleChooseItemAccept = (id: string) => {
    setSelectedAcceptId(id);
    useStoreModalAccept.open();
  };
  const handleChooseItemReject = (id: string) => {
    setSelectedRejectId(id);
    useStoreModalReject.open();
  };
  const handleAcceptRequest = () => {
    acceptMutation.mutate(selectedAcceptId);
    useStoreModalAccept.close();
  };
  useEffect(() => {
    if (acceptMutation.isSuccess) {
      Store.addNotification({
        title: "Success",
        message: "Accept request successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [acceptMutation.isSuccess]);
  useEffect(() => {
    if (acceptMutation.isError) {
      Store.addNotification({
        title: "Error",
        message: "Accept request failed",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [acceptMutation.isError]);
  const handleRejectRequest = () => {
    rejectMutation.mutate(selectedRejectId);
    useStoreModalReject.close();
  };
  useEffect(() => {
    if (rejectMutation.isSuccess) {
      Store.addNotification({
        title: "Success",
        message: "Reject request successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [rejectMutation.isSuccess]);
  useEffect(() => {
    if (rejectMutation.error) {
      Store.addNotification({
        title: "Error",
        message: "Reject request failed",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [rejectMutation.error]);
  return (
    <>
      <Modal
        isOpen={useStoreModalAccept.display}
        close={useStoreModalAccept.close}
        open={useStoreModalAccept.open}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirm Accept Request</h2>
          <p>Are you sure you want to accept the request?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={useStoreModalAccept.close}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-[#f43f5e] text-white rounded"
              onClick={() => handleAcceptRequest()}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={useStoreModalReject.display}
        close={useStoreModalReject.close}
        open={useStoreModalReject.open}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirm Reject Request</h2>
          <p>Are you sure you want to Reject the request?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={useStoreModalReject.close}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-[#f43f5e] text-white rounded"
              onClick={() => handleRejectRequest()}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <div className="bg-white p-2 md:p-4 rounded-lg shadow flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 relative">
        <div className="md:absolute top-2 right-2 md:top-4 md:right-4 w-full text-end">
          <span className="text-sm font-medium text-gray-500 border-b-2 border-[#f43f5e]">
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
          <p className="text-gray-600">
            Guest:{" "}
            {`${reservation.guestFirstName} ${reservation.guestLastName}`}
          </p>
          <p className="text-md text-gray-500">
            From: {reservation.dateCheckIn} - To: {reservation.dateCheckOut}
          </p>
          <p className="text-md text-gray-500">
            Number Of People: {reservation.capacity}
          </p>
          <p className="flex items-center gap-1 text-md text-gray-500">
            Price:{" "}
            <span className="flex items-center text-xl font-bold text-[#f43f5e] transition-all duration-300 hover:scale-110 cursor-pointer">
              <DollarIcon />
              <p className="text-md">{formatPrice(reservation.price)}</p>
            </span>
          </p>
        </div>
        {reservation && reservation.status == "CANCEL_REQUESTED" ? (
          <div className="flex gap-1">
            <button
              onClick={() => handleChooseItemAccept(reservation.id)}
              className="bg-[#f43f5e] text-white px-4 py-2 font-semibold rounded-lg hover:bg-[#e11d48] transition-colors duration-300"
              disabled={acceptMutation.isPending}
            >
              {acceptMutation.isPending ? (
                <div className="flex items-center">
                  <Spinner className="w-5 h-5 text-[#ffffff] mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Accept"
              )}
            </button>
            <button
              onClick={() => handleChooseItemReject(reservation.id)}
              className="bg-[#fcc962] text-black px-4 py-2 font-semibold rounded-lg hover:bg-[#deb055] transition-colors duration-300"
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <div className="flex items-center">
                  <Spinner className="w-5 h-5 text-[#ffffff] mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Reject"
              )}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default ReservationOwnerCard;
