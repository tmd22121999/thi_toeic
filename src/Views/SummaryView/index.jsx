// import './styles.css';
import React from "react";
import Layout from "../../Layout";
// import { Grid, Card, Text } from "@nextui-org/react";

function SummaryView() {
  return (
    <Layout title="Tổng hợp kiến thức thi Toeic">
      <h1>About</h1>
      <div className="Home">
        <div className="Container">
          <h3 className="HeadingText">{"Tổng hợp kiến thức thi Toeic"}</h3>
          <p className="DescriptionText">{" Các tài liệu tham khảo :"}</p>
          <a href="https://prep.vn/blog/ngu-phap-toeic/" class="link-primary">
            Tổng hợp kiến thức
          </a>
          <br />
          <a
            href="https://tienganhmoingay.com/meo-thi-toeic/"
            class="link-primary"
          >
            Mẹo thi toeic
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default SummaryView;
