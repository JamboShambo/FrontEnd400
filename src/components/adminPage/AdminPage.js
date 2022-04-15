import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import * as XLSX from "xlsx";
import axios from "axios";
import envVars from "../../config";

var dataJson2 = [];

function AdminPage() {
  const excel = () => {
    axios
      .get(envVars.GetAllEvents, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
        },
      })
      .then((response) => {
        dataJson2 = [];
        console.log(response);
        response.data.events.forEach((el) => {
          el.lat = el.lat.toString();
          el.lng = el.lng.toString();
        });
        response.data.events.forEach((e) => {
          dataJson2.push(e);
        });
        const worksheet = XLSX.utils.json_to_sheet(dataJson2);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col l4"></div>
        <div className="col l4">
          <div class="card blue-grey darken-1">
            <h4 style={{ padding: "1%" }} className="center">
              {" "}
              Extract to excel
            </h4>
            <div class="card-content white-text center">
              <button
                onClick={() => excel()}
                name="btnSubmitEvent"
                className="btn btn-large waves-effect indigo "
              >
                Excel
              </button>
            </div>
          </div>
        </div>
        <div className="col l4"></div>
      </div>
    </div>
  );
}
export default AdminPage;
