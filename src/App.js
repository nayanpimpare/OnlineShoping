import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

import Users from "./components/Users";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Registration from "./components/Registration";

import Context from "./Context";
import { Nav, Navbar } from "react-bootstrap";

function App(props) {
  const [user, setUser] = React.useState(null);
  const [cart, setCart] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [showMenu, setShowMenu] = React.useState();
  const routerRef = React.createRef();

  useEffect(() => {
    async function fetchProductAPI() {
      const products = await Axios.get("https://fakestoreapi.com/products");
      setProducts(products.data);
    }
    fetchProductAPI();
  }, []);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    setUser(user);
  }, []);

  const addToCart = (cartItem) => {
    let carts = [];
    carts = cart;
    if (carts[cartItem.id]) {
      carts[cartItem.id].amount += cartItem.amount;
    } else {
      carts[cartItem.id] = cartItem;
    }
    if (carts[cartItem.id].amount > carts[cartItem.id].product.stock) {
      carts[cartItem.id].amount = carts[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(carts));
    setCart(carts);
    setShowMenu(!showMenu);
  };

  const removeFromCart = (cartItemId) => {
    let carts = [];
    carts = cart;
    delete carts[cartItemId];
    localStorage.setItem("carts", JSON.stringify(carts));
    setCart(carts);
  };

  const clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    setCart(cart);
  };

  const checkout = () => {
    if (!user) {
      routerRef.current.history.push("/login");
      return;
    }

    let carts = [];
    carts = cart;

    const product = products.map((p) => {
      if (carts[p.id]) {
        Axios.put(`https://fakestoreapi.com/products/${p.id}`, { ...p });
      }
      return p;
    });
    setProducts(product);
    clearCart();
  };

  const login = async (email, password) => {
    if (email === "admin@xyz.com" && password === "Admin_007") {
      const user = {
        email,
        // token: res.data.accessToken,
        accessLevel: email === "admin@xyz.com" ? 0 : 1,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const handleUserRegistration = () => {
    debugger;
  };

  const viewUserDetails = () => {};

  const logout = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Context.Provider
      value={{
        user: user,
        cart: cart,
        products: products,
        removeFromCart: removeFromCart,
        addToCart: addToCart,
        login: login,
        handleUserRegistration: handleUserRegistration,
        viewUserDetails: viewUserDetails,
        clearCart: clearCart,
        checkout: checkout,
      }}
    >
      <Router ref={routerRef}>
        <div className="App">
          <Navbar bg="light" variant="light">
            <Navbar.Brand>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
              >
                NAYAN E-SHOP
              </span>
            </Navbar.Brand>
            <Nav className="mr-auto" style={{ float: "right" }}>
              <Nav.Link>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
              </Nav.Link>
              <Nav.Link>
                {user && user.accessLevel < 1 && (
                  <Link to="/users" className="navbar-item">
                    Users
                  </Link>
                )}
              </Nav.Link>
              <Nav.Link>
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(cart).length}
                  </span>
                </Link>
              </Nav.Link>
              <Nav.Link>
                {!user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/users" component={Users} />
            <Route path="/products" component={ProductList} />
            <Route path="/registration" component={Registration} />
            <Route path="/user-info" component={Users} open={true} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
