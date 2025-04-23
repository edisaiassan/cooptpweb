import { useLocation, useNavigate } from "react-router-dom"
import { TopBar } from "../components/TopBar"

export const TopBarSection = ({ title, actions, titlePosition }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoHome = () => {
        if (location.pathname != '/') {
            navigate('/')
        }
    }

    return (
        <div className='fixed top-0 left-0 w-full z-50'>
            <TopBar
                titlePosition={titlePosition}
                leading={
                    <>
                        <h3 className='w-10 h-10 object-contain rounded-full transition-transform duration-300 ease-in-out hover:scale-[95%] active:scale-[90%] cursor-pointer items-center justify-center flex text-primary bg-secondary border-2 border-white font-bold' onClick={onGoHome}>
                            TP
                        </h3>
                        <div className='hidden md:block font-bold bg-white text-black px-4 rounded-2xl'>
                            <h4 className='w-[140px]'>{`Coop. de\nServicios Múltiples`}</h4>
                        </div>
                    </>
                }
                title={title}
                actions={actions}
            />
        </div >
    )
}
