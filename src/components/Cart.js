import React from "react";
import { Alert, CardGroup, Button } from "react-bootstrap";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  debugger;
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div>
        <h1 style={{ margin: "2% 66% 2% 0%" }}>My Cart</h1>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div>
            <CardGroup>
              {cartKeys.map((key) => (
                <CartItem
                  cartKey={key}
                  key={key}
                  cartItem={cart[key]}
                  removeFromCart={props.context.removeFromCart}
                />
              ))}
            </CardGroup>
            <div>
              <br />
              <div>
                <Button variant="secondary" onClick={props.context.clearCart}>
                  Clear cart
                </Button>{" "}
                <Button variant="secondary" onClick={props.context.checkout}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Alert variant="warning">No item in cart!</Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
