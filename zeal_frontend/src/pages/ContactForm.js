import React from "react";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
  Navbar,
  Nav,
  Alert,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import ZealHero from "../assets/images/zeal-logo-withoutBg.png";
import { Routes } from "../routes";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: null,
        email: null,
        message: null,
      },
      errors: [],
    };
  }

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
          <Navbar.Brand className="me-lg-3 d-flex align-items-center">
            <Card.Link as={Link} to={Routes.Homepage.path}>
              <Image src={ZealHero} />
            </Card.Link>
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
                <Nav.Link as={Link} to="/">
                  Support
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={Routes.Contact.path}
                  className="d-sm-none d-xl-inline"
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    );
  };

  renderContactForm = () => {
    return (
      <main style={{ backgroundColor: "#262B40" }}>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image">
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Contact Us</h3>
                  </div>
                  <Form className="mt-4">
                    <Form.Group id="username" className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          placeholder="Enter Name"
                          onChange={(event) =>
                            this.setCredentials("username", event.target.value)
                          }
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          placeholder="Enter Email"
                          onChange={(event) =>
                            this.setCredentials("email", event.target.value)
                          }
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="message" className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder=""
                        style={{ height: "100px" }}
                      />
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
                      Send
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  };

  render() {
    return (
      <div>
        {this.renderNavBar()}
        {this.renderContactForm()}
      </div>
    );
  }
}

export default Contact;
