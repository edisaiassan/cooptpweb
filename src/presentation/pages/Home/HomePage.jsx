import { NavBar } from '../../global/components/NavBar'
import { Us } from './components/Us'

export const HomePage = () => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full'>
        <NavBar />
      </div>
      <img className='w-full h-[1080px] object-cover rounded-2xl' src='/assets/presentation.jpg' alt='Presentation' />
      <Us />
      {/* Login */}
      
    </>
  )
}