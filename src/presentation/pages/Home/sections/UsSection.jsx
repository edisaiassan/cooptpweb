import { Icon } from "@/presentation/global/components/Icon"
import { Extend } from "../../../global/components/breakpoints/Extend"
import { arrow_right } from "@/presentation/global/constants/Icons"
import { useNavigate } from "react-router-dom"
import { Slide } from "react-awesome-reveal"

export const UsSection = () => {

  const navigate = useNavigate()

  const onProducts = () => {
    navigate('/product')
  }

  const products = [
    {
      'image': '/laptop.png',
      'title': 'Laptops',
      'gradient': 'bg-gradient-to-b from-green-400 to-green-500',
      'subtitle': 'Laptops para estudios y trabajos',
    },
    {
      'image': '/electro.png',
      'title': 'Electrodomésticos',
      'gradient': 'bg-gradient-to-b from-orange-400 to-orange-500',
      'subtitle': 'Para el hogar y oficinas',
    },
    {
      'image': '/mobiles.png',
      'title': 'Teléfonos',
      'gradient': 'bg-gradient-to-b from-indigo-400 to-indigo-500',
      'subtitle': 'Teléfonos de todas las gamas',
    },
  ]

  return (
    <div id='us' className='w-full bg-gradient-to-b from-purple-100 to-purple-200'>
      <Extend modifier='px-4 py-8 flex flex-col gap-4'>
        <h3>Todo lo que buscas <span className='text-3xl text-purple-900'>¡LO TENEMOS AQUÍ!</span></h3>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 rounde'>
          {
            products.map((product, index) => (
              <Slide fraction={1} delay={index * 300} triggerOnce direction='up' key={index}>
                <div className='flex flex-col items-center'>
                  <img
                    className='mb-[-128px] drop-shadow-lg w-full max-w-64 h-64 object-contain'
                    src={product.image} alt={`${index}product`} />
                  <div className={`${product.gradient} rounded-2xl pt-32 px-4 pb-8 shadow-lg w-full text-center text-white`}>
                    <h3>{product.title}</h3>
                    <h4>{product.subtitle}</h4>
                  </div>
                </div>
              </Slide>
            ))
          }
        </div>
        <Slide fraction={1} delay={1000} duration={1000} triggerOnce>
          <Extend min={true} modifier='w-full bg-white rounded-2xl p-4 flex gap-2 border-2 border-gray-400 shadow-2xl items-center transition-transform duration-300 ease-in-out hover:scale-[97%] active:scale-[90%] break-words cursor-pointer'
            onClick={onProducts}
          >
            <img className='w-full max-w-10 h-10 object-contain' src='/3dSearch.png' alt='3dSeacrh' />
            <h4 className='w-full'>Descubre más productos tocando aquí</h4>
            <Icon path={arrow_right} height='h-10' width='w-10' />
          </Extend>
        </Slide>
      </Extend>
    </div>

  )
}