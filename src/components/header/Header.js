import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import "material-icons";
import "./Header.css";

function Header() {
  var isLoggedIn = window.localStorage.getItem("isAuthenticated");
  var userEmail = window.localStorage.getItem("userEmail");

  useEffect(() => {}, []);

  return (
    <nav>
      <div class="nav-wrapper grey">
        <a href="/home" class="brand-logo">
          <img
            style={{
              width: "55px",
              height: "",
              margin: "5%",
              paddingLeft: "5px",
            }}
            src="./RoadCallTrimmed-removebg-preview.png"
            alt="LOGO"
          ></img>
        </a>
        <a style={{ marginLeft: "70px" }}>{userEmail}</a>

        {window.location.pathname === "/home" ? (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li style={{ marginRight: "140px", pointerEvents: "none" }}>
              <a>{userEmail}</a>
            </li>
            <li className="center active">
              <a>Home</a>
            </li>
            <li className="center">
              {isLoggedIn === "true" ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a>Profile</a>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a></a>
              )}
            </li>
            <li className="center">
              {isLoggedIn === "true" ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a onClick={logOut}>Logout</a>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a onClick={logIn}>Login</a>
              )}
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li className="center">
              <a>Home</a>
            </li>
            <li className="center active">
              {isLoggedIn === "true" ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a>Profile</a>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a></a>
              )}
            </li>
            <li className="center">
              {isLoggedIn === "true" ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a onClick={logOut}>Logout</a>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a onClick={logIn}>Login</a>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

// element.classList.add("my-class");

function logOut() {
  sleep(1500).then(() => {
    localStorage.setItem("isAuthenticated", "false");
    window.location.pathname = "/login";
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logIn() {
  sleep(1500).then(() => {
    window.location.pathname = "/login";
  });
}

export default Header;
