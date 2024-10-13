import clsx from 'clsx'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { GeoLocationFill } from '../svg'
import { iImage } from '../type'
import { useRouter } from 'next/router'

interface ImageProps extends iImage, HTMLAttributes<HTMLDivElement> {}

export default function Destination({ ...props }: ImageProps) {
    const { src, label, to, ...prop } = props
    const router = useRouter()

    return (
        <div
            className={clsx('hover:cursor-pointer group', prop.className)}
            onClick={() => {router.push(to)}}
            {...prop}
        >
            <div className="flex items-center justify-center rounded-2xl overflow-hidden">
                <Image
                    src={src}
                    alt={label}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover aspect-square"
                />
            </div>
            <div className="mt-2 flex items-center">
                <div className="mr-2 group-hover:text-theme">
                    <GeoLocationFill />
                </div>
                <h3 className="text-lg font-medium group-hover:text-theme">
                    {label}
                </h3>
            </div>
        </div>
    )
}
