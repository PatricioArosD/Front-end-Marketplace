import React from "react";
import Logo from "../assets/img/lunaros-logo-nobg.png";

const Header = () => {
  return (
    <div>
      <section className="container-fluid d-flex banner justify-content-center align-items-center">
        <div className="row w-100">
          <div className="texto col-12 col-md-6 mx-md-5 px-md-5">
            <img src={Logo} alt="Lunaros" width="400" className="img-fluid" />
            <h1 className="fw-bold fs-2 text-white">Bienvenido a nuestro Market Place</h1>
            <p className="text-white">
              Publica y descubre ofertas increíbles en un solo lugar.
            </p>
          </div>
        </div>
        <div className="overlay"></div>
      </section>
    </div>
  );
};

export default Header;
