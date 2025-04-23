import { useContext, useState } from 'react'
import { ContactUsSection } from './sections/ContactUsSection'
import { FindUsSection } from './sections/FindUsSection'
import { HomeSection } from './sections/HomeSection'
import { UsSection } from './sections/UsSection'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../../global/buttons/IconButton'
import AuthContext from '../context/AuthContext'
import { Toaster, toast } from 'sonner'
import { MainButton } from '@/presentation/global/buttons/MainButton'
import OpenExternalContext from '../context/OpenExternalContext'
import { Icon } from '@/presentation/global/components/Icon'
import { aboutYourBusinessMessage } from '@/presentation/global/constants/Texts'
import { Link } from 'react-scroll'
import { TopBarSection } from '@/presentation/global/sections/TopBarSection'
import { CarouselSection } from './sections/CarouselSection'
import { ScheduleSection } from './sections/ScheduleSection'
import { whatsApp, logoutIcon, account_circle } from '@/presentation/global/constants/Icons'
import { SalesAdvisors } from './sections/SalesAdvisors'

export const HomePage = () => {
  const navigate = useNavigate()
  const { onOpenWhatsApp } = useContext(OpenExternalContext)

  const { user, logout } = useContext(AuthContext)

  const onGoProducts = () => {
    navigate('/product')
  }

  const onGoLogin = () => {
    navigate('/login')
  }

  const onCloseSesion = () => {
    logout()
    toast.success('Se ha cerrado la sesión')
  }

  return (
    <>
      <div className='fixed top-0 left-0 w-full z-50'>
        <TopBarSection
          titlePosition='justify-center md:justify-end'
          title={
            <div className='gap-2 text-xl flex px-4'>
              <Link to='home' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Inicio</Link>
              <a className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer' href='' onClick={onGoProducts}>Productos</a>
              <Link to='us' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Nosotros</Link>
              <Link to='contact' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Contáctanos</Link>
              <Link to='find' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Ubícanos</Link>
              <Link to='advisor' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Asesores</Link>
              <Link to='schedule' smooth={true} duration={400} offset={-56} className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
              >Horarios</Link>
            </div>
          }
          actions={
            <IconButton
              path={user == null ? account_circle : `${logoutIcon}`}
              onClick={user != null ? onCloseSesion : onGoLogin}
            />
          }
        />
      </div >
      <CarouselSection />
      <HomeSection />
      <UsSection />
      <ContactUsSection />
      <FindUsSection />
      <SalesAdvisors />
      <ScheduleSection />
      <div className='fixed bottom-4 right-4 z-50'>
        <MainButton
          onClick={() => onOpenWhatsApp(aboutYourBusinessMessage)}
          floating={true}
          isFab={true}
          leftIcon={<Icon path={whatsApp} />}
          backgroundColor='bg-whatsApp'
        >Whats App</MainButton>
      </div>
      <Toaster richColors />
    </>
  )
}