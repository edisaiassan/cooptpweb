import { ScrollBar } from '@/components/ui/scroll-area'
import { Extend } from '@/presentation/global/components/breakpoints/Extend'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import React from 'react'

export const BrandsSection = () => {
    const brands = [
        '/brands/samsung.png',
        '/brands/mabe.png',
        '/brands/lenovo.png',
        '/brands/oster.png',
        '/brands/hp.png',
        '/brands/lg.png',
        '/brands/honor.png',
        '/brands/indurama.png',
        '/brands/epson.png',
        '/brands/paraiso.jpg',
        '/brands/bossko.webp',
        '/brands/redmi.webp',
        '/brands/iphone.png',
    ]

    return (
        <div className='bg-gradient-to-b from-green-100 to-green-200'
        >
            <Extend modifier='px-4 py-8 text-white flex flex-col items-center justify-center gap-4'>
                <h3 className='text-center text-black'>
                    MARCAS QUE <span className='text-3xl text-primaryHard'>CONFÍAN EN NOSOTROS</span>
                </h3>
                <div className='bg-white w-full rounded-2xl text-black overflow-hidden'>
                    <ScrollArea className='min-w-full overflow-x-auto'>
                        <ul className='w-full justify-center flex'>
                            <div className='flex gap-2'>
                                {
                                    brands.map((brand, index) => (
                                        <img
                                            key={index}
                                            className='p-4 object-contain h-40 w-40'
                                            src={brand}
                                            alt={`image${index}`} />
                                    )
                                    )
                                }
                            </div>

                        </ul>
                        <ScrollBar orientation="horizontal" className='px-4' />
                    </ScrollArea>
                </div>
            </Extend>
        </div>
    )
}
