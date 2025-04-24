import axios from 'axios'
import { createContext } from 'react'

const ImageContext = createContext()

const CLOUD_NAME = 'dq9dl3jv8'
const UPLOAD_PRESET = 'presentation_presetname'
const url = 'https://cooptpbackend.onrender.com/'

export const ImageProvider = ({ children }) => {

    const uploadImages = async ({ images }) => {
        try {
            const uploadedImages = await Promise.all(
                images.map(async ({ image, id }) => {
                    const formData = new FormData()
                    formData.append('file', image) // 📌 Archivo real
                    formData.append('upload_preset', UPLOAD_PRESET)
                    formData.append('folder', 'presentation')

                    // Si hay un ID personalizado, lo usamos
                    if (id) {
                        formData.append('public_id', id)
                    }

                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                        formData
                    )

                    return {
                        id: response.data.public_id,
                        image: response.data.secure_url
                    }
                })
            )

            return {
                success: true,
                images: uploadedImages
            }

        } catch (e) {
            console.log(`Error 🐱‍👤 ${e}`)
            return {
                success: false,
                message: e.response?.data?.error?.message || e.message
            }
        }
    }

    const deleteImages = async (ids) => {
        try {
            await axios.post(`${url}delete-images`,
                { id: ids },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            return { success: true, message: 'Imágenes eliminadas' }

        } catch (e) {
            if (e.response) {
                console.log('❌ Error del servidor', e.response.data)
                return { success: false, message: 'Error del servidor' }
            } else {
                console.log('💣 Error de red o desconocido', e.message)
                return { success: false, message: 'Error desconcocido' }
            }
        }
    }

    const deleteFolders = async (folderNames) => {
        try {
            await axios.post(`${url}delete-folders`,
                { folders: folderNames },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            return { success: true, message: 'Carpetas eliminadas' }

        } catch (e) {
            if (e.response) {
                console.log('❌ Error del servidor', e.response.data)
                return { success: false, message: 'Error del servidor' }
            } else {
                console.log('💣 Error de red o desconocido', e.message)
                return { success: false, message: 'Error desconocido' }
            }
        }
    }

    return (
        <ImageContext.Provider value={{ uploadImages, deleteImages, deleteFolders }}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContext