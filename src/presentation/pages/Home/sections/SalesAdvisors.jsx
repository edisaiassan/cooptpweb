import { IconButton } from '@/presentation/global/buttons/IconButton'
import { Extend } from '@/presentation/global/components/breakpoints/Extend'
import { phone } from '@/presentation/global/constants/Icons'
import { useContext } from 'react'
import OpenExternalContext from '../../context/OpenExternalContext'

export const SalesAdvisors = () => {
    const { onMakeCall } = useContext(OpenExternalContext);

    const salesAdvisors = [
        {
            'phone': '51981721762',
            'advisor': 'TUMBAY PONCE, KILER KASELY'
        }
    ];

    const onOpenAdvisor = (phone) => {
        onMakeCall(phone); // Pasamos el número de teléfono a onMakeCall
    };

    return (
        <Extend id='advisor' modifier='py-8 px-4 flex flex-col gap-4' min={true}>
            <h3 className='text-center text-primary'>ASESORES DE VENTA</h3>
            <ul className='flex flex-col gap-2 p-4 rounded-2xl border-2 border-[#006F37] h-64'>
                {salesAdvisors.map((saleAdvisor, index) => (
                    <div key={index} className='flex gap-2 items-center bg-outlineLite py-2 px-4 rounded-2xl'> {/* Añadí items-center para alinear verticalmente */}
                        <p className='w-full'>{saleAdvisor.advisor}</p> {/* Accedemos a la propiedad 'advisor' */}
                        <IconButton path={phone} onClick={() => onOpenAdvisor(saleAdvisor.phone)}></IconButton> {/* Accedemos a la propiedad 'phone' */}
                    </div>
                ))}
            </ul>
        </Extend>
    )
}