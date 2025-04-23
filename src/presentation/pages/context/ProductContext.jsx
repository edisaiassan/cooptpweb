import { createContext } from 'react'
import { db } from '@/firebase'
import { collection, doc, setDoc, deleteDoc, updateDoc, query, orderBy, getDocs, onSnapshot, deleteField, getDoc } from 'firebase/firestore'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const collectionName = 'product'

    const toTimestamp = (dateString) => {
        return Math.floor(dateString.getTime() / 1000)
    }

    const getProductStream = (id, callback) => {
        try {
            const productRef = doc(db, collectionName, id)

            // Establecer un listener para cambios en tiempo real
            const unsubscribe = onSnapshot(productRef, (productSnapshot) => {
                if (productSnapshot.exists()) {
                    callback({ success: true, data: { id: productSnapshot.id, ...productSnapshot.data() } })
                } else {
                    callback({ success: false, message: 'Producto no encontrado' })
                }
            }, (error) => {
                callback({ success: false, message: `Error: ${error.message}` })
            })

            // Devolver la función de desuscripción para que se pueda cancelar la suscripción cuando sea necesario
            return unsubscribe

        } catch (e) {
            console.error('Error al obtener el producto:', e)
            callback({ success: false, message: `Error: ${e.message}` })
        }
    }

    const getProduct = async (id) => {
        try {
            const productRef = doc(db, collectionName, id)
            const productSnapshot = await getDoc(productRef)

            if (productSnapshot.exists()) {
                return { success: true, data: { id: productSnapshot.id, ...productSnapshot.data() } }
            } else {
                return { success: false, message: 'Producto no encontrado' }
            }
        } catch (e) {
            console.error('Error al obtener el producto:', e)
            return { success: false, message: e.message }
        }
    }

    const getProductsStream = (callback) => {
        const productsRef = collection(db, collectionName)

        // Crear una consulta ordenada primero por 'date' de manera descendente y luego por 'name' alfabéticamente.
        const q = query(
            productsRef,
            orderBy('date', 'desc'),
            orderBy('name', 'asc')
        )

        // Escuchar los cambios en la colección de productos en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            callback({ success: true, data: products }) // Pasar los productos al callback
        }, (error) => {
            console.log('Error al obtener productos en tiempo real:', error)
            callback({ success: false, message: 'Error al obtener productos en tiempo real' })
        })

        // Retornar la función de desuscripción para que se pueda cancelar la suscripción cuando se desee
        return unsubscribe
    }

    const getProductsSorted = async () => {
        try {
            const productsRef = collection(db, collectionName)

            // Crear una consulta ordenada primero por 'date' de manera descendente (más reciente a más antiguo)
            // y luego por 'name' alfabéticamente de manera ascendente.
            const q = query(
                productsRef,
                orderBy('date', 'desc'),
                orderBy('name', 'asc')
            )

            const querySnapshot = await getDocs(q)

            // Procesar los resultados y devolverlos en un formato adecuado
            const products = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...data
                }
            })

            return { success: true, data: products }
        } catch (e) {
            console.log(e)
            console.log('Error al obtener los productos ordenados:', e)
            return { success: false, message: 'Error al obtener los productos' }
        }
    }

    const cleanProductDataAndReplace = (data) => {
        const cleaned = {}

        Object.entries(data).forEach(([key, value]) => {
            if (
                value === null ||
                value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
            ) {
                cleaned[key] = deleteField()  // Eliminar campo en Firebase
            } else {
                cleaned[key] = value
            }
        })

        return cleaned
    }

    const ignoreEmptyData = (productData) => {
        const cleanedData = {}

        for (const [key, value] of Object.entries(productData)) {
            if (value && (value !== '' && value !== null && (Array.isArray(value) ? value.length > 0 : true))) {
                cleanedData[key] = value  // Solo agrega el campo si tiene un valor válido
            }
        }
        return cleanedData
    }

    const getUniqueIdtoCreate = () => {
        const newDocRef = doc(collection(db, collectionName)) // Crea una referencia sin subir datos
        return newDocRef.id // Retorna el ID generado automáticamente por Firestore
    }

    const createProduct = async ({
        id = '',
        name = '',
        description = '',
        image = {},
        video = '',
        images = [],
        price = '',
        months = '',
        details = [],
        date = null
        /* /* {
        id = '',
        name = '',
        description = '',
        image = {},
        images = [],
        price = '',
        months = '',
        details = [],
        date = null
        } */
    }) => {
        try {
            if (!navigator.onLine) {
                return { success: false, message: 'Error de conexión' }
            }

            if (!id) {
                return { success: false, message: 'El ID es obligatorio' }
            }

            if (date == null) {
                date = new Date()
            }

            date = toTimestamp(date)

            const productData = {
                id,
                name,
                description,
                image,
                video,
                images,
                price,
                months,
                details,
                date
            }

            // Limpiar el objeto de datos antes de subirlo
            const cleanedProductData = ignoreEmptyData(productData)

            await setDoc(doc(collection(db, collectionName), id), cleanedProductData)

            return { success: true }
        }
        catch (e) {
            console.log(`${e}`)
            return { success: false, message: `${e.value}` }
        }
    }

    const editProduct = async (productData) => {
        try {
            if (!navigator.onLine) {
                return { success: false, message: 'Error de conexión' }
            }

            if (!productData.id) {
                return { success: false, message: 'El ID es obligatorio' }
            }

            const productRef = doc(db, collectionName, productData.id)

            if (productData.date !== null) {
                productData.date = toTimestamp(productData.date)
            }

            const { id, ...rest } = productData

            console.log('📦 Data antes de limpiar:', rest)

            const cleanedUpdatedData = cleanProductDataAndReplace(rest)

            console.log('🧹 Data limpia:', cleanedUpdatedData)

            await updateDoc(productRef, cleanedUpdatedData)

            return { success: true, message: 'Producto actualizado correctamente' }

        } catch (e) {
            console.log('🎉', e)
            return { success: false, message: `Error: ${e.message}` }
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, collectionName, id))
            return { success: true, message: 'Producto eliminado correctamente' }
        } catch (e) {
            console.log(`💖 ${e}`)
            return { success: false, message: `${e.message}` }
        }
    }

    return (
        <ProductContext.Provider value={{
            getUniqueIdtoCreate,
            getProductStream,
            getProduct,
            getProductsSorted,
            getProductsStream,
            createProduct,
            editProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext