import React, { useEffect, useState } from "react";
import axios from "axios";
import envVars from "../../config";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function ReportTable() {
  const [getEvents, setGetEvents] = useState([]);

  useEffect(() => {
    // axios
    //   .get(envVars.GetAllEvents, {
    //     headers: {
    //       "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
    //     },
    //   })
    //   .then((response) => {
    //     response.data.Items.forEach((el) => {
    //       el.lat.N = parseFloat(el.lat.N);
    //       el.lng.N = parseFloat(el.lng.N);
    //     });
    //     setGetEvents(response.data.Items);
    //     console.log(response.data.Items);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <div>
      <table className="highlight">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ReportTable;
