import { QueryClient } from '@tanstack/react-query'
import {
    deleteProperty,
    login,
    logout,
    refreshToken,
    reserveRoom,
    search,
} from '../functions/mutations'
import {
    getGuestProfile,
    getReservations,
    getInvoices,
    getOwnerProperties,
    getPropertyDetails,
    getPropertyRooms,
} from '../functions/queries'

// Default options for the query client
// retry: 2 - The number of times to retry a failed request
// retryDelay: 30s - The delay between retries
// staleTime: 30min - The query should remain fresh for 30 mins
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 1, staleTime: 1000 * 60 * 30, retryDelay: 30 * 1000 },
    },
})

queryClient.setMutationDefaults(['login'], {
    mutationFn: login,
})

queryClient.setMutationDefaults(['logout'], {
    mutationFn: logout,
})

queryClient.setMutationDefaults(['refreshToken'], {
    mutationFn: refreshToken,
})

queryClient.setMutationDefaults(['search'], {
    mutationFn: search,
})

queryClient.setQueryDefaults(['propertyDetails'], {
    queryFn: getPropertyDetails,
})

queryClient.setQueryDefaults(['propertyRooms'], {
    queryFn: getPropertyRooms,
})

queryClient.setMutationDefaults(['reserveRoom'], {
    mutationFn: reserveRoom,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reservations'] })
        queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
})

queryClient.setQueryDefaults(['reservations'], {
    queryFn: getReservations,
})

queryClient.setQueryDefaults(['invoices'], {
    queryFn: getInvoices,
})

queryClient.setQueryDefaults(['guestProfile'], {
    queryFn: getGuestProfile,
})

queryClient.setQueryDefaults(['ownerProperties'], {
    queryFn: getOwnerProperties,
})

queryClient.setMutationDefaults(['deleteProperty'], {
    mutationFn: deleteProperty,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ownerProperties'] })
    },
})

export default queryClient
