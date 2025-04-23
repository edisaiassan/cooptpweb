import { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GenericCard } from '../../global/components/card/GenericCard'
import { Extend } from '../../global/components/breakpoints/Extend'
import { MainButton } from '@/presentation/global/buttons/MainButton'
import OpenExternalContext from '../context/OpenExternalContext'
import { aboutYourBusinessMessage } from '@/presentation/global/constants/Texts'
import { Icon } from '@/presentation/global/components/Icon'
import AuthContext from '../context/AuthContext'
import { MessageLoaded } from '@/presentation/global/components/MessageLoaded'
import { CreateProductSection } from '@/presentation/global/section/CreateProductSection'
import emptyProductsLottie from '../../animations/emptyProducts.json'
import { GridSkeleton } from '@/presentation/global/components/skeleton/GridSkeleton'
import ProductContext from '../context/ProductContext'
import { add, whatsApp } from '@/presentation/global/constants/Icons'

export const ProductsPage = () => {
  const { onOpenWhatsApp } = useContext(OpenExternalContext)
  const { getProductsStream } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([]) // Estado para almacenar los productos
  const [searchTerm, setSearchTerm] = useState('') // Estado para la búsqueda de productos
  const [animateClose, setAnimateClose] = useState(false)
  const [open, setOpen] = useState(false)

  const onOpenSheet = useCallback(() => {
    setAnimateClose(false)
    setOpen(true)
  }, [])

  const closeSheet = useCallback(() => {
    setAnimateClose(true)
    setTimeout(() => {
      setOpen(false)
    }, 400)
  }, [])

  // Obtener el término de búsqueda desde la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get('search')
    setSearchTerm(searchQuery || '') // Actualiza el término de búsqueda desde la URL
  }, [location.search])

  // Cargar productos desde la función getProductsStream al inicio y escuchar cambios en tiempo real
  useEffect(() => {
    const unsubscribe = getProductsStream((result) => {
      if (result.success) {
        setLoading(false)
        setProducts(result.data) // Establecer los productos ordenados
      } else {
        setLoading(false)
      }
    })

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      unsubscribe()
    }
  }, [getProductsStream])

  // Filtrar productos en base al término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Extend modifier="min-h-screen h-full">
        <div className="px-4 pt-18 pb-22 min-h-screen h-full flex items-center justify-center">
          {loading ? (
            <GridSkeleton />
          ) : filteredProducts.length < 1 ? (
            <MessageLoaded
              path={emptyProductsLottie}
              title="No hemos encontrado productos"
              description="Intenta escribiendo algo más"
            />
          ) : (
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
              {filteredProducts.map(product => (
                <GenericCard
                  key={product.id}
                  image={product.image && product.image.image}
                  title={product.name}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </ul>
          )}
        </div>
      </Extend>

      <div className="fixed bottom-4 right-4 z-50">
        <MainButton
          onClick={() => user != null ? onOpenSheet() : onOpenWhatsApp(aboutYourBusinessMessage)}
          leftIcon={<Icon path={user != null ? add : whatsApp} />}
          floating={true}
          isFab={true}
        >
          {user != null ? 'Crear Producto' : 'Whats App'}
        </MainButton>
        {open && (
          <CreateProductSection
            uniqueKey={animateClose}
            animation={`animate__animated animate-fast ${animateClose ? 'animate__fadeOutDown' : 'animate__fadeInUp'}`}
            open={open}
            onOpenChange={setOpen}
            closeSheet={closeSheet}
          />
        )}
      </div>
    </>
  )
}