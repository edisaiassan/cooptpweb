import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ProductsPage } from '../ProductsPage'
import { ProductPage } from '../sub_routes/Product/ProductPage'
import { TopBarSection } from '@/presentation/global/sections/TopBarSection'
import TextFormField from '../../Home/components/input/TextFormField'
import { IconButton } from '@/presentation/global/buttons/IconButton'
import { useState } from 'react'
import { clear, search } from '@/presentation/global/constants/Icons'

export const ProductRouter = () => {
    const [searchText, setSearchText] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const onChange = (e) => {
        const { value } = e.target
        setSearchText(value)
    }

    const clearText = () => {
        setSearchText('')
        if (location.pathname === '/product') {
            navigate('/product')  // Borra la query de la URL
        }
    }

    const handleSearch = () => {
        const hasSearchQuery = new URLSearchParams(location.search).has('search');
    
        if (searchText.trim()) {
            // Si hay texto, navega con search
            navigate(`/product?search=${searchText}`);
        } else if (hasSearchQuery) {
            // Si no hay texto pero la URL tenía ?search=, lo limpiamos
            navigate('/product');
        }
    }    

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <>
            <TopBarSection
                titlePosition='justify-evenly'
                title={
                    <>
                        <div className='w-full max-w-96'>
                            <TextFormField
                                placeholder='Buscar'
                                rounded='rounded-full'
                                name='search'
                                type='text'
                                value={searchText}
                                rightIcon={
                                    <>
                                        {searchText && (
                                            <IconButton
                                                onClick={clearText}
                                                path={clear}
                                                background='bg-transparent'
                                            />
                                        )}
                                        <IconButton
                                            onClick={handleSearch} // Llamamos a handleSearch al hacer clic en el ícono de búsqueda
                                            path={search}
                                            background='bg-transparent'
                                        />
                                    </>
                                }
                                onChange={onChange} // Actualizamos el valor del input cuando cambia
                                onKeyDown={handleKeyPress} // Ejecuta la búsqueda cuando presionamos Enter
                            />
                        </div>
                        <div className='hidden sm:block'></div>
                    </>
                }
            />
            <Routes>
                <Route path='/' element={<ProductsPage />} />
                <Route path=':id' element={<ProductPage />} />
                <Route path='/login' />
            </Routes>
        </>
    )
}