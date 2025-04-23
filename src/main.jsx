import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, ScrollRestoration } from 'react-router-dom'
import { AuthProvider } from './presentation/pages/context/AuthContext'
import { OpenExternalProvider } from './presentation/pages/context/OpenExternalContext'
import { AppRouter } from './presentation/router/AppRouter'
import './index.css'
import { ProductProvider } from './presentation/pages/context/ProductContext'
import { ImageProvider } from './presentation/pages/context/ImageContext'

const router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <AuthProvider>
          <ProductProvider>
            <ImageProvider>
              <OpenExternalProvider>
                <AppRouter />
              </OpenExternalProvider>
            </ImageProvider>
          </ProductProvider>
        </AuthProvider>
      </>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
