export const GenericCard = ({
    mainColor = 'text-black',
    opaqueColor = 'bg-green-100',
    hardColor = 'text-primaryHard',
    image,
    title,
    subtitle,
    description,
    actions,
    actionsModifier,
    enabled = true,
    onClick
}) => {
    return (
        <div className={`relative w-full ${opaqueColor} ${hardColor} rounded-3xl p-4 transition-transform duration-300 ease-in-out hover:scale-[99%] active:scale-[95%] break-words ${enabled ? 'cursor-pointer' : 'opacity-50 pointer-events-none'}`}
            onClick={onClick}
        >
            <img src={image} alt='image'
                className='w-full h-64 object-cover rounded-2xl'
            />
            <div className='pt-2 flex flex-col'>
                {title && <h4 className='line-clamp-2'>{title}</h4>}
                {
                    subtitle &&
                    <p className={`${mainColor} line-clamp-2`}>{subtitle}</p>
                }
                {
                    description &&
                    <p className='text-outline line-clamp-2'>{description}</p>
                }
                {
                    actions &&
                    <div className={actionsModifier}>{actions}</div>
                }
            </div>
        </div>
    )
}