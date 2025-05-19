import { Extend } from '@/presentation/global/components/breakpoints/Extend'
import scheduleLottie from '../../../animations/schedule.json'
import Lottie from 'lottie-react'

export const ScheduleSection = () => {

  const regularSchedule = '8:30AM - 1:30PM\n3:30PM - 6:30PM'

  return (
    <div className='bg-gradient-to-b from-blue-100 to-blue-200'>
      <Extend id='schedule' modifier='py-8 px-4 flex flex-col gap-2'>
        <h3 className='text-blue-900'>HORARIOS DE ATENCIÓN</h3>
        <div className='flex flex-col md:flex-row items-center'>
          <Lottie
            className='w-full h-full max-w-64 max-h-64'
            animationData={scheduleLottie}
            loop={true}
            autoplay={true}
          />
          <div className='grid grid-cols-1 xs:grid-cols-2 gap-2 rounded-2xl border-2 p-4 border-[#006F37] w-full justify-center'>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Lunes</h4>
              <p>{regularSchedule}</p>
            </div>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Martes</h4>
              <p>{regularSchedule}</p>
            </div>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Miércoles</h4>
              <p>{regularSchedule}</p>
            </div>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Jueves</h4>
              <p>{regularSchedule}</p>
            </div>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Viernes</h4>
              <p>{regularSchedule}</p>
            </div>
            <div className='bg-orange-400 p-4 rounded-2xl bg-outlineLite'>
              <h4>Sábado</h4>
              <p>8:30AM - 1PM</p>
            </div>
          </div>
        </div>
      </Extend>
    </div>
  )
}