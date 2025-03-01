import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { ApiContext } from "../context/ApiContext"; // Import ApiContext
import { HeartFill, Heart, Plus, CartPlus } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const CardProduct = ({ product }) => {
  const { agregar } = useContext(CartContext);
  const { user, token } = useContext(UserContext);
  const { favorites, addFavorite, removeFavorite } = useContext(ApiContext); // Get favorites, addFavorite, and removeFavorite from ApiContext
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [categories, setCategories] = useState({}); // State to store category names

  useEffect(() => {
    if (user) {
      const favorite = favorites.find((favorite) => {
        return favorite.id === product.id && favorite.user_id === user.id;
      });
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.like_id); // Use favorite.like_id directly
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    }
  }, [favorites, product.id, user]);

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  const getCategoryName = (categoryId) => {
    return categories[categoryId] || "Desconocido";
  };

  const handleAddToCart = async (product) => {
    await agregar(product);
    setShowModal(true);
  };

  const handleAddFavorite = async () => {
    if (!user) {
      setShowLoginModal(true);
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
      setShowLoginModal(true);
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

  return (
    <>
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
            <div className="card-text d-flex ">
              <h5 className="card-title fs-3">{product.title}</h5>
            </div>
            <div className="card-text d-flex justify-content-between">
              <p className="price card-text fs-4">
                {formatCurrency(product.price)}
              </p>
              <div>
                {isFavorite ? (
                  <HeartFill
                    className="me-1 fs-4"
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fill: "red",
                    }}
                    onClick={handleRemoveFavorite}
                  />
                ) : (
                  <Heart
                    className="me-1 fs-4"
                    style={{
                      color: "#d7d7d7",
                      cursor: "pointer",
                      fill: "#d7d7d7",
                    }}
                    onClick={handleAddFavorite}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card-btn d-flex">
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              <CartPlus className="me-2" /> Agregar al carro
            </button>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for adding to cart */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha agregado el producto al carrito</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bootstrap Modal for login prompt */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Debes iniciar sesión para agregar favoritos.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardProduct;
