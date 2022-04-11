import React, { useEffect } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ReportTableCell from "../reportTableCell/ReportTableCell";

function ReportTable() {
  var reportTableEvents = JSON.parse(localStorage.getItem("homePageEvents"));
  var me = reverseArr(reportTableEvents);

  useEffect(() => {
    console.log(reportTableEvents);
    console.log(me);
  }, []);

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
    <div className="z-depth-3" style={{ backgroundColor: "#145d89" }}>
      <h3 className="center">Latest Reports</h3>
      <div className="white" style={{}}>
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
