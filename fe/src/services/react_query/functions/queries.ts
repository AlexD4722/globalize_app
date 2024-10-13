import { JavaClient } from '@/services/HttpRequest'
import { QueryKey } from '@tanstack/react-query'

export const getPropertyDetails = async ({
    queryKey,
}: {
    queryKey: QueryKey
}) => {
    const response = await JavaClient.get(`api/property/details/${queryKey[1]}`)
    return response.data
}

export const getPropertyRooms = async ({
    queryKey,
}: {
    queryKey: QueryKey
}) => {
    let url: string
    if (queryKey.length > 2) {
        url = `api/property/details/${queryKey[1]}/rooms?from=${queryKey[2]}&to=${queryKey[3]}`
    } else {
        url = `api/property/details/${queryKey[1]}/rooms`
    }

    const response = await JavaClient.get(url)

    return response.data
}

export const getReservations = async ({ queryKey }: { queryKey: QueryKey }) => {
    if (!isActor(queryKey[1])) {
        throw new Error('Invalid actor')
    }
    if (queryKey.length < 3) {
        const response = await JavaClient.get(`api/guests/reservations`, {
            actor: queryKey[1],
        })
        return response.data
    }
    const actor = queryKey[1]
    const response = await JavaClient.get(
        `api/${actor}s/reservations/${queryKey[2]}`,
        {
            actor,
        }
    )
    return response.data
}

export const getInvoices = async () => {
    const response = await JavaClient.get(`api/guests/invoices`, {
        actor: 'guest',
    })
    return response.data
}

export const getGuestProfile = async () => {
    const response = await JavaClient.get(`api/guests/profile`, {
        actor: 'guest',
    })
    return response.data
}

export const getOwnerProperties = async () => {
    const response = await JavaClient.get(`api/owners/properties`, {
        actor: 'owner',
    })
    return response.data
}

function isActor(value: any): value is 'owner' | 'guest' | 'admin' {
    return value === 'owner' || value === 'guest' || value === 'admin'
}
// Get Location
export const getProvinces = async () => {
    const response = await JavaClient.get(
        `api/location/provinces`,
        { actor: 'owner' }
    )
    return response.data
}

export const getDistricts = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [_, provinceCode] = queryKey;
    const response = await JavaClient.get(
        `api/location/provinces/${provinceCode}/districts`,
        { actor: 'owner' }
    );
    return response.data;
};
export const getWards = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [_, districtCode] = queryKey;
    const response = await JavaClient.get(
        `api/location/districts/${districtCode}/wards`,
        { actor: 'owner' }
    );
    return response.data;
};
