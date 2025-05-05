import { useState, useEffect, useContext, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { MainButton } from '../../../../global/buttons/MainButton'
import { Extend } from '../../../../global/components/breakpoints/Extend'
import { Icon } from '../../../../global/components/Icon.jsx'
import { YouTubeEmbed } from '@/presentation/global/components/YouTubeEmbed'
import ProductContext from '@/presentation/pages/context/ProductContext'
import { Toaster, toast } from 'sonner'
import { EditProductSection } from '@/presentation/global/section/EditProductSection'
import emptyProductsLottie from '../../../../animations/emptyProducts.json'
import OpenExternalContext from '@/presentation/pages/context/OpenExternalContext'
import { MessageLoaded } from '@/presentation/global/components/MessageLoaded'
import { ProductSkeleton } from '@/presentation/global/components/skeleton/ProductSkeleton'
import { DeleteProductSection } from '@/presentation/global/section/DeleteProductSection'
import { CarouselImage } from '@/presentation/global/components/carousel/CarouselImage'
import { delete_forever, edit, linkCopy, phone, share, shopping_bag, videocam_off, whatsApp } from '@/presentation/global/constants/Icons'
import { FindUsSection } from '@/presentation/pages/Home/sections/FindUsSection'
import { IconButton } from '@/presentation/global/buttons/IconButton'

const CLOUD_NAME = "dq9dl3jv8"
const UPLOAD_PRESET = "presentation"

export const ProductPage = () => {
    const { user } = useContext(AuthContext)
    const { getProductStream } = useContext(ProductContext)
    const { onOpenWhatsApp, onMakeCall, shareToWhatsApp, copyLink } = useContext(OpenExternalContext)
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) navigate(-1)
        const unsubscribe = getProductStream(id, (result) => {
            if (result.success) {
                setProduct(result.data)
                setLoading(false)
            } else {
                setError(result.message)
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [id, getProductStream])


    /* Sheet elimninar */
    const [openDelete, setOpenDeleteSheet] = useState(false)
    const [animateDeleteClose, setAnimateDeleteClose] = useState(false)

    const onOpenDeleteSheet = useCallback(() => {
        setAnimateDeleteClose(false)
        setOpenDeleteSheet(true)
    }, [])

    const closeDeleteSheet = useCallback(() => {
        setAnimateDeleteClose(true)
        setTimeout(() => {
            setOpenDeleteSheet(false)
        }, 400)
    }, [])
    /* Sheet elimninar */


    /* Sheet open and close */
    const [openEdit, setOpenEditSheet] = useState(false)
    const [animateEditClose, setAnimateEditClose] = useState(false)

    const onOpenEditSheet = useCallback(() => {
        setAnimateEditClose(false)
        setOpenEditSheet(true)
    }, [])

    const closeEditSheet = useCallback(() => {
        setAnimateEditClose(true)
        setTimeout(() => {
            setOpenEditSheet(false)
        }, 400)
    }, [])
    /* Sheet open and close */

    const location = useLocation()

    const onOpenWhatsAppAndMessage = async (productName = '') => {
        await onOpenWhatsApp(`¡Hola! Estoy interesado/a en el producto "${productName}". ¿Podrías confirmarme si está disponible? Me gustaría acercarme para verlo o concretar la compra.\n${window.location.origin}${location.pathname}`)
    }

    const onShareCurrentProduct = async (productName = '') => {
        await shareToWhatsApp(`He encontrado esto en la Cooperativa TP! ¿Qué te parece? "${productName}".\n${window.location.origin}${location.pathname}`)
    }

    const onCopyLink = async () => {
        const result = await copyLink(`${window.location.origin}${location.pathname}`)
        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    if (loading) {
        return <ProductSkeleton />
    }

    if (error) return <Extend modifier={`px-4 pt-18 'pb-4' flex flex-col gap-4 min-h-screen justify-center`}>
        <MessageLoaded
            path={emptyProductsLottie}
            title='Error al cargar el producto'
            description={error}
        />
    </Extend>

    if (!product) return <Extend modifier={`px-4 pt-18 'pb-4' flex flex-col gap-4 min-h-screen justify-center`}>
        <MessageLoaded
            path={emptyProductsLottie}
            title='Producto no encontrado'
            description='Este producto ya no existe'
        />
    </Extend>

    return <div className={user && 'pb-22'}>
        <Extend modifier={`px-4 pt-18 pb-4 flex flex-col gap-4`}>
            <div className='flex flex-col md:flex md:flex-row gap-2'>
                <CarouselImage images={product.images?.map(image => image.image)} />
                <div className='w-full md:min-h-112 h-fit md:w-[512px] p-4 bg-outlineLite rounded-2xl flex flex-col justify-between gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-wrap justify-end items-center gap-2'>
                            <MainButton
                                backgroundColor='bg-tertiaryLite'
                                textColor='text-tertiaryHard'
                                iconColor='fill-[#004D40]'
                                onClick={onCopyLink}
                                rightIcon={<Icon path={linkCopy} />}
                            >Copiar enlace</MainButton>
                            <IconButton
                                path={whatsApp}
                                background='bg-whatsApp'
                                iconColor='fill-white'
                                onClick={() => onShareCurrentProduct(product.name)}
                            />
                        </div>
                        {product.name && <h3 className='text-2xl text-green-900 overflow-hidden'>{product.name}</h3>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='w-full h-[2px] bg-outline rounded-full'></div>
                        <MainButton
                            onClick={() => onOpenWhatsAppAndMessage(product.name)}
                            leftIcon={<Icon path={shopping_bag} height='h-10' width='w-10' />}
                        >
                            ¡QUIERO ESTE PRODUCTO!
                        </MainButton>
                        <MainButton
                            onClick={onMakeCall}
                            leftIcon={<Icon path={phone} height='h-10' width='w-10' />}
                            backgroundColor='bg-tertiary'
                        >
                            LLAMAR
                        </MainButton>
                    </div>
                </div>
            </div>
            <Extend min={true} modifier='w-full rounded-2xl flex flex-col sm:flex-row gap-4 bg-secondaryLite p-4 items-center'>
                <div className='flex flex-col bg-white w-full rounded-2xl p-4 gap-2'>
                    <h3 className='text-primary text-center'>Descubre más a cerca de este producto</h3>
                    <p>{product.description}</p>
                </div>
                {product.video && <YouTubeEmbed videoUrl={product.video} width='max-w-[640px] sm:max-w-[320px]' />}
            </Extend>
        </Extend>
        <FindUsSection />
        {user && <div className='fixed bottom-4 right-4 z-50 flex flex-wrap gap-2 justify-end'>
            <MainButton
                leftIcon={<Icon path={delete_forever} />}
                isFab={true}
                floating={true}
                backgroundColor='bg-error'
                onClick={() => onOpenDeleteSheet()}
            >Eliminar</MainButton>
            <MainButton
                onClick={() => onOpenEditSheet()}
                leftIcon={<Icon path={edit} />}
                isFab={true}
                floating={true}
                backgroundColor='bg-secondary'
            >Editar</MainButton>
        </div>}
        {openDelete && (
            <DeleteProductSection
                keyValue={animateDeleteClose}
                id={id}
                image={product.image}
                images={product.images}
                open={openDelete}
                onOpenChange={setOpenDeleteSheet}
                closeSheet={closeDeleteSheet}
                productData={product}
                animation={`animate__animated animate-fast ${animateDeleteClose ? 'animate__fadeOutDown' : 'animate__fadeInUp'
                    }`}
            />
        )}
        {openEdit && (
            <EditProductSection
                keyValue={animateEditClose}
                animation={`animate__animated animate-fast ${animateEditClose ? 'animate__fadeOutDown' : 'animate__fadeInUp'
                    }`}
                open={openEdit}
                onOpenChange={setOpenEditSheet}
                closeSheet={closeEditSheet}
                productData={product}
            />
        )}
        <Toaster richColors />
    </div>
}