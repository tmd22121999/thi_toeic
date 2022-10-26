import React from "react";
import About from "./About";
import HomeView from "./Views/HomeView";
import ExamView from "./Views/ExamView";
import ToeicStructView from "./Views/ToeicStructView";
import SummaryView from "./Views/SummaryView";
import Layout from "./Layout.jsx";
import { Switch, Route } from "react-router-dom";

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
          <ExamView />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
