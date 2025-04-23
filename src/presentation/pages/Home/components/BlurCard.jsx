export const BlurCard = ({ children, width }) => {
    return (
        <div className={`absolute p-2 rounded-2xl bg-gray-100/50 backdrop-blur-lg shadow-2xl shadow-green-300 ${width} text-center border-2 border-green-900 break-words`}>
            {children}
        </div>
    )

}
