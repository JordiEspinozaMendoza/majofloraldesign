import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Footer() {
  return (
    <footer
      className="bg-primary text-primary d-flex align-items-center w-100 flex-column p-4"
      style={{ minHeight: "30vh", color: "#fff !important" }}
    >
      <Row>
        <Col md={3}>
          <h5>Sobre nosotros</h5>
          <p style={{ fontSize: "14px" }}>
            Somos Majo Floral Design, estamos ubicados en Tijuana Baja
            California México, dedicados a la venta de flores bajo cotización y
            pedidos.
          </p>
        </Col>
        <Col md={3} className="text-light" className="text-light">
          <h5>Links rapidos</h5>
          <div style={{ fontSize: "14px", color: "white" }}>
            <p>
              <Link to="/">Inicio</Link>
            </p>
            <p>
              <Link to="/catalogo/">Catálogo</Link>
            </p>
            <p>
              <Link to="/login">Iniciar sesión</Link>
            </p>
          </div>
        </Col>
        <Col md={3} className="text-light" className="text-light">
          <h5>Redes sociales</h5>
          <div style={{ fontSize: "18px" }}>
            <Link to="/" className="mr-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <a
              target="__blank"
              href="https://www.instagram.com/majofloraldesign/"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </Col>
        <Col md={3} className="text-light" className="text-light">
          <h5>Ubicación</h5>
          <div>
            <h6>Proximamente</h6>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215366.57847755888!2d-117.08789194669872!3d32.4966817514542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9390226587bd3%3A0x14724bafa4e62456!2sTijuana%2C%20B.C.!5e0!3m2!1ses-419!2smx!4v1619509233057!5m2!1ses-419!2smx"
              width="100%"
              height="200px"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe> */}
          </div>
        </Col>
      </Row>
    </footer>
  );
}
