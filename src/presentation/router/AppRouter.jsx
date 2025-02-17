import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home/HomePage'
import { ProductRouter } from '../pages/Product/router/ProductRouter'
import { LoginPage } from '../pages/login/LoginPage'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  return <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/*' element={<Navigate to='/' />} />
      <Route path='/login' element={
        <PrivateRoute>
          <LoginPage />
        </PrivateRoute>
      } />
      <Route path='/product/*' element={<ProductRouter />} />
    </Routes>
  </>
}
