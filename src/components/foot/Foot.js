/* eslint-disable jsx-a11y/anchor-is-valid */
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import React from "react";
import "./Foot.css";

function Foot() {
  function logOut() {
    sleep(1500).then(() => {
      localStorage.setItem("isAuthenticated", "false");
      window.location.pathname = "/login";
    });
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div class="footer-fixed">
      <footer>
        <nav class="z-depth-0 grey">
          <div class="nav-wrapper">
            <ul class="justify">
              <li>
                <a href="/home">
                  <i class="material-icons">home</i>
                </a>
              </li>
              <li>
                <a href="/profile">
                  <i class="material-icons">account_circle</i>
                </a>
              </li>
              {/* <li>
                <a href="#!">
                  <i class="material-icons">bookmark_border</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i class="material-icons">bookmark_border</i>
                </a>
              </li> */}
              <li>
                <a onClick={logOut}>
                  <i class="material-icons">exit_to_app</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Foot;
