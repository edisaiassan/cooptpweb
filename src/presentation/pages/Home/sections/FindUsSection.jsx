import { Extend } from '../../../global/components/breakpoints/Extend'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { CarouselImage } from '@/presentation/global/components/carousel/CarouselImage'

// 👇 Importamos Leaflet y sus íconos directamente
import L from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

// 👇 Creamos un ícono personalizado
const customMarker = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const FindUsSection = () => {
  const images = [
    '/location1.jpg',
    '/location2.jpg',
    '/location3.jpg',
    '/location4.jpg',
  ]

  return (
    <div id='find' className='w-full bg-gradient-to-b from-[#875CAD] to-[#9D79BC] text-white text-center'>
      <Extend modifier='py-8 px-8 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-center'>Ubícanos</h3>
          <p>
            Nos ubicamos en Pasaje Sargento Tejada N° 149 Iquitos-Maynas-Loreto, entre Jirón Putumayo y Alfonso Navarro Cauper
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full z-0'>
            <MapContainer
              center={[-3.7379273923034746, -73.25973178743602]}
              zoom={22}
              style={{ height: '448px', width: '100%' }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker
                position={[-3.7379273923034746, -73.25973178743602]}
                icon={customMarker}
              >
                <Popup>Encuéntranos aquí</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* <CarouselImage images={images} background='bg-black' /> */}
        </div>
      </Extend>
    </div>
  )
}