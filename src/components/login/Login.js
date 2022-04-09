import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../userpool/Userpool";

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
    <center>
      <div
        className="container"
        style={{
          paddingTop: "10px",
          maxHeight: "500px",
          marginBottom: "10px",
          width: "500px",
        }}
      >
        <img
          className="responsive-img"
          alt="RoadCall"
          src="./RoadCallTrimmed-removebg-preview.png"
          style={{
            width: "100px",
          }}
        />
        <h5 className="grey-text">Please Login</h5>

        <div className="">
          <div className="regex">
            {" "}
            <br />
            <p style={{ backgroundColor: "red", color: "white", width: "50%" }}>
              {" "}
              {loginError} {loginErrorMessage}
            </p>
          </div>
        </div>
        <div
          className="z-depth-1 grey lighten-4"
          style={{
            display: "inline-block",
            padding: "32px 48px 0px 48px",
            border: "1px solid #EEE",
            width: "100%",
          }}
        >
          <form className="row" method="post" onSubmit={onSubmit}>
            <div className="input-field ">
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

            <div className="">
              <div className="input-field">
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

            <div className="">
              <div className="row">
                <button
                  type="submit"
                  name="btn_login"
                  className="col s12 btn btn-large waves-effect indigo col 12"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
};

export default Login;
