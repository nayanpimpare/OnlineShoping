import React from "react";
import withContext from "../withContext";
import { Form, Col, Button, Alert, Toast } from "react-bootstrap";

const Registration = (props) => {
  debugger;
  const [registrationDetails, setRegistrationDetails] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleChange = (name, value) => {
    const updatedRegistrationDetails = { ...registrationDetails };
    updatedRegistrationDetails[name] = value;
    setRegistrationDetails(updatedRegistrationDetails);
  };

  const regitration = () => {
    console.log(registrationDetails);
    console.log("props.context", props.context);
    if (validation()) {
      props.context.validation();
      setOpen(true);
    }
  };

  const validation = (value) => {
    debugger;
    let flag = true;
    let errorMessage = {};
    if (!value) {
      errorMessage.fname = `First Name is Required`;
      flag = false;
    }
    if (!value) {
      errorMessage.lname = `Last Name is Required`;
      flag = false;
    }
    if (!value) {
      errorMessage.emailaddress = `Email Address is Required`;
      flag = false;
    }
    if (!value) {
      errorMessage.contact = `Contact is Required`;
      flag = false;
    }
    if (!value) {
      errorMessage.username = `User Name is Required`;
      flag = false;
    }
    if (!value) {
      errorMessage.password = `Password Name is Required`;
      flag = false;
    } else {
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$/;
      if (!regularExpression.test(registrationDetails.password)) {
        errorMessage.password =
          "Password must containe combination of Alphabet, Number, and Special character";
        flag = false;
      }
    }
    console.log("errorMessage", errorMessage);
    setErrorMessage(errorMessage);
    return flag;
  };
  console.log(Object.keys(errorMessage).length > 0);
  debugger;
  return (
    <div style={{ maxWidth: "40%", margin: "0 0 0 29%" }}>
      <h4>Registration</h4>
      <Form
        noValidate
        validated={Object.keys(errorMessage).length > 0 ? true : false}
      >
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                First Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="fname"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 && errorMessage.fname}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                Last Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="lname"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Last Name"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 && errorMessage.lname}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                Email Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Email Address"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 &&
                  errorMessage.emailaddress}
                .
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                Contact Number <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="contact"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Contact Number"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 && errorMessage.contact}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                User Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="username"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="User Name"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 && errorMessage.username}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ float: "left" }}>
                Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                {Object.keys(errorMessage).length > 0 && errorMessage.password}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <div>
        <Button variant="primary" onClick={regitration}>
          Register
        </Button>
      </div>
      {open && (
        <div style={{ margin: "-41% 0% 0% 19%" }}>
          <Toast
            onClose={() => setOpen(false)}
            show={open}
            delay={3000}
            autohide
          >
            <Alert variant="success">User Created Successfully!</Alert>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default withContext(Registration);
