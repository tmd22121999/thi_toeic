import "./styles.css";
import React from "react";
import { Image, Form, Container, Row, Col } from "react-bootstrap";

function QuizComponent() {
  const Answer = ({ questionID, answer, answerID }) => {
    return (
      <Form.Check
        type={"radio"}
        name={`group-${questionID}`}
        id={`answer-${questionID}-${answerID}`}
        label={answer}
      />
    );
  };
  const Question = ({
    questionID = "q1",
    questionText = "",
    answer = ["(A)", "(B)", "(C)", "(D)"],
  }) => {
    return (
      <Form>
        <div key={`default-radio`} className="mb-3">
          <Form.Label className="question-text">{questionText}</Form.Label>
          {answer.map((item, index) => {
            return (
              <Answer
                questionID={questionID}
                answer={item}
                answerID={index + 1}
              />
            );
          })}
        </div>
      </Form>
    );
  };
  return (
    <>
      {/* <h1>About</h1> */}
      <Container className="quiz">
        <Row className="topic">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <audio controls>
                <source
                  src="https://storage.googleapis.com/estudyme/dev/2022/06/27/30449101.mp3"
                  type="audio/mpeg"
                />
              </audio>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Image
                width="350"
                height="300"
                src="https://storage.googleapis.com/kslearning/images/418922160-1620725865601-pic1.png"
                alt="Default Image"
                objectFit="cover"
              />
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <p className="paragraph">{``}</p>
            </Col>
          </Row>
        </Row>
        <Row className="list-question">
          {/* <Form>
            <div key={`default-radio`} className="mb-3">
              <Form.Label className="question-text">Question 1</Form.Label>
              <Form.Check
                type={"radio"}
                name="group1"
                id={`answer-1-1`}
                label={`default radio`}
              />
              <Form.Check
                type={"radio"}
                name="group1"
                id={`answer-1-2`}
                label={`default radio`}
              />
              <Form.Check
                type={"radio"}
                name="group1"
                id={`answer-1-3`}
                label={`default radio`}
              />
              <Form.Check
                type={"radio"}
                name="group1"
                id={`answer-1-4`}
                label={`default radio`}
              />
            </div>
          </Form> */}
          <Question />
        </Row>
      </Container>
    </>
  );
}

export default QuizComponent;
