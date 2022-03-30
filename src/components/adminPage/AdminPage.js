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
    <div className="center" style={{ padding: "20px" }}>
      <div className="row">
        <button
          onClick={() => excel()}
          name="btnSubmitEvent"
          className="col-12 btn btn-large waves-effect indigo"
        >
          Excel
        </button>
      </div>
    </div>
  );
}
export default AdminPage;
