import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Extend } from "../../../../global/components/breakpoints/Extend";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";

export const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", price: "" });

    useEffect(() => {
        if (!id) return;

        // Referencia al documento en Firestore
        const productRef = doc(db, "product", id);

        // Escuchar cambios en tiempo real
        const unsubscribe = onSnapshot(productRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = { id: docSnap.id, ...docSnap.data() };
                setProduct(data);
                setFormData({ name: data.name, price: data.price });
            } else {
                setProduct(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Actualizar producto en Firestore
    const handleUpdate = async () => {
        if (!id) return;
        const productRef = doc(db, "product", id);
        await updateDoc(productRef, {
            name: formData.name,
            price: parseFloat(formData.price)
        });
        setModal(false); // Cerrar modal después de actualizar
    };

    if (loading) return <p>Cargando producto...</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <Extend>
            <div className='fixed right-4 top-4'>
                <button className='bg-red-500 p-2 rounded text-white' onClick={() => setModal(true)}>Editar</button>
            </div>
            
            <div className='grid grid-cols-1 gap-2 p-4 justify-center mx-auto lg:grid-cols-2'>
                <div className='bg-green-100 w-full h-[672px] rounded-2xl'>
                    <img className='mx-auto h-full w-full object-contain rounded-2xl'
                        src='https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/35e4ac6339f5fdcc164160a5755790cd.jpg'
                        alt='productImage' />
                </div>
                <div className='p-4 w-full bg-red-200'>
                    <h3 className='text-2xl'>{product.name}</h3>
                    <h3 className='text-2xl'>S/. {product.price}</h3>
                </div>
            </div>

            {/* Modal de edición */}
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Editar Producto</ModalHeader>
                <ModalBody>
                    <Label>Nombre</Label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    
                    <Label className="mt-2">Precio</Label>
                    <Input type="number" name="price" value={formData.price} onChange={handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Guardar</Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </Extend>
    );
};
