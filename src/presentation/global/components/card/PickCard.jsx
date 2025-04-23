import { IconButton } from "../../buttons/IconButton"
import { clear } from "../../constants/Icons"

export const PickCard = ({
    url = '',
    label,
    onClick,
    onDeleteImage,
    h = 'h-64',
    w = 'max-w-64 w-full',
    enabled = true,
}) => {

    return (
        <div className={`bg-white p-4 gap-2 rounded-2xl flex flex-col justify-center items-center border-2 border-green-600 break-words border-dashed cursor-pointer relative ${w} ${enabled ? 'cursor-pointer' : 'opacity-50 pointer-events-none'} ${url == '' && 'transition-transform duration-300 ease-in-out hover:scale-[97%] active:scale-[90%]'} break-words`}
            onClick={enabled && url === '' ? onClick : undefined}
        >
            <img
                src={url == '' ? '/file_present.svg' : url}
                alt='imagePicker'
                className={`w-full ${h} rounded-2xl ${url != '' ? 'border-green-600' : 'border-gray-400'} border-2 object-contain`}
            />
            <h4 className={`text-center ${url && 'text-primary'}`}>{label}</h4>
            {url && <div className='absolute top-2 right-2'>
                <IconButton
                    path={clear}
                    background='bg-primary'
                    iconColor='fill-white'
                    onClick={(e) => {
                        e.stopPropagation()
                        onDeleteImage()
                    }
                    }
                />
            </div>}
        </div>
    )
}
