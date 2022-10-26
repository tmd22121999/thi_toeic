import React from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent";
// import { Grid, Card, Text } from "@nextui-org/react";

function ExamView() {
  return (
    <Layout>
      <div className="Home">
        <div className="Container">
          {/* <h1 className="HeadingText">{"Test"}</h1> */}
          <QuizComponent />
        </div>
      </div>
    </Layout>
  );
}

export default ExamView;
