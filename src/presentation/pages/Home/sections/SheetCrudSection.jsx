import { IconButton } from "@/presentation/global/buttons/IconButton"
import { SheetCustom } from "@/presentation/global/components/SheetCustom"
import { TopBar } from "@/presentation/global/components/TopBar"
import { clear } from "@/presentation/global/constants/Icons"

export const SheetCrudSection = ({
    keyValue,
    title,
    content,
    fabs,
    open,
    setOpen,
    closeSheet,
    animation,
    h = 'h-full'
}) => {
    return (
        <SheetCustom
            key={keyValue}
            className={`${h} ${animation}`}
            open={open}
            onOpenChange={setOpen}
            closeSheet={closeSheet}
            topBar={<TopBar
                modifier='rounded-t-2xl'
                titlePosition='justify-start'
                title={<h3 className='line-clamp-1'>{title}</h3>}
                actions={<IconButton path={clear} onClick={closeSheet} />}
            />}
            modifier='bg-white h-full'
            content={
                <form className='flex flex-col gap-4 overflow-auto max-h-[calc(100vh-56px)] px-4 pt-4 pb-18'>
                    <div>{content}</div>
                    <div className='absolute right-4 left-4 bottom-4 flex flex-wrap justify-end gap-2'>
                        {fabs}
                    </div>
                </form >
            }
        > SheetCrudSection</SheetCustom >
    )
}