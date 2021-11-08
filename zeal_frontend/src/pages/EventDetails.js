import React from "react";
import { Button, Col, Container, Row } from "@themesberg/react-bootstrap";
import axios from "axios";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      .then((res) => this.setState({ participants: res.data[0].participants }));
    console.log(this.state);
  };

  joinEvent = async () => {
    console.log("joining event");
    await axios.put("events/join/", { id: this.props.id });
    await this.getParticipants();
  };

  leaveEvent = async () => {
    console.log("leaving event");
    await axios.put("events/leave/", { id: this.props.id });
    await this.getParticipants();
  };

  render() {
    return (
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
              onClick={this.joinEvent}
            >
              Join
            </Button>
            <Button variant="danger" size="sm" onClick={this.leaveEvent}>
              Leave
            </Button>
          </Col>
        </Row>
        <h4 className="mt-2">About</h4>
        <p>{this.props.description}</p>
        <h4 className="mt-4">Date</h4>
        <p>
          {this.props.start} - {this.props.end}
        </p>
        <h4 className="mt-4">Website</h4>
        <p>{this.props.website}</p>
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
      </Container>
    );
  }
}

export default EventDetails;
