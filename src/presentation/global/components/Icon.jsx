export const Icon = ({
    path,
    height = 'h-6',
    width = 'w-6',
    iconColor = 'fill-green-900'
}) => {
    const paths = path ? path.split('/') : [];

    return (
        <svg className={`${height} ${width}`} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            {paths.map((path, index) => (
                path && <path key={index} className={`${iconColor} w-full h-full object-contain`} d={path} fill='currentColor' />
            ))}
        </svg>
    );
};