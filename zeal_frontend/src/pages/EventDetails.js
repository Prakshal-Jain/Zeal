import React from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
} from "@themesberg/react-bootstrap";

class EventDetails extends React.Component {
  render() {
    return (
      <Container className="my-5">
        <Row className="row align-items-center" xs="auto">
          <Col>
            <Image src="https://picsum.photos/100/100" roundedCircle />
          </Col>
          <Col>
            <h1>UB Hacking</h1>
          </Col>
          <Col>
            <Button variant="success" size="sm">
              Join
            </Button>
          </Col>
        </Row>
        <h3 className="mt-5">About</h3>
        <p>
          UB Hacking is the University at Buffalo’s official student-run
          hackathon.
        </p>
        <h3 className="mt-5">Date</h3>
        <p>Nov 6-7, 2021</p>
        <h3 className="mt-5">Location</h3>
        <p>University at Buffalo</p>
        <h3 className="mt-5">Participants</h3>
        <p>Rober, Jane, John, and 248 more</p>
      </Container>
    );
  }
}

export default EventDetails;
