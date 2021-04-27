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
export default function HomeScreen({history}) {
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
  const {
    categories
  } = categorieList;

  useEffect(() => {
    dispatch(listProducts("all", 1));
    dispatch(listCategories());
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Header>
        <h1 className="text-light">Una flor florece para su propia alegría</h1>
        <Link to="/catalogo/">
          <Button>
            <i className="fas fa-store"></i> Ver catálogo
          </Button>
        </Link>
      </Header>
      <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/jordiespinoza/image/upload/v1619505502/Dise%C3%B1o_sin_t%C3%ADtulo_15_n3zikr.png)",
          backgroundSize: "120% 100%",
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
            style={{ minHeight: "20vh", width: "100%" }}
            className="mt-4 mb-4 d-flex flex-row justify-content-between"
          >
            <Col md={6}>
              <div
                className="d-flex align-items-left justify-content-center p-2 cards-flowers flex-column"
                style={{
                  backgroundImage:
                    "url(https://image.freepik.com/free-photo/beautiful-roses-bouquet-isolated-white-background_23-2147940338.jpg)",
                }}
              >
                <h3>Feliz día de las madres</h3>
                <span className="w-50">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="d-flex align-items-left justify-content-center p-2 cards-flowers flex-column"
                style={{
                  backgroundImage:
                    "url(https://image.freepik.com/free-photo/beautiful-roses-bouquet-isolated-white-background_23-2147940338.jpg)",
                }}
              >
                <h3>Sorprende a tu pareja</h3>
                <ul>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                </ul>
              </div>
            </Col>
          </Row>
          <h3>Pequeños detalles que alegran tu día</h3>
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
                <i className="fas fa-store"></i> Ver catalogo completo
              </Button>
            </LinkContainer>
          </Container>
        </Container>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <img
          onClick={()=> history.push("/catalogo")} style={{cursor:"pointer"}}
            className="d-block w-100"
            src="https://www.odt.co.nz/sites/default/files/styles/odt_landscape_extra_large_21_10/public/story/2021/01/floristflowersgettyimages-921643034.jpg?itok=kUKQD08T"
            alt="First slide"
            style={{maxHeight: "60vh"}}
          />
              <Carousel.Caption>
      <h3></h3>
    </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
          onClick={()=> history.push("/catalogo")} style={{cursor:"pointer"}}
            className="d-block w-100"
            src="https://www.odt.co.nz/sites/default/files/styles/odt_landscape_extra_large_21_10/public/story/2021/01/floristflowersgettyimages-921643034.jpg?itok=kUKQD08T"
            alt="Second slide"
                        style={{maxHeight: "60vh"}}

          />
              <Carousel.Caption>
      <h3></h3>
    </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
          onClick={()=> history.push("/catalogo")} style={{cursor:"pointer"}}
            className="d-block w-100"
            src="https://www.odt.co.nz/sites/default/files/styles/odt_landscape_extra_large_21_10/public/story/2021/01/floristflowersgettyimages-921643034.jpg?itok=kUKQD08T"
            alt="Third slide"
                        style={{maxHeight: "60vh"}}

          />
              <Carousel.Caption>
      <h3></h3>
    </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}