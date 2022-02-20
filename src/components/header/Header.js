import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import "material-icons";
import logo from "../../componentText/images/RoadCall-trimmy-modified.png";
import "./Header.css";

function Header() {
  return (
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper teal darken-1">
          <div class="row">
            <div class="col s12">
              <img
                src={logo}
                alt="Roadcall"
                style={{
                  maxWidth: "60px",
                  marginTop: "2px",
                }}
                class="brand-logo"
              ></img>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
