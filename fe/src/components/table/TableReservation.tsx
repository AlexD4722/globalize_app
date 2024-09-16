import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from '@nextui-org/table'
import { useQuery } from '@tanstack/react-query'
interface ItemBooking {
    id: string
    name: string
    dateCheckIn: string
    dateCheckOut: string
    price: String
    capacity: number
    status: string
}
const data: ItemBooking[] = [
    {
        id: '#re1293mas1',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas2',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
    {
        id: '#re1293mas3',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
        status: 'Booked',
    },
]

const columns = [
    {
        key: 'dateCheckIn',
        label: 'CheckIn',
    },
    {
        key: 'dateCheckOut',
        label: 'CheckOut',
    },
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'price',
        label: 'Price',
    },
    {
        key: 'capacity',
        label: 'Capacity',
    },
    {
        key: 'status',
        label: 'Status',
    },
]

export default function TableReservation() {
    const reservationsQuery = useQuery<unknown, Error, ItemBooking[]>({
        queryKey: ['reservations', 'guest'],
    })

    return (
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
                            {(columnKey) => (
                                <TableCell>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            ) : (
                <TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
            )}
        </Table>
    )
}
