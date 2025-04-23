import Lottie from 'lottie-react'

export const MessageLoaded = ({
    path,
    title,
    description
}) => {
    return (
        <div className='flex flex-col items-center'>
            <Lottie
                animationData={path}
                loop={true}
                autoplay={true}
                className='w-full max-w-64 max-h-64 h-full'
            />
            <h4 className='text-primary text-center'>{title}</h4>
            <p className='text-center'>{description}</p>
        </div>
    )
}
