import "./styles.css";
import React from "react";
import { Image, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";

function QuizComponent({ HandleNextQuestion, DataQuestion }) {
  const audioRef = useRef(null);
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
      <Form.Group controlId={questionID} key={`default-radio`} className="mb-3">
        <Form.Label className="question-text">{questionText}</Form.Label>
        {answer.map((item, index) => {
          return (
            <Form.Check
              type={"radio"}
              name={`group-${questionID}`}
              id={`answer-${questionID}-${index + 1}`}
              label={item}
            />
            // <Answer
            //   key={index + 1}
            //   questionID={questionID}
            //   answer={item}
            //   answerID={index + 1}
            // />
          );
        })}
      </Form.Group>
    );
  };

  const handleSubmit = () => {
    event.preventDefault();
    audioRef.current?.pause();
    HandleNextQuestion();
  };

  return (
    <>
      {/* <h1>About</h1> */}
      <Container className="quiz">
        <Row className="datum">
          {DataQuestion.audio ? (
            <Row className="justify-content-md-center">
              <Col md="auto">
                <audio ref={audioRef} controls>
                  <source src={DataQuestion.audio} type="audio/mpeg" />
                </audio>
              </Col>
            </Row>
          ) : null}
          {DataQuestion.image ? (
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Image
                  width="350"
                  height="300"
                  src={DataQuestion.image}
                  alt="Default Image"
                  // objectFit="cover"
                />
              </Col>
            </Row>
          ) : null}
          <Row className="justify-content-md-center">
            <Col md="auto">
              <p
                dangerouslySetInnerHTML={{ __html: DataQuestion.paragraph }}
                className="paragraph"
              ></p>
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

          <Form onSubmit={handleSubmit}>
            {DataQuestion.questionList.map((item) => {
              return (
                <Form.Group
                  controlId={`${DataQuestion.id}-${item.id}`}
                  key={`${DataQuestion.id}-${item.id}`}
                  className="mb-3"
                >
                  <Form.Label className="question-text">
                    {item.question}
                  </Form.Label>
                  {item.answer.map((itemAnswer, index) => {
                    return (
                      <Form.Check
                        key={`answer-${item.id}-${index + 1}`}
                        type={"radio"}
                        name={`group-${item.id}`}
                        id={`answer-${item.id}-${index + 1}`}
                        label={itemAnswer}
                      />
                      // <Answer
                      //   key={index + 1}
                      //   questionID={questionID}
                      //   answer={item}
                      //   answerID={index + 1}
                      // />
                    );
                  })}
                </Form.Group>
                // <Question
                //   key={item.id}
                //   questionID={item.id}
                //   questionText={item.question}
                //   answer={item.answer}
                // />
              );
            })}
            {/* <Question /> */}

            <Button className="submit-button" variant="primary" type="submit">
              Next
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default QuizComponent;
