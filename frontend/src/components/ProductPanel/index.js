import { Image, Row, Col } from "react-bootstrap";
import "./styles.css";
export default function ProductPanel({ product, children }) {
  return (
    <Row
      className="d-flex w-100 product-panel"
      style={{ border: "2px solid #eee" }}
    >
      <Col md={3} xs={12}>
        {product?.img && (
          <div className="d-flex justify-content-center">
            <Image
              className="d-block my-4 shadow-lg"
              src={`https://res.cloudinary.com/majo-floral-desing/${product.img}`}
            />
          </div>
        )}
      </Col>
      <Col className="p-4" md={9} xs={12}>
        <b style={{ color: "#333" }}>{product.name}</b>
        <span>$ {product.price}</span>
        <span>{product.description.substring(0, 150)}...</span>
        {children}
      </Col>
    </Row>
  );
}
