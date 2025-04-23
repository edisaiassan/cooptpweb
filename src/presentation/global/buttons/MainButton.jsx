import React from 'react'

export const MainButton = ({
    leftIcon,
    rightIcon,
    children,
    backgroundColor = 'bg-primary',
    textColor = 'text-white',
    iconColor = 'fill-white',
    enabled = true,
    floating = false,
    shadow = 'shadow-md',
    shadowColor = 'shadow-black/25',
    isFab = false,
    type= 'button',
    w,
    onClick,
}) => {
    return <button type={type} className={`${backgroundColor} ${textColor} ${w} rounded-3xl px-4 ${isFab ? 'py-4' : 'py-2'} transition-transform duration-300 ease-in-out hover:scale-[97%] active:scale-[90%] break-words ${enabled ? 'cursor-pointer' : 'opacity-50 pointer-events-none'} ${floating && `${shadow} ${shadowColor}`}`}
        onClick={enabled ? onClick : null}
    >
        <div className='flex gap-2 items-center justify-center'>
            {
                leftIcon && <div>{React.cloneElement(leftIcon, {
                    iconColor: `${iconColor}`,
                })}</div>
            }
            <h5>{children}</h5>
            {rightIcon && <div>{React.cloneElement(rightIcon, {
                iconColor: `${iconColor}`,
            })}</div>}
        </div>
    </button>
}
