import { createContext, useState, useEffect } from 'react'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  deleteField,
  getDoc
} from 'firebase/firestore'
import { db } from '@/firebase'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const collectionName = 'product'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const toTimestamp = (date) => Math.floor(new Date(date).getTime() / 1000)

  const subscribeToProducts = () => {
    if (isSubscribed) return

    const productsRef = collection(db, collectionName)
    const q = query(
      productsRef,
      orderBy('date', 'desc'),
      orderBy('name', 'asc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProducts(productList)
      setLoading(false)
    }, (error) => {
      console.error('Error en stream de productos:', error)
      setLoading(false)
    })

    setIsSubscribed(true)
    return unsubscribe
  }

  useEffect(() => {
    const unsub = subscribeToProducts()
    return () => typeof unsub === 'function' && unsub()
  }, [])

  const getProductStream = (id, callback) => {
    try {
      const productRef = doc(db, collectionName, id)
      return onSnapshot(productRef, (snapshot) => {
        if (snapshot.exists()) {
          callback({ success: true, data: { id: snapshot.id, ...snapshot.data() } })
        } else {
          callback({ success: false, message: 'Producto no encontrado' })
        }
      }, (error) => {
        callback({ success: false, message: error.message })
      })
    } catch (e) {
      callback({ success: false, message: e.message })
    }
  }

  const getProduct = async (id) => {
    try {
      const productRef = doc(db, collectionName, id)
      const snapshot = await getDoc(productRef)

      if (snapshot.exists()) {
        return { success: true, data: { id: snapshot.id, ...snapshot.data() } }
      } else {
        return { success: false, message: 'Producto no encontrado' }
      }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  const getProductsSorted = async () => {
    try {
      const q = query(
        collection(db, collectionName),
        orderBy('date', 'desc'),
        orderBy('name', 'asc')
      )
      const snapshot = await getDocs(q)
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return { success: true, data: products }
    } catch (e) {
      return { success: false, message: e.message }
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
        cleaned[key] = deleteField()
      } else {
        cleaned[key] = value
      }
    })
    return cleaned
  }

  const ignoreEmptyData = (data) => {
    const result = {}
    for (const [key, value] of Object.entries(data)) {
      if (
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)
      ) {
        result[key] = value
      }
    }
    return result
  }

  const getUniqueIdtoCreate = () => {
    return doc(collection(db, collectionName)).id
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
  }) => {
    try {
      if (!navigator.onLine) {
        return { success: false, message: 'Error de conexión' }
      }
      if (!id) {
        return { success: false, message: 'ID requerido' }
      }

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
        date: toTimestamp(date || new Date())
      }

      const cleaned = ignoreEmptyData(productData)
      await setDoc(doc(db, collectionName, id), cleaned)

      return { success: true }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  const editProduct = async (productData) => {
    try {
      if (!navigator.onLine) {
        return { success: false, message: 'Error de conexión' }
      }
      if (!productData.id) {
        return { success: false, message: 'ID requerido' }
      }

      const ref = doc(db, collectionName, productData.id)
      const { id, ...rest } = productData
      if (rest.date) rest.date = toTimestamp(rest.date)

      const cleaned = cleanProductDataAndReplace(rest)
      await updateDoc(ref, cleaned)

      return { success: true, message: 'Producto actualizado' }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
      return { success: true, message: 'Producto eliminado' }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        subscribeToProducts,
        getProductStream,
        getProduct,
        getProductsSorted,
        createProduct,
        editProduct,
        deleteProduct,
        getUniqueIdtoCreate
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
