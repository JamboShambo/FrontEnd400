import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../userpool/Userpool";
import logo from "../../componentText/images/roadcallphoto-removebg-preview.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  useEffect(() => {
    setUserID(userID);
  }, [userID]);

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userID", data.accessToken.payload.username);
        window.location.pathname = "/home";
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        setLoginError(true);
        setLoginErrorMessage(err.toString());
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };

  return (
    <div htmlFor="section">
      <main>
        <center>
          <img
            className="responsive-img"
            alt="OverBooked"
            src={logo}
            style={{
              width: "10%",
            }}
          />

          <h5 className="grey-text">Please login into your account</h5>
          <div className="section"></div>

          <div>
            <div className="regex">
              {" "}
              <br />
              <p>
                {" "}
                {loginError} {loginErrorMessage}
              </p>
            </div>
          </div>

          <div className="container">
            <div
              className="z-depth-1 grey lighten-4"
              style={{
                display: "inline-block",
                padding: "32px 48px 0px 48px",
                border: "1px solid #EEE",
              }}
            >
              <form className="col s12" method="post" onSubmit={onSubmit}>
                <div className="row">
                  <div className="col s12"></div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className="validate"
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
                      className="validate"
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="password">Enter your password</label>
                  </div>
                </div>

                <br />
                <center>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s11 btn btn-large waves-effect indigo"
                    >
                      Login
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <a href="/register">Create account</a>
        </center>
      </main>
    </div>
  );
};

export default Login;
