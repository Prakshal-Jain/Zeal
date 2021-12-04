import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUserSecret } from "@fortawesome/free-solid-svg-icons";
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
import { Link, Redirect } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import ZealHero from "../assets/images/zeal-logo-withoutBg.png";

import { Routes } from "../routes";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            credentials: {
                "password": "",
                "confirm_password": ""
            },
            errors: [],
            redirect: false,
        };
    }

    componentDidMount = () => {
        const location = window.location.href.split("/")
        const tok = location[location.length - 1]
        const token = new URLSearchParams(tok).get("token");
        if (token == null || token == undefined || token == "") {
            this.setState({ errors: [<div>The token is invalid. Please click on <b>Forgot password</b> or contact us.</div>] })
        }
        else {
            this.setState({ token: token, errors: [] })
        }
    }

    postResetPassword = async () => {
        var cred_copy = this.state.credentials
        cred_copy["token"] = this.state.token
        axios.post("/api/reset", cred_copy).then((response) => {
            if (response.status === 200) {
                this.setState({ redirect: true });
            }
        });
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
                                <Nav.Link as={Link} to={Routes.SignIn.path}>
                                    Sign In
                                </Nav.Link>
                                <Nav.Link as={Link} to={Routes.SignUp.path}>
                                    Sign Up
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

    setCredentials = (key, value) => {
        var credential = this.state.credentials;
        credential[key] = value;
        this.setState({ credentials: credential });
    };

    render() {
        if (this.state.token == null) {
            return (
                <Alert variant="warning" className={"m-4"}>
                    <div>The token is invalid. Please click on <b>Forgot password</b> or contact us.</div>
                </Alert>
            );
        }
        else if(this.state.redirect){
            <Redirect to={Routes.SignIn.path} />
        }

        return (
            <div>
                {this.renderNavBar()}
                <main style={{ backgroundColor: "#262B40", height: "100vh" }}>
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
                                            <Form.Group id="new_password" className="mb-4">
                                                <Form.Label>New Password</Form.Label>
                                                <InputGroup className="mb-4">
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon icon={faUserSecret} />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        autoFocus
                                                        required
                                                        type="text"
                                                        placeholder="Enter your new password"
                                                        onChange={(event) =>
                                                            this.setCredentials(
                                                                "password",
                                                                event.target.value
                                                            )
                                                        }
                                                    />
                                                </InputGroup>

                                                <Form.Label>Confirm Password</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon icon={faUserSecret} />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        autoFocus
                                                        required
                                                        type="text"
                                                        placeholder="Enter your password once more"
                                                        onChange={(event) =>
                                                            this.setCredentials(
                                                                "confirm_password",
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
                                                variant="success"
                                                className="w-100"
                                                onClick={this.postResetPassword}
                                            >
                                                Reset Password
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

export default ResetPassword;