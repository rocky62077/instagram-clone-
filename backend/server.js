const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/instagram_clone")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const User = require("c:/Users/visha/Desktop/instagram-clone/backend/models/user");

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received:", username, password); // 👈 ADD THIS

  try {
    const user = new User({ username, password });
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.log("ERROR:", err); // 👈 ADD THIS
    res.json({ success: false });
  }
});
