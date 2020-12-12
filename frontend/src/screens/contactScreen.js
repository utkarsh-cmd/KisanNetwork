import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Button } from "react-bootstrap";
import axios from "axios";

const ContactScreen = ({ match }) => {
  const [contact, setcontact] = useState({});

  useEffect(() => {
    const fetchcontact = async () => {
      const { data } = await axios.get(`/api/contacts/${match.params.id}`);

      setcontact(data);
    };

    fetchcontact();
  }, [match]);

  const sendText = async (e) => {
    e.preventDefault();
    if (window.confirm("Do you really want to send otp?")) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const tex = {
          recipient: contact.mob,
          textmessage:
            "“Hi " +
            contact.firstName +
            ", Your OTP is: " +
            Math.floor(Math.random() * 900000),
        };
        await axios.post("/api/sms/sendotp", tex, config);
        window.location.reload();
        window.alert("otp sent");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Col>
        <Row Row md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{contact.firstName}</h3>
            </ListGroup.Item>
            <ListGroup.Item>last name: {contact.lastName}</ListGroup.Item>
            <ListGroup.Item>mobile: {contact.mob}</ListGroup.Item>
          </ListGroup>
        </Row>
      </Col>
      <Col>
        <Button onClick={sendText} variant='success'>
          {" "}
          Send Message
        </Button>
      </Col>
    </>
  );
};

export default ContactScreen;
