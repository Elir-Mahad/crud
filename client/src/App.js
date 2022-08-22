import React, { useState } from "react";
import Axios from "axios";

import "./App.css";
function App() {
  //
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  //
  const addEmployee = () => {
    // when this function is triggered
    Axios.post("http://localhost:8080/create", {
      // send to this rout an object that contains the following key value pairs
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      // if it works show this log
      // console.log("success");
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const [employeeList, setEmployeeList] = useState([]);
  //
  const getEmployees = () => {
    Axios.get("http://localhost:8080/employees").then((response) => {
      console.log(response);
      setEmployeeList(response.data);
    });
  };
  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {/*  */}
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        {/*  */}
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        {/*  */}
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        {/*  */}
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        {/*  */}
        <button onClick={addEmployee}>Add emoployee</button>
        {/*  */}
        <div className="employees">
          <button onClick={getEmployees}>Show employees</button>
          {employeeList.map((val, key) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem",
                  padding: "1rem",
                }}
              >
                <p style={{ width: "4rem" }}>Name: {val.name}</p>
                <p>Age: {val.age}</p>
                <p>Country:{val.country}</p>
                <p>Position:{val.position}</p>
                <p>Wage:{val.wage}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
