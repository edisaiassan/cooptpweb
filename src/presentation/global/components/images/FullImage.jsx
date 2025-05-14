import { CarouselImage } from "../carousel/CarouselImage"

export const FullImage = ({images}) => {
  return (
    <CarouselImage images={product.images?.map(image => image.image)} h='h-full' background='bg-black'>
    </CarouselImage>
  )
}