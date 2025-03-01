import React, { useState, useMemo, useContext, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { HeartFill } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ApiContext } from "../context/ApiContext"; // Import ApiContext
import axios from "axios"; // Import axios

const Productos = () => {
  const { products } = useContext(ApiContext); // Use ApiContext to get products data
  const [priceRange, setPriceRange] = useState(2000000);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedOrder, setSelectedOrder] = useState("Por defecto");
  const [categories, setCategories] = useState([]); // Inicializar como array vacío
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({}); // Estado para manejar los favoritos

  // Leer el parámetro de la URL
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Mueve la función getCategoryID aquí, antes de su uso
  const getCategoryID = (categoryName) => {
    if (!categories || categories.length === 0) return null; // Validación adicional
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.id : null;
  };

  // Si hay un parámetro de categoría en la URL, lo usamos como categoría seleccionada
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

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

  const handlePriceChange = (e) => setPriceRange(e.target.value);
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleOrderSelect = (order) => setSelectedOrder(order);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  // Filtrado de productos por categoría
  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products.filter((product) => product.category_id === getCategoryID(selectedCategory));

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (selectedOrder) {
      case "Nombre (A-Z)":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Nombre (Z-A)":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Precio (Menor a Mayor)":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Precio (Mayor a Menor)":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Likes (Mayor a Menor)":
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "Likes (Menor a Mayor)":
        sorted.sort((a, b) => a.likes - b.likes);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, selectedOrder]);

  const filteredByPrice = sortedProducts.filter(
    (product) => product.price <= priceRange
  );

  const clearFilters = () => {
    setSelectedCategory("Todas");
    setSelectedOrder("Por defecto");
    setPriceRange(2000000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="productos py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categoría: {selectedCategory}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleCategorySelect("Todas")}
                    >
                      Todas
                    </a>
                  </li>
                  {Array.isArray(categories) && categories.map((category) => (
                    <li key={category.id}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Orden: {selectedOrder}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleOrderSelect("Nombre (A-Z)")}
                    >
                      <FontAwesomeIcon icon={faSortAlphaUp} /> Nombre (A-Z)
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleOrderSelect("Nombre (Z-A)")}
                    >
                      <FontAwesomeIcon icon={faSortAlphaDown} /> Nombre (Z-A)
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        handleOrderSelect("Precio (Menor a Mayor)")
                      }
                    >
                      <FontAwesomeIcon icon={faSortNumericUp} /> Precio (Menor a
                      Mayor)
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        handleOrderSelect("Precio (Mayor a Menor)")
                      }
                    >
                      <FontAwesomeIcon icon={faSortNumericDown} /> Precio (Mayor
                      a Menor)
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleOrderSelect("Likes (Mayor a Menor)")}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} /> Likes (Mayor a
                      Menor)
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleOrderSelect("Likes (Menor a Mayor)")}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} /> Likes (Menor a
                      Mayor)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="priceRange" className="form-label">
                Precio: {formatCurrency(priceRange)}
              </label>
              <input
                type="range"
                className="form-range"
                id="priceRange"
                min="500"
                max="2000000"
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredByPrice.length === 0 ? (
              <div className="col-12 text-center">
                <h4>No se encontraron productos</h4>
              </div>
            ) : (
              filteredByPrice.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  isFavorite={favorites[product.id]}
                  toggleFavorite={() => toggleFavorite(product.id)}
                  formatCurrency={formatCurrency}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Productos;
