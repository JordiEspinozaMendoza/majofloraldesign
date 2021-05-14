import { Card, Button } from "react-bootstrap";
import "./styles.css";
export default function Product({ product }) {
  return (
    <Card className="my-3 rounded custom-product" border="light">
      <Card.Img
        src={`https://res.cloudinary.com/majo-floral-desing/${product.img}`}
      ></Card.Img>
      <Card.Body className="text-card-body">
        <Card.Title
          className="text-product"
          style={{ fontFamily: "Dancing Script" }}
        >
          {product.name}
        </Card.Title>
        <h5 className="text-product-price">
          $ {product.price}
          MXN
        </h5>
          <Button className="product-details">
          {" "}
          <i className="fas fa-info-circle"></i> Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}
