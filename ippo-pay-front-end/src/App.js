import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Function to calculate the minimum steps required to make the password strong
  const validatePassword = (password) => {
    let missingConditions = 0;

    if (!/[a-z]/.test(password)) missingConditions++; // Missing lowercase letter
    if (!/[A-Z]/.test(password)) missingConditions++; // Missing uppercase letter
    if (!/\d/.test(password)) missingConditions++; // Missing digit
    if (/(.)\1\1/.test(password)) missingConditions++; // Repeated characters

    // Calculate additional steps required to reach the minimum length of 6
    const additionalSteps = Math.max(0, 6 - password.length);

    // Return the total minimum steps required
    return Math.max(missingConditions, additionalSteps);
  };
  const submitPassword = () => {
    const validateScore = validatePassword(password);
    console.log("Response", validateScore);
    if (validateScore)
      setError(
        `You need ${validateScore} more step's to make your password strong.`
      );
    else {
      axios
        .post("http://localhost:3000/storePassword", { password: password })
        .then((data) => {
          setError("");
          console.log("data->", data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Testing-Page-Div">
          <div className="Common-Div">
            <p className="Company-Name">Ippo Pay</p>
          </div>
          <div className="Common-Div">
            <p className="Password-Label">Enter Password</p>
            <span>
              <p className="Password-Note">
                Note: <b>1</b>.It should be minimum 6 characters <b>2</b>.It
                should be maximum 20 characters <b>3</b>.It contains at least 1
                lowercase letter <b>4</b>.It contains at least 1 uppercase
                letter <b>5</b>.It contains at least 1 digit <b>6</b>.It should
                not contain three repeating characters (i.e.Baaabb0 is weak, but
                Baaba0 is strong).
              </p>
            </span>
          </div>
          <div className="Common-Div">
            <input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="Password-Box"
            />
          </div>
          {error ? (
            <div className="Common-Div">
              <span className="Error-Text">{error ? error : ""}</span>
            </div>
          ) : (
            <></>
          )}
          <div className="Common-Div">
            <button
              type="button"
              className="Submit-Button"
              onClick={submitPassword}>
              Submit
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
