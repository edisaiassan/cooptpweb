import ImageContext from '@/presentation/pages/context/ImageContext'
import ProductContext from '@/presentation/pages/context/ProductContext'
import { useContext, useEffect, useState } from 'react'
import { SheetCustom } from '../components/SheetCustom'
import { TopBar } from '../components/TopBar'
import { IconButton } from '../buttons/IconButton'
import { Extend } from '../components/breakpoints/Extend'
import TextFormField from '@/presentation/pages/Home/components/input/TextFormField'
import { DatePicker } from '../components/inputs/DatePicker'
import { PickCard } from '../components/card/PickCard'
import { MainButton } from '../buttons/MainButton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Icon } from '../components/Icon'
import { Toaster, toast } from 'sonner'
import { CircularProgress } from '../components/spinners/CircularProgress'
import { add, clear, file_present, save, video_library } from '../constants/Icons'

export const CreateProductSection = ({
    uniqueKey,
    open,
    setOpen,
    closeSheet,
    animation = 'animate__animated animate__fadeInUp animate-fast',
}) => {

    const initialProductData = {
        id: '',
        name: '',
        description: '',
        image: {},
        images: [],
        video: '',
        /* price: '',
        months: '', */
        date: null,
        details: [],
        nameError: '',
        descriptionError: '',
        /* priceError: '',
        monthsError: '', */
    }

    const [enabled, setEnabled] = useState(true)

    const { createProduct, getUniqueIdtoCreate } = useContext(ProductContext)
    const { uploadImages } = useContext(ImageContext)

    /* Text { */
    const [productData, setProductData] = useState(initialProductData)

    const onValidateForm = ({
        name = '', description = '', video = '', /* price = '', months = '',  */date = null
    }) => {
        name = name.trim()
        description = description.trim()
        const formatNumber = (num) => parseFloat(parseFloat(num).toFixed(2)) || 0
        video = video.trim()

        /* price = formatNumber(price)
        months = parseInt(months) || 0 */

        const errors = {
            nameError: !name ? 'Ingrese un nombre al producto' : (name.length < 6 ? 'Producto muy corto' : ''),
            descriptionError: !description ? 'Ingrese una descripción del producto' : (description.length < 6 ? 'Descripción muy corta' : ''),
            /* priceError: !price ? 'Ingrese la cuota' : (isNaN(price) || price <= 0 ? 'La cuota debe ser mayor a 0' : ''),
            monthsError: !months ? 'Ingrese el plazo' : (isNaN(months) || months <= 0 ? 'El plazo debe ser mayor a 0' : '') */
        }

        setProductData(prev => ({
            ...prev,
            ...errors
        }))

        if (errors.nameError || errors.descriptionError /* || errors.priceError || errors.monthsError */) {
            return false
        }

        // ✅ Devuelve los valores corregidos en vez de esperar `setProductData`
        return {
            ...productData,
            name,
            description,
            video,
            /* price,
            months, */
            date
        }
    }


    //Actualizar datos de los inputs
    const onChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    /* Text } */

    const onCreateProduct = async (e) => {
        setEnabled(false)
        e.preventDefault()

        const validatedData = onValidateForm({
            name: productData.name,
            description: productData.description,
            video: productData.video,
            /* price: productData.price,
            months: productData.months, */
            date: productData.date,
        })

        if (!validatedData) {
            setEnabled(true)
            return // Detener la ejecución si hay errores
        }

        const getUniqueId = getUniqueIdtoCreate()

        // Generar los IDs personalizados para la imagen principal y las imágenes adicionales
        const imageUploads = []

        if (productData.image && productData.image.image) {
            imageUploads.push({
                id: `${getUniqueId}/simple`, // ID para la imagen principal
                image: productData.image.image,
            })
        }

        if (productData.images.length > 0) {
            const additionalImages = productData.images.map((img, index) => ({
                id: `${getUniqueId}/${Math.random().toString(36).substring(2, 9)}`,
                image: img.image ? img.image : img, // Asegúrate de acceder correctamente
            }))
            imageUploads.push(...additionalImages)
        }

        // Subir las imágenes a Cloudinary
        const uploadImageResult = await uploadImages({ images: imageUploads })

        if (!uploadImageResult.success) {
            setEnabled(true)
            toast.error(uploadImageResult.message)
            return
        }

        // Asignar las URLs de las imágenes subidas
        if (imageUploads.length > 0) {
            validatedData.image = uploadImageResult.images[0] // Imagen principal
            validatedData.images = uploadImageResult.images.slice(1) // Imágenes adicionales
        }

        validatedData.id = getUniqueId

        const createProductResult = await createProduct(validatedData)
        if (createProductResult.success) {
            closeSheet()
            setEnabled(true)
            toast.success('El producto fue creado')
        } else {
            setEnabled(true)
            toast.error(createProductResult.message)
        }
    }


    const handleImages = ({ maxImg = 1, type = 'single' }) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = allowedTypes.join(',')
        input.multiple = maxImg > 1

        input.onchange = (event) => {
            const files = Array.from(event.target.files).slice(0, maxImg)
            const validFiles = files.filter((file) => allowedTypes.includes(file.type))

            if (validFiles.length === 0) {
                alert('Formato de imagen no permitido. Solo se aceptan JPG, JPEG, PNG y WEBP.')
                return
            }

            setProductData((prev) => {
                if (type === 'single') {
                    return { ...prev, image: { image: validFiles[0] } } // Imagen principal
                } else {
                    const formattedFiles = validFiles.map(file => ({ image: file }))
                    return {
                        ...prev,
                        images: [...prev.images, ...formattedFiles].slice(0, maxImg) // Imágenes adicionales con formato consistente
                    }
                }
            })

        }

        input.click()
    }


    const handleRemoveImage = (type, index = null) => {
        setProductData(prev => {
            if (type === 'single') {
                // Si la imagen es local, revocamos la URL creada
                if (prev.image?.image instanceof File) {
                    URL.revokeObjectURL(prev.image.image)
                }
                return {
                    ...prev,
                    image: {}
                }
            } else if (type === 'all') {
                // Revocar las URLs si son imágenes locales (instancias de File)
                prev.images.forEach(img => {
                    if (img instanceof File) {
                        URL.revokeObjectURL(img)
                    } else if (img?.image instanceof File) {
                        URL.revokeObjectURL(img.image)
                    }
                })
                return {
                    ...prev,
                    images: []
                }
            } else if (type === 'position' && index !== null) {
                const imgToRemove = prev.images[index]
                if (imgToRemove instanceof File) {
                    URL.revokeObjectURL(imgToRemove)
                } else if (imgToRemove?.image instanceof File) {
                    URL.revokeObjectURL(imgToRemove.image)
                }
                const updatedImages = prev.images.filter((_, i) => i !== index)
                return {
                    ...prev,
                    images: updatedImages
                }
            }
            return prev
        })
    }


    const clearField = (fieldName) => {
        setProductData(prev => ({
            ...prev,
            [fieldName]: '',
            //[fieldName]: typeof prev[fieldName] === 'number' ? 0 : '',
            [`${fieldName}Error`]: ''
        }))
    }


    useEffect(() => {
    }, [productData])

    return (
        <SheetCustom
            key={uniqueKey}
            className={`h-full ${animation}`}
            open={open}
            onOpenChange={setOpen}
            closeSheet={enabled && closeSheet}
            topBar={<TopBar
                modifier='rounded-t-2xl'
                titlePosition='justify-start'
                title={<h3>Crear Producto</h3>}
                actions={
                    <IconButton path={clear} onClick={closeSheet} />
                }
            />}
            modifier='bg-white h-full'
            content={
                <form className='flex flex-col gap-4 overflow-auto h-full px-4 pt-4 pb-32'>
                    <Extend modifier='flex flex-col gap-2' min={true}>
                        <div>
                            <TextFormField
                                enabled={enabled}
                                labelText='Nombre'
                                name='name'
                                type='text'
                                value={productData.name}
                                error={productData.nameError != '' && true}
                                onChange={onChange}
                                rightIcon={productData.name &&
                                    <IconButton
                                        path={clear}
                                        onClick={() => clearField('name')}
                                    />
                                }
                            />
                            {productData.nameError && <p className='text-error'>{productData.nameError}</p>}
                        </div>
                        <div>
                            <TextFormField
                                enabled={enabled}
                                labelText='Descripción'
                                name='description'
                                type='text'
                                multiline={true}
                                value={productData.description}
                                error={productData.descriptionError != '' && true}
                                onChange={onChange}
                                rightIcon={productData.description &&
                                    <IconButton
                                        path={clear}
                                        onClick={() => clearField('description')}
                                    />
                                }
                            />
                            {
                                productData.descriptionError && <p className='text-error'>{productData.descriptionError}</p>
                            }
                        </div>
                        <TextFormField
                            enabled={enabled}
                            leftIcon={<Icon path={video_library} />}
                            labelText='Video'
                            name='video'
                            type='text'
                            value={productData.video}
                            onChange={onChange}
                            rightIcon={productData.video &&
                                <IconButton
                                    path={clear}
                                    onClick={() => clearField('video')}
                                />
                            }
                        />
                        <div className='justify-end flex'>
                            <DatePicker
                                enabled={enabled}
                                date={productData.date}
                                setDate={(newDate) => setProductData(prev => ({ ...prev, date: newDate }))}
                            />
                        </div>
                    </Extend>
                    <Extend modifier='px-4'>
                        <h4 className='text-primaryHard'>Subir imágenes</h4>
                        <div className='rounded-2xl p-4 bg-outlineLite flex flex-col justify-center gap-2'>
                            <div className='w-full flex flex-col items-center'>
                                <h4 className='text-center'>Imagen de presentación</h4>
                                <PickCard
                                    enabled={enabled}
                                    label="Imagen de presentación"
                                    url={productData.image?.image && URL.createObjectURL(productData.image.image)}
                                    onClick={() => handleImages({ maxImg: 1, type: 'single' })}
                                    onDeleteImage={() => handleRemoveImage('single')}
                                />
                            </div>
                            <div>
                                <h4>Imágenes detalladas</h4>
                                <div className='w-full rounded-2xl border-2 border-gray-400 bg-white relative h-[367px] flex items-center'>
                                    <ScrollArea className='min-w-full overflow-x-auto'>
                                        <ul className={`w-full justify-center flex ${productData.images.length > 0 ? 'px-4 pt-14 pb-4' : 'p-4'}`}>
                                            <div className='flex gap-2 w-full justify-center'>
                                                {productData.images.length > 0 ?
                                                    productData.images.map((imgData, index) => (
                                                        <PickCard
                                                            enabled={enabled}
                                                            key={index}
                                                            label={`Imagen detallada ${index + 1}`}
                                                            url={URL.createObjectURL(imgData.image)}
                                                            onClick={() => handleImages({ maxImg: 1, type: 'multiple' })}
                                                            onDeleteImage={() => handleRemoveImage('position', index)}
                                                            w='w-56'
                                                            h='h-56'
                                                        />
                                                    ))
                                                    : (
                                                        <MainButton
                                                            enabled={enabled}
                                                            leftIcon={<Icon path={file_present} />}
                                                            onClick={() => handleImages({ maxImg: 4, type: 'multiple' })}
                                                        >
                                                            Selecciona tus imágenes
                                                        </MainButton>
                                                    )}
                                            </div>
                                        </ul>
                                        <ScrollBar orientation='horizontal' className='px-4' />
                                    </ScrollArea>
                                    {productData.images.length > 0 && (
                                        <div className='absolute top-2 right-2 flex flex-wrap gap-2 justify-end'>
                                            <MainButton
                                                enabled={enabled}
                                                onClick={() => handleRemoveImage('all')}
                                                backgroundColor='bg-black'>
                                                Eliminar todo
                                            </MainButton>
                                            {productData.images.length < 4 && <IconButton
                                                enabled={enabled}
                                                path={add} onClick={() => handleImages({ maxImg: 4, type: 'multiple' })}
                                                background='bg-primary'
                                                iconColor='fill-white'
                                            />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Extend>
                    <div className='absolute right-4 bottom-4'>
                        <MainButton
                            enabled={enabled}
                            onClick={onCreateProduct}
                            leftIcon={enabled ? <Icon path={save} /> : <CircularProgress fill='fill-white' fillLite='fill-primary' />
                            } isFab={true} floating={true}>
                            Crear
                        </MainButton>
                    </div>
                    <Toaster richColors />
                </form>
            } />
    )
}  