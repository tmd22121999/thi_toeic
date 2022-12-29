import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent";
import { Button, Card, Container, Row, Col, Pagination } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";
import { useTimer } from "react-timer-hook";
// import data from "../../test/dataTest.json";
import { useRef } from "react";
import ResultView from "../ResultView";
import useToken from "../../Helper/useToken";
import LoginView from "../AuthView/LoginView";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";

function ExamListView() {
  const { token, setToken } = useToken();
  let expiryTimestamp = new Date().setHours(new Date().getHours() + 2);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:4000/api/exam/all"
      );
      setData(response);
      //   console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };
  // console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  const HandleStart = (exam) => {
    console.log(exam);
    history.push(`/examTest/${exam._id}`, {
      exam: "exam",
    });
  };

  const TestInforCard = ({ exam }) => {
    return (
      <Row>
        <Col></Col>

        <Col>
          <Card
            className="text-center"
            style={{
              width: "20rem",
              padding: "2rem",
              backgroundColor: "#ebd081",
            }}
          >
            <Card.Img
              variant="top"
              src="https://vietmybinhduong.edu.vn/wp-content/uploads/2022/08/t1.jpg"
            />
            <Card.Body>
              <Card.Title>{exam.Name} :</Card.Title>
              <Card.Text>
                {/* Số lượng câu hỏi : 100 câu <br />
                Thời gian làm bài thi : 120 phút <br /> */}
              </Card.Text>
              <Button
                className="button"
                variant="primary"
                onClick={() => HandleStart(exam)}
              >
                <Link
                  to={{
                    pathname: "/template",
                    search: "?query=abc",
                    state: { detail: "response.data " },
                  }}
                  replace
                >
                  Bắt đầu thi thử
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    );
  };
  if (!token) {
    return (
      <Layout>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <h2>Yêu cầu đăng nhập để làm bài thi thử Toeic</h2>
            </Row>
            <Row>
              <Button
                style={{ display: "inline-block", margin: "auto" }}
                className="button"
                variant="primary"
                // onClick={HandleStart}
              >
                <NavLink className={"button-text"} exact to={"/Login"}>
                  Ấn vào đây để đi đến trang đăng nhập
                </NavLink>
              </Button>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="Home">
        <Container className="Container">
          {data.map((item) => {
            return <TestInforCard key={item._id} exam={item} />;
          })}
        </Container>
      </div>
    </Layout>
  );
}

export default ExamListView;
