import React, { useEffect } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ReportTableCell from "../reportTableCell/ReportTableCell";
import envVars from "../../config";
import axios from "axios";

function ReportTable(getEvents) {
  JSON.stringify(localStorage.setItem("homePageEvents", getEvents));
  console.log(getEvents);

  var reportTableEvents = JSON.parse(localStorage.getItem("homePageEvents"));

  console.log(reportTableEvents);

  var me = reverseArr(getEvents);

  useEffect(() => {}, []);

  var rows = [];

  function reverseArr(input) {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  for (var key = 0; key < 8; key++) {
    rows.push(<ReportTableCell me={me[key]} key={key} />);
  }

  return (
    <div
      className="z-depth-3"
      style={{
        backgroundColor: "#145d89",
        border: "3px solid black",
        marginTop: "1%",
      }}
    >
      <h3 style={{ margin: "1%" }} className="center">
        {" "}
        <b>Latest Reports</b>
      </h3>
      <div className="white" style={{ borderTop: "3px solid black" }}>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>County</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}
export default ReportTable;
