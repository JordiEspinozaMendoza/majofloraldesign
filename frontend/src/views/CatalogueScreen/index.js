import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Image, Row, Col, Form } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginator from "../../components/Paginator";
import Header from "../../components/Header";

import { listCategories } from "../../actions/categorie_actions";
import { listProducts } from "../../actions/product_actions";
import { LinkContainer } from "react-router-bootstrap";

import "./styles.css";

import AOS from "aos";
import "aos/dist/aos.css";

export default function CatalogueScreen() {
  const dispatch = useDispatch();
  const [actualPage, setActualPage] = useState(1);
  const [categorie, setCategorie] = useState("all");
  const categorieList = useSelector((state) => state.categorieList);
  const {
    error: errorCategories,
    loading: loadingCategories,
    success: successCategories,
    categories,
  } = categorieList;

  const [orderPrice, setOrderPrice] = useState("all");
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    error: errorList,
    products,
    pages,
  } = productList;
  useEffect(() => {
    dispatch(listProducts("all", actualPage, categorie, orderPrice));
  }, [categorie, dispatch, actualPage, orderPrice]);
  useEffect(() => {
    dispatch(listCategories());
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div style={{ marginBottom: "5vh", overflowX: "hidden" }}>
      <Header customClass={"catalogueHeader"}>
        <h1
          className="text-light"
          style={{
            fontSize: "5rem",
            letterSpacing: "2px",
            fontFamily: "Dancing Script",
          }}
        >
          Catálogo
        </h1>
      </Header>
      <Row style={{ marginTop: "5vh" }} data-aos={"fade-down"}>
        <Col
          md={3}
          className="text-dark categories-list "
          style={{ paddingLeft: "30px" }}
        >
          <h5>Filtrar</h5>
          <span className="py-2 d-block">Categorías</span>
          <Form.Control
            as="select"
            custom
            onChange={(e) => {
              setCategorie(e.target.value);
              setActualPage(1);
            }}
          >
            <option value={"all"} selected={categorie === "all" ? true : false}>
              Todo
            </option>
            {loadingCategories ? (
              <Loader />
            ) : errorCategories ? (
              <Message variant="danger">{errorCategories}</Message>
            ) : (
              <>
                {categories?.map((category) => (
                  <option
                    value={category._id}
                    selected={categorie === category._id ? true : false}
                  >
                    {category.name}
                  </option>
                ))}
              </>
            )}
          </Form.Control>
          <span className="py-2 d-block">Precio</span>
          <Form.Control
            as="select"
            custom
            onChange={(e) => {
              setOrderPrice(e.target.value);
              setActualPage(1);
            }}
          >
            <option
              value={"all"}
              selected={orderPrice === "all" ? true : false}
            >
              Ninguno
            </option>
            <option
              value={"Max"}
              selected={orderPrice === "Max" ? true : false}
            >
              Mayor a menor
            </option>
            <option
              value={"Min"}
              selected={orderPrice === "Min" ? true : false}
            >
              Menor a mayor
            </option>
          </Form.Control>
        </Col>
        <Col md={9}>
          <div className=" p-2" style={{ minHeight: "70vh" }}>
            <Row className="products-row">
              {loadingList ? (
                <Loader />
              ) : errorList ? (
                <Message variant="danger">{errorList}</Message>
              ) : products?.length == 0 ? (
                <Message variant="primary" style={{ width: "100%" }}>
                  No hay productos para esta categoría
                </Message>
              ) : (
                products?.map((product) => (
                  <LinkContainer
                    to={`/producto/${product._id}/`}
                    style={{ cursor: "pointer" }}
                  >
                    <Col xs={6} md={4}>
                      <Product product={product} />
                    </Col>
                  </LinkContainer>
                ))
              )}
            </Row>
            <Paginator
              pages={pages}
              changePage={(value) => setActualPage(value)}
              pageToSearch={actualPage}
            ></Paginator>
          </div>
        </Col>
      </Row>
    </div>
  );
}
