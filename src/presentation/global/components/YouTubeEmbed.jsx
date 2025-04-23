import { videocam_off } from '../constants/Icons';
import { Icon } from './Icon';

export const YouTubeEmbed = ({ videoUrl,
  width = 'max-w-[320px]',
  height = 'h-[568px]',
}) => {
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:.*[?&]v=|shorts\/)|youtu\.be\/)([^'&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <div className={`bg-black rounded-2xl p-4 text-white border-2 border-red-500 flex items-center justify-center gap-2 w-full ${width} ${height}`}>
      <Icon
        path={videocam_off}
        iconColor='fill-red-500'
      />
      <h4 className='text-center'>Error: URL de YouTube no válida</h4>
    </div>
  }

  return (
    <div className={`w-full ${width} ${height}`}>
      <iframe
        className={`rounded-2xl w-full h-full`}
        src={`https://www.youtube.com/embed/${videoId}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}