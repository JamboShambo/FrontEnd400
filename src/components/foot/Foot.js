import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import React from "react";
import "./Foot.css";

function Foot() {
  return (
    <div class="footer-fixed">
      <footer>
        <nav class="z-depth-0 teal darken-1">
          <div class="nav-wrapper">
            <ul class="justify">
              <li>
                <a href="#!">
                  <i class="material-icons">filter</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i class="material-icons">chat_bubble</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i class="material-icons">camera_alt</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i class="material-icons">camera_roll</i>
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