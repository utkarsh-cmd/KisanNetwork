import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const HomeScreen = () => {
  const [contacts, setcontacts] = useState([]);

  useEffect(() => {
    const fetchcontacts = async () => {
      const { data } = await axios.get("/api/contacts");

      setcontacts(data);
    };

    fetchcontacts();
  }, []);

  return (
    <>
      <h1>Latest contacts</h1>

      <Table bordered responsive hover striped variant='dark'>
        <thead>
          <tr>
            <th>
              <h4>#</h4>
            </th>
            <th>
              <h4>First Name</h4>
            </th>
            <th>
              <h4>Last Name</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return (
              <tr>
                <th key={contact._id} scope='row'>
                  <span className='homeTable'>{index + 1}</span>
                </th>
                <td>
                  <Link to={`/contact/${contact._id}`}>
                    <span className='homeTable'>{contact.firstName}</span>
                  </Link>
                </td>
                <td>
                  <Link to={`/contact/${contact._id}`}>
                    <span className='homeTable'>{contact.lastName}</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default HomeScreen;
