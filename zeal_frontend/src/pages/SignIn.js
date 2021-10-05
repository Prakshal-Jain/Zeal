import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Alert, Nav } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

import { Routes } from "../routes";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                "email": null,
                "username": null,
                "password": null,
            },
            errors: [],
        }
    }

    setCredentials = (key, value) => {
        var credential = this.state.credentials
        credential[key] = value
        this.setState({ credentials: credential })
    }

    render() {
        return (
            <main style={{ backgroundColor: "#262B40" }}>
                <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                    <Container>
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Homepage.path} className="text-gray-100">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
                            </Card.Link>
                        </p>
                        <Row className="justify-content-center form-bg-image">
                            <Col xs={12} className="d-flex align-items-center justify-content-center">
                                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                    <div className="text-center text-md-center mb-4 mt-md-0">
                                        <h3 className="mb-0">Sign In</h3>
                                    </div>
                                    <Form className="mt-4">

                                        <Form.Group id="email" className="mb-4">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </InputGroup.Text>
                                                <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={(event) => this.setCredentials("email", event.target.value)} />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group id="password" className="mb-4" onChange={(event) => this.setCredentials("password", event.target.value)}>
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control required type="password" placeholder="Password" />
                                            </InputGroup>
                                        </Form.Group>

                                        

                                        {
                                            this.state.errors.length > 0 ?
                                                <Alert variant="warning">
                                                    <ul>
                                                        {this.state.errors.map((x, index) => <li key={`error_${index}`}>{x}</li>)}
                                                    </ul>
                                                </Alert>
                                                :
                                                ""
                                        }

                                        <Button variant="primary" className="w-100" onClick={this.validateCredentials}>
                                            Sign in
                                        </Button>
                                    </Form>

                                    <div className="mt-3 mb-4 text-center">
                                        <span className="fw-normal">or</span>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </Button>
                                        <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </Button>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        <span className="fw-normal">
                                            Forgot your password?
                                            <Card.Link as={Link} to={Routes.SignUp.path} className="fw-bold">
                                                {` Recover `}
                                            </Card.Link>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        <span className="fw-normal">
                                            Need an account?
                                            <Card.Link as={Link} to={Routes.SignUp.path} className="fw-bold">
                                                {` Sign Up `}
                                            </Card.Link>
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        );
    }
};

export default SignIn;