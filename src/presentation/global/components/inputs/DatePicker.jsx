import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Icon } from '../Icon'
import { es } from 'date-fns/locale'
import { calendar_month } from '../../constants/Icons'

export const DatePicker = ({
    backgroundColor = 'bg-primary',
    backgroundOpaqueColor = 'bg-primaryLite',
    textMainColor = 'text-white',
    textOpaqueColor = 'text-primary',
    iconMainColor = 'bg-white',
    iconOpaqueColor = 'bg-primary',
    enabled = true,
    date,
    setDate
}) => {

    return (
        <div style={{ pointerEvents: !enabled && 'none' }}>
            <Popover>
                <PopoverTrigger asChild className='w-fit'>
                    <div className={`flex gap-2 px-4 py-2 rounded-3xl items-center justify-center ${date ? textMainColor : textOpaqueColor} border-2 ${date ? backgroundColor : backgroundOpaqueColor} ${enabled ? 'cursor-pointer' : 'opacity-50 pointer-events-none'} transition-transform duration-300 ease-in-out hover:scale-[97%] active:scale-[90%]`}>
                        <Icon
                            path={calendar_month}
                            iconColor={date ? iconMainColor : iconOpaqueColor}
                        />
                        <h5>{date ? format(date, 'PPP', { locale: es }) : 'Toca una fecha'}</h5>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0 bg-white border-2 border-green-600 rounded-2xl' align='start'>
                    <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
