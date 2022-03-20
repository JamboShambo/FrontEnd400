import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
// import Admin from "./components/admin/Admin";
import Register from "./components/register/Register";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/profile" component={Profile} />
        {/* <ProtectedRoute path="/admin" component={Admin} /> */}
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
