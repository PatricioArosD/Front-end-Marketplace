import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importa Modal y Button de react-bootstrap
import { Envelope, Telephone } from 'react-bootstrap-icons'; // Importa los iconos

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  // Función para validar el formulario
  const isFormValid = () => {
    return name.trim() !== '' && email.trim() !== '' && message.trim() !== '';
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowModal(true); // Mostrar el modal de éxito
      // Aquí puedes agregar la lógica para enviar el formulario
    }
  };

  return (
    <div
      className="bg-light text-dark py-4"
      style={{
        backgroundImage: 'url(https://via.placeholder.com/1500)', // URL de la imagen de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Sección Contáctanos */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div
                className="bg-white p-4 rounded shadow-sm"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} // Fondo semi-transparente
              >
                <h2 className="text-center mb-4" style={{ color: '#424953', fontFamily: 'Roboto Chicago, sans-serif' }}>
                  Contáctanos
                </h2>
                <form onSubmit={handleSubmit}>
                  {/* Campo Nombre */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{ color: '#424953' }}>
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderColor: '#C4C9CD', borderRadius: '5px' }}
                      required
                    />
                  </div>

                  {/* Campo Correo */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: '#424953' }}>
                      <Envelope className="me-2" /> Correo:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderColor: '#C4C9CD', borderRadius: '5px' }}
                      required
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label" style={{ color: '#424953' }}>
                      <Telephone className="me-2" /> Mensaje:
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ borderColor: '#C4C9CD', borderRadius: '5px' }}
                      required
                    ></textarea>
                  </div>

                  {/* Botón Enviar */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: isFormValid() ? '#8D9BA4' : '#C4C9CD',
                        color: '#F4F5F0',
                        borderRadius: '5px',
                        cursor: isFormValid() ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!isFormValid()}
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: 'Roboto Chicago, sans-serif' }}>¡Éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: 'Roboto Chicago, sans-serif' }}>
          Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ fontFamily: 'Roboto Chicago, sans-serif' }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Contact;