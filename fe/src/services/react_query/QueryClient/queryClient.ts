import { QueryClient } from "@tanstack/react-query";
import {
  acceptCancelRequest,
  createProperty,
  disableProperty,
  enableProperty,
  login,
  logout,
  refreshToken,
  rejectCancelRequest,
  removeReservation,
  requestCancelReservation,
  reserveRoom,
  search,
  register,
  authEmail,
} from "../functions/mutations";
import {
  getGuestProfile,
  getReservations,
  getInvoices,
  getOwnerProperties,
  getPropertyDetails,
  getPropertyRooms,
  getProvinces,
  getDistricts,
  getWards,
} from "../functions/queries";

// Default options for the query client
// retry: 2 - The number of times to retry a failed request
// retryDelay: 30s - The delay between retries
// staleTime: 30min - The query should remain fresh for 30 mins
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 30, retryDelay: 30 * 1000 },
  },
});

queryClient.setMutationDefaults(["login"], {
  mutationFn: login,
});

queryClient.setMutationDefaults(["logout"], {
  mutationFn: logout,
});

queryClient.setMutationDefaults(["refreshToken"], {
  mutationFn: refreshToken,
});

queryClient.setMutationDefaults(["search"], {
  mutationFn: search,
});

queryClient.setQueryDefaults(["propertyDetails"], {
  queryFn: getPropertyDetails,
});

queryClient.setQueryDefaults(["propertyRooms"], {
  queryFn: getPropertyRooms,
});

queryClient.setMutationDefaults(["reserveRoom"], {
  mutationFn: reserveRoom,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reservations"] });
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
  },
});
queryClient.setMutationDefaults(["deleteReservation"], {
  mutationFn: requestCancelReservation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reservations"] });
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
  },
});

queryClient.setQueryDefaults(["reservations"], {
  queryFn: getReservations,
});

queryClient.setQueryDefaults(["invoices"], {
  queryFn: getInvoices,
});

queryClient.setQueryDefaults(["guestProfile"], {
  queryFn: getGuestProfile,
});

queryClient.setQueryDefaults(["ownerProperties"], {
  queryFn: getOwnerProperties,
});

queryClient.setMutationDefaults(["disableProperty"], {
  mutationFn: disableProperty,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["ownerProperties"] });
    queryClient.invalidateQueries({ queryKey: ["properties"] });
  },
});

queryClient.setMutationDefaults(["enableProperty"], {
  mutationFn: enableProperty,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["ownerProperties"] });
    queryClient.invalidateQueries({ queryKey: ["properties"] });
  },
});

queryClient.setMutationDefaults(["properties"], {
  mutationFn: createProperty,
});

queryClient.setMutationDefaults(["reservation", "cancel-request"], {
  mutationFn: requestCancelReservation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reservations"] });
  },
});

queryClient.setMutationDefaults(["reservation", "request-accept"], {
  mutationFn: acceptCancelRequest,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["reservations", "owner", "requested"],
    });
    queryClient.invalidateQueries({
      queryKey: ["reservations", "owner", "cancelled"],
    });
  },
});

queryClient.setMutationDefaults(["reservation", "request-reject"], {
  mutationFn: rejectCancelRequest,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["reservations", "owner", "requested"],
    });
    queryClient.invalidateQueries({
      queryKey: ["reservations", "owner", "active"],
    });
  },
});

queryClient.setQueryDefaults(["provinces"], {
  queryFn: getProvinces,
});
queryClient.setQueryDefaults(["districts"], {
  queryFn: getDistricts,
});
queryClient.setQueryDefaults(["wards"], {
  queryFn: getWards,
});

queryClient.setMutationDefaults(["removeReservation"], {
  mutationFn: removeReservation,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["reservations"],
    });
  },
});
queryClient.setMutationDefaults(["register"], {
  mutationFn: ({ actor, UserRegister}) => register(actor, UserRegister),
  onSuccess: (data) => {
    localStorage.setItem("userRegisterResponse", JSON.stringify(data));
  },
});
queryClient.setMutationDefaults(["authEmail"], {
  mutationFn: ({ actor, id, code }) => authEmail(actor, id, code),
});

export default queryClient;
