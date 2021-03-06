import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";

import { USER_LOGOUT } from "../../constants/user_constants";
import "./styles.css";
import { registerProduct } from "../../actions/product_actions";
import { PRODUCT_REGISTER_RESET } from "../../constants/product_contants";
export default function NavigationBar({ history }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("userInfo");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        collapseOnSelect
        className="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/majo-floral-desing/image/upload/v1619831386/Dise%C3%B1o_sin_t%C3%ADtulo_16_igmzkf.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Majo Floral design"
            />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>Majo Floral Design</Navbar.Brand>
        <Navbar.Toggle aria-controls="navigationBar" />
        <Navbar.Collapse id="navigationBar">
          <Nav className="ml-auto">
            {userInfo && (
              <NavDropdown title="Admin" id="navDropdown">
                <LinkContainer className="item-admin" to="/admin/productos">
                  <NavDropdown.Item>Productos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer className="item-admin" to="/admin/categorias">
                  <NavDropdown.Item>Categorias</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  className="item-admin"
                  onClick={() => logoutHandler()}
                >
                  Cerrar sesi??n
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-home"></i> Inicio
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/catalogo">
              <Nav.Link>
                {" "}
                <i className="fas fa-store"></i> Cat??logo
              </Nav.Link>
            </LinkContainer>

            <Nav.Link href="tel:664-291-9999">
              <i className="fas fa-phone-square"></i> (664-291-9999)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
