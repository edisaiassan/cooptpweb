import { Icon } from "../components/Icon"

export const IconButton = ({
    path,
    onClick,
    background = 'bg-primaryLite',
    height = 'h-6',
    width = 'w-6',
    iconColor = 'fill-green-900',
    enabled = true,
    floating = false,
    shadow = 'shadow-md',
    shadowColor = 'shadow-black/25'
}) => {
    return (
        <div className={`inline-flex rounded-full p-2 ${background} transition-all duration-400 ease-in-out hover:scale-[95%] active:scale-[90%] flex items-center justify-center ${enabled ? 'cursor-pointer' : 'opacity-50 pointer-events-none'} ${floating && `${shadow} ${shadowColor}`}`}
            onClick={enabled && typeof onClick === 'function' ? onClick : undefined}
        >
            <Icon
                path={path}
                height={height}
                width={width}
                iconColor={iconColor}
            />
        </div>
    )
}