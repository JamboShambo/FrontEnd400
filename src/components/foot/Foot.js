import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import React from "react";
import "./Foot.css";

function Foot() {
  return (
    <div class="footer-fixed">
      <footer>
        <nav class="z-depth-0 black darken-1">
          <div class="nav-wrapper">
            <ul class="justify">
              <li>
                <a href="/home">
                  <i class="material-icons">add</i>
                </a>
              </li>
              <li>
                <a href="/profile">
                  <i class="material-icons">accessibility</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i class="material-icons">bookmark_border</i>
                </a>
              </li>
              <li>
                <a href="/admin">
                  <i class="material-icons">cloud_circle</i>
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
