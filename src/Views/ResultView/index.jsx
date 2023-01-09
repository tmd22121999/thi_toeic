import React from "react";
import { useState } from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent";
import { Button, Card, Container, Row, Col, Collapse } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";
import { useTimer } from "react-timer-hook";
import data from "../../test/dataTest.json";
import { useRef } from "react";

export const CollapseComponent = ({ data , userData }) => {
  const [open, setOpen] = useState(false);
  let _variant = "primary";
  const userAnswer = userData?.filter((item) => item.questionId == data.id);
  if (!userAnswer.length > 0) {
    _variant = "secondary";
  } else {
    if (userAnswer[0].choice == data.correctAnswer) _variant = "success";
    else _variant = "danger";
  }
  // console.log(userAnswer.value + "-" + data.correctAnswer);
  return (
    <>
      <Button
        variant={_variant}
        onClick={() => setOpen(!open)}
        aria-controls={data.id}
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open}>
        <div id={data.id}>
          <p dangerouslySetInnerHTML={{ __html: data.hint }}></p>
        </div>
      </Collapse>
    </>
  );
};

function ResultView({ userData }) {

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
    return data2.flatMap((item) => item.questionList);
  };
  const [DataQuestion1, setDataQuestion1] = useState(dataProcess(data));


  return (
    // <Layout>
    //   <div className="Home">
    <Container className="Container">
      {/* <h1 className="HeadingText">{"Test"}</h1> */}

      <Row>
        {DataQuestion1.map((item, index) => {
          return (
            <div key={item.id} className={`topic`}>
              <CollapseComponent data={item} userData={userData} />
            </div>
          );
        })}
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col></Col>
        <Col md={"auto"}></Col>
        <Col></Col>
      </Row>
    </Container>
    //   </div>
    // </Layout>
  );
}

export default ResultView;
