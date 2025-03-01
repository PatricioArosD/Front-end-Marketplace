import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom"; // Importamos Link para las redirecciones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faHeadphones, faMobileAlt, faKeyboard, faHdd, faWifi } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../context/ApiContext"; // Import ApiContext

const CategoryCard = ({ category }) => {
  return (
    <div className="col-md-2 mb-4">
      <Link to={`/productos?category=${category.name}`} className="btn-category">
        <div className="p-4 card d-flex align-items-center category-card">
          <FontAwesomeIcon icon={category.icon} className="fs-1" />
          <h5 className="card-title pt-4 fs-6">
            {category.name}
          </h5>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const { products } = useContext(ApiContext); // Use ApiContext to get products data

  useEffect(() => {
    
  }, [products]);

  // Datos de ejemplo para las categorías
  const categoriesData = [
    {
      id: 1,
      name: "PC/Laptop",
      icon: faLaptop,
      image: "https://media.ldlc.com/r1600/ld/products/00/06/03/72/LD0006037211.jpg",
    },
    {
      id: 2,
      name: "Audio",
      icon: faHeadphones,
      image: "https://hire.vsl-uk.com/wp-content/uploads/2017/10/HP-250-G5-Laptop-Main.jpg",
    },
    {
      id: 3,
      name: "Smartphones",
      icon: faMobileAlt,
      image: "https://media.ldlc.com/r1600/ld/products/00/06/03/72/LD0006037211.jpg",
    },
    {
      id: 4,
      name: "Accesorios",
      icon: faKeyboard,
      image: "https://hire.vsl-uk.com/wp-content/uploads/2017/10/HP-250-G5-Laptop-Main.jpg",
    },
    {
      id: 5,
      name: "Almacenamiento",
      icon: faHdd,
      image: "https://media.ldlc.com/r1600/ld/products/00/06/03/72/LD0006037211.jpg",
    },
    {
      id: 6,
      name: "Redes",
      icon: faWifi,
      image: "https://hire.vsl-uk.com/wp-content/uploads/2017/10/HP-250-G5-Laptop-Main.jpg",
    },
  ];

  return (
    <>
      <Header />
      <div className="py-2">
        <section className="destacados container my-5">
          <div className="row">
            <h2 className="py-4">Productos destacados</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {products.slice(0, 3).map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="container py-5">
          <div className="d-flex banner-category ps-5 justify-content-left align-items-center banner-categoria">
            <div className="ps-4">
              <h2 className="fw-bold text-white">Audio</h2>
              <p className="text-white">Encuentra los mejores productos de audio</p>
                <Link to={`/productos?category=Audio`} className="btn btn-primary">
                  Ver más
                </Link>
            </div>
          </div>
        </section>

        <section className="categorias container pb-5">
          <h2 className="fw-bold mt-5">Categorías</h2>
          <div className="row py-lg-5">
            {categoriesData.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;