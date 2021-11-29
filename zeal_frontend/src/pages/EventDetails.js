import React from "react";
import {
  Modal,
  Button,
  Col,
  Container,
  Row,
  Alert,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import moment from "moment-timezone";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      success: false,
      successMessage: "",
      showJoinModal: false,
      showLeaveModal: false,
      participants: null,
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.id !== this.props.id) {
      this.getParticipants();
    }
  }

  componentDidMount() {
    this.getParticipants();
  }

  getParticipants = async () => {
    await axios
      .get("events/list/", {
        params: { event_id: this.props.id },
      })
      .then((res) => this.setState({ participants: (res.data.length > 0) ? res.data[0].participants : null }));
    console.log(this.state);
  };

  joinEvent = async () => {
    console.log("joining event");
    try {
      this.setState({ showJoinModal: false });
      await axios.put("events/join/", { id: this.props.id });
      this.setState({
        success: true,
        successMessage: `Joined event ${this.props.name}!`,
      });
      await this.getParticipants();
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({
        errorMessage: "Failed to join: You have already joined this event.",
      });
    }
  };

  leaveEvent = async () => {
    console.log("leaving event");
    try {
      this.setState({ showLeaveModal: false });
      await axios.put("events/leave/", { id: this.props.id });
      this.setState({
        success: true,
        successMessage: `Left event ${this.props.name}!`,
      });
      await this.getParticipants();
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({
        errorMessage: "Failed to leave: You are not part of this event.",
      });
    }
  };

  render() {
    return (
      <>
        <Modal show={this.state.showJoinModal}>
          <Modal.Header>
            <Modal.Title>Join Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to join {this.props.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showJoinModal: false })}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={this.joinEvent}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showLeaveModal}>
          <Modal.Header>
            <Modal.Title>Leave Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to leave {this.props.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showLeaveModal: false })}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={this.leaveEvent}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert show={this.state.error} variant="danger">
          <div className="d-flex justify-content-between">
            {this.state.errorMessage}
            <Button
              variant="close"
              size="sm"
              onClick={() => this.setState({ error: false })}
            />
          </div>
        </Alert>
        <Alert show={this.state.success} variant="success">
          <div className="d-flex justify-content-between">
            {this.state.successMessage}
            <Button
              variant="close"
              size="sm"
              onClick={() => this.setState({ success: false })}
            />
          </div>
        </Alert>
        <Container>
          <Row className="row align-items-center" xs="auto">
            <Col>
              <h2 className="fw-bolder">{this.props.name}</h2>
            </Col>
            <Col>
              <Button
                variant="success"
                size="sm"
                className="me-2"
                onClick={() => this.setState({ showJoinModal: true })}
              >
                Join
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => this.setState({ showLeaveModal: true })}
              >
                Leave
              </Button>
            </Col>
          </Row>

          {this.state.participants == null ?
            ""
            :
            <Row>
              <Col>
                <h4 className="mt-2">About</h4>
                <p>{this.props.description}</p>
                <h4 className="mt-4">Date</h4>
                <p>
                  {moment(this.props.start).format("MM/DD/YYYY (hh:mm a)")} - {moment(this.props.end).format("MM/DD/YYYY (hh:mm a)")}
                </p>
                <h4 className="mt-4">Website</h4>
                <p><a href={this.props.website} target="_blank">{this.props.website}</a></p>
                <h4 className="mt-4">Contact</h4>
                <p>{this.props.phone}</p>
                <h4 className="mt-4">Participants</h4>
                {this.state.participants == null ? (
                  <p>None</p>
                ) : (
                  this.state.participants.map((person, idx) => {
                    return (
                      <p>
                        {person.first_name} {person.last_name} ({person.username})
                      </p>
                    );
                  })
                )}
              </Col>
            </Row>
          }
        </Container>
      </>
    );
  }
}

export default EventDetails;
