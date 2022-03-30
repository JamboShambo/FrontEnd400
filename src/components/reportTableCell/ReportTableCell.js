import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function ReportTableCell(getEvents) {
  //sets a state to whether a submited booking has been posted

  //   var event = send;

  return (
    <tr>
      <td>{getEvents.getEvents.eventName}</td>
      <td>{getEvents.getEvents.county}</td>
      <td>{getEvents.getEvents.eventTime}</td>
    </tr>
  );
}
export default ReportTableCell;
