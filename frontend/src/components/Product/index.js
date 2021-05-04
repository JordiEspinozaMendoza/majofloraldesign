import { Card, Button } from "react-bootstrap";
import "./styles.css";
export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded custom-product" border="light">
      <Card.Img
        src={`https://res.cloudinary.com/majo-floral-desing/${product.img}`}
      ></Card.Img>
      <Card.Body>
        <Card.Title style={{ fontFamily: "Dancing Script" }}>
          {product.name}
        </Card.Title>
        <h5>
          $ {product.price}
          MXN
        </h5>
        <Card.Text>{product.name}</Card.Text>
        <Button>
          {" "}
          <i className="fas fa-info-circle"></i> Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}
