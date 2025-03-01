import React from "react";
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div>
      <div className="d-flex p-3 mx-auto flex-column text-center">
        <main className="p-5">
          <h1>Ups! Pagina no encontrada</h1>
          <p className="lead">
            Lo lamento pero la pagina que buscas no existe.
          </p>
          
            <Link
              to="/"
              className="btn btn-secondary btn-lg fw-bold border-black"
            >
              Volver a Home
            </Link>
          <img className="d-flex mx-auto mx-300 my-5" src="https://http.cat/404" alt="404" />
        </main>
      </div>
    </div>
  );
};

export default NotFound;