import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

const SentScreen = () => {
  const [data, dataSet] = useState([]);

  useEffect(() => {
    // GETTING LIST OF SMS FROM BACKEND
    async function fetchMyAPI() {
      let response = await fetch("/api/sms/send");
      response = await response.json();

      let bod = await response.map((obj) => {
        let bodobj = {};
        bodobj = {
          msg: obj.body.replace("Sent from your Twilio trial account - ", ""),
          to: obj.to.slice(3),
          date: obj.date.replace(/T/g, " TIME:").substring(0, 21),
          status: obj.status,
          sid: obj.sid,
        };
        return bodobj;
      });
      dataSet(bod);
    }

    fetchMyAPI();
  }, []);

  // DELETING SMS
  const deletesms = async (m) => {
    if (window.confirm("Do you really want to delete?")) {
      try {
        const data = await axios.delete(`/api/sms/delete/${m}`);
        window.location.reload();
        window.alert(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <Table bordered responsive hover striped>
        <thead>
          <tr>
            <th>
              <h4>#</h4>
            </th>
            <th>
              <h4>message</h4>
            </th>
            <th>
              <h4>recipient</h4>
            </th>
            <th>
              <h4>Date</h4>
            </th>
            <th>
              <h4>Status</h4>
            </th>
            <th>
              <i className='fas fa-trash'></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, index) => {
            return (
              <tr>
                <th key={m.sid} scope='row'>
                  {index + 1}
                </th>
                <td>{m.msg}</td>
                <td>{m.to}</td>
                <td>{m.date}</td>
                <td>{m.status}</td>
                <td>
                  <i
                    onClick={() => deletesms(m.sid)}
                    className='fas fa-trash hp'
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default SentScreen;
