import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import "material-icons";
import logo from "../../componentText/images/RoadCall-trimmy-modified.png";
import "./Header.css";

function Header() {
  return (
    <div classname="navbar-fixed">
      <nav>
        <div classname="nav-wrapper teal darken-1">
          <div classname="row">
            <div classname="col s12">
              <img
                src={logo}
                alt="Roadcall"
                style={{
                  maxWidth: "60px",
                  marginTop: "2px",
                }}
                classname="brand-logo"
              ></img>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
