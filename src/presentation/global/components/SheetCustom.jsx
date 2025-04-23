import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/ui/sheet'

export function SheetCustom({
    topBar, 
    content,
    sidePosition = 'bottom',
    open,
    onOpenChange,
    className,
    modifier
}) {

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className={`max-h-[100vh] overflow-hidden ${className}`} side={sidePosition}>
                {topBar && <SheetTitle>{topBar}</SheetTitle>}
                <SheetDescription />
                <div className={modifier}>{content}</div>
            </SheetContent>
        </Sheet>
    )
}
