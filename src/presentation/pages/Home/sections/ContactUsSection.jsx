import { Extend } from '../../../global/components/breakpoints/Extend'
import whatsAppLottie from '../../../animations/whatsapp.json'
import callLottie from '../../../animations/call.json'
import facebookLottie from '../../../animations/facebook.json'
import { useContext } from 'react'
import OpenExternalContext from '../../context/OpenExternalContext'
import { aboutYourBusinessMessage } from '@/presentation/global/constants/Texts'
import { LottieIcon } from '@/presentation/global/components/LottieIcon'
import { toast } from 'sonner'

export const ContactUsSection = () => {

    const { onOpenWhatsApp, onMakeCall } = useContext(OpenExternalContext)

    return (
        <Extend id='contact'>
            <div className='md:grid md:grid-cols-2 items-center flex flex-col px-4 py-8 gap-4'>
                <div className='flex flex-col justify-center gap-2'>
                    <h3 className='text-primaryHard'>CONTÁCTANOS</h3>
                    <p className='text-gray-900'>
                        Estamos a su entera disposición para atender cualquier consulta o requerimiento. Puede comunicarse con nosotros de manera activa a través de llamada telefónica o mensajes por WhatsApp a los siguientes números:
                    </p>
                </div>
                <div className='relative w-full max-w-[512px] mx-auto flex flex-col items-center justify-center gap-2'>
                    <div className='flex flex-wrap justify-center items-center gap-4'
                    >
                        <LottieIcon
                            path={whatsAppLottie}
                            label='WhatsApp'
                            onClick={() => onOpenWhatsApp(aboutYourBusinessMessage)}
                        />
                        <LottieIcon
                            background='bg-sky-200'
                            path={callLottie}
                            label='Llamar'
                            onClick={onMakeCall}
                        />
                    </div>
                    <h3>+51 944 405 797</h3>
                </div>
            </div>
        </Extend>
    )
}