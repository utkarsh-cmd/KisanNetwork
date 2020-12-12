import Axios from "axios";
import React, { useState } from "react";
import classes from "./smsScreen.module.css";

const SmsScreen = () => {
  let [text, setText] = useState("");
  let [recipient, setrecipient] = useState("");

  // CHECK IF NUMBER IS 10 DIGITS
  const change = (e) => {
    const re = /^[789]\d{9}$/;

    if (!re.test(e)) {
      setrecipient(e);
    }
  };

  // FUNCTION TO SEND TEXT ON BUTTON CLICK
  const sendText = async (e) => {
    e.preventDefault();
    if (window.confirm("Do you really want to send this msg?")) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // API CALL TO BACK END
        const tex = { recipient: recipient, textmessage: text };
        await Axios.post("/api/sms/send", tex, config);
        window.location.reload();
        window.alert("message sent");

        setText = "";
        setrecipient = "";
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className={classes.top}>
        {" "}
        <div className={classes.main}>
          {" "}
          <div className={classes.second}>
            <div className={classes.third}>
              <form onSubmit={sendText}>
                <h2> Send Text Message </h2>
                <label className={classes.lab1}> recipient Phone Number </label>
                <input
                  type='number'
                  pattern='\d{3}[\-]\d{3}[\-]\d{4}'
                  maxLength='10'
                  required
                  value={recipient}
                  onChange={(e) => change(e.target.value)}
                />
                <label className={classes.lab2}> Message </label>
                <br />
                <textarea
                  required
                  placeholder='sms'
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <button type='submit'> Send Text </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsScreen;
