import { Card, Button } from "react-bootstrap";

export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded" border="light">
      <Card.Img
        style={{ height: "38vh" }}
        src={`https://res.cloudinary.com/majo-floral-desing/${product.img}`}
      ></Card.Img>
      <Card.Body>
        <Card.Title>$ {product.price}</Card.Title>
        <Card.Text>{product.name}</Card.Text>
        <Button>
          {" "}
          <i className="fas fa-info-circle"></i> Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}
