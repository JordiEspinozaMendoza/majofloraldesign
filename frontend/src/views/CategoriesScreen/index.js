import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginator from "../../components/Paginator";

import {
  listCategories,
  deleteCategorie,
} from "../../actions/categorie_actions";
import { CATEGORIE_DELETE_RESET } from "../../constants/categorie_contants";
export default function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categorieDelete = useSelector((state) => state.categorieDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
    error: errorDelete,
  } = categorieDelete;

  const categorieList = useSelector((state) => state.categorieList);
  const { loading: loadingList, error: errorList, categories } = categorieList;

  useEffect(() => {
    dispatch({ type: CATEGORIE_DELETE_RESET });

    !userInfo ? history.push("/") : dispatch(listCategories());
  }, [dispatch, history, userInfo, successDelete]);

  const deleteCategorieHandler = (id) => {
    window.confirm("¿Segur@ de querer eliminar esta categoría?") &&
      dispatch(deleteCategorie(id));
  };

  return (
    <Container style={{ marginTop: "15vh" }}>
      <main>
        <>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        </>
        <Row>
          <Col>
            <h1>Categorias</h1>
          </Col>
          <Col className="text-right">
            <LinkContainer to="/admin/categorias/registrar/">
              <Button className="py-3">
                <i className="fas fa-plus"></i> Crear categoría
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row>
          {loadingList ? (
            <Loader />
          ) : errorList ? (
            <Message variant="danger">{errorList}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((categorie) => (
                  <tr key={categorie._id}>
                    <td>{categorie._id}</td>
                    <td>{categorie.name}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/categorias/${categorie._id}/editar/`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteCategorieHandler(categorie._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </main>
    </Container>
  );
}
