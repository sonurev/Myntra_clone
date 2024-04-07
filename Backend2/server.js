import express, { response } from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
const salt = 10;
const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(cookieParser());


// var mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'signup'
});

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as id ' + db.threadId);
// });

app.post('/register', (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`,`dob`,`mobile`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for Hashing Password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.dob,
      req.body.mobile,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting Data error in server" });
      res.json({ Status: "Success" });  // Use res.json() instead of result.json()
    });
  });
});

app.post('/login', (req, res) => {
  const sql = " SELECT * FROM login WHERE email = ?";

  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if (response) {
          const name = data[0].name;
          const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success", name: data[0].name, email: data[0].email, mobile: data[0].mobile });
        } else {
          return res.json({ Error: "Incorrect Password" });
        }
      })
    } else {
      return res.json({ Error: "No email existted" });
    }

  });
});


app.listen(8081, () => { console.log("Running 8081 port"); });