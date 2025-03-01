import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ApiContext } from '../context/ApiContext'; // Import ApiContext
import axios from 'axios';

const ActualizarProducto = () => {
  const { token } = useContext(UserContext);
  const { products, setProducts } = useContext(ApiContext); // Use ApiContext to get products data
  const { id } = useParams();
  const navigate = useNavigate();
  const [datosProducto, setDatosProducto] = useState({
    title: '',
    description: '',
    price: '',
    img: '',
    category_id: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/productos/${id}`);
        const data = response.data;
        setDatosProducto({
          title: data.title,
          description: data.description,
          price: data.price,
          img: data.img,
          category_id: data.category_id
        });
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al obtener el producto");
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    setDatosProducto({
      ...datosProducto,
      img: e.target.files[0]
    });
  };

  const actualizarDatosProducto = (e) => {
    setDatosProducto({
      ...datosProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", datosProducto);

    try {
      const response = await axios.put(`/productos/${id}`, {
        title: datosProducto.title,
        description: datosProducto.description,
        price: datosProducto.price,
        img: datosProducto.img,
        category_id: datosProducto.category_id,
      }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Producto actualizado correctamente');

      // Actualizar la lista de productos con el producto actualizado
      setProducts((prevProducts) => prevProducts.map(product => 
        product.id === parseInt(id) ? response.data : product
      ));

      navigate('/profile');
      alert('Producto Actualizado correctamente');
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setError("Error al actualizar el producto");
    }
  };

  return (
    <div className="container formulario my-5">
      <h2 className='text-center fw-bold mb-5'>Actualizar Producto</h2>
      <div className="row bg-light p-5">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Nombre del Producto</label>
            <input type="text" className="form-control" id="productName" name="title" value={datosProducto.title} onChange={actualizarDatosProducto} />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">URL de la Imagen del Producto</label>
            <input type="text" className="form-control" id="productImage" onChange={handleImageChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Descripción del Producto</label>
            <textarea className="form-control" id="productDescription" name="description" rows="3" value={datosProducto.description} onChange={actualizarDatosProducto}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Seleccione una categoría:</label>
            <select className="form-select" name="category_id" value={datosProducto.category_id} onChange={actualizarDatosProducto}>
              <option value="0" disabled>Elija una categoría</option>
              <option value="1">PC/Laptop</option>
              <option value="2">Audio</option>
              <option value="3">Smartphones</option>
              <option value="4">Accesorios</option>
              <option value="5">Almacenamiento</option>
              <option value="6">Redes</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Precio</label>
            <input type="number" className="form-control" id="productPrice" name="price" value={datosProducto.price} onChange={actualizarDatosProducto} />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary btn-lg">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarProducto;