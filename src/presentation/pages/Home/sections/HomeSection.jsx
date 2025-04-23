/* import { useNavigate } from 'react-router-dom'
import { MainButton } from '../../../global/buttons/MainButton'
import { Extend } from '../../../global/components/breakpoints/Extend'

export const HomeSection = () => {

    const navigate = useNavigate()

    const onGoProduct = () => {
        navigate('/product')
    }

    return (
        <Extend>
            <div className='md:grid md:grid-cols-2 items-center animate__animated animate__backInLeft'>
                <div className='flex flex-col justify-center p-4 animate__animated animate__fadeIn animate__delay-1s gap-4'>
                    <h1>
                        LOS MEJORES PRODUCTOS A LOS MEJORES PRECIOS
                    </h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem quod ratione non eaque, aut nulla, tempora ipsum ullam delectus at officia odio repudiandae dolore vel quae consequatur sequi aperiam ipsa.
                    </p>
                    <div className='flex justify-center md:justify-start'>
                        <MainButton onClick={onGoProduct}>Ver todos los productos</MainButton>
                    </div>
                </div>
                <div className='relative w-full max-w-[512px] h-[400px] mx-auto flex items-center justify-center px-4 animate__animated animate__pulse animate__delay-1s p-4 drop-shadow-2xl'>
                    <img
                        src='assets/fullLogo.png'
                        alt='Imagen'
                        className='min-w-full h-full object-contain'
                    />
                </div>
            </div>
        </Extend>
    )
}
 */

import { useNavigate } from 'react-router-dom'
import { MainButton } from '../../../global/buttons/MainButton'
import { Extend } from '../../../global/components/breakpoints/Extend'

export const HomeSection = () => {

    const navigate = useNavigate()

    const onGoProduct = () => {
        navigate('/product')
    }

    return (
        <Extend id='home'>
            <div className='md:grid md:grid-cols-2 items-center'>
                <div className='flex flex-col justify-center p-4 gap-4'>
                    <h1>
                        LOS MEJORES PRODUCTOS A LOS MEJORES PRECIOS
                    </h1>
                    <p>
                        Somos una cooperativa comprometida con ofrecer tecnología de calidad al por menor, a través de convenios estratégicos con instituciones como la UGEL y la Policía Nacional del Perú (PNP). Nos especializamos en la venta de equipos informáticos, motores acuáticos y más, brindando soluciones innovadoras y accesibles para satisfacer las necesidades de nuestros clientes. Con nosotros, encuentras lo que necesitas, cuando lo necesitas. ¡Tu aliado tecnológico confiable!
                    </p>
                    <div className='flex justify-center md:justify-start'>
                        <MainButton onClick={onGoProduct}>Ver todos los productos</MainButton>
                    </div>
                </div>
                <div className='relative w-full max-w-[512px] h-[400px] mx-auto flex items-center justify-center px-4 p-4 drop-shadow-2xl'>
                    <img
                        src='assets/fullLogo.png'
                        alt='Imagen'
                        className='min-w-full h-full object-contain'
                    />
                </div>
            </div>
        </Extend>
    )
}
