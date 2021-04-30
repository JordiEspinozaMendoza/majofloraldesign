import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Image, Row, Col, Carousel, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Product from "../../components/Product";

import AOS from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";
import "./styles.css";
import { LinkContainer } from "react-router-bootstrap";

import { listProducts } from "../../actions/product_actions";
import { listCategories } from "../../actions/categorie_actions";
export default function HomeScreen({ history }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    error: errorList,
    products,
    page,
  } = productList;
  const categorieList = useSelector((state) => state.categorieList);
  const { categories } = categorieList;

  useEffect(() => {
    dispatch(listProducts("all", 1));
    dispatch(listCategories());
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Header customClass={"homeHeader"}>
        <h1 className="text-light">Una flor florece para su propia alegría</h1>
        <Link to="/catalogo/">
          <Button>
            <i className="fas fa-store"></i> Ver catálogo
          </Button>
        </Link>
      </Header>
      <div
        className="flowers-bg"
        style={{
          backgroundSize: "150% 100%",
          backgroundPosition: "top center",
        }}
      >
        <Container
          className="d-flex align-items-center justify-content-center flex-column"
          style={{
            minHeight: "20vh",
          }}
        >
          <Row
            data-aos={"fade-down"}
            style={{ minHeight: "20vh", width: "100%" }}
            className="mt-4 mb-4 d-flex flex-row justify-content-between"
          >
            <Col md={6}>
              <div
                className="d-flex align-items-left justify-content-center text-light p-2 cards-flowers flex-column"
                style={{
                  backgroundImage:
                    "url(https://res.cloudinary.com/majo-floral-desing/image/upload/v1619722089/priscilla-du-preez-CE1k0Wu65-M-unsplash_w8sipb.jpg)",
                }}
              >
                <h3>Feliz día de las madres</h3>
                <span className="w-50">
                  Visualiza nuestro catálogo para cotizaciones y darle el mejor
                  regalo en su día.
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="d-flex align-items-left justify-content-center text-light p-2 cards-flowers flex-column"
                style={{
                  backgroundImage:
                    "url(https://res.cloudinary.com/majo-floral-desing/image/upload/v1619722195/tuan-nguy-n-minh-pGr7g4l8EOI-unsplash_ai6zsz.jpg)",
                }}
              >
                <h3>Sorprende a tu pareja</h3>
                <ul>
                  <li>Tijuana, Baja California</li>
                  <li>Flower Bar</li>
                  <li>Eventos temáticos</li>
                </ul>
              </div>
            </Col>
          </Row>
          <h3 className="text-center">Pequeños detalles que alegran tu día</h3>
          <Row data-aos={"fade-up"}>
            {products?.map((product) => (
              <LinkContainer
                to={`/producto/${product._id}/`}
                style={{ cursor: "pointer" }}
              >
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              </LinkContainer>
            ))}
          </Row>
          <Container className="d-flex justify-content-center mb-5">
            <LinkContainer to="/catalogo/">
              <Button variant="primary">
                {" "}
                <i className="fas fa-store"></i> Ver catálogo completo
              </Button>
            </LinkContainer>
          </Container>
        </Container>
      </div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-aos={"fade-down"}
      >
        <Carousel.Item>
          <img
            onClick={() => history.push("/catalogo")}
            style={{ cursor: "pointer" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/majo-floral-desing/image/upload/v1619808591/pic4_joomlm.png"
            alt="First slide"
            style={{ maxHeight: "60vh" }}
          />
          <Carousel.Caption>
            <h3
              style={{
                textShadow: "0 0 25px #000",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Contáctanos para cotizaciones
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/catalogo")}
            style={{ cursor: "pointer" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/majo-floral-desing/image/upload/v1619808594/pic5_pv5qop.png"
            alt="Second slide"
            style={{ maxHeight: "60vh" }}
          />
          <Carousel.Caption>
            <h3
              style={{
                textShadow: "0 0 25px #000",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Los pequeños detalles significan mucho
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/catalogo")}
            style={{ cursor: "pointer" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/majo-floral-desing/image/upload/v1619808597/pic6_bduj5l.png"
            alt="Third slide"
            style={{ maxHeight: "60vh" }}
          />
          <Carousel.Caption>
            <h3
              style={{
                textShadow: "0 0 25px #000",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Detalles para cualquier ocasión
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
