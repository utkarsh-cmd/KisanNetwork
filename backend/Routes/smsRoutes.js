import express from "express";
import asyncHandler from "express-async-handler";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//twilio requirements -- Texting API
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = new twilio(accountSid, authToken);

// @desc    send sms
// @route   POST /api/sms/send
// @access  Public
router.post(
  "/send",
  asyncHandler(async (req, res) => {
    res.header("Content-Type", "application/json");

    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+91" + req.body.recipient,
        body: req.body.textmessage,
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch((err) => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  })
);

// @desc    recieve sms history
// @route   GET /api/sms/send
// @access  Public

router.get("/send", async (req, res) => {
  client.messages.list({ limit: 20 }).then((messages) => {
    const data = messages.map((m) => ({
      body: m.body,
      to: m.to,
      date: m.dateSent,
      status: m.status,
      sid: m.sid,
    }));
    res.json(data);
  });
});

// @desc    send OTP
// @route   POST /api/sms/sendotp
// @access  Public

router.post(
  "/sendotp",
  asyncHandler(async (req, res) => {
    res.header("Content-Type", "application/json");

    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        body: req.body.textmessage,
        to: "+91" + req.body.recipient,
      })
      .then((message) => res.json(message));
  })
);

// @desc    delete SMS
// @route   DELETE /api/sms/delete/:id
// @access  Public

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    res.header("Content-Type", "application/json");

    client.messages(req.params.id).remove().then(res.send("message deleted"));
  })
);

export default router;
