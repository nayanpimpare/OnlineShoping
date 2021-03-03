import React, { useEffect } from "react";
import withContext from "../withContext";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";

const Users = (props) => {
  const [users, setUsers] = React.useState();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    Axios.get("https://randomuser.me/api/").then((res) =>
      setUsers(res.data.results)
    );
  }, []);

  useEffect(() => {
    console.log(users);
    debugger;
    // if (window.location.href === "http://localhost:3000/user-info") {
    //   setOpen(true);
    // }
  });

  const viewUserDetails = () => {
    console.log("Abcd");
  };

  const handleShow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Photo</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {users &&
              users.map((value, index) => (
                <td key={index}>
                  {value.name.title} {value.name.first} {value.name.last}
                </td>
              ))}
            {users &&
              users.map((value, index) => (
                <td key={index}>
                  {value.location.city}, {value.location.state},{" "}
                  {value.location.country} - {value.location.postcode}
                </td>
              ))}
            {users &&
              users.map((value, index) => (
                <td key={index}>
                  <img src={value.picture.thumbnail} alt="User Image" />
                </td>
              ))}
            {users &&
              users.map((value, index) => <td key={index}>{value.email}</td>)}

            {users &&
              users.map((value, index) => (
                <td key={index}>
                  {new Date(value.dob.date).getDate()}/
                  {new Date(value.dob.date).getMonth()}/
                  {new Date(value.dob.date).getFullYear()}
                </td>
              ))}
            {users &&
              users.map((value, index) => <td key={index}>{value.gender}</td>)}
            {users &&
              users.map((value, index) => <td key={index}>{value.phone}</td>)}

            {users &&
              users.map((value, index) => (
                <td key={index}>
                  <Link to="/user-info">
                    <Button variant="secondary" onClick={handleShow}>
                      View
                    </Button>
                  </Link>
                </td>
              ))}
          </tr>
        </tbody>
      </Table>

      <>
        <Modal show={open}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              {users &&
                users.map((value, index) => (
                  <img src={value.picture.thumbnail} alt="User Image" />
                ))}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Name:
            {users &&
              users.map(
                (value, index) =>
                  ` ${value.name.title} ${value.name.first} ${value.name.last}`
              )}
            <br />
            Address:{" "}
            {users &&
              users.map(
                (
                  value,
                  index
                ) => `${value.location.city}, ${value.location.state},
                  ${value.location.country} - ${value.location.postcode}`
              )}
            <br />
            Email: {users && users.map((value, index) => value.email)}
            <br />
            DOB:{" "}
            {users &&
              users.map(
                (value, index) =>
                  `${new Date(value.dob.date).getDate()}/
                  ${new Date(value.dob.date).getMonth()}/
                  ${new Date(value.dob.date).getFullYear()}`
              )}
            <br />
            Age: {users && users.map((value, index) => value.dob.age)}
            <br />
            Gender: {users && users.map((value, index) => `${value.gender}`)}
            <br />
            Phone: {users && users.map((value, index) => `${value.phone}`)}
          </Modal.Body>
          <Modal.Footer>
            <Link to="/users">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default withContext(Users);
