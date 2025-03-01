import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext"; // Importar UserContext
import axios from "axios"; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const { actualizarToken, actualizarUser } = useContext(UserContext); // Obtener la función actualizarToken del contexto
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const actualizarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const validarInput = async (e) => {
    e.preventDefault();

    // Validación
    if (!datos.email.trim() || !datos.password.trim()) {
      setModalMessage("Todos los campos son obligatorios");
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post("/iniciar_sesion", {
        email: datos.email,
        password: datos.password,
      });

      setModalMessage("Inicio de sesión exitoso");
      setShowModal(true);
      actualizarToken(response.data.token);
      actualizarUser(response.data.usuario);
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Credenciales incorrectas");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (modalMessage === "Inicio de sesión exitoso") {
      navigate("/profile"); // Redirigir al perfil después de un inicio de sesión exitoso
    }
  };

  return (
    <>
      <main className="form-signin m-4 p-5">
        <div className="container formulario">
          <h1 className="h3 mb-3 fw-normal py-3">Iniciar Sesión</h1>
          <form onSubmit={validarInput}>
            <label htmlFor="floatingEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              onChange={actualizarDatos}
              placeholder="usuario@example.com"
              value={datos.email}
            />
            <br />
            <label htmlFor="floatingPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              onChange={actualizarDatos}
              placeholder="Password123"
              value={datos.password}
            />
            <br />
            <button className="btn btn-primary py-2" type="submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </main>

      {/* Modal para mostrar mensajes */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Roboto Chicago, sans-serif" }}>
            {modalMessage === "Inicio de sesión exitoso" ? "¡Éxito!" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Roboto Chicago, sans-serif" }}>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ fontFamily: "Roboto Chicago, sans-serif" }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
