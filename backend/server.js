const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createConnection({
  host: "metro.proxy.rlwy.net",
  user: "root",
  password: "IdZdbGrATmOTmgadzOfXypoYdpbvUWkE",
  database: "railway",
  port: 51550
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Booking API
app.post("/book", (req, res) => {
  const { name, email, phone_no, gender, travel_date, destination, add_notes } = req.body;

  const sql = `
    INSERT INTO INFO
    (name, email, phone_no, gender, travel_date, destination, add_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone_no, gender, travel_date, destination, add_notes],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Database error" });
      } else {
        res.json({ message: "Booking successful!" });
      }
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
