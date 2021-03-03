import React from "react";
import ProductItem from "./ProductItems";
import withContext from "../withContext";
import { Alert, CardGroup } from "react-bootstrap";

const ProductList = (props) => {
  debugger;
  const { products } = props.context;

  return (
    <>
      <h1 style={{ margin: "2% 66% 2% 0%" }}>Our Products</h1>
      <br />
      <div className="container">
        <div>
          <CardGroup>
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  addToCart={props.context.addToCart}
                />
              ))
            ) : (
              <div>
                <Alert variant="warning">No products found!</Alert>
              </div>
            )}
          </CardGroup>
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);
