import { useContext, useEffect, useState } from "react"
import { SheetCrudSection } from "@/presentation/pages/Home/sections/SheetCrudSection"
import { Extend } from "../components/breakpoints/Extend"
import { MainButton } from "../buttons/MainButton"
import { Icon } from "../components/Icon"
import ProductContext from "@/presentation/pages/context/ProductContext"
import ImageContext from "@/presentation/pages/context/ImageContext"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { CircularProgress } from "../components/spinners/CircularProgress"
import { delete_forever } from "../constants/Icons"

export const DeleteProductSection = ({
    keyValue,
    id,
    image,
    images,
    open,
    setOpen,
    closeSheet,
    animation
}) => {

    const [enabled, setEnabled] = useState(true)
    const { deleteProduct } = useContext(ProductContext)
    const { deleteImages, deleteFolders } = useContext(ImageContext)
    const navigate = useNavigate()

    const getValidImages = (image, images) => [
        ...(image?.id?.trim() ? [image.id] : []),
        ...(Array.isArray(images) && images.length > 0 ? images.map((img) => img.id) : [])
    ]

    const onDelete = async ({ id, images }) => {
        setEnabled(false)
        if (images.length > 0) {
            const deleteImagesResult = await deleteImages(images)

            if (!deleteImagesResult.success) {
                toast.error(deleteImagesResult.message)
                setEnabled(true)
                return
            }

            const deleteFolderResult = await deleteFolders([`presentation/${id}`])
            if (!deleteFolderResult.success) {
                toast.error(deleteFolderResult.message)
                setEnabled(true)
                return
            }
        }

        const deleteProductResult = await deleteProduct(id)
        if (!deleteProductResult.success) {
            toast.error(deleteProductResult.message)
            setEnabled(true)
            return
        }
        setEnabled(true)
        navigate(-1)
        toast.success(deleteProductResult.message)
    }

    useEffect(() => { },
        [enabled]
    )

    return (
        <SheetCrudSection
            key={keyValue}
            title='¿Deseas eliminar este producto?'
            open={open}
            onOpenChange={setOpen}
            closeSheet={enabled && closeSheet}
            animation={animation}
            h='max-h-fit max-w-128'
            content={
                <>
                    <Extend min={true} modifier='flex justify-center'>
                        {enabled ? <p className='text-center pb-4'>Al dar aceptar estás aceptanto eliminar este producto</p> : <CircularProgress w='h-10' h='w-10'></CircularProgress>}
                    </Extend>
                </>
            }
            fabs={
                <>
                    <MainButton
                        enabled={enabled}
                        onClick={() => onDelete({
                            id: id,
                            images: getValidImages(image, images)
                        })}
                        backgroundColor='bg-error'
                        leftIcon={<Icon path={delete_forever} />}
                        isFab={true} floating={true}>
                        Eliminar
                    </MainButton>
                    <MainButton
                        enabled={enabled}
                        onClick={closeSheet}
                        isFab={true} floating={true}>
                        Cancelar
                    </MainButton>
                </>
            }
        />
    )
}
