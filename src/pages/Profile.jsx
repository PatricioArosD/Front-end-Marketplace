import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ApiContext } from "../context/ApiContext"; // Import ApiContext
import { CartPlus,Pencil, Trash, Plus, HeartFill } from "react-bootstrap-icons"; // Iconos de Bootstrap
import axios from "axios"; // Import axios
import profileImage from "../assets/img/profile.png"; // Import profile image

const Profile = () => {
  const { token, user, fetchUserData } = useContext(UserContext);
  const { products, setProducts, refreshProducts, favorites, fetchFavorites, removeFavorite } = useContext(ApiContext); // Use fetchFavorites from ApiContext
  const navigate = useNavigate();
  const [categories, setCategories] = useState({}); // State to store category names

  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
      refreshProducts(); // Refresh products when the component mounts
      fetchFavorites(user.id, token); // Fetch favorites for the user
    }
  }, [fetchUserData, user, refreshProducts, fetchFavorites, token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categorias", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categoriesData = response.data.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  

  const getCategoryName = (categoryId) => {
    return categories[categoryId] || "Desconocido";
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`/productos/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(
          `Error al eliminar el producto: ${response.statusText}`
        );
      }

      console.log("Producto eliminado:", response.data);

      // Actualizar la lista de productos eliminando el producto eliminado
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  const handleViewOrders = () => {
    navigate("/order");
  };

  if (!user) {
    return <div>Loading...</div>;
  }  
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <h4 className="mb-4">Manejar mi cuenta</h4>
          <ul className="list-group">
            <li className="list-group-item"> <a href="#"
                  onClick={() => navigate("/updateProfile")}
                  className=""
                >
                  Actualizar Perfil
                </a></li>
            <li className="list-group-item">
              {" "}
              <NavLink
                className=" "
                to="/post"
              >
                Agregar producto
              </NavLink>
            </li>
            <li className="list-group-item"><a href="#my-products">Ver mis productos</a></li>

            <li className="list-group-item"><a href="#"
              onClick={handleViewOrders}
              className=""
            >
              Ver Mis Pedidos
            </a></li>
            <li className="list-group-item"><a href="#my-favorites">Ver mis favoritos</a></li>
            
          </ul>
          <Link
              to="/"
              className="my-3 btn btn-secondary"
              onClick={() => actualizarToken(false)}
            >
              Cerrar sesión
            </Link>
        </div>
        <div className="col-md-9">
          <div className="mb-5 p-5 bg-body-tertiary border rounded-3">
            <h2 className="mb-5">Mi Perfil</h2>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img
                  src={profileImage} // Use imported profile image
                  alt="Perfil"
                  className="img-fluid rounded-circle"
                  style={{ width: "180px" }}
                />
              </div>
              <div className="col-md-9">
                <h5 className="mb-4">
                  <strong>Nombre:</strong>
                  <span className="px-4 bg-body-secondary">{user.name} </span>
                </h5>
                <h5 className="mb-3">
                  <strong>Correo Electrónico:</strong>
                  <span className="px-4 bg-body-secondary">{user.email}</span>
                </h5>
                <button
                  onClick={() => navigate("/updateProfile")}
                  className="btn btn-success my-3"
                >
                  Actualizar Perfil
                </button>
              </div>
            </div>
          </div>
          <div id="my-products" className="mb-5">
            <h2>Mis Productos</h2>
            <div className="my-3 row">
              {products
                .filter((product) => product.seller_id === user.id) // Filtrar productos por seller_id
                .map((product) => (
                  <div
                    key={product.id}
                    className="col-md-4 mb-4"
                  >
                    <div className="card h-100">
                      <div className="card-img">
                        <button
                          className="view-more"
                          onClick={() => navigate(`/productos/${product.id}`)}
                        >
                          <Plus className="me-2" /> Ver Más
                        </button>
                        <span className="category card-text fs-6">
                          {getCategoryName(product.category_id)}
                        </span>
                        <img
                          src={product.img}
                          alt={product.description}
                        />
                      </div>
                      <div className="card-body">
                        <div className="card-text d-flex justify-content-between">
                          <h5 className="card-title fs-3">{product.title}</h5>
                          
                        </div>
                        <p className="price card-text fs-4">{formatCurrency(product.price)}</p>
                      </div>
                      <div className="p-3 profile-btn d-flex justify-content-between">
                        <NavLink
                          to={`/actualizarProducto/${product.id}`} // Ruta con el ID del producto
                          className="btn btn-secondary"
                        >
                          <Pencil className="me-2" /> Modificar
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash className="me-2" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tercera Sección: Productos Favoritos */}
          <div id="my-favorites" className="row mb-5">
            <h2>Mis Favoritos</h2>
            {favorites.length === 0 ? (
              <p>No existen productos favoritos.</p>
            ) : (
              favorites.map((favorite, index) => (
                  
<div
                    key={favorite.like_id} // Use like_id as the unique key
                    className="col-md-4 mb-4"
                  >
                    <div className="card h-100">
                      <div className="card-img">
                      
                        <span className="category card-text fs-6">
                        {getCategoryName(favorite.category_id)}
                        </span>
                        <img
                          src={favorite.img}
                          alt={favorite.title}
                        />
                      </div>
                      <div className="card-body">
                        <div className="card-text d-flex justify-content-between">
                          <h5 className="card-title fs-3">{favorite.title}</h5>
                          <div>
                            <HeartFill
                                              className="me-1 fs-4"
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                                fill: "red",
                                              }}
                                              
                                            />
                          </div>
                        </div>
                        <p className="price card-text fs-4">{formatCurrency(favorite.price)}</p>
                      </div>
                     <div className="card-btn d-flex">
                                 <button
                                   className="view-product"
                                   onClick={() => navigate(`/productos/${favorite.id}`)}
                                 >
                                   <Plus className="me-2" /> Ver Producto
                                 </button>
                               </div>
                    </div>
                 


                    
                  </div>
                ))
            )}
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
