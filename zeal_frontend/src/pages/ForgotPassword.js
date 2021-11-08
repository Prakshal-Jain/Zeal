import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
  Alert,
  Nav,
  Navbar,
  Image,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import ZealHero from "../assets/images/zeal-logo-withoutBg.png";

import { Routes } from "../routes";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: null,
      },
      errors: [],
    };
  }

  validateCredentials = async () => {
    axios.post("/api/forgot", this.state.credentials).then((response) => {
      if (response.status === 200) {
        this.setState({ redirect: true });
      }
    });
  };

  setCredentials = (key, value) => {
    var credential = this.state.credentials;
    credential[key] = value;
    this.setState({ credentials: credential });
  };

  renderNavBar = () => {
    return (
      <Navbar
        variant="dark"
        expand="lg"
        bg="dark"
        className="navbar-transparent navbar-theme-primary sticky-top"
      >
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand
            as={Link}
            to={Routes.Homepage.path}
            className="me-lg-3 d-flex align-items-center"
          >
            <Image src={ZealHero} />
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to={Routes.SignIn.path}>
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to={Routes.SignUp.path}>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to={"/"}>
                  Support
                </Nav.Link>
                <Nav.Link as={Link} to={Routes.Contact.path}>
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    );
  };

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <main style={{ backgroundColor: "#262B40" }}>
          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              <p className="text-center">
                <Card.Link
                  as={Link}
                  to={Routes.SignIn.path}
                  className="text-gray-100"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back
                  to Sign In
                </Card.Link>
              </p>
              <Row className="justify-content-center form-bg-image">
                <Col
                  xs={12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Reset Password</h3>
                    </div>
                    <Form className="mt-4">
                      <Form.Group id="username" className="mb-4">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUserAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            autoFocus
                            required
                            type="text"
                            placeholder="Enter username"
                            onChange={(event) =>
                              this.setCredentials(
                                "username",
                                event.target.value
                              )
                            }
                          />
                        </InputGroup>
                      </Form.Group>

                      {this.state.errors.length > 0 ? (
                        <Alert variant="warning">
                          <ul>
                            {this.state.errors.map((x, index) => (
                              <li key={`error_${index}`}>{x}</li>
                            ))}
                          </ul>
                        </Alert>
                      ) : (
                        ""
                      )}

                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={this.validateCredentials}
                      >
                        Send Me the Code
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </div>
    );
  }
}

export default ForgotPassword;
