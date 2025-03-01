import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/AboutUs.css"
const AboutUs = () => {
  return (
    <div className="bg-light text-dark py-4">
      <section className="container my-5">
        <div className="row align-items-center mb-4">
          <div className="col-md-6 text-end">
            <h2 className="number">01</h2>
            <h3 className="title">Quiénes Somos</h3>
          </div>
          <div className="col-md-6">
            <p className="paragraph">
              Somos una empresa de computación dedicada a proporcionar soluciones tecnológicas innovadoras y de alta calidad. Inspirados por líderes del sector como Apple, Microsoft y Google.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-4 flex-md-row-reverse">
          <div className="col-md-6 text-start">
            <h2 className="number">02</h2>
            <h3 className="title">Nuestra Misión</h3>
          </div>
          <div className="col-md-6">
            <p className="paragraph">
              Nuestra misión es transformar la manera en que las personas interactúan con la tecnología, ofreciendo herramientas que faciliten el trabajo, la educación y el entretenimiento.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-md-6 text-end">
            <h2 className="number">03</h2>
            <h3 className="title">Nuestro Equipo</h3>
          </div>
          <div className="col-md-6">
            <p className="paragraph">
              Contamos con un equipo de expertos en desarrollo de software, hardware y servicios en la nube, comprometidos con la excelencia y la satisfacción del cliente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
