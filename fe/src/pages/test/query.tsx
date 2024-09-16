import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

const Query = (): ReactNode => {
    const search = useMutation<unknown, Error, any, unknown>({
        mutationKey: ['search'],
    })
    const propertyDetails = useQuery<unknown, Error, any>({
        queryKey: ['propertyDetails', '1a2b3c4d5e6f'],
    })
    return (
        <div>
            <div>
                <h1>Search</h1>
                <h3>Loading: {search.isPending && 'Loading'}</h3>
                <p>Data: {search.isSuccess && JSON.stringify(search.data)}</p>
                <button onClick={() => search.mutate('city=Ha Noi&guest=2&from=02082024&to=05082024')}>Fetch</button>
            </div>
            <div>
                <h1>Property Detail</h1>
                <h3>Loading: {propertyDetails.isLoading && 'Loading'}</h3>
                <p>
                    Data:{propertyDetails.isSuccess && JSON.stringify(propertyDetails.data)}
                    {propertyDetails.isSuccess &&
                        JSON.stringify(propertyDetails.data)}
                </p>
                <button onClick={() => propertyDetails.refetch()}>Fetch</button>
            </div>
        </div>
    )
}

export default Query
