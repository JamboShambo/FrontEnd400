import React, { useState } from "react";
import UserPool from "../userpool/Userpool";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {
  regexPasswordSyntaxError,
  regexEmailMatchError,
  regexPasswordMatchError,
  AccountExistsError,
} from "../../componentText/regexError";
import { validPassword } from "../../regex/Regex";
import "../register/Register.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailC, setEmailC] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [emailErrNoMatch, setEmailErrNoMatch] = useState(false);
  const [pwdErrNoMatch, setPwdErrNoMatch] = useState(false);
  const [accountExist, setAccountExist] = useState(false);

  const onSubmit = (event) => {
    setAccountExist(false);
    event.preventDefault();
    validate();
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
        setAccountExist(true);
      }
      console.log(data);
    });
  };

  const validate = () => {
    if (!validPassword.test(password) || !validPassword.test(passwordC)) {
      setPwdError(true);
    } else {
      setPwdError(false);
    }

    if (password !== passwordC) {
      setPwdErrNoMatch(true);
    } else {
      setPwdErrNoMatch(false);
    }

    if (email !== emailC) {
      setEmailErrNoMatch(true);
    } else {
      setEmailErrNoMatch(false);
    }
  };

  return (
    <div
      className=""
      style={{
        paddingTop: "10px",
        maxHeight: "500px",
        marginBottom: "10px",
      }}
    >
      <center>
        <img
          className="responsive-img"
          alt="RoadCall"
          src="./RoadCallTrimmed-removebg-preview.png"
          style={{
            width: "100px",
          }}
        />
        <h5 className="grey-text">Please Register</h5>
        <div className="section"></div>
        <div className="container">
          <div
            className="z-depth-1 grey lighten-4"
            style={{
              display: "inline-block",
              padding: "32px 48px 0px 48px",
              border: "1px solid #EEE",
            }}
          >
            <form className="col s12" method="post">
              <div className="row">
                <div className="col s12"></div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label htmlFor="email">Enter your email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="email"
                    name="emailC"
                    id="emailC"
                    value={emailC}
                    onChange={(event) => setEmailC(event.target.value)}
                  />
                  <label htmlFor="emailC">Confirm your email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label htmlFor="password">Enter your password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="password"
                    name="passwordC"
                    id="passwordC"
                    value={passwordC}
                    onChange={(event) => setPasswordC(event.target.value)}
                  />
                  <label htmlFor="passwordC">Confirm your password</label>
                </div>
                <label>
                  <a className="pink-text" href="/login">
                    <b>Already signed up?</b>
                  </a>
                </label>
              </div>

              <br />
              <center>
                <div className="row">
                  <div
                    onClick={onSubmit}
                    name="btn_login"
                    className="col l12 s12 btn btn-large waves-effect indigo"
                  >
                    Register
                  </div>
                </div>
              </center>
            </form>
          </div>
        </div>
        <br />
        <p style={{}}>
          Once Successfully registered, please check your email to confirm your
          account.
        </p>
        <div style={{ marginBottom: "10px" }} className="regex">
          {" "}
          <p style={{ backgroundColor: "red", color: "white", width: "50%" }}>
            {" "}
            {accountExist && AccountExistsError}
          </p>
          <p style={{ backgroundColor: "red", color: "white", width: "50%" }}>
            {pwdError && regexPasswordSyntaxError}
          </p>
          <p style={{ backgroundColor: "red", color: "white", width: "50%" }}>
            {emailErrNoMatch && regexEmailMatchError}
          </p>
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              width: "50%",
            }}
          >
            {pwdErrNoMatch && regexPasswordMatchError}
          </p>
        </div>
      </center>
    </div>
  );
};

export default Signup;
