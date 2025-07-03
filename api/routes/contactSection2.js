const express = require("express");
const router = express.Router();
const ContactSection2 = require("../models/contactSection2");

router.get("/", async (req, res) => {
  const data = await ContactSection2.findOne().lean();
  res.json(data || {});
});

router.put("/", async (req, res) => {
  try {
    const updated = await ContactSection2.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
