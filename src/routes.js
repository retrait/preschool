import React from "react";
import { Switch, Route } from "react-router-dom";
// import Home from "./views/Home";
import Rooms from "./views/Rooms";
import Students from "./views/Students";
import RoomDetail from "./views/RoomDetails";
import Reports from "./views/Reports";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Rooms} />
      <Route exact path="/rooms" component={Rooms} />
      <Route exact path="/students" component={Students} />
      <Route exact path="/reports" component={Reports} />
      <Route path="/rooms/:id" component={RoomDetail} />
    </Switch>
  </main>
);

export default Routes;
