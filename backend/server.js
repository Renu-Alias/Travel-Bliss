const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "cornetto",      
  database: "TRAVEL_BLISS"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Route for booking
app.post("/book", (req, res) => {
  const { name, email, phone_no, gender, travel_date, destination, add_notes } = req.body;

  const sql = `INSERT INTO INFO 
  (name, email, phone_no, gender, travel_date, destination, add_notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, email, phone_no, gender, travel_date, destination, add_notes], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Database error" });
    } else {
      res.json({ message: "Booking successful!" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

