import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const CartItem = (props) => {
  debugger;
  const { cartItem, cartKey } = props;
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "15rem" }}>
              <Card.Img variant="top" src={cartItem.product.image} />
              <Card.Body>
                <Card.Title>
                  <b style={{ textTransform: "capitalize" }}>
                    {cartItem.product.category}{" "}
                    <span className="tag is-primary">
                      ₹{cartItem.product.price}
                    </span>
                  </b>
                </Card.Title>
                <Card.Text>{cartItem.product.title}</Card.Text>
                <Card.Text>{cartItem.product.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => props.removeFromCart(cartKey)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartItem;
