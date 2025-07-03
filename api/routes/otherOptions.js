const express = require("express");
const router = express.Router();
const OtherOptions = require("../models/otherOptions");

// GET /api/otherOptions
router.get("/", async (req, res) => {
  const data = await OtherOptions.findOne().lean();
  res.json(data || {});
});

// PUT /api/otherOptions
router.put("/", async (req, res) => {
  const updated = await OtherOptions.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );
  res.json(updated);
});

module.exports = router;
