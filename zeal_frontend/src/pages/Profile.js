import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Breadcrumb,
  Card,
  Form,
  Button,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../routes";
import ProfileImg from "../assets/profile_images/Image.jpeg";

const Profile = () => {
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
    axios.get("/api/user").then((response) => setUser(response.data));
  }, []);

  const history = useHistory();

  const logout = () => {
    axios.post('/api/logout').then((response) => {
      if (response.status === 200) {
        history.push("/");

      }
    });
  };

  const render_profile_form = () => {
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">General information</h5>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                Profile Picture
              </Col>
              <Col md={6} className="mb-3">
                <Row>
                  <Col xs={9}>
                    <Form.Control type="file" />
                  </Col>
                  <Col xs={3} className="d-flex justify-content-center">
                    <Card.Img
                      src={ProfileImg}
                      alt="Neil Portrait"
                      className="user-avatar small-avatar rounded-circle"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
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
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Row>
                    <Col>
                      <Form.Label>Password</Form.Label>
                      <Button variant="danger" size="sm" className={"mx-4"}>
                        Change Password
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Button
                  variant="danger"
                  size="sm"
                  className={"mx-4"}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className={"m-3"}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <Card.Link as={Link} to={Routes.Homepage.path}>
                <FontAwesomeIcon icon={faHome} />
              </Card.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Profile</h4>
          <p className="mb-0">Edit or view your profile.</p>
        </div>
      </div>

      <Row className="d-flex justify-content-center">
        <Col xs={12}>{render_profile_form()}</Col>
      </Row>
    </div>
  );
};

export default Profile;
