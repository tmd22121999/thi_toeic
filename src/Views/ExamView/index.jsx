import React from "react";
import { useState } from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent";
import { Button, Card, Container, Row, Col, Pagination } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";
import { useTimer } from "react-timer-hook";
import data from "../../test/dataTest.json";
import { useRef } from "react";
import ResultView from "../ResultView";
import useToken from "../../Helper/useToken";
import LoginView from "../AuthView/LoginView";
import { NavLink } from "react-router-dom";

function ExamView() {
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
  const test = `refer to the following e-mail.
        <br />
        <br />
        <b>To: </b>Vincent Silvers vsilvers@tjrprinting.com
        <br />
        <b>From:</b> Joseph Craig jcraig@tjrprinting.com
        <br />
        <b>Date:</b> June 20
        <br />
        <b>Subject:</b> Spelling error on Lambert posters
        <br />
        <br />
        Hi Vincent,
        <br />
        <br />
        It’s just come to my attention that there’s been a setback with the
        Lambert project. Apparently the posters for their product launch contain
        a (135)____.
        <br />
        The company name was typed incorrectly in the heading on the final
        version. As the liaison for this client, I need you to contact Mr.
        Lambert, notify him of the issue, and (136) ___ for the oversight.
        <br />
        Because we were responsible for this error, please reassure Mr. Lambert
        that reprinting of the posters will occur at (137) ___ expense and will
        be completed by the end of next week.
        <br />
        (138) ____.
        <br />
        <br />
        Regards,
        <br />
        Joseph Craig Production Manager, TJR Printing
      </p>`;
  const [activeTopic, setActiveTopic] = React.useState(0);
  const [isEnd, setIsEnd] = React.useState(false);
  const dataProcess = (data) => {
    const data1 = data.filter(
      (item) => item.parentId == "62b69492bbc57b27fe10f7ac"
    );
    const data2 = data1.map((item, index) => {
      var questionList;
      if (item.hasChild == 1) {
        const temp = item.childCards;
        questionList = temp.map((item2) => {
          const questionListReturn = {
            id: item2._id,
            question: item2.question.text,
            answer: [...item2.answer.texts, ...item2.answer.choices].sort(
              (a, b) => (b.slice(0, 3) < a.slice(0, 3) ? 1 : -1)
            ),
            correctAnswer: item2.answer.texts[0],
          };
          return questionListReturn;
        });
      } else {
        questionList = [
          {
            id: item._id,
            question: item.question.text,
            answer: [...item.answer.texts, ...item.answer.choices].sort(
              (a, b) => (b.slice(0, 3) < a.slice(0, 3) ? 1 : -1)
            ),
            correctAnswer: item.answer.texts[0],
            hint: item.answer.hint,
          },
        ];
      }
      const itemReturn = {
        id: item._id,
        audio: item.question.sound ? item.question.sound : null,
        image: item.question.image
          ? `https://storage.googleapis.com/${item.question.image}`
          : "",
        paragraph: item.question.text,
        questionList: questionList,
      };
      return itemReturn;
    });
    return data2;
  };
  // console.log(dataProcess(data).flatMap((item) => item.questionList));
  const DataQuestion = [
    {
      id: "topic1",
      audio:
        "https://storage.googleapis.com/estudyme/dev/2022/06/27/30449101.mp3",
      image:
        "https://storage.googleapis.com/kslearning/images/418922160-1620725865601-pic1.png",
      paragraph: "",
      questionList: [
        {
          question: "",
          answer: ["(A)", "(B)", "(C)", "(D)"],
          correctAnswer: "(A)",
        },
      ],
    },
    {
      id: "topic2",
      audio: "",
      image: "",
      paragraph: "",
      questionList: [
        {
          id: "q1",
          question:
            "The assets of Marble Faun Publishing Company ___ last quarter when one of their main local distributors went out of business.",
          answer: ["suffer", "suffers", "suffering", "suffered"],
          correctAnswer: "suffered",
        },
        {
          id: "q2",
          question:
            "lndie film director Luke Steele will be in London for the premiere of ___ new movie.",
          answer: ["him", "his", "himself", "he"],
          correctAnswer: "his",
        },
      ],
    },
    {
      id: "topic3",
      audio:
        "https://storage.googleapis.com/estudyme/dev/2022/06/27/78867473.mp3",
      image: "",
      paragraph: "",
      questionList: [
        {
          id: "q1",
          question: "Who is the woman?",
          answer: [
            "(A) A restaurant manager",
            "(B) A presentation participant",
            "(C) A workshop organizer",
            "(D) A cook",
          ],
          correctAnswer: "(D) A cook",
        },
        {
          id: "q2",
          question:
            "What does the woman mean when she says, “I have a weekly meeting soon”?",
          answer: [
            "(A) She cannot talk with the man for long.",
            "(B) She will discuss the problem soon.",
            "(C) She will invite the man to a weekly meeting.",
            "(D) She will participate in the workshop next Friday.",
          ],
          correctAnswer:
            "(D) She will participate in the workshop next Friday.",
        },
        {
          id: "q3",
          question: "What does Kimmy additionally want?",
          answer: [
            "(A) A cheaper price",
            "(B) Additional food items",
            "(C) Some alcohol",
            "(D) Dinner menus",
          ],
          correctAnswer: "(D) Dinner menus",
        },
      ],
    },
    {
      id: "topic4",
      audio: "",
      image: "",
      paragraph: `${test}`,
      questionList: [
        {
          id: "q1",
          question: "135",
          answer: [
            "(A) statement",
            "(B)correction",
            "(C)misprint",
            "(D)location",
          ],
          correctAnswer: "(D)location",
        },
        {
          id: "q2",
          question: "136",
          answer: [
            "(A) apologizing",
            "(B)apologized",
            "(A) apologizes",
            "(D)apologize",
          ],
          correctAnswer: "(D)apologize",
        },
      ],
    },
  ];
  const [isStart, setIsStart] = React.useState(false);
  const HandleStart = () => {
    start();
    setIsStart(!isStart);
  };

  const saveAnswer = useRef([]);

  const HandleNextQuestion = (answerData) => {
    saveAnswer.current = [...saveAnswer.current, ...answerData];
    if (activeTopic + 1 === data.length) {
      setIsEnd(true);
      setIsStart(false);
      console.log(saveAnswer.current);
      return;
    }
    setActiveTopic(activeTopic + 1);
  };
  const TestInforCard = () => {
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
              <Card.Title>Bài thi thử Toeic :</Card.Title>
              <Card.Text>
                Số lượng câu hỏi : 100 câu <br />
                Thời gian làm bài thi : 120 phút <br />
              </Card.Text>
              <Button
                style={
                  isStart ? { display: "none" } : { display: "inline-block" }
                }
                className="button"
                variant="primary"
                onClick={HandleStart}
              >
                Bắt đầu thi thử
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
          {/* <h1 className="HeadingText">{"Test"}</h1> */}
          {isStart ? (
            <>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <p className="time-text float-right">
                    {hours}:{minutes}:{seconds}
                  </p>
                </Col>
              </Row>
              <Row>
                {dataProcess(data).map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={`topic ${
                        activeTopic === index ? "Active" : "Inactive"
                      }`}
                    >
                      <QuizComponent
                        DataQuestion={item}
                        HandleNextQuestion={HandleNextQuestion}
                      />
                    </div>
                  );
                })}
              </Row>
              <Row style={{ marginTop: 100 }}>
                <Col></Col>
                <Col md={"auto"}>
                  <Pagination style={{ maxWidth: "450" }}>
                    <Pagination.First onClick={() => setActiveTopic(0)} />
                    <Pagination.Prev />
                    {activeTopic > 3 ? <Pagination.Ellipsis /> : null}
                    {activeTopic > 2 ? (
                      <Pagination.Item>{activeTopic - 2}</Pagination.Item>
                    ) : null}
                    {activeTopic > 1 ? (
                      <Pagination.Item>{activeTopic - 1}</Pagination.Item>
                    ) : null}
                    <Pagination.Item active>{activeTopic}</Pagination.Item>
                    {activeTopic < dataProcess(data).length - 1 ? (
                      <Pagination.Item>{activeTopic + 1}</Pagination.Item>
                    ) : null}
                    {activeTopic < dataProcess(data).length - 2 ? (
                      <Pagination.Item>{activeTopic + 2}</Pagination.Item>
                    ) : null}
                    {activeTopic < dataProcess(data).length - 3 ? (
                      <Pagination.Ellipsis />
                    ) : null}
                    <Pagination.Next />
                    <Pagination.Last
                      onClick={() =>
                        setActiveTopic(dataProcess(data).length - 1)
                      }
                    />
                  </Pagination>
                </Col>
                <Col></Col>
              </Row>
            </>
          ) : isEnd ? (
            <ResultView userData={saveAnswer.current} />
          ) : (
            <TestInforCard />
          )}
        </Container>
      </div>
    </Layout>
  );
}

export default ExamView;
