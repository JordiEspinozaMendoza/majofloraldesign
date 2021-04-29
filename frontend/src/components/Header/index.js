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

export default function Header({ children }) {
  return (
    <div
      className="d-flex justify-content-center w-100 align-items-start mt-4 p-4 text-primary main flex-column"
      style={{
        minHeight: "80vh",
      }}
    >
      {children}
    </div>
  );
}
