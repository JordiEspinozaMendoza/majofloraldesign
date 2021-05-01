import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginator from "../../components/Paginator";

import {
  listProducts,
  registerProduct,
  deleteProduct,
} from "../../actions/product_actions";
import {
  PRODUCT_REGISTER_RESET,
  PRODUCT_DELETE_RESET,
} from "../../constants/product_contants";
export default function ProductListScreen({ history }) {
  const [actualPage, setActualPage] = useState(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productRegister = useSelector((state) => state.productRegister);
  const {
    loading: loadingCreate,
    success: successCreate,
    product: productCreate,
    error: errorCreate,
  } = productRegister;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
    error: errorDelete,
  } = productDelete;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    error: errorList,
    products,
    pages,
  } = productList;
  useEffect(() => {
    dispatch({ type: PRODUCT_REGISTER_RESET });
    dispatch({ type: PRODUCT_DELETE_RESET });

    !userInfo ? history.push("/") : dispatch(listProducts("all", actualPage));
    successCreate &&
      history.push(`/admin/productos/${productCreate._id}/editar/`);
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    productCreate,
    successDelete,
    actualPage,
  ]);

  const createProductHandler = () => {
    dispatch(registerProduct());
  };

  const deleteProductHandler = (id) => {
    window.confirm("¿Segur@ de querer eliminar este producto?") &&
      dispatch(deleteProduct(id));
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
            <h1>Productos</h1>
          </Col>
          <Col className="text-right">
            <Button className="py-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Crear producto
            </Button>
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
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>¿Esta en stock?</th>
                  <th>Categoría</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.description.substr(0, 10)}</td>
                    <td className="text-center">
                      {product.inStock == true ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i className="fas fa-times-circle text-danger"></i>
                      )}
                    </td>
                    <td>{product.categorie["name"]}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/productos/${product._id}/editar/`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Paginator
            pages={pages}
            changePage={(value) => setActualPage(value)}
            pageToSearch={actualPage}
          ></Paginator>
        </Row>
      </main>
    </Container>
  );
}
