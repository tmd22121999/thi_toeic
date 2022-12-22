// import "./styles.css";
import React from "react";
import { Image, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";

function QuizComponent2({ HandleNextQuestion, DataQuestion }) {
  const audioRef = useRef(null);
  const formRef = useRef(null);
  const [answerData, setAnswerData] = useState([]);

  //   console.log(DataQuestion);

  const handleSubmit = () => {
    event.preventDefault();
    audioRef.current?.pause();
    HandleNextQuestion(answerData);
  };
  const handleChange = (event) => {
    setAnswerData([
      ...answerData,
      { id: event.target.name, value: event.target.value },
    ]);
  };
  const [controlAudio, setControlAudio] = useState("auto");
  const onplay = () => {
    audioRef.current.play();
    setControlAudio(false);
    console.log("aaaaaaa");
  };
  const questionList =
    DataQuestion.hasChild == 0 ? [DataQuestion] : DataQuestion.childCard;
  //   console.log(DataQuestion);
  return (
    <>
      {/* <h1>About</h1> */}
      <Container className="quiz">
        <Row className="datum">
          {DataQuestion.question.sound ? (
            <Row className="justify-content-md-center">
              <Button style={{ width: "20%" }} onClick={onplay}>
                Play
              </Button>
              <Col md="auto">
                <audio
                  // onPlay={onplay}
                  ref={audioRef}
                  style={{ pointerEvents: "none" }}
                  controls
                >
                  <source src={DataQuestion.question.sound} type="audio/mpeg" />
                </audio>
              </Col>
            </Row>
          ) : null}
          {DataQuestion.question.image ? (
            <Row
              style={{ marginTop: 10 }}
              className="justify-content-md-center"
            >
              <Col md="auto">
                <Image
                  width="350"
                  height="300"
                  src={DataQuestion.question.image}
                  alt="Default Image"
                  // objectFit="cover"
                />
              </Col>
            </Row>
          ) : null}
          <Row className="justify-content-md-center">
            <Col md="auto">
              <p
                dangerouslySetInnerHTML={{ __html: DataQuestion.question.text }}
                className="paragraph"
              ></p>
            </Col>
          </Row>
        </Row>
        <Row className="list-question">
          <Form onSubmit={handleSubmit}>
            {questionList.map((item) => {
              return (
                <Form.Group
                  ref={formRef}
                  controlId={`${DataQuestion._id}-${item._id}`}
                  key={`${DataQuestion._id}-${item._id}`}
                  className="mb-3"
                >
                  <Form.Label className="question-text">
                    {item.question.text}
                  </Form.Label>
                  {[...item.answer.texts, ...item.answer.choices].map(
                    (itemAnswer, index) => {
                      return (
                        <Form.Check
                          key={`answer-${item._id}-${index + 1}`}
                          type={"radio"}
                          name={`${item._id}`}
                          value={itemAnswer}
                          id={`answer-${item._id}-${index + 1}`}
                          onChange={handleChange}
                          label={itemAnswer}
                        />
                      );
                    }
                  )}
                </Form.Group>
              );
            })}

            {/* <Button className="submit-button" variant="primary" type="submit">
              Next
            </Button> */}
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default QuizComponent2;
