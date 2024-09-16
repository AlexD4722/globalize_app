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
interface Invoice {
    number: string
    name: string
    dateCheckIn: string
    dateCheckOut: string
    price: string
    capacity: number
}
const data: Invoice[] = [
    {
        number: '#IV0011',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
    },
    {
        number: '#IV0012',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
    },
    {
        number: '#IV0013',
        name: 'Deluxe Queen Room',
        dateCheckIn: '2025-07-04',
        dateCheckOut: '2025-07-09',
        price: '$100',
        capacity: 2,
    },
]

const columns = [
    {
        key: 'number',
        label: 'Code',
    },
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
]

export default function TableInvoice() {
    const invoicesQuery = useQuery<unknown, Error, Invoice[]>({
        queryKey: ['invoices'],
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
            {invoicesQuery.isSuccess &&
            invoicesQuery.data &&
            invoicesQuery.data.length > 0 ? (
                <TableBody items={invoicesQuery.data}>
                    {(item) => (
                        <TableRow key={item.number}>
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
