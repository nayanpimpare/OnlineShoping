import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ProductItem = (props) => {
  debugger;
  const { product } = props;
  return (
    <div style={{ height: "20%" }}>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "15rem" }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>
                  <b style={{ textTransform: "capitalize" }}>
                    {product.category} <br />
                    <span style={{ color: "green" }}>₹{product.price}</span>
                  </b>
                </Card.Title>
                <Card.Text>{product.title}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    props.addToCart({
                      id: product.id,
                      product,
                      price: 1,
                    })
                  }
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductItem;
