import { Extend } from '@/presentation/global/components/breakpoints/Extend'
import { MainCarousel } from '@/presentation/global/components/carousel/MainCarousel'

export const CarouselSection = () => {
  
  const datas = [
    {
      image: '/assets/productsCollage.png',
      title: '¡LO ÚLTIMO EN TECNOLOGÍA!',
      description: 'Descubre nuestros productos más innovadores, con lo más reciente en avances tecnológicos para mejorar tu día a día.',
      titleColor: 'text-purple-900',
      color: 'bg-purple-500/37',
      styleText: 'italic underline'
    },
    {
      image: '/assets/productsCollage2.png',
      title: '!GARANTÍA DE UN AÑO!',
      description: 'Tu compra está protegida. Disfruta de un año completo de garantía en todos nuestros productos, porque tu tranquilidad es lo primero.',
      titleColor: 'text-blue-900',
      color: 'bg-blue-500/37',
      styleText: 'italic underline'
    },
    {
      image: '/assets/productsCollage3.png',
      title: 'TODO LO QUE USTED NECESITA',
      description: 'Desde lo esencial hasta lo extraordinario, contamos con una amplia gama de productos pensados para satisfacer todas sus necesidades.',
      titleColor: 'text-indigo-900',
      styleText: 'italic underline',
      color: 'bg-indigo-500/37',
    }
  ]

  return (
    <div className='bg-gradient-to-b from-[#006F37] to-transparent pt-14'>
      <Extend>
        <MainCarousel w='w-full' h='h-112' className='p-4 rounded-2xl' loop={true} auto={true} duration={5000}>
          {
            datas.map((data, index) => (
              <CarouselItem
                key={index}
                image={data.image}
                title={data.title}
                titleColor={data.titleColor}
                description={data.description}
                styleText={data.styleText}
                color={data.color}
                left={index % 2 !== 0}
              />
            ))
          }
        </MainCarousel>
      </Extend>
    </div>
  )
}

export const CarouselItem = ({ title, titleColor, description, image, color, styleText, left = false }) => {
  return (
    <div className={`flex flex-col md:flex-row ${left ? 'md:flex-row-reverse' : ''} ${color} rounded-2xl p-4 h-full`}>

      <div className='w-full md:w-1/2 px-8 flex items-center'>
        <div className='bg-white/75 p-4 rounded-2xl'>
          <h2 className={`${titleColor ?? 'text-primaryHard'} font-bold line-clamp-3 ${styleText}`}>{title}</h2>
          <h4>{description}</h4>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <img className='w-full h-full object-contain' src={image} alt="image" />
      </div>

    </div>
  )
}