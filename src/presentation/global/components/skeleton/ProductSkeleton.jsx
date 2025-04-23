import { Extend } from '../breakpoints/Extend'
import { Skeleton } from '../Skeleton'

export const ProductSkeleton = () => {
    return (
        <Extend modifier='px-4 pt-18 pb-4 flex flex-col gap-4'>
            <div className='flex flex-col md:flex md:flex-row gap-2'>
                <Skeleton className='h-112 w-full rounded-2xl' />
                <Skeleton className='w-full h-64 md:min-h-112 md:w-[512px]' />
            </div>
            <Extend min={true}>
                <Skeleton className='w-full h-128 rounded-2xl' />
            </Extend>
        </Extend>
    )
}
