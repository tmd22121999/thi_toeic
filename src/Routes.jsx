import React from "react";
import About from "./About";
import HomeView from "./Views/HomeView";
import ExamListView from "./Views/ExamView/ExamListView";
import ExamView from "./Views/ExamView";
import ToeicStructView from "./Views/ToeicStructView";
import SummaryView from "./Views/SummaryView";
import Layout from "./Layout.jsx";
import Admin from "./admin/App";
import { Switch, Route } from "react-router-dom";
import LoginView from "./Views/AuthView/LoginView";
import RegisterView from "./Views/AuthView/RegisterView";
import DashboardView from "./Views/DashboardView/";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <HomeView />
        </Route>
        <Route exact path={"/about"}>
          <About />
        </Route>
        <Route exact path={"/Home"}>
          <HomeView />
        </Route>
        <Route exact path={"/Information"}>
          <ToeicStructView />
        </Route>
        <Route exact path={"/Summary"}>
          <SummaryView />
        </Route>
        <Route exact path={"/Exam"}>
          <ExamListView />
        </Route>
        <Route exact path={"/examTest/:id"}>
          <ExamView />
        </Route>
        <Route exact path={"/Admin"} component={Admin}></Route>
        <Route exact path={"/Login"}>
          <LoginView />
        </Route>
        <Route exact path={"/Register"}>
          <RegisterView />
        </Route>
        <Route exact path={"/Dashboard"}>
          <DashboardView />
        </Route>
        <Route exact path={"/*"}>
          <HomeView />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
