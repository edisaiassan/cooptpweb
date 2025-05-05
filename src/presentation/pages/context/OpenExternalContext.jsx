import { createContext } from 'react'
import { whatsAppUrl, phoneNumberCode } from '@/presentation/global/constants/Texts'

const OpenExternalContext = createContext()

export const OpenExternalProvider = ({ children }) => {

    const onOpenWhatsApp = async (message = '') => {
        const messageValue = encodeURIComponent(message)
        const url = `${whatsAppUrl}${phoneNumberCode}?text=${messageValue}`
        window.open(url, '_blank')
    }

    const onMakeCall = () => {
        window.location.href = `tel:+${phoneNumberCode}`
    }

    const copyLink = async (message) => {
        if (!navigator.clipboard) {
            return { success: false, message: 'La función de copiar no está disponible en este navegador' }
        }

        try {
            await navigator.clipboard.writeText(message)
            return { success: true, message: '¡Enlace copiado!' }
        } catch (e) {
            return { success: false, message: `Error al copiar: ${e.message}` }
        }
    }

    const shareToWhatsApp = (message = '') => {
        const messageValue = encodeURIComponent(message)
        const url = `https://wa.me/?text=${messageValue}`
        window.open(url, '_blank')
    }

    return (
        <OpenExternalContext.Provider value={{ onOpenWhatsApp, onMakeCall, copyLink, shareToWhatsApp }}>
            {children}
        </OpenExternalContext.Provider>
    )
}

export default OpenExternalContext