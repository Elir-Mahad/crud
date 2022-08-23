const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("working on 8080");
});

app.use(cors());
app.use(express.json());

// connect to the database

const db = mysql.createConnection({
  user: "bfb6adsad898dqa",
  host: "us-cvvx-east-02.cleardb.net",
  password: "4alpsq71",
  database: "heroku_83ra15e2a9ujwe1",
});

// Below is the request to add data to the database

app.post("/create", (req, res) => {
  //
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  
  db.query(
    //
    "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Below is the request to fetch data from the database

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

