// import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import { Image, Form, Container, Row, Col, Button } from "react-bootstrap";

function QuizComponent2({
  HandleNextQuestion,
  DataQuestion,
  isChange = false,
  isEdit = true,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef?.current?.pause();
    audioRef?.current?.load();
  }, [isChange]);

  //   const updateSong = (source) => {
  //     setSource(source);
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current.load();
  //       audioRef.current.play();
  //     }
  //   };
  //   useEffect(() => {
  //     console.log("aaaxzzz");
  //     updateSong(DataQuestion.question.sound);
  //   }, [DataQuestion]);

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
  return (
    <>
      {/* <h1>About</h1> */}
      <Container className="quiz">
        <Row className="datum">
          {DataQuestion.question.sound ? (
            <Row className="justify-content-md-center">
              {!isEdit ? (
                <Button style={{ width: "20%" }} onClick={onplay}>
                  Play
                </Button>
              ) : null}
              <Col md="auto">
                <audio
                  // onPlay={onplay}
                  ref={audioRef}
                  style={{ pointerEvents: isEdit ? "auto" : "none" }}
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
                // className="paragraph"
              ></p>
            </Col>
          </Row>
        </Row>
        <Row className="list-question">
          <Form onSubmit={handleSubmit}>
            {questionList?.map((item) => {
              return (
                <Form.Group
                  ref={formRef}
                  controlId={`${DataQuestion._id}-${item._id}`}
                  key={`${DataQuestion._id}-${item._id}`}
                  className="mb-3"
                >
                  {DataQuestion.hasChild?<Form.Label className="question-text">
                    {item.question.text}
                  </Form.Label>
                  :null
                  }
                  {[...item.answer.texts, ...item.answer.choices]
                    .sort((a, b) => (b.slice(0, 3) < a.slice(0, 3) ? 1 : -1))
                    .map((itemAnswer, index) => {
                      return (
                        <Form.Check
                          key={`answer-${item._id}-${index + 1}`}
                          type={"radio"}
                          style={
                            isEdit
                              ? itemAnswer == item.answer.texts[0]
                                ? CorrectStyle
                                : IncorrectStyle
                              : null
                          }
                          name={`${item._id}`}
                          value={itemAnswer}
                          id={`answer-${item._id}-${index + 1}`}
                          onChange={handleChange}
                          label={itemAnswer}
                        />
                      );
                    })}
                  {isEdit
                    ?              
                    <p
                      dangerouslySetInnerHTML={{ __html: item.answer.hint?"<br><strong>Gợi ý : </strong><br>"+item.answer.hint :""}}
                      // className="paragraph"
                    >
                    </p>
                    :null
                  }
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
const CorrectStyle = {
  // border: '1px solid green',
  // borderRadius:'5px',
  color: "green",
  paddingLeft: "30px",
};
const IncorrectStyle = {
  // border: '1px solid red',
  // borderRadius:'5px',
  color: "red",
  paddingLeft: "30px",
};

export default QuizComponent2;
