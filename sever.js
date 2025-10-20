const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let pendingLetters = [];
let approvedLetters = [];

app.get("/letters", (req, res) => {
  res.json(approvedLetters);
});

app.post("/submit", (req, res) => {
  const letter = req.body;
  pendingLetters.push(letter);
  res.json({ message: "Letter sent for review." });
});

app.get("/admin", (req, res) => {
  res.json(pendingLetters);
});

app.post("/approve", (req, res) => {
  const { index } = req.body;
  const letter = pendingLetters.splice(index, 1)[0];
  approvedLetters.push(letter);
  res.json({ message: "Letter approved!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
