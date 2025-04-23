import Lottie from "lottie-react"

export const LottieIcon = ({
    path,
    label,
    background = 'bg-transparent',
    size = 128,
    onClick
}) => {
    return (
        <div className='flex flex-col gap-2 text-center transition-transform duration-300 ease-in-out hover:scale-[98%] active:scale-[95%] break-words cursor-pointer'
            onClick={onClick}
        >
            <div className={`rounded-2xl ${background}`}>
                <Lottie
                    animationData={path}
                    loop={true}
                    autoplay={true}
                    style={{ width: size, height: size }}
                />
            </div>
            <h3>{label}</h3>
        </div>
    )
}
