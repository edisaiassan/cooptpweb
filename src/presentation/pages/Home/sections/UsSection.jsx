import { Extend } from "../../../global/components/breakpoints/Extend"
import { GenericCard } from "../../../global/components/card/GenericCard"
import { YouTubeEmbed } from '../../../global/components/YouTubeEmbed'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const UsSection = () => {

  const products = [
    {
      'image': '/laptop.jpg',
      'title': 'Laptops',
      'subtitle': 'Laptops para estudios y trabajos',
    },
    {
      'image': '/electro.jpg',
      'title': 'Electrodomésticos',
      'subtitle': 'Para el hogar y oficinas',
    },
    {
      'image': '/mobiles.jpg',
      'title': 'Teléfonos',
      'subtitle': 'Teléfonos de todas las gamas',
    },
  ]

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
  ]

  return (
    <div id='us' className='w-full bg-gradient-to-b from-[#009688] to-[#4DB6AC]'>
      <Extend modifier='flex flex-col sm:flex-row gap-4 w-full py-8 px-4'>
        <div className='w-full sm:max-w-[632px] flex flex-col items-center gap-2'>
          <div className='text-center text-white gap-2 flex flex-col'>
            <h3>Somos una cooperativa de productos a crédito</h3>
            <p>Contamos con el respaldo de la UGEL</p>
          </div>
          <YouTubeEmbed videoUrl='https://youtube.com/shorts/E9UDMG2qpUQ?si=DAWPFoUFWxyi-dQW' />
        </div>
        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-1 xl:grid-cols-2 justify-center items-center mx-auto gap-2'>
            {products.map((product, index) => ( 
              <div key={index}>
                <GenericCard
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  opaqueColor='bg-white'
                />
              </div>
            ))}
          </div>
        </div>
      </Extend>
      <div className='px-4 pb-8'>
        <Extend
          modifier='bg-black p-4 text-white flex flex-col items-center justify-center rounded-2xl gap-4'
        >
          <h3 className='text-center'>
            Marcas que confían en nosotros
          </h3>
          <div className='bg-white w-full rounded-2xl text-black'>
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
    </div>

  )
}