import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import User from "../models/userModel.js";

// @desc    Fetch all users
// @route   GET /api/contacts
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sort = { _id: -1 };
    const contacts = await User.find({}).sort(sort);

    res.json(contacts);
  })
);

// @desc    Fetch single contact
// @route   GET /api/contacts/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  })
);

// @desc    Fetch single contact by field detail
// @route   GET /api/contacts/field/:number
// @access  Public
router.get(
  "/field/:number",
  asyncHandler(async (req, res) => {
    const contact = await User.findOne({ mob: req.params.number });

    if (contact) {
      res.json(contact.firstName);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  })
);

export default router;
