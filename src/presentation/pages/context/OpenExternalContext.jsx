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

    return (
        <OpenExternalContext.Provider value={{ onOpenWhatsApp, onMakeCall }}>
            {children}
        </OpenExternalContext.Provider>
    )
}

export default OpenExternalContext