import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'; // Import UserContext
import { ApiContext } from './ApiContext'; // Import ApiContext

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { token } = useContext(UserContext); // Get token from UserContext
  const { products } = useContext(ApiContext); // Get products from ApiContext

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const total = carrito.reduce((acc, item) => {
    if (!products || products.length === 0) {
      console.error('Products array is empty or not loaded');
      return acc;
    }
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      console.error(`Product with id ${item.id} not found`);
      return acc;
    }
    const productPrice = product.price; 
    if (productPrice === undefined) {
      console.error(`Invalid price for product with id ${item.id}`);
      return acc;
    }
    return acc + (productPrice * item.cantidad);
  }, 0);

  const total_price = total; // Handle total_price as an integer

  const formatted_total = total_price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  const agregar = (product) => {
    const coincidencia = carrito.findIndex((item) => item.id === product.id);

    if (coincidencia >= 0) {
      carrito[coincidencia].cantidad++;
      setCarrito([...carrito]);
    } else {
      const nuevo_producto = {
        id: product.id, // Ensure the new product has the same id as the product in the products list
        titulo: product.titulo,
        categoria: product.categoria,
        imagenes: product.imagenes,
        precio: product.precio,
        likes: product.likes,
        descripcion: product.descripcion,
        cantidad: 1,
      };
      setCarrito([...carrito, nuevo_producto]);
    }
  };

  const eliminar = (product) => {
    const coincidencia = carrito.findIndex((item) => item.id === product.id);

    if (coincidencia >= 0) {
      if (carrito[coincidencia].cantidad > 1) {
        carrito[coincidencia].cantidad--;
        setCarrito([...carrito]);
      } else {
        carrito.splice(coincidencia, 1);
        setCarrito([...carrito]);
      }
    }
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const pagar = async (user_id) => {
    try {
      console.log('Received User ID:', user_id); // Log the received user id
      const orderData = {
        user_id,
        total: total_price, // Ensure total_price is passed as a numeric value
        status_id: 2, // Assuming 2 is the status ID for "Finalizado"
        products: carrito.map(product => ({
          id: product.id,
          quantity: product.cantidad
        }))
      };

      console.log('Order Data:', orderData); // Log the order data

      const response = await axios.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      console.log('Response Status:', response.status); // Log the response status
      console.log('Response Data:', response.data); // Log the response data

      if (response.status !== 201) {
        throw new Error(`Error al guardar la orden: ${response.statusText}`);
      }

      limpiarCarrito();
      return response.data;
    } catch (error) {
      console.error('Error saving order:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        total,
        total_price,
        formatted_total,
        agregar,
        eliminar,
        limpiarCarrito,
        pagar, // Export the pagar function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;