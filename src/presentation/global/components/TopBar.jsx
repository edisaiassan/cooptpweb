import { Extend } from './breakpoints/Extend'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const TopBar = ({
    leading,
    title,
    actions,
    background = 'bg-gradient-to-b from-[#006F37] to-[#006F37]/85',
    textColor = 'text-white',
    titlePosition = 'justify-center',
    hTopBar = 'h-14',
    modifier
}) => {

    const hFull = 'h-full'
    const itemsCenter = 'items-center'
    const flex = 'flex'
    const gap2 = 'gap-2'

    return (
        <nav className={`text-white ${background} ${textColor} ${hTopBar} whitespace-nowrap ${modifier}`}>
            <Extend modifier={`${flex} px-4 ${hFull} ${gap2}`}>
                {leading &&
                    <div className={`${flex} ${gap2} ${hFull} ${itemsCenter}`}>
                        {leading}
                    </div>}
                <ScrollArea className='w-full overflow-x-auto'>
                    <div className={`${flex} ${gap2} w-full ${itemsCenter} ${hTopBar} ${titlePosition}`}>
                        {title}
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                {actions &&
                    <div className={`${flex} ${gap2} ${hFull} ${itemsCenter}`}>
                        {actions}
                    </div>}
            </Extend>
        </nav>
    )
}