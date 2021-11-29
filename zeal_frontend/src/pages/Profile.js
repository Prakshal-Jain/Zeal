import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Modal,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  // The state hook for the user object.
  // We'll call setUser(newUser) to change the user (state), which will then trigger this component to rebuid
  // with the new provided user object.
  const [user, setUser] = useState({});

  // The (side) effect hook.
  // This hook takes in a callback (effect) as the first parameter and a dependency as the second.
  // Anytime the dependency array changes, the callback is called.
  // We'll make the dependency array empty so that the effect is only called on the first build and never again.
  useEffect(() => {
    // Make a request for the currently logged in user's data and set it using the hook which will then trigger a rebuild.
    axios
      .get("/api/user")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch(() => history.push("/"));
  }, [history]);

  const logout = () => {
    axios.post("/api/logout").then((response) => {
      if (response.status === 200) {
        history.push("/");
      }
    });
  };

  const render_profile_form = () => {
    return (
      <>
        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>Log out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={logout}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">General information</h5>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="fullName">
                    <Form.Label>Full Name</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  {user.name}
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <Form.Group id="username">
                    <Form.Label>Username</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  {user.username}
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  {user.email}
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowModal(true)}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div className={"m-3"}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2>Profile</h2>
        </div>
      </div>

      <Row className="d-flex justify-content-center">
        <Col xs={12}>{render_profile_form()}</Col>
      </Row>
    </div>
  );
};

export default Profile;
