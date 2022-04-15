import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";
import React from "react";

import AdminPage from "../adminPage/AdminPage";
import Flotr1 from "../flotr1/Flotr1";
import Header from "../header/Header";

function AdminHome() {
  return (
    <div>
      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <Header></Header>
      </Row>
      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <AdminPage />
      </Row>
      <Row>
        <Flotr1></Flotr1>
      </Row>
      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <Foot></Foot>
      </Row>
    </div>
  );
}
export default AdminHome;
