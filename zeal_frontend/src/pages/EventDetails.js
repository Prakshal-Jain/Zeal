import React from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
} from "@themesberg/react-bootstrap";
import axios from "axios";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: null,
    };
  }

  componentDidMount() {
    this.getParticipants();
  }

  getParticipants = async () => {
    await axios
      .get("events/list/", {
        params: { event_id: this.props.location.state.id },
      })
      .then((res) => this.setState({ participants: res.data[0].participants }));

    console.log(this.state);
  };

  joinEvent = async () => {
    console.log("joining event");
    await axios.put("events/join/", { id: this.props.location.state.id });
    await this.getParticipants();
  };

  leaveEvent = async () => {
    console.log("leaving event");
    await axios.put("events/leave/", { id: this.props.location.state.id });
    await this.getParticipants();
  };

  render() {
    return (
      <Container className="my-5">
        <Row className="row align-items-center" xs="auto">
          <Col>
            <h1>{this.props.location.state.name}</h1>
          </Col>
          <Col>
            <Button variant="success" size="sm" onClick={this.joinEvent}>
              Join
            </Button>
            <Button variant="success" size="sm" onClick={this.leaveEvent}>
              Leave
            </Button>
          </Col>
        </Row>
        <h3 className="mt-5">About</h3>
        <p>{this.props.location.state.description}</p>
        <h3 className="mt-5">Date</h3>
        <p>
          {this.props.location.state.start} - {this.props.location.state.end}
        </p>
        <h3 className="mt-5">Website</h3>
        <p>{this.props.location.state.website}</p>
        <h3 className="mt-5">Contact</h3>
        <p>{this.props.location.state.phone}</p>
        <h3 className="mt-5">Participants</h3>
        {this.state.participants == null ? "None" : this.state.participants.map((person, idx) => {
          return <p>{person.first_name} {person.last_name} ({person.username})</p>
        })}
      </Container>
    );
  }
}

export default EventDetails;
