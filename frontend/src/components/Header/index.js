import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavDropdown,
  Button,
} from "react-bootstrap";
import "./styles.css";
import React, { useState, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Header({ children, customClass }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div
      data-aos={"fade-down"}
      className={`d-flex justify-content-center w-100 align-items-start mt-4 p-4 text-primary main flex-column ${customClass}`}
    >
      {children}
    </div>
  );
}
