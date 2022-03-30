import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";

import AdminPage from "../adminPage/AdminPage";

function AdminHome() {
  return (
    <div>
      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <AdminPage />
      </Row>

      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <Foot></Foot>
      </Row>
    </div>
  );
}
export default AdminHome;
