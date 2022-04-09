import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React from "react";

function CategoryModal() {
  return (
    <div>
      <table class="striped ">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div class="">
                <img
                  style={{ width: "40px" }}
                  src="./graffiti.svg"
                  alt="graffiti"
                ></img>
              </div>
            </td>
            <td>
              This is a really good despriction and is very informative waheoo
            </td>
          </tr>
          <tr>
            <td>
              <div class="">
                <img
                  style={{ width: "40px" }}
                  src="./road.svg"
                  alt="road"
                ></img>
              </div>
            </td>
            <td>
              This is a really good despriction and is very informative waheoo
            </td>
          </tr>
          <tr>
            <td>
              <div class="">
                <img
                  style={{ width: "40px" }}
                  src="./street-light.svg"
                  alt="street-light"
                ></img>
              </div>
            </td>
            <td>
              This is a really good despriction and is very informative waheoo
            </td>
          </tr>
          <tr>
            <td>
              <div class="">
                <img
                  style={{ width: "40px" }}
                  src="./trash.svg"
                  alt="trash"
                ></img>
              </div>
            </td>
            <td>
              This is a really good despriction and is very informative waheoo
            </td>
          </tr>
          <tr>
            <td>
              <div class="">
                <img
                  style={{ width: "40px" }}
                  src="./tree.svg"
                  alt="tree"
                ></img>
              </div>
            </td>
            <td>
              This is a really good despriction and is very informative waheoo
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CategoryModal;
