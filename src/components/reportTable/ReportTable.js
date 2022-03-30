import React, { useEffect, useState } from "react";
import axios from "axios";
import envVars from "../../config";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ReportTableCell from "../reportTableCell/ReportTableCell";

function ReportTable() {
  const [getEvents, setGetEvents] = useState([]);

  useEffect(() => {
    axios
      .get(envVars.GetAllEvents, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
        },
      })
      .then((response) => {
        // response.data.Items.forEach((el) => {
        //   el.lat.N = parseFloat(el.lat.N);
        //   el.lng.N = parseFloat(el.lng.N);
        // });
        setGetEvents(response.data.events);
        console.log(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  var rows = [];

  for (var key = 0; key < 8; key++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<ReportTableCell getEvents={getEvents[key]} key={key} />);
  }

  return (
    <div>
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
  );
}
export default ReportTable;
