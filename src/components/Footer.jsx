import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para las redirecciones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Logo from '../assets/img/lunaros-logo-nobg.png'; // Importamos el logo de Lunaros


const Footer = () => {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    return regex.test(email);
  };

  // Función para manejar la suscripción
  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setEmail(''); // Limpiar el input
      window.alert('Genial, te enviaremos las mejores ofertas pronto'); // Mostrar PopUp
    } else {
      window.alert('Por favor, ingresa un correo electrónico válido'); // Mensaje de error
    }
  };

  return (
    <>
      <footer className="container-fluid py-5 bg-black">
        <div className="row align-items-center px-5">
          <div className="col-6 col-md-3 mb-3 text-white">
            <img src={Logo} alt="Lunaros" width="180" />
            <ul className="flex-column m-3">
              <li className="mb-2">Dirección: Av. Los Andes 123</li>
              <li className="mb-2">Teléfono: 123456789</li>
              <li className="mb-2">Correo electrónico: info@Lunaros.com</li>
            </ul>
          </div>

          <div className="col-6 col-md-3 text-white">
            <ul className="nav flex-column mx-md-5 pt-3">
              <li className="nav-item mb-2">
                <Link to="/AboutUs" className="nav-link p-0 text-white">Quienes Somos</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/productos" className="nav-link p-0 text-white">Todos los productos</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/contacto" className="nav-link p-0 text-white">Contáctanos</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 align-self-center text-white">
            <form>
              <h5>Subscríbete ahora!</h5>
              <p>Mensualmente recibirás nuestras mejores ofertas</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Correo electrónico</label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del correo
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubscribe} // Manejar la suscripción
                >
                  Subscribir
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-1 border-top">
          <div className="row text-white .fs-6 mx-5 align-text-center">
            <p>© 2025 Lunaros, Inc. All rights reserved.</p>
          </div>
          <div>
            <ul className="list-unstyled d-flex align-items-end my-3 me-5">
              <li className="ms-3">
                <a className="link-white" href="#">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-white" href="#">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-white" href="#">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;