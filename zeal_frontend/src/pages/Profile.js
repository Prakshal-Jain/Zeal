import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Breadcrumb, Card, Form, Button } from '@themesberg/react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

import ProfileImg from "../assets/profile_images/Image.jpeg";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount = () => {
    }

    render_profile_form = () => {
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
                                        <Card.Img src={ProfileImg} alt="Neil Portrait" className="user-avatar small-avatar rounded-circle" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>First Name</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Control required type="text" placeholder="Enter your first name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Control required type="text" placeholder="Also your last name" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="email">
                                    <Form.Control required type="username" placeholder="Your awesome username" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="email">
                                    <Form.Control required type="email" placeholder="name@company.com" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                                <Form.Group id="joined">
                                    <Form.Label>Joined on</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="joined">
                                    October 11, 2021 (6:00PM)
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                                <Form.Group id="password">
                                    <Row>
                                        <Col>
                                            <Form.Label>Password</Form.Label>
                                            <Button variant="danger" size="sm" className={"mx-4"}>Change Password</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="password">
                                    <Form.Control required type="password" value="BlahBlahDefault" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        )
    }

    render() {
        return (
            <div className={"m-3"}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                            <Breadcrumb.Item><Card.Link as={Link} to={Routes.Homepage.path}><FontAwesomeIcon icon={faHome} /></Card.Link></Breadcrumb.Item>
                            <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                        </Breadcrumb>
                        <h4>Profile</h4>
                        <p className="mb-0">Edit or view your profile.</p>
                    </div>
                </div>

                <Row className="d-flex justify-content-center">
                    <Col xs={12}>
                        {this.render_profile_form()}
                    </Col>
                </Row >
            </div >
        );
    };
}

export default Profile