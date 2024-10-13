import React, { use, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "@/components/modal/modal";
import ModalRefundState from "@/data/store/modal-request-refund";
import Button from "../button/classic-button";
import { Store } from "react-notifications-component";
import { Spinner } from "../ui/spinner";
import { ca } from "date-fns/locale";
interface ItemBooking {
  id: string;
  name: string;
  dateCheckIn: string;
  dateCheckOut: string;
  price: String;
  capacity: number;
  status: string;
  refundPercent: number;
  refundAllowedDays: number;
}

const columns = [
  {
    key: "dateCheckIn",
    label: "CheckIn",
  },
  {
    key: "dateCheckOut",
    label: "CheckOut",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "request-cancel",
    label: "Cancel Request",
  },
];

export default function TableReservation() {
  const [selectedReservation, setSelected] = useState<ItemBooking | undefined>(
    undefined
  );
  const reservationsQuery = useQuery<unknown, Error, ItemBooking[]>({
    queryKey: ["reservations", "guest"],
  });

  const cancelRequestMutation = useMutation<unknown, Error, string>({
    mutationKey: ["reservation", "cancel-request"],
    onMutate: () => {
        Store.addNotification({
            title: "Loading...",
            message: "Canceling request...",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
    },
  });
  const { display, open, close } = ModalRefundState();
  const handleCancelRequest = (id: string) => {
    cancelRequestMutation.mutate(id);
    close();
  };
  const handleChooseItemCancel = (r: ItemBooking) => {
    setSelected(r);
    open();
  };
  useEffect(() => {
    if (cancelRequestMutation.isSuccess) {
      Store.addNotification({
        title: "Success",
        message: "Cancel request successfully",
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
  }, [cancelRequestMutation.isSuccess]);
  useEffect(() => {
    if (cancelRequestMutation.isError) {
      Store.addNotification({
        title: "Error",
        message: "Cancel request failed",
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
  }, [cancelRequestMutation.isError]);
  useEffect(() => {
    console.log(cancelRequestMutation.status,">>>>>>>>");
  }, [cancelRequestMutation.status]);
  return (
    <>
      <Modal isOpen={display} close={close} open={open}>
        <div className="p-4shadow-lg">
          <h2 className="text-lg font-bold">Confirm Cancellation</h2>
          <p>
            Are you sure you want to cancel the request? You will receive{" "}
            {selectedReservation ? selectedReservation.refundPercent : 0}%
            deposit refund.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={close}>
              No
            </button>
            <button
              className="px-4 py-2 bg-[#f43f5e] text-white rounded"
              onClick={() => {
                handleCancelRequest(
                  selectedReservation ? selectedReservation.id : ""
                );
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Table
        className="max-w-full max-h-[35rem]"
        removeWrapper={false}
        aria-label="Example table with dynamic content"
      >
        <TableHeader className="" columns={columns}>
          {(column) => (
            <TableColumn className="text-left" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        {reservationsQuery.isSuccess &&
        reservationsQuery.data &&
        reservationsQuery.data.length > 0 ? (
          <TableBody items={reservationsQuery.data}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => {
                  if (
                    columnKey === "request-cancel" &&
                    getKeyValue(item, "status") === "ACTIVE"
                  )
                    return (
                      <TableCell>
                        <button
                          onClick={() => handleChooseItemCancel(item)}
                          className="bg-[#fcc962] text-black px-4 py-2 font-semibold rounded-lg hover:bg-[#deb055] transition-colors duration-300"
                          disabled={cancelRequestMutation.isPending}
                        >
                          {cancelRequestMutation.isPending ? (
                            <div className="flex items-center">
                              <Spinner className="w-5 h-5 text-[#ffffff] mr-2" />
                              <span>Loading...</span>
                            </div>
                          ) : (
                            "Request refund"
                          )}
                        </button>
                      </TableCell>
                    );
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
}
