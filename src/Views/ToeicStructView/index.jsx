import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { Hidden } from "@material-ui/core";
// import { Grid, Card, Text } from "@nextui-org/react";

function ToeicStructView() {
  const Data = {
    Listening: [
      {
        id: 1,
        name: "Part 1 : Mô tả hình ảnh",
        description:
          "Tương ứng với mỗi bức ảnh, bạn sẽ được nghe 04 câu mô tả về nó. Nhiệm vụ của bạn là phải chọn câu mô tả đúng nhất cho bức ảnh.",
        count: 10,
        bgColor: "#ed5c64",
      },
      {
        id: 2,
        name: "Part 2 : Hỏi và Đáp",
        description:
          "Bạn sẽ nghe một câu hỏi (hoặc câu nói) và 03 lựa chọn trả lời. Nhiệm vụ của bạn là phải chọn ra câu trả lời đúng nhất trong ba đáp án A-B-C.",
        count: 30,
        bgColor: "#f49f0a",
      },
      {
        id: 3,
        name: "Part 3 : Hội thoại ngắn	",
        description:
          "Bạn sẽ nghe 10 đoạn hội thoại ngắn. Mỗi đoạn có 03 câu hỏi. Nhiệm vụ của bạn là chọn ra câu trả lời đúng nhất trong 04 đáp án của đề thi.",
        count: 30,
        bgColor: "#04AA6D",
      },
      {
        id: 4,
        name: "Part 4 : Đoạn thông tin ngắn",
        description:
          "Bạn sẽ nghe 10 đoạn thông tin ngắn. Mỗi đoạn có 03 câu hỏi. Nhiệm vụ của bạn là chọn ra câu trả lời đúng nhất trong số 04 đáp án được cung cấp.",
        count: 30,
        bgColor: "#f08700",
      },
    ],
    Reading: [
      {
        id: 5,
        name: "Part 5 : Hoàn thành câu",
        description: "Bạn cần phải chọn từ đúng nhất để hoàn thành câu.",
        count: 40,
        bgColor: "#747474",
      },
      {
        id: 6,
        name: "Part 6 : Hoàn Thành Đoạn Văn",
        description:
          "Mỗi đoạn văn có 03 chỗ trống. Bạn phải điền từ thích hợp còn thiếu vào mỗi chỗ trống trong đoạn văn đó.",
        count: 12,
        bgColor: "#c2c120",
      },
      {
        id: 7,
        name: "Part 7.1 : Đọc hiểu đoạn đơn",
        description:
          "Đề thi có thể có từ 7-10 đoạn văn đơn. Hết mỗi đoạn văn sẽ có 2-5 câu hỏi.",
        count: 28,
        bgColor: "#ef4a50",
      },
      {
        id: 8,
        name: "Part 7.2 : Đọc hiểu đoạn kép",
        description:
          "Trong phần này sẽ có từ 04 cặp đoạn văn. Hết mỗi cặp đoạn văn sẽ có 5 câu hỏi.",
        count: 20,
        bgColor: "#00a6a6",
      },
    ],
  };
  const Content = ({ name, description }) => {
    return (
      <>
        <b className="HeadingText">{name}</b>
        <p className="DescriptionText">{description}</p>
      </>
    );
  };

  return (
    <Layout title="Thông tin về bài thi Toeic">
      {/* <h1>About</h1> */}
      <p>
        Một bài thi TOEIC đầy đủ gồm hai phần thi: Phần thi Listening (nghe
        hiểu) trong 45 phút và phần thi Reading (đọc hiểu) trong 75 phút. Mỗi
        phần thi có 100 câu. Tổng số câu hỏi của cả hai phần thi là 200 câu.
        Tổng thời gian làm bài là 120 phút hay 2 tiếng. Cấu trúc và nội dung chi
        tiết của từng phần thi như sau:
      </p>
      <div className="Toeic-Struct">
        <div className="Container">
          <h4 className="HeadingText">{"Phần A : Listening (Nghe hiểu)"}</h4>

          <div className="summary-bar-container">
            {Data.Listening.map((item) => {
              return (
                <div
                  className="summary-bar text-center"
                  style={{
                    width: `${item.count}%`,
                    backgroundColor: `${item.bgColor}`,
                    maxHeight: 40,
                    overflow: "hidden",
                  }}
                  key={item.key}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          {Data.Listening.map((item) => {
            return (
              <Content
                key={item.id}
                name={item.name}
                description={item.description}
              />
            );
          })}
          <h4 className="HeadingText">{"Phần B : Reading (Đọc hiểu)"}</h4>
          <div className="summary-bar-container">
            {Data.Reading.map((item) => {
              return (
                <div
                  className="summary-bar text-center"
                  style={{
                    width: `${item.count}%`,
                    backgroundColor: `${item.bgColor}`,
                    maxHeight: 40,
                    overflow: "hidden",
                  }}
                  key={item.key}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          {Data.Reading.map((item) => {
            return (
              <Content
                key={item.id}
                name={item.name}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default ToeicStructView;
