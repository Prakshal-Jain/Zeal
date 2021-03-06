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
} from "@themesberg/react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import ZealHero from "../assets/images/zeal-logo-withoutBg.png";
import { Routes } from "../routes";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
                <Nav.Link as={Link} to={Routes.SignIn.path}>
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to={Routes.SignUp.path}>
                  Sign Up
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

  renderHeader = () => {
    return (
      <section
        className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 text-white bg-primary"
        id="home"
      >
        <Container className="hero-container">
          <Row>
            <Col xs={12} className="text-center">
              {/* Edit styling at: zeal_frontend/src/scss/volt/components/_icon-box.scss */}
              <h1 className="fw-bolder theme-gradient-text">ZEAL</h1>
              <p className="fw-light mb-5 h5">Events Simplified</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                className="m-1"
                as={Link}
                to={Routes.SignUp.path}
              >
                Sign Up
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  render() {
    return (
      <div>
        {this.renderNavBar()}
        {this.renderHeader()}
      </div>
    );
  }
}

export default Homepage;
