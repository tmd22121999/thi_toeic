import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Image, Col, Row, Container } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";

function SummaryView() {
  /**
   * This renders an item in the table of contents list.
   * scrollIntoView is used to ensure that when a user clicks on an item, it will smoothly scroll.
   */
  const Headings = ({ headings, activeId }) => (
    <ul>
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={heading.id === activeId ? "active" : ""}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {heading.title.split("-")[0]}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child) => (
                <li
                  key={child.id}
                  className={child.id === activeId ? "active" : ""}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`).scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {child.title.split("-")[0]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  /**
   * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
   */
  const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = React.useState([]);

    React.useEffect(() => {
      const headingElements = Array.from(
        document.querySelectorAll("main h2, main h3")
      );

      // Created a list of headings, with H3s nested
      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);

    return { nestedHeadings };
  };

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];

    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });

    return nestedHeadings;
  };

  const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = React.useRef({});
    React.useEffect(() => {
      const callback = (headings) => {
        headingElementsRef.current = headings.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);

        // Get all headings that are currently visible on the page
        const visibleHeadings = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting)
            visibleHeadings.push(headingElement);
        });

        const getIndexFromId = (id) =>
          headingElements.findIndex((heading) => heading.id === id);

        // If there is only one visible heading, this is our "active" heading
        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
          // If there is more than one visible heading,
          // choose the one that is closest to the top of the page
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
          );
          console.log(sortedVisibleHeadings);
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      };

      const observer = new IntersectionObserver(callback, {
        root: document.querySelector("iframe"),
        rootMargin: "0px",
      });

      const headingElements = Array.from(document.querySelectorAll("h2, h3"));

      headingElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }, [setActiveId]);
  };

  /**
   * Renders the table of contents.
   */
  const TableOfContents = () => {
    const [activeId, setActiveId] = React.useState();
    const { nestedHeadings } = useHeadingsData();
    useIntersectionObserver(setActiveId);
    console.log(activeId);
    return (
      <nav className="summary" aria-label="Table of contents">
        <Headings headings={nestedHeadings} activeId={activeId} />
      </nav>
    );
  };
  const DummyText = "aaa";
  return (
    <Layout title="Tổng hợp kiến thức thi Toeic">
      <Container className="container-summary">
        <Row>
          <Col md="auto">
            <main className="summary">
              <h2 id="Tenses-header">I. Tenses - thì tiếng Anh</h2>
              <p>
                Về cơ bản các thì tiếng Anh trong ngữ pháp TOEIC cũng không khác
                với ngữ pháp thông thường là bao nhiêu. Tuy nhiên khi bạn có
                kiến thức sâu rộng về ngữ pháp thì bạn sẽ đạt được những lợi thế
                nhất định khi làm bài kiểm tra TOEIC. Cũng giống như tất cả các
                kỳ thi tiếng Anh khác, bạn cần phải nắm vững ngữ pháp về thì
                trước khi làm chủ được kiến thức và vận dụng sâu rộng. Dưới đây
                là 12 thì cơ bản trong ngữ pháp TOEIC thí sinh cần nắng vững:
              </p>

              <h6 id="topic-1-header">Topic 1: Thì hiện tại đơn </h6>
              <h6 id="topic-2-header">Topic 2: Thì hiện tại tiếp diễn </h6>
              <h6 id="topic-3-header">Topic 3: Thì hiện tại hoàn thành </h6>
              <h6 id="topic-4-header">
                Topic 4: Thì hiện tại hoàn thành tiếp diễn
              </h6>
              <h6 id="topic-5-header">Topic 5: Thì quá khứ đơn </h6>
              <h6 id="topic-6-header">Topic 6: Thì quá khứ tiếp diễn </h6>
              <h6 id="topic-7-header">Topic 7: Thì quá khứ hoàn thành </h6>
              <h6 id="topic-8-header">
                Topic 8: Thì quá khứ hoàn thành tiếp diễn
              </h6>
              <h6 id="topic-9-header">Topic 9: Thì tương lai đơn </h6>
              <h6 id="topic-10-header">Topic 10: Thì tương lai hoàn thành </h6>
              <h6 id="topic-11-header">
                Topic 11: Thì tương lai hoàn thành tiếp diễn
              </h6>
              <h6 id="topic-12-header">Topic 12: Thì tương lai tiếp diễn </h6>
              <Image
                fluid={true}
                src="https://prep.vn/blog/wp-content/uploads/2022/04/12-thi-trong-tieng-anh.jpg"
              />
              <h2 id="Gerund-header">
                II. Gerund and infinitive - Dạng thức của động từ (dạng Ving, to
                V)
              </h2>
              <p>
                Chắc chắn Danh động từ và động từ nguyên thể là một phần không
                thể thiếu trong quá trình ôn luyện ngữ pháp TOEIC. Các giám khảo
                chấm thi thường đánh giá rất cao những bạn có thể sử dụng nhuần
                nhuyễn Danh động từ và động từ nguyên thể trong bài thi của mình
                bởi vì đây là một chủ điểm ngữ pháp khó và yêu cầu bạn cần có
                thời gian luyện tập mới có thể sử dụng chúng một cách tự nhiên
                nhất.
              </p>
              <h2 id="Modal-verbs-header">
                III. Modal verbs - Động từ khuyết thiếu
              </h2>
              <p>
                Động từ khuyết thiếu - Modal Verb là chủ điểm ngữ pháp TOEIC
                không thể thiếu tiếp theo trong quá trình học của bạn. Động từ
                khuyết thiếu là những động từ với chức năng hỗ trợ cho động từ
                chính trong câu chứ không đứng một mình giống như động từ. Với
                chức năng bổ ngữ cho động từ, động từ khiếm khuyết cũng mang
                những ý nghĩa riêng để thay đổi ý nghĩa của câu
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <b>
                      &nbsp;CAN và COULD có ý nghĩa là “có thể”, diễn tả một khả
                      năng (ability).
                    </b>
                    <span style={{ fontWeight: 400 }}>&nbsp;</span>
                    <ul>
                      <li style={{ fontWeight: 400 }} aria-level="2">
                        <span style={{ fontWeight: 400 }}>
                          Can you swim? (Bạn biết bơi không?)
                        </span>
                      </li>
                      <li style={{ fontWeight: 400 }} aria-level="2">
                        <span style={{ fontWeight: 400 }}>
                          She could ride a car when she was 16 years old (Cô ấy
                          có thể đi xe đạp khi cô ấy được 16 tuổi)
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </p>
              <Image
                fluid={true}
                src="https://prep.vn/blog/wp-content/uploads/2021/11/so-do-tu-duy-ve-dong-tu-khuyet-thieu.png"
              />
              <h2 id="Comparison-header">IV. Comparison - Câu so sánh</h2>
              <p>
                Câu so sánh - chủ điểm ngữ pháp TOEIC tiếp theo bạn cần lưu ý.
                Trong tiếng Anh có 3 dạng so sánh đó là so sánh nhất, so sánh
                bằng và so sánh hơn. Bạn cần phải hiểu thật kỹ về cấu trúc hình
                thành 3 dạng so sánh và biết cách phân biệt 3 loại so sánh này.
                Trong mỗi dạng so sánh sẽ có những trường hợp đặc biệt mà bạn
                cần phải nắm vững để không mất điểm oan trong các phần thi như
                Viết hay Nói.
              </p>
              <p style={{ textAlign: "justify" }}>
                <b>So sánh bằng:&nbsp; </b>
                <span style={{ fontWeight: 400 }}>
                  So sánh bằng thể hiện việc so sánh giữa những sự vật hoặc sự
                  việc ở cấp độ ngang bằng với nhau.&nbsp;
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>Cấu trúc so sánh bằng:</b>
                  <span style={{ fontWeight: 400 }}>
                    {" "}
                    TO BE + AS + ADJ + AS
                  </span>
                </li>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>Ví dụ:</b>
                  <span style={{ fontWeight: 400 }}>
                    {" "}
                    She is as short as her brother
                  </span>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <b>So sánh nhất: </b>
                <span style={{ fontWeight: 400 }}>
                  So sánh nhất là dạng so sánh được sử dụng đối với người và vật
                  để chỉ đối tượng đó thường có tính chất khác biệt nhất so với
                  các đối tượng trong cùng một nhóm (ít nhất là 3 đối tượng)
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li aria-level="1">
                  <b>Cấu trúc so sánh nhất:&nbsp;</b>
                </li>
              </ul>
              <ul style={{ textAlign: "justify" }}>
                <li>
                  <ul>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + the + tính từ ngắn – est&nbsp;
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + the + most + tính từ dài
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <b>So sánh hơn: </b>
                <span style={{ fontWeight: 400 }}>
                  So sánh hơn có thể được hiểu là cấu trúc so sánh giữa 2 hay
                  nhiều vật/người với nhau về một hay một vài tiêu chí, trong số
                  có một vật đạt được tiêu chí được đưa ra phù hợp nhất so với
                  các vật còn lại
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>Cấu trúc so sánh hơn:</b>
                  <span style={{ fontWeight: 400 }}>&nbsp;</span>
                  <ul>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + tính từ ngắn – er + than
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + more + tính từ dài + than
                      </span>
                    </li>
                  </ul>
                </li>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <span style={{ fontWeight: 400 }}>
                    Ví dụ: She is taller than both of her sisters.
                  </span>
                </li>
              </ul>
              <h2 id="Passive-header">V. Passive Voice - Câu bị động</h2>
              <p>
                Câu bị động - kiến thức ngữ pháp TOEIC tiếp theo mà bạn không
                thể bỏ qua. Thể bị động là thể khi chủ ngữ là người hoặc là vật
                bị chịu tác động của ngoại cảnh, hành vi khác lên nó. Câu bị
                động có tác dụng nhấn mạnh đến đối tượng bị chịu tác động của
                hành động đó. Trong đó cần lưu ý đặc biệt là thì của câu bị động
                luôn phải tuân theo thì của câu chủ động.
              </p>
              <p>{DummyText}</p>
              <h2 id="Subject-header">
                VI. Subject - Verb Agreement: Sự hòa hợp giữa chủ ngữ và động từ
              </h2>
              <p>{DummyText}</p>
              <h2 id="IF-header">VII. IF - Câu điều kiện</h2>
              <p>
                Trong tiếng Anh câu điều kiện thường được dùng để diễn đạt, giải
                thích về một sự việc nào đó có thể sẽ xảy ra khi điều kiện nói
                đến xảy ra. Bạn cần lưu ý đến chủ điểm ngữ pháp TOEIC về câu
                điều kiện để đạt những số điểm cao trong kỳ thi này. Hầu hết khi
                các câu điều kiện đều chứa “if”. Một câu điều kiện thường bao
                gồm hai mệnh đề đó là:
              </p>
              <h2 id="Clause-header">VIII. Clause - Mệnh đề </h2>
              <p>
                Cấu trúc câu tiếng Anh giúp các bạn hiểu được nguyên nhân tại
                sao lại sử dụng các từ loại này mà không sử dụng từ loại khác,
                tại sao chọn từ này và cách sắp xếp các từ loại trong câu như
                thế nào? Cấu trúc ngữ pháp tiếng Anh của một câu được chia thành
                hai dạng chính: Dạng đơn giản (câu rút gọn, câu đặc biệt, câu ít
                các thành phần) và cấu trúc phức tạp ( câu đa chủ vị, và đa
                thành phần). Hãy ôn tập thật kỹ kiến thức ngữ pháp TOEIC này để
                “rinh” những số điểm thật cao trong bài thi TOEIC nhé!
              </p>
              <h2 id="past-p2-header">
                IX. Past Participle - Quá khứ phân từ (động từ đuôi ED) và hiện
                tại phân từ (động từ đuôi -ing)
              </h2>
              <p>
                Hiện tại phân từ hay còn là động từ thêm đuôi “V-ing”. Hiện tại
                phân từ hay còn được gọi là danh động từ, được thành lập bằng
                cách thêm ”-ing” vào sau động từ.
              </p>
              <p>
                Quá khứ phân từ hay còn là động từ thêm đuôi ”-ed” (đối với các
                động từ có quy tắc và các động từ nằm ở cột cuối cùng trong bảng
                liệt kê các động từ bất quy tắc). Ví dụ:
              </p>
              <h2 id="Subjunctive-header">X. Subjunctive - Câu giả định</h2>
              <p>
                Ngữ pháp TOEIC thông dụng tiếp theo bạn nên nắm vững chính là
                câu giả định (Subjunctive). Câu giả định (câu cầu khiến) là loại
                câu được sử dụng khi người nói mong muốn ai đó làm một việc gì
                đó. Cấu trúc giả định chỉ mang tính chất cầu khiến chứ không
                biểu đạt tính ép buộc như câu mệnh lệnh.
              </p>
              <h2 id="Question-header">
                XI. The Question - Các loại câu hỏi hay xuất hiện trong tiếng
                Anh
              </h2>
              <p>
                Kiến thức ngữ pháp TOEIC về các loại câu hỏi trong Tiếng Anh
                thường hay xuất hiện rất nhiều trong bài thi TOEIC, đặc biệt là
                phần thi Listening. Chính vì vậy các bạn hãy ôn tập thật kỹ về
                kiến thức này để có thể tự tin đạt điểm cao nhé!
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Câu hỏi Yes/ No.</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Câu hỏi nhằm lấy thông tin (information question)
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Who hoặc What: câu hỏi chủ ngữ
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Whom hoặc What: câu hỏi đối tượng tân ngữ
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      When, Where, How và Why: Câu hỏi bổ ngữ nghĩa
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Câu hỏi phức (hay còn gọi là embedded question)
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Câu hỏi đuôi (tag questions)
                    </span>
                  </li>
                </ul>
              </p>
              <h2 id="Types-header">XII. Types of words - Từ loại Tiếng Anh</h2>
              <p>
                Phần tiếp sau đây cũng vô cùng quan trọng trong khi các bạn ôn
                luyện ngữ pháp TOEIC đó là phần thi về các từ loại Tiếng Anh.
                Trong Tiếng Anh có các từ loại chính sau mà bạn cần đặc biệt lưu
                tâm:
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Noun</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Verb</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Adjective</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Adverb</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Pronoun</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Preposition</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Conjunction</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Determiner</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>Exclamation</span>
                  </li>
                </ul>
              </p>
            </main>
          </Col>
          <Col md="auto">
            <TableOfContents />
          </Col>
        </Row>
      </Container>
      {/* <h1>About</h1>
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
      </div> */}
    </Layout>
  );
}

export default SummaryView;
