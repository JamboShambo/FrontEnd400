import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import "material-icons";
import "./Header.css";

function Header() {
  var isLoggedIn = window.localStorage.getItem("isAuthenticated");

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
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            {isLoggedIn === "true" ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a onClick={logOut}>Logout</a>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a onClick={logIn}>Login</a>
            )}

            {/* <a href="collapsible.html">LogOut</a> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

function logOut() {
  sleep(1500).then(() => {
    localStorage.setItem("isAuthenticated", "false");
    window.location.pathname = "/home";
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logIn() {
  sleep(1500).then(() => {
    localStorage.setItem("isAuthenticated", "true");
    window.location.pathname = "/home";
  });
}

export default Header;
