import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios"; // Import axios

const Register = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    name: "",
    email: "",
    password: "",
    confirmar_password: "",
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

    if (
      !datos.name.trim() ||
      !datos.email.trim() ||
      !datos.password.trim() ||
      !datos.confirmar_password.trim()
    ) {
      setModalMessage("Todos los campos son obligatorios");
      setShowModal(true);
      return;
    }
    if (datos.password.length < 6) {
      setModalMessage("La password debe contener al menos 6 caracteres");
      setShowModal(true);
      return;
    }
    if (datos.password !== datos.confirmar_password) {
      setModalMessage("Password no coincide");
      setShowModal(true);
      return;
    }

    try {
      await axios.post("/registrar_usuario", {
        name: datos.name,
        email: datos.email,
        password: datos.password,
      });

      setDatos({
        name: "",
        email: "",
        password: "",
        confirmar_password: "",
      });

      setModalMessage("Haz sido registrado");
      setShowModal(true);
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Error al registrar usuario");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (modalMessage === "Haz sido registrado") {
      navigate("/login");
    }
  };

  return (
    <>
      <main className="form-signin m-4 p-5">
        <div className="container formulario">
          <h1 className="h3 mb-3 fw-normal py-3">Registrar</h1>
          <form onSubmit={validarInput}>
            <label htmlFor="floatingName">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="floatingName"
              name="name"
              onChange={actualizarDatos}
              placeholder="Nombre"
              value={datos.name}
            />
            <br />
            <label htmlFor="floatingEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              onChange={actualizarDatos}
              placeholder="name@example.com"
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
              placeholder="Password"
              value={datos.password}
            />
            <br />
            <label htmlFor="floatingConfirmarPassword">Confirmar Password</label>
            <input
              type="password"
              className="form-control"
              id="floatingConfirmarPassword"
              name="confirmar_password"
              onChange={actualizarDatos}
              placeholder="Confirmar Password"
              value={datos.confirmar_password}
            />
            <br />
            <p>*Password debe contener al menos 6 caracteres</p>
            <button className="btn btn-primary py-2" type="submit">
              Registrar
            </button>
          </form>
        </div>
      </main>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Roboto Chicago, sans-serif" }}>
            {modalMessage === "Haz sido registrado" ? "¡Éxito!" : "Error"}
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

export default Register;
