import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function ReportTableCell(reportTableEvents) {
  return (
    <tr>
      <td>{reportTableEvents.me.eventName}</td>
      <td>{reportTableEvents.me.county}</td>
      <td>{reportTableEvents.me.eventTime}</td>
    </tr>
  );
}
export default ReportTableCell;
