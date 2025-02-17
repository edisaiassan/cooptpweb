import { Route, Routes } from "react-router-dom"
import { ProductsPage } from "../ProductsPage"
import { ProductPage } from "../sub_routes/Product/ProductPage"

export const ProductRouter = () => {
    return <>
    <h1>xxdxd</h1>
        <Routes>
            <Route path='/' element={<ProductsPage />} />
            <Route path=':id' element={<ProductPage />} />
            <Route path='/login'></Route>
        </Routes>
    </>
}
