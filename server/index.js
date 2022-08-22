const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("working on 8080");
});
// this is for heroku
// - heroku has its own port where it wants the server to run
// and the variable is hidden in heroku
// we don't know that variable specifically but in order to access it
// we have to write it like

// app.listen(3001, () => {
//   console.log("working on 3001");
// });

app.use(cors());
//
app.use(express.json());

// heroku db sql connection below
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
  // const name will store a process
  // request to go into the body
  // store the value in the const name
  // - same process for each one below

  // testing app 2
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    //
    "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
    // insert into the employees table 5 columns,
    // - you don't put the values directly here because it is not secure
    // - instead you put 5 question marks
    // - each ? represents a variable
    // - to insert the values into the ?
    // - create an array with the values
    // - connect the array to VALUES(?,?,?,?,?)
    [name, age, country, position, wage],
    // this is the array of values
    // the value stored in element 0 (name)
    // is inserted as a value into the 1st ?
    // which is then inserted into the 1st column name
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        // send this message if values are inserted
      }
    }
  );
});

// Below is the request to fetch data from the database

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    // make request from the database
    // select all from exmployees table
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // if there is no error send the result
    }
  });
});

