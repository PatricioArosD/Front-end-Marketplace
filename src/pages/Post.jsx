import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ApiContext } from '../context/ApiContext'; // Import ApiContext
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Post = () => {
  const { token } = useContext(UserContext);
  const { products, setProducts } = useContext(ApiContext); // Use ApiContext to get products data
  const navigate = useNavigate();
  const [datosProducto, setDatosProducto] = useState({
    title: '',
    description: '',
    price: '',
    img: '',
    category_id: ''
  });

  const actualizarDatosProducto = (e) => {
    setDatosProducto({
      ...datosProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados:', datosProducto);

    try {
      const response = await axios.post("/productos", {
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

      if (response.status !== 201) {
        throw new Error(`Error al crear el producto: ${response.statusText}`);
      }

      const data = response.data;
      console.log('Producto creado:', data);

      // Actualizar la lista de productos con el nuevo producto
      setProducts((prevProducts) => [...prevProducts, data]);

      navigate('/profile');
      alert('Producto creado correctamente');
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Hubo un error al crear el producto');
    }
  };

  return (
    <div className="container formulario my-5 ">
      <h2 className='text-center fw-bold mb-5'>Crear Publicación</h2>
      <div className="row bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Nombre del Producto</label>
            <input type="text" className="form-control" id="productName" name="title" value={datosProducto.title} onChange={actualizarDatosProducto} />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">URL de la Imagen del Producto</label>
            <input type="text" className="form-control" id="productImage" name="img" value={datosProducto.img} onChange={actualizarDatosProducto} />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Descripción del Producto</label>
            <textarea className="form-control" id="productDescription" name="description" rows="3" value={datosProducto.description} onChange={actualizarDatosProducto}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Seleccione una categoría:</label>
            <select className="form-select" name="category_id" value={datosProducto.category_id} onChange={actualizarDatosProducto}>
              <option value="" disabled>Elija una categoría</option>
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
          <div className=" d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary btn-lg ">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;