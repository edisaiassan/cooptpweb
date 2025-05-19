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
import { whatsApp, logoutIcon, account_circle, facebook } from '@/presentation/global/constants/Icons'
import { SalesAdvisors } from './sections/SalesAdvisors'
import { BrandsSection } from './sections/BrandsSection'
import { Fade, Slide } from 'react-awesome-reveal'

export const HomePage = () => {
  const navigate = useNavigate()
  const { onOpenWhatsApp, onOpenExternal } = useContext(OpenExternalContext)

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

  const onOpenWebPage = (link) => {
    const result = onOpenExternal(link)
    if (result.message) {
      toast.error(result.message)
    }
  }

  const doubleDot25 = 0.25

  return (
    <>
      <Fade triggerOnce className='fixed bottom-4 right-4 z-2'>
        <div className='flex flex-wrap gap-2 justify-end'>
          <MainButton
            onClick={() => onOpenWebPage('https://www.facebook.com/profile.php?id=61575241192648')}
            floating={true}
            isFab={true}
            leftIcon={<Icon path={facebook} />}
            backgroundColor='bg-blue-500'
          >Facebook</MainButton>
          <MainButton
            onClick={() => onOpenWhatsApp(aboutYourBusinessMessage)}
            floating={true}
            isFab={true}
            leftIcon={<Icon path={whatsApp} />}
            backgroundColor='bg-whatsApp'
          >Whats App</MainButton>
        </div>
      </Fade>
      <div className='pb-22'>
        <div className='fixed top-0 left-0 w-full z-50'>
          <TopBarSection
            titlePosition='justify-center md:justify-end'
            title={
              <div className='gap-2 text-xl flex px-4'>
                <Link to='home'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >INICIO</Link>
                <a className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer' href='' onClick={onGoProducts}>PRODUCTOS</a>
                <Link to='us'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >NOSOTROS</Link>
                <Link to='contact'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >CONTÁCTANOS</Link>
                <Link to='find'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >UBÍCANOS</Link>
                <Link to='advisor'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >ASESORES</Link>
                <Link to='schedule'
                  smooth={true}
                  duration={400}
                  offset={-56}
                  className='transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer'
                >HORARIOS</Link>
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
        <Fade triggerOnce fraction={doubleDot25}>
          <CarouselSection />
        </Fade>
        <Fade triggerOnce fraction={doubleDot25} delay={200}>
          <BrandsSection />
        </Fade>
        <Fade triggerOnce fraction={doubleDot25} delay={200}>
          <HomeSection />
        </Fade>
        <Fade triggerOnce fraction={doubleDot25} delay={400}>
          <UsSection />
        </Fade>
        <Fade triggerOnce fraction={doubleDot25} delay={200}>
          <ContactUsSection />
        </Fade>
        <FindUsSection />
        <Slide fraction={doubleDot25} triggerOnce>
          <SalesAdvisors />
        </Slide>
        <Fade fraction={doubleDot25} triggerOnce>
          <ScheduleSection />
        </Fade>
        <Toaster richColors />
      </div>
    </>
  )
}