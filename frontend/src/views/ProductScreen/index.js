import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Container, Button } from "react-bootstrap";
import ImageZoom from "react-medium-image-zoom";
import { productDetails as details } from "../../actions/product_actions";

import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
export default function ProductScreen({ history, match }) {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {
    error: errorDetails,
    loading: loadingDetails,
    success: successDetails,
    product,
  } = productDetails;
  useEffect(() => {
    dispatch(details(productId));
  }, [productId, match, history]);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return loadingDetails ? (
    <div style={{ minHeight: "100vh", marginTop: "15vh" }}>
      <Loader />
    </div>
  ) : errorDetails ? (
    <div style={{ minHeight: "100vh", marginTop: "15vh" }}>
      <Message variant="danger">{errorDetails}</Message>
    </div>
  ) : (
    <div
      style={{ marginTop: "10vh", overflowX: "hidden", marginBottom: "5vh" }}
    >
      <Container className="p-5" data-aos={"fade-down"}>
        <div>
          <Link to="/catalogo">
            <Button>
              {" "}
              <i className="fas fa-exchange-alt"></i> Regresar
            </Button>
          </Link>
          <h1
            className="text-primary mt-3"
            style={{ fontFamily: "Dancing Script" }}
          >
            {product?.name}
          </h1>
          {product?.categorie["name"] && (
            <h5 className="text-dark">
              Categoria: {product?.categorie["name"]}
            </h5>
          )}
        </div>
      </Container>
      <Container>
        <Row>
          <Col md={5} data-aos={"fade-right"}>
            <ImageZoom
              image={{
                src: `https://res.cloudinary.com/majo-floral-desing/${product?.img}`,
                alt: `${product?.name}`,
                className: "img",
                style: { width: "100%", height: "60vh" },
              }}
              zoomImage={{
                src: `https://res.cloudinary.com/majo-floral-desing/${product?.img}`,
                alt: `${product?.name}`,
              }}
            />
          </Col>
          <Col md={7} className="p-5" data-aos={"fade-left"}>
            <h1>
              ${" "}
              {product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              MXN
            </h1>
            <span>{product?.description}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
