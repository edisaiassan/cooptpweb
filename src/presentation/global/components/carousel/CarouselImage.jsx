import Cropper from 'react-easy-crop';
import { useState, useEffect } from 'react';
import { image_not_supported } from '../../constants/Icons';
import { Icon } from '../Icon';
import { MainCarousel } from './MainCarousel';

export const CarouselImage = ({ images, background = 'bg-primaryLite', zoom = true }) => {

    const [dragEnabled, setDragEnabled] = useState(true);

    const handleZoomDragToggle = (isZoomed) => {
        setDragEnabled(!isZoomed); // desactiva el drag si está haciendo zoom
    };

    return (
        <>
            <MainCarousel
                h="h-112"
                w="w-full"
                className={`${background} border-2 border-[#006F37] rounded-2xl overflow-hidden`}
                draggable={true} // ✅ pasa el estado como prop
            >
                {images?.length > 0 ? images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index}`} className='h-full w-full object-contain' />
                )) : (
                    <div className='flex items-center justify-center h-full w-full'>
                        <Icon path={image_not_supported} width='w-full max-w-32' height='h-32' />
                    </div>
                )}
            </MainCarousel>
        </>
    );
};

const ZoomableImage = ({ src, alt, onZoomDragToggle }) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (onZoomDragToggle) {
            onZoomDragToggle(false); // Siempre avisa que arranca sin zoom
        }
    }, [position]); // 👈 solo al montar      

    return (
        <div className="relative w-full h-full">
            <Cropper
                image={src}
                crop={position}
                zoom={zoom}
                aspect={4 / 3}
                onZoomChange={setZoom}
                onCropChange={setPosition}
                showGrid={false}
                objectFit="contain"
                style={{
                    containerStyle: {
                        width: '100%',
                        height: '100%',
                        background: '#000',
                    },
                    mediaStyle: {
                        maxHeight: '100%',
                        maxWidth: '100%',
                    },
                }}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 rounded-md px-4 py-1 flex gap-2 items-center text-sm">
                <label>Zoom</label>
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                />
            </div>
        </div>
    );
};