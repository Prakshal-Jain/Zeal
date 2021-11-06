import React from "react";
import { Col, Row, Card, Image, Button, Container, Navbar, Nav, Tab, Alert, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import ZealHero from '../assets/images/zeal-logo-withoutBg.png'
import { Routes } from "../routes";


class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                'name': "",
                'description': "",
                'website': "",
                'start': null,
                'end': null,
                'logo': null,
                'email': "",
                'phone': "",
                'is_private': false,
                'get_participation_data': false
            },
        }
    }

    componentDidMount = async () => {
        await this.getAllEvents();
    }

    getAllEvents = async () => {

    }

    postEvent = async () => {

    }

    clearFields = () => {
        this.setState({
            event: {
                'name': "",
                'description': "",
                'website': "",
                'start': null,
                'end': null,
                'logo': null,
                'email': "",
                'phone': "",
                'is_private': false,
                'get_participation_data': false
            },
            all_events: null
        })
    }

    setEventFields = (key, value) => {
        var temp = this.state.event;
        temp[key] = value;
        this.setState({ event: temp });
    }

    renderCreateForm = () => {
        return (
            <div>
                <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                        <h5 className="mb-4">General event information</h5>
                        <Form>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group id="event_name">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter your first name" value={this.state.event.name} onChange={(e) => { this.setEventFields('name', e.target.value) }} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control as="textarea" rows="4" placeholder={"Enter a brief description of the event here"} value={this.state.event.description} onChange={(e) => { this.setEventFields('description', e.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={12} className="mb-3">
                                    <Form.Group id="website">
                                        <Form.Label>Event Website</Form.Label>
                                        <Form.Control required type="url" placeholder="https://example.com" value={this.state.event.website} onChange={(e) => { this.setEventFields('website', e.target.value) }} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={6} className="mb-3">
                                    <Form.Group id="Date">
                                        <Form.Label>Event Start Date and Time</Form.Label>
                                        <Datetime
                                            timeFormat={true}
                                            closeOnSelect={false}
                                            onChange={(e) => { this.setEventFields('start', e.format()) }}
                                            renderInput={(props, openCalendar) => (
                                                <InputGroup>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={this.state.event.start ? moment(this.state.event.start).format("MM/DD/YYYY (hh:mm a)") : ""}
                                                        placeholder="mm/dd/yyyy (hh:mm)"
                                                        onFocus={openCalendar}
                                                        onChange={() => { }} />
                                                </InputGroup>
                                            )} />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="Date">
                                        <Form.Label>Event End Date and Time</Form.Label>
                                        <Datetime
                                            timeFormat={true}
                                            closeOnSelect={false}
                                            onChange={(e) => { this.setEventFields('end', e.format()) }}
                                            renderInput={(props, openCalendar) => (
                                                <InputGroup>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={this.state.event.end ? moment(this.state.event.end).format("MM/DD/YYYY (hh:mm a)") : ""}
                                                        placeholder="mm/dd/yyyy (hh:mm)"
                                                        onFocus={openCalendar}
                                                        onChange={() => { }} />
                                                </InputGroup>
                                            )} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group id="logo">
                                        <Form.Label>Upload Event Logo</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={(e) => { this.setEventFields('logo', e.target.files[0]) }} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            <h5 className="mb-4">Contact information</h5>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required type="email" placeholder="name@company.com" value={this.state.event.email} onChange={(e) => { this.setEventFields('email', e.target.value) }} />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="phone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control required type="text" placeholder="+1 (123) 456-7890" value={this.state.event.phone} onChange={(e) => { this.setEventFields('phone', e.target.value) }} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" onClick={this.postOrganizerEvents}>Create Event</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    renderEvents = () => {
        if (this.state.all_events == null) {
            return (
                <Alert variant="warning">
                    An unexpected error occured. Please post this issue <Card.Link as={Link} to={Routes.Contact.path}>here</Card.Link>.
                </Alert>
            )
        }

        return (
            this.state.all_events.results.map((event, index) => (
                <div>
                    <Row className="mb-2" key={`join_event-${index}`}>
                        <Col>
                            <Card>
                                <Row className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                                    <Col className={"pointer_cursor"} xs={9}>
                                        <Card.Body>
                                            <h5 className={"mb-md-0"}>{event.name}</h5>
                                            <div className={"small"}>
                                                ({moment(event.start).format("MM/DD/YYYY HH:mm")}) <b>-</b> ({moment(event.end).format("MM/DD/YYYY HH:mm")})
                                            </div>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={3} className={"d-flex justify-content-end"}>
                                        {(event.logo != null) ?
                                            <Card.Img src={event.logo} alt={event.name} className="user-avatar small-avatar mx-4" />
                                            :
                                            ""
                                        }
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ))
        )
    }

    render() {
        return (
            <div className={"m-5"}>
                <Tab.Container defaultActiveKey="create">
                    <Nav fill variant="pills" className="rounded flex-column flex-sm-row">
                        <Nav.Item>
                            <Nav.Link eventKey="create" className="mb-sm-3 mb-md-0">
                                Create an event
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="explore" className="mb-sm-3 mb-md-0">
                                Explore events
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="create" className="py-4">
                            {this.renderCreateForm()}
                        </Tab.Pane>
                        <Tab.Pane eventKey="explore" className="py-4">
                            {this.renderEvents()}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        )
    }
}

export default Events