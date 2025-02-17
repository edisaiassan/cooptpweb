import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { NavLink, useNavigate } from 'react-router-dom';

export const ProductsPage = () => {

  const navigate = useNavigate()

  const onGoProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Suscribirse a la colección de productos en Firestore
    const unsubscribe = onSnapshot(collection(db, 'product'), (snapshot) => {
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <button className="cursor-pointer transition-all bg-green-600 text-white px-4 py-2 rounded-2xl
border-green-700
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={() => onGoProduct(product.id)}
            >
              Detalles
            </button>
            {product.name}</li>
        ))}
      </ul>
    </div>
  );
}
