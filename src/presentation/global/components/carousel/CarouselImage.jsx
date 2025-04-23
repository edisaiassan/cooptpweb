import { image_not_supported } from '../../constants/Icons'
import { Icon } from '../Icon'
import { MainCarousel } from './MainCarousel'

export const CarouselImage = ({ images, background = 'bg-primaryLite' }) => {
    return (
        <MainCarousel h='h-112' w='w-full' className={`${background} border-2 border-[#006F37] rounded-2xl overflow-hidden`}>
            {images?.length > 0 ? images.map((image, index) => (
                <div
                    key={index}
                    className='w-full h-full'
                >
                    <img src={image} alt={`Slide ${index}`} className='h-full w-full object-contain' />
                </div>
            )) : <div className='flex items-center justify-center h-full w-full'>
                <Icon path={image_not_supported} width='w-full max-w-32' height='h-32' />
            </div>
            }
        </MainCarousel>
    )
}