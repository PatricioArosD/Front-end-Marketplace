import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { ApiContext } from "../context/ApiContext";
import { Modal, Button } from "react-bootstrap"; // Importar Modal y Button
import axios from 'axios';

const Cart = () => {
  const { carrito, agregar, eliminar, limpiarCarrito, pagar, total, total_price, formatted_total } = useContext(CartContext); // Agregar pagar, total, total_price y formatted_total
  const { token, user } = useContext(UserContext);
  const { products } = useContext(ApiContext);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate(); // Hook para redireccionar

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const getProductDetails = (id) => {
    return products.find((product) => product.id === id);
  };

  const totalProducts = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    console.log('Carrito:', carrito); // Log the carrito state
    console.log('Total Products:', totalProducts); // Log the total products
  }, [carrito]);

  const handlePagar = async () => {
    try {
      console.log('User ID:', user.id); // Log the user id
      await pagar(user.id);
      setShowModal(true);
    } catch (error) {
      console.error('Error saving order:', error.response ? error.response.data : error.message);
    }
  };

  const handleConfirmarPago = () => {
    setShowModal(false);
    limpiarCarrito();
    navigate('/order');
  };

  return (
    <>
      <main>
        <div className="p3 container">
          <div className="d-flex justify-content-between align-items-center m-4">
            <div>
              <h2 className="text-center fs-2 fw-bold py-2">Detalles del pedido</h2>
            </div>
            <div className="bg-secondary-subtle p-3 rounded">
              <h4 className="">
                Cantidad de productos: <span className="fw-bold">{totalProducts}</span>
              </h4>
              <h4 className="">
                Precio Total: <span className="fw-bold">{formatted_total}</span>
              </h4>
              {token ? (
                <>
                  <button className="btn btn-success my-2 me-2 btn-lg" onClick={handlePagar}>
                    Pagar
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-success my-2 me-2 btn-lg" disabled>
                    Pagar
                  </button>
                  <p className="fs-6 text-muted">¿Tienes una cuenta? Inicia sesión para pagar.</p>
                </>
              )}
            </div>
          </div>
          {carrito.length === 0 ? (
            <p className="m-4 alert alert-light">
              No hay productos en el carrito. Agrega productos desde{" "}
              <Link to="/" className="ms-1">
                Home
              </Link>
            </p>
          ) : (
            carrito.map((item) => {
              const product = getProductDetails(item.id);
              if (!product) return null;
              return (
                <div className="card justify-content-center m-3 p-4" key={item.id}>
                  <div className="row">
                    <div className="col-4 m-auto">
                      <img
                        src={product.img}
                        className="img-fluid d-block"
                        alt={product.description}
                        style={{ maxWidth: "70%" }}
                      />
                    </div>
                    <div className="col-8">
                      <h3 className="text-capitalize">{product.title}</h3>
                      <p className="fw-bold fs-5 my-3">Precio: {formatCurrency(product.price)}</p>
                      <p className="fw-bold">Cantidad: {item.cantidad}</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-success my-2 me-2"
                          onClick={() => agregar(product)}
                        >
                          Añadir
                        </button>
                        <button
                          className="btn btn-danger my-2"
                          onClick={() => eliminar(product)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Modal de confirmación de pago */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Roboto Chicago, sans-serif" }}>
            ¡Pago exitoso!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Roboto Chicago, sans-serif" }}>
          Tu pago ha sido procesado correctamente. Gracias por tu compra.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleConfirmarPago}
            style={{ fontFamily: "Roboto Chicago, sans-serif" }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;