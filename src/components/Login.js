import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withContext from "../withContext";

const Login = (props) => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setError("Fill all fields!");
    }
    props.context.login(username, password).then((loggedIn) => {
      if (!loggedIn) {
        setError("Invalid Credentails");
      }
    });
  };

  const handleUserRegistration = () => {
    props.context.handleUserRegistration();
  };
  return !props.context.user ? (
    <>
      <div>
        <div>
          <h4>Login</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={login}>
        <div style={{ maxWidth: "40%", margin: "0 0 0 29%" }}>
          <div>
            <div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ float: "left" }}>
                  Email address <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
            </div>

            <div>
              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ float: "left" }}>
                  Password <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>
            </div>
            {error && <div className="has-text-danger">{error}</div>}
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>{" "}
              <Button variant="primary" onClick={handleUserRegistration}>
                <Link
                  to="/registration"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Registration
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Redirect to="/products" />
  );
};
export default withContext(Login);
