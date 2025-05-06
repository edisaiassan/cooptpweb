import { Extend } from '../../../global/components/breakpoints/Extend'
import whatsAppLottie from '../../../animations/whatsapp.json'
import callLottie from '../../../animations/call.json'
import tiktokLottie from '../../../animations/tiktok.json'
import facebookLottie from '../../../animations/facebook.json'
import youtubeLottie from '../../../animations/youtube.json'
import { useContext } from 'react'
import OpenExternalContext from '../../context/OpenExternalContext'
import { aboutYourBusinessMessage } from '@/presentation/global/constants/Texts'
import { LottieIcon } from '@/presentation/global/components/LottieIcon'
import { toast } from 'sonner'

export const ContactUsSection = () => {

    const { onOpenWhatsApp, onMakeCall, onOpenExternal } = useContext(OpenExternalContext)

    const onOpenWebPage = (link) => {
        const result = onOpenExternal(link)
        if (result.message) {
            toast.error(result.message)
        }
    }

    return (
        <Extend id='contact'>
            <div className='md:grid md:grid-cols-2 items-center flex flex-col px-4 py-8 gap-4'>
                <div className='flex flex-col justify-center gap-2'>
                    <h3>Contáctanos</h3>
                    <p>
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
            <Extend min={true} modifier='py-8 px-4'>
                <div className='bg-gradient-to-b from-purple-400 via-pink-200 to-red-700 rounded-2xl p-4 gap-2 flex flex-col'>
                    <h3 className='text-center'>Síguenos en nuestro Facebook oficial</h3>
                    <div className='relative w-full max-w-[512px] mx-auto flex flex-col items-center justify-center'>
                        <div className='flex flex-wrap justify-center items-center gap-4 text-white'>
                            {/* <LottieIcon
                                path={tiktokLottie}
                                label='Tiktok'
                            /> */}
                            <LottieIcon
                                path={facebookLottie}
                                label='Facebook'
                                onClick={() => onOpenWebPage('https://www.facebook.com/profile.php?id=61575241192648')}
                            />
                            {/* <LottieIcon
                                background='bg-red-500'
                                path={youtubeLottie}
                                label='YouTube'
                            /> */}
                        </div>
                    </div>
                </div>
            </Extend>
        </Extend>
    )
}