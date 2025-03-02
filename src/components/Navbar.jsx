// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import "../App.css";
// import { CartContext } from "../context/CartContext";
// import { UserContext } from "../context/UserContext";
// import Logo from "../assets/img/lunaros-logo-nobg.png";
// import CartIcon from "../assets/img/icon-cart.png"; // Import the cart icon image

// const Navbar = () => {
//   const { carrito } = useContext(CartContext);
//   const { token, actualizarToken } = useContext(UserContext);

//   const setActiveClass = ({ isActive }) =>
//     isActive ? "nav-link active text-white underline-bold" : "nav-link text-white";

//   const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

//   const handleLogout = () => {
//     actualizarToken(false); // Actualizar el token a false
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
//       <div className="container-fluid">
//         {/* Logo */}
//         <NavLink to="/" className="navbar-brand fs-4">
//           <img src={Logo} alt="Lunaros" width="180" />
//         </NavLink>

//         {/* Botón de menú para móviles */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Contenedor de los enlaces con centrado */}
//         <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//           <ul className="navbar-nav w-100 justify-content-center gap-3">
//             <li className="nav-item">
//               <NavLink to="/" className={setActiveClass}>
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/productos" className={setActiveClass}>
//                 Productos
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/AboutUs" className={setActiveClass}>
//                 Quiénes Somos
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/contacto" className={setActiveClass}>
//                 Contáctanos
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         {/* Área de usuario y carrito */}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNavRight">
//           <ul className="navbar-nav gap-3 align-items-center">
//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <NavLink to="/profile" className={setActiveClass}>
//                     Perfil
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink
//                     to="/login"
//                     className="nav-link text-danger fw-bold"
//                     onClick={handleLogout} // Llamar a handleLogout al hacer clic
//                   >
//                     Salir
//                   </NavLink>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <NavLink to="/login" className={setActiveClass}>
//                     Login
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/register" className={setActiveClass}>
//                     Register
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* Icono del carrito */}
//             <li className="nav-item">
//               <NavLink to="/cart" className="nav-link">
//                 <img src={CartIcon} alt="Cart" width="24" className="me-2" /> {totalItems}
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import Logo from "../assets/img/lunaros-logo-nobg.png";
import CartIcon from "../assets/img/icon-cart.png";

const Navbar = () => {
  const { carrito } = useContext(CartContext);
  const { token, actualizarToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    actualizarToken(false);
    navigate("/login"); // Redirigir después de cerrar sesión
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink to="/" className="navbar-brand">
            <img src={Logo} alt="Lunaros" width="180" />
          </NavLink>

          {/* Botón hamburguesa para móviles */}
          <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú en pantallas grandes */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
              <li className="nav-item"><NavLink to="/productos" className="nav-link">Productos</NavLink></li>
              <li className="nav-item"><NavLink to="/AboutUs" className="nav-link">Quiénes Somos</NavLink></li>
              <li className="nav-item"><NavLink to="/contacto" className="nav-link">Contáctanos</NavLink></li>
            </ul>

            {/* Área de usuario */}
            <ul className="navbar-nav ms-auto">
              {token ? (
                <>
                  <li className="nav-item"><NavLink to="/profile" className="nav-link">Perfil</NavLink></li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link text-danger fw-bold" onClick={handleLogout}>Salir</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                  <li className="nav-item"><NavLink to="/register" className="nav-link">Register</NavLink></li>
                </>
              )}
            </ul>

            {/* Ícono del carrito */}
            <NavLink to="/cart" className="nav-link text-white ms-3 cart-container">
              <img src={CartIcon} alt="Cart" width="24" className="me-2" />
              <span className="cart-count">{totalItems}</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Menú lateral en móviles */}
      <div className={`offcanvas-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
        <ul className="mobile-nav">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/productos" onClick={() => setMenuOpen(false)}>Productos</NavLink></li>
          <li><NavLink to="/AboutUs" onClick={() => setMenuOpen(false)}>Quiénes Somos</NavLink></li>
          <li><NavLink to="/contacto" onClick={() => setMenuOpen(false)}>Contáctanos</NavLink></li>
          {token ? (
            <>
              <li><NavLink to="/profile" onClick={() => setMenuOpen(false)}>Perfil</NavLink></li>
              <li><button className="logout-btn" onClick={handleLogout}>Salir</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
              <li><NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>
            </>
          )}
          {/* Carrito en menú móvil */}
          <li className="cart-mobile">
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              <img src={CartIcon} alt="Cart" width="30" className="me-2" />
              <span className="cart-count">{totalItems}</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Fondo oscuro al abrir el menú */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default Navbar;
