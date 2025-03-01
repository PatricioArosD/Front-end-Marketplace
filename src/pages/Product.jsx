import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { HeartFill, Heart, Plus, CartPlus } from "react-bootstrap-icons";
import axios from 'axios'; // Import axios

const Product = () => {
  const { id } = useParams();
  const { products, favorites, addFavorite, removeFavorite } = useContext(ApiContext);
  const { agregar } = useContext(CartContext);
  const { user, token } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Inicializar como array vacío
  const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar si el icono Heart está activo
  const [favoriteId, setFavoriteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Producto no encontrado");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, products]);

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categorias");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setError("Error al obtener las categorías");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (user && product) {
      const favorite = favorites.find((favorite) => {
        return favorite.id === product.id && favorite.user_id === user.id;
      });
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.like_id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    }
  }, [favorites, product, user]);

  const handleAddFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const newFavoriteId = await addFavorite(user.id, product.id, token);
      setIsFavorite(true);
      setFavoriteId(newFavoriteId);
      console.log(`Added product ${product.id} to favorites for user ${user.id}`);
    } catch (error) {
      if (error.message === "Product is already in favorites") {
        alert("Este producto ya está en tus favoritos.");
      } else {
        console.error("Error adding favorite:", error);
      }
    }
  };

  const handleRemoveFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await removeFavorite(favoriteId, user.id, token);
      setIsFavorite(false);
      setFavoriteId(null);
      console.log(`Removed product ${product.id} from favorites for user ${user.id}`);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Nueva función para obtener el nombre de la categoría basado en el ID
  const getCategoryName = (categoryId) => {
    if (!categories || categories.length === 0) return null; // Validación adicional
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  return (
    <div className="product-page container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.img}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <span className="category fs-6">{getCategoryName(product.category_id)}</span>
          <p>{product.description}</p>
          <p>Stock:  {product.product_stock}</p>
          <div>
            {isFavorite ? (
              <HeartFill
                className="me-1 fs-3"
                style={{ color: "red", cursor: "pointer", fill: "red" }}
                onClick={handleRemoveFavorite}
              />
            ) : (
              <Heart
                className="me-1 fs-3"
                style={{ color: "#d7d7d7", cursor: "pointer", fill: "#d7d7d7" }}
                onClick={handleAddFavorite}
              />
            )}
            
          </div>
          <h3 className="fw-bold my-5">{formatCurrency(product.price)}</h3>

          <div className="row ">
            <button
              className="btn btn-primary add-to-cart"
              onClick={() => agregar(product)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
