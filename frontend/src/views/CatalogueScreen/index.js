import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Image, Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginator from "../../components/Paginator";
import Header from "../../components/Header";

import { listCategories } from "../../actions/categorie_actions";
import { listProducts } from "../../actions/product_actions";
import { LinkContainer } from "react-router-bootstrap";

import "./styles.css";

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

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    error: errorList,
    products,
    pages,
  } = productList;
  useEffect(() => {
    dispatch(listProducts("all", actualPage, categorie));
  }, [categorie, dispatch, actualPage]);
  useEffect(() => {
    dispatch(listCategories());
  }, []);
  return (
    <div style={{ marginBottom: "5vh", overflowX: "hidden" }}>
      <Header>
        <h1
          className="text-light"
          style={{ fontSize: "5rem", letterSpacing: "2px" }}
        >
          Catálogo
        </h1>
      </Header>
      <Row style={{ marginTop: "5vh" }}>
        <Col md={3} className="text-dark categories-list">
          <div className="bg-light">
            <div className="p-3">
              <h5
                className={"all" == categorie && "text-primary"}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCategorie("all");
                  setActualPage(1);
                }}
              >
                <i className="fas fa-circle"></i> Todos
              </h5>
            </div>
            {loadingCategories ? (
              <Loader />
            ) : errorCategories ? (
              <Message variant="danger">{errorCategories}</Message>
            ) : (
              <>
                {categories?.map((category) => (
                  <div className="p-3">
                    <h5
                      className={category._id == categorie && "text-primary"}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCategorie(category._id);
                        setActualPage(1);
                      }}
                    >
                      <i className="fas fa-circle"></i> {category.name}
                    </h5>
                  </div>
                ))}
              </>
            )}
          </div>
        </Col>
        <Col md={9} className="bg-light">
          <div className=" p-2" style={{ minHeight: "70vh" }}>
            <Row>
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
                    <Col sm={12} md={6} lg={4} xl={3}>
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
