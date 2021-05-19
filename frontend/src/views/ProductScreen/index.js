import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Container, Button, Image } from "react-bootstrap";
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
  const [image, setImage] = useState(true);
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
                src: image
                  ? `https://res.cloudinary.com/majo-floral-desing/${product?.img}`
                  : `https://res.cloudinary.com/majo-floral-desing/${product?.img2}`,
                alt: `${product?.name}`,
                className: "img image-product",
              }}
              zoomImage={{
                src: image
                  ? `https://res.cloudinary.com/majo-floral-desing/${product?.img}`
                  : `https://res.cloudinary.com/majo-floral-desing/${product?.img2}`,
                alt: `${product?.name}`,
              }}
            />
            <div className="d-flex align-items-start  list-pics">
              {product?.img && product?.img2 && (
                <>
                  <Image
                    src={`https://res.cloudinary.com/majo-floral-desing/${product?.img}`}
                    height="100px"
                    width="100px"
                    onClick={() => setImage(true)}
                  ></Image>
                  <Image
                    src={`https://res.cloudinary.com/majo-floral-desing/${product?.img2}`}
                    height="100px"
                    width="100px"
                    onClick={() => setImage(false)}
                  ></Image>
                </>
              )}
            </div>
          </Col>
          <Col md={7} className="p-5" data-aos={"fade-left"}>
            <h1>
              $ {product?.price}
              MXN
            </h1>
            <span>{product?.description}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
