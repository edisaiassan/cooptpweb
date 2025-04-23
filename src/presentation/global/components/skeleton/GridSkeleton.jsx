import { Skeleton } from "../Skeleton"

export const GridSkeleton = () => {

    return (
        <ul className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full'>
            {
                new Array(8).fill(0).map((_, i) => (
                    <Skeleton key={i} className='w-full h-64'/>
                ))
            }
        </ul>
    )
}
