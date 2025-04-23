import { SheetCrudSection } from '@/presentation/pages/Home/sections/SheetCrudSection'
import { Extend } from '../components/breakpoints/Extend'
import TextFormField from '@/presentation/pages/Home/components/input/TextFormField'
import { useContext, useEffect, useState } from 'react'
import { IconButton } from '../buttons/IconButton'
import { Icon } from '../components/Icon'
import { DatePicker } from '../components/inputs/DatePicker'
import { PickCard } from '../components/card/PickCard'
import { MainButton } from '../buttons/MainButton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import ProductContext from '@/presentation/pages/context/ProductContext'
import ImageContext from '@/presentation/pages/context/ImageContext'
import { CircularProgress } from '../components/spinners/CircularProgress'
import { toast } from 'sonner'
import { add, clear, file_present, save, video_library } from '../constants/Icons'

const initialProductData = {
    id: '',
    name: '',
    description: '',
    image: null,
    images: [],
    video: '',
    date: null,
    details: [],
    nameError: '',
    descriptionError: '',
    priceError: '',
    monthsError: ''
}

export const EditProductSection = ({
    productData = {},
    keyValue,
    open,
    setOpen,
    closeSheet,
    animation
}) => {

    const [enabled, setEnabled] = useState(true)
    const { editProduct } = useContext(ProductContext)
    const { uploadImages, deleteImages } = useContext(ImageContext)

    const [originalImage, setOriginalImage] = useState(productData.image || null)
    const [originalImages, setOriginalImages] = useState(productData.images || [])

    const [productDataState, setProductData] = useState({
        ...initialProductData,
        ...productData,
        date: productData.date ? new Date(productData.date * 1000) : null
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setProductData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearField = (fieldName) => {
        setProductData(prev => ({
            ...prev,
            [fieldName]: '',
            [`${fieldName}Error`]: ''
        }))
    }

    const handleRemoveImage = (type, index = null) => {
        setProductData(prev => {
            if (type === 'single') {
                return { ...prev, image: null }
            }

            const updatedImages = prev.images.filter((_, i) => i !== index)
            return { ...prev, images: updatedImages }
        })
    }

    const handleReplaceImageLocal = (file, type, index = null) => {
        const newImage = {
            file,
            preview: URL.createObjectURL(file)
        }

        setProductData(prev => {
            if (type === 'single') {
                return {
                    ...prev,
                    image: {
                        ...newImage,
                        id: prev.image?.id || `${prev.id}/simple`
                    }
                }
            }

            const updatedImages = [...prev.images]
            updatedImages[index] = {
                ...newImage,
                id: prev.images[index]?.id || `${prev.id}/${Math.random().toString(36).substring(2, 9)}`
            }

            return { ...prev, images: updatedImages }
        })
    }

    const getDeletedIds = () => {
        const deleted = []

        // Imagen principal
        if (originalImage && (!productDataState.image || originalImage.id !== productDataState.image.id)) {
            deleted.push(originalImage.id)
        }

        // Imágenes detalladas
        originalImages.forEach((origImg) => {
            const existsInNew = productDataState.images.find(img => img?.id === origImg.id)
            if (!existsInNew) {
                deleted.push(origImg.id)
            }
        })

        return deleted
    }

    const onSaveProduct = async () => {
        setEnabled(false)
        const deletedIds = getDeletedIds()

        // Eliminar imágenes en Cloudinary si es necesario
        if (deletedIds.length > 0) {
            await deleteImages(deletedIds)
        }

        // Preparar imágenes para subir
        const imagesToUpload = []

        // Imagen de presentación
        if (productDataState.image?.file) {
            imagesToUpload.push({
                image: productDataState.image.file,
                id: `${productDataState.id}/simple`,
                type: 'single'
            })
        }

        // Imágenes detalladas
        const filteredImages = productDataState.images.filter(img => img !== null)

        filteredImages.forEach((img, index) => {
            if (img?.file) {
                imagesToUpload.push({
                    image: img.file,
                    id: `${productDataState.id}/${Math.random().toString(36).substring(2, 9)}`,
                    type: 'multiple',
                    index
                })
            }
        })

        // Subir imágenes nuevas si hay
        let uploadedImages = []
        if (imagesToUpload.length > 0) {
            const uploadedResults = await uploadImages({ images: imagesToUpload })
            if (!uploadedResults.success) {
                setEnabled(true)
                toast.error('Error al subir las imágenes')
                return
            }
            uploadedImages = uploadedResults.images
        }

        // Asignar las imágenes subidas
        let singleImage = productDataState.image?.image ? productDataState.image : null
        const multipleImages = [...filteredImages]

        imagesToUpload.forEach((item, i) => {
            const uploaded = uploadedImages[i]
            if (item.type === 'single') {
                singleImage = uploaded
            } else if (item.type === 'multiple') {
                multipleImages[item.index] = uploaded
            }
        })

        // Limpiar imágenes eliminadas o vacías
        const cleanedImages = multipleImages.filter(img => img && img.image)

        // Actualizar en Firebase
        try {
            const updatedProductData = {
                ...productDataState,
                image: singleImage ? singleImage : null,
                images: cleanedImages
            }

            const result = await editProduct(updatedProductData)

            if (result.success) {
                setEnabled(true)
                toast.success('Producto actualizado correctamente')
                closeSheet()
            } else {
                setEnabled(true)
                toast.error(`Error actualizando el producto: ${result.message}`)
            }
        } catch (error) {
            setEnabled(true)
            toast.error(`Error actualizando el producto: ${error}`)
        }
    }

    const fileSelector = (type, index = null) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        if (type === 'single') {
            input.id = `${productDataState.id}$Simple`
        } else if (type === 'multiple' && index !== null) {
            input.id = `${productDataState.id}/${Math.random().toString(36).substring(2, 9)}`
        }

        input.onchange = (e) => {
            const file = e.target.files[0]
            if (file) {
                handleReplaceImageLocal(file, type, index)
            }
        }
        input.click()
    }

    useEffect(() => { }, [productDataState, originalImages])

    return (
        <SheetCrudSection
            key={keyValue}
            title='Editar Producto'
            open={open}
            onOpenChange={setOpen}
            closeSheet={enabled && closeSheet}
            animation={animation}
            content={
                <>
                    <Extend modifier='flex flex-col gap-2' min={true}>
                        <div>
                            <TextFormField
                                labelText='Nombre'
                                name='name'
                                type='text'
                                value={productDataState.name}
                                error={productDataState.nameError !== ''}
                                onChange={onChange}
                                rightIcon={productDataState.name &&
                                    <IconButton
                                        enabled={enabled}
                                        path={clear}
                                        onClick={() => clearField('name')} />
                                }
                            />
                            {productDataState.nameError && <p className='text-error'>{productDataState.nameError}</p>}
                        </div>
                        <div>
                            <TextFormField
                                labelText='Descripción'
                                name='description'
                                type='text'
                                multiline={true}
                                value={productDataState.description}
                                error={productDataState.descriptionError !== ''}
                                onChange={onChange}
                                rightIcon={productDataState.description &&
                                    <IconButton
                                        enabled={enabled}
                                        path={clear}
                                        onClick={() => clearField('description')} />
                                }
                            />
                            {productDataState.descriptionError && <p className='text-error'>{productDataState.descriptionError}</p>}
                        </div>
                        <TextFormField
                            leftIcon={<Icon path={video_library} />}
                            labelText='Video'
                            name='video'
                            type='text'
                            value={productDataState.video}
                            onChange={onChange}
                            rightIcon={productDataState.video &&
                                <IconButton
                                    enabled={enabled}
                                    path={clear}
                                    onClick={() => clearField('video')} />
                            }
                        />
                        <div className='justify-end flex'>
                            <DatePicker
                                enabled={enabled}
                                date={productDataState.date}
                                setDate={(newDate) => setProductData(prev => ({ ...prev, date: newDate }))}
                            />
                        </div>
                    </Extend>

                    <Extend modifier='px-4'>
                        <h4 className='text-primaryHard'>Subir Imágenes</h4>
                        <div className='rounded-2xl p-4 bg-outlineLite flex flex-col justify-center gap-4'>
                            <div className='w-full flex flex-col items-center gap-2'>
                                <h4 className='text-center'>Imagen de presentación</h4>
                                <PickCard
                                    enabled={enabled}
                                    label="Imagen de presentación"
                                    url={productDataState.image?.preview || productDataState.image?.image}
                                    onClick={() => fileSelector('single')}
                                    onDeleteImage={() => handleRemoveImage('single')}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h4>Imágenes detalladas</h4>
                                <div className='w-full rounded-2xl border-2 border-gray-400 bg-white relative h-[367px] flex items-center'>
                                    <ScrollArea className='min-w-full overflow-x-auto'>
                                        <ul className={`w-full justify-center flex ${productDataState.images.length > 0 ? 'px-4 pt-14 pb-4' : 'p-4'}`}>
                                            <div className='flex gap-2 w-full justify-center'>
                                                {productDataState.images.length > 0 ? productDataState.images.map((img, index) => (
                                                    <PickCard
                                                        enabled={enabled}
                                                        key={index}
                                                        label={`Imagen ${index + 1}`}
                                                        url={img?.preview || img?.image}
                                                        onClick={() => fileSelector('multiple', index)}
                                                        onDeleteImage={() => handleRemoveImage('multiple', index)}
                                                        w='w-56'
                                                        h='h-56'
                                                    />
                                                )) : <MainButton
                                                    enabled={enabled}
                                                    leftIcon={<Icon path={file_present} />}
                                                    onClick={() => {
                                                        const input = document.createElement('input')
                                                        input.type = 'file'
                                                        input.accept = 'image/*'
                                                        input.multiple = true

                                                        input.onchange = (e) => {
                                                            const files = Array.from(e.target.files)
                                                            const remainingSlots = 4 - productDataState.images.length

                                                            const selectedFiles = files.slice(0, remainingSlots)

                                                            const newImages = selectedFiles.map(file => ({
                                                                file,
                                                                preview: URL.createObjectURL(file)
                                                            }))

                                                            setProductData(prev => ({
                                                                ...prev,
                                                                images: [...prev.images, ...newImages]
                                                            }))
                                                        }

                                                        input.click()
                                                    }}
                                                    background='bg-primary'
                                                    iconColor='bg-white'
                                                >Selecciona tus imágenes</MainButton>
                                                }

                                                {/* Mostrar botón para añadir nueva imagen solo si hay menos de 4 */}
                                            </div>
                                        </ul>
                                        <ScrollBar orientation='horizontal' className='px-4' />
                                    </ScrollArea>
                                    {productDataState.images.length > 0 && (
                                        <div className='absolute top-2 right-2 flex flex-wrap gap-2 justify-end'>
                                            <MainButton
                                                enabled={enabled}
                                                onClick={() => setProductData(prev => ({ ...prev, images: [] }))} backgroundColor='bg-black'
                                            >Eliminar todo
                                            </MainButton>
                                            <IconButton
                                                enabled={enabled}
                                                path={add}
                                                onClick={() => {
                                                    const input = document.createElement('input')
                                                    input.type = 'file'
                                                    input.accept = 'image/*'
                                                    input.multiple = true

                                                    input.onchange = (e) => {
                                                        const files = Array.from(e.target.files)
                                                        const remainingSlots = 4 - productDataState.images.length

                                                        const selectedFiles = files.slice(0, remainingSlots)

                                                        const newImages = selectedFiles.map(file => ({
                                                            file,
                                                            preview: URL.createObjectURL(file)
                                                        }))

                                                        setProductData(prev => ({
                                                            ...prev,
                                                            images: [...prev.images, ...newImages]
                                                        }))
                                                    }

                                                    input.click()
                                                }}
                                                background='bg-primary'
                                                iconColor='fill-white'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Extend>
                </>
            }
            fabs={
                <MainButton
                    enabled={enabled}
                    onClick={onSaveProduct}
                    leftIcon={enabled ? <Icon path={save} /> : <CircularProgress fill='fill-white' fillLite='fill-primary' />}
                    isFab={true} floating={true}>Guardar</MainButton>
            }
        />
    )
}