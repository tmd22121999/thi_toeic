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

function ResultView({ userData }) {
  const [open, setOpen] = useState(false);
  const CollapseComponent = ({ data }) => {
    let _variant = "primary";
    const userAnswer = userData.filter((item) => item.id == data.id);
    if (!userAnswer.length > 0) {
      _variant = "secondary";
    } else {
      if (userAnswer[0].value == data.correctAnswer) _variant = "success";
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
  //   console.log(DataQuestion1);
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

  return (
    // <Layout>
    //   <div className="Home">
    <Container className="Container">
      {/* <h1 className="HeadingText">{"Test"}</h1> */}

      <Row>
        {DataQuestion1.map((item, index) => {
          return (
            <div key={item.id} className={`topic`}>
              <CollapseComponent data={item} />
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
