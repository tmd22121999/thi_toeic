import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { Grid, Card, Text } from "@nextui-org/react";

function HomeView() {
  return (
    <Layout title="Home">
      <h1>About</h1>
      <div className="Home">
        <div className="Container">
          <h3 className="HeadingText">{"Trang tổng quan về trang web "}</h3>
          <p className="DescriptionText">{"giới thiệu trang web"}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Exam"}>
              Làm bài thi Toeic
            </NavLink>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default HomeView;
