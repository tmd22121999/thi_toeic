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
    <Layout title="T???ng h???p ki???n th???c thi Toeic">
      <Container className="container-summary">
        <Row>
          <Col md="auto">
            <main className="summary">
              <h2 id="Tenses-header">I. Tenses - th?? ti???ng Anh</h2>
              <p>
                V??? c?? b???n c??c th?? ti???ng Anh trong ng??? ph??p TOEIC c??ng kh??ng kh??c
                v???i ng??? ph??p th??ng th?????ng l?? bao nhi??u. Tuy nhi??n khi b???n c??
                ki???n th???c s??u r???ng v??? ng??? ph??p th?? b???n s??? ?????t ???????c nh???ng l???i th???
                nh???t ?????nh khi l??m b??i ki???m tra TOEIC. C??ng gi???ng nh?? t???t c??? c??c
                k??? thi ti???ng Anh kh??c, b???n c???n ph???i n???m v???ng ng??? ph??p v??? th??
                tr?????c khi l??m ch??? ???????c ki???n th???c v?? v???n d???ng s??u r???ng. D?????i ????y
                l?? 12 th?? c?? b???n trong ng??? ph??p TOEIC th?? sinh c???n n???ng v???ng:
              </p>

              <h6 id="topic-1-header">Topic 1: Th?? hi???n t???i ????n </h6>
              <h6 id="topic-2-header">Topic 2: Th?? hi???n t???i ti???p di???n </h6>
              <h6 id="topic-3-header">Topic 3: Th?? hi???n t???i ho??n th??nh </h6>
              <h6 id="topic-4-header">
                Topic 4: Th?? hi???n t???i ho??n th??nh ti???p di???n
              </h6>
              <h6 id="topic-5-header">Topic 5: Th?? qu?? kh??? ????n </h6>
              <h6 id="topic-6-header">Topic 6: Th?? qu?? kh??? ti???p di???n </h6>
              <h6 id="topic-7-header">Topic 7: Th?? qu?? kh??? ho??n th??nh </h6>
              <h6 id="topic-8-header">
                Topic 8: Th?? qu?? kh??? ho??n th??nh ti???p di???n
              </h6>
              <h6 id="topic-9-header">Topic 9: Th?? t????ng lai ????n </h6>
              <h6 id="topic-10-header">Topic 10: Th?? t????ng lai ho??n th??nh </h6>
              <h6 id="topic-11-header">
                Topic 11: Th?? t????ng lai ho??n th??nh ti???p di???n
              </h6>
              <h6 id="topic-12-header">Topic 12: Th?? t????ng lai ti???p di???n </h6>
              <Image
                fluid={true}
                src="https://prep.vn/blog/wp-content/uploads/2022/04/12-thi-trong-tieng-anh.jpg"
              />
              <h2 id="Gerund-header">
                II. Gerund and infinitive - D???ng th???c c???a ?????ng t??? (d???ng Ving, to
                V)
              </h2>
              <p>
                Ch???c ch???n Danh ?????ng t??? v?? ?????ng t??? nguy??n th??? l?? m???t ph???n kh??ng
                th??? thi???u trong qu?? tr??nh ??n luy???n ng??? ph??p TOEIC. C??c gi??m kh???o
                ch???m thi th?????ng ????nh gi?? r???t cao nh???ng b???n c?? th??? s??? d???ng nhu???n
                nhuy???n Danh ?????ng t??? v?? ?????ng t??? nguy??n th??? trong b??i thi c???a m??nh
                b???i v?? ????y l?? m???t ch??? ??i???m ng??? ph??p kh?? v?? y??u c???u b???n c???n c??
                th???i gian luy???n t???p m???i c?? th??? s??? d???ng ch??ng m???t c??ch t??? nhi??n
                nh???t.
              </p>
              <h2 id="Modal-verbs-header">
                III. Modal verbs - ?????ng t??? khuy???t thi???u
              </h2>
              <p>
                ?????ng t??? khuy???t thi???u - Modal Verb l?? ch??? ??i???m ng??? ph??p TOEIC
                kh??ng th??? thi???u ti???p theo trong qu?? tr??nh h???c c???a b???n. ?????ng t???
                khuy???t thi???u l?? nh???ng ?????ng t??? v???i ch???c n??ng h??? tr??? cho ?????ng t???
                ch??nh trong c??u ch??? kh??ng ?????ng m???t m??nh gi???ng nh?? ?????ng t???. V???i
                ch???c n??ng b??? ng??? cho ?????ng t???, ?????ng t??? khi???m khuy???t c??ng mang
                nh???ng ?? ngh??a ri??ng ????? thay ?????i ?? ngh??a c???a c??u
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <b>
                      &nbsp;CAN v?? COULD c?? ?? ngh??a l?? ???c?? th??????, di???n t??? m???t kh???
                      n??ng (ability).
                    </b>
                    <span style={{ fontWeight: 400 }}>&nbsp;</span>
                    <ul>
                      <li style={{ fontWeight: 400 }} aria-level="2">
                        <span style={{ fontWeight: 400 }}>
                          Can you swim? (B???n bi???t b??i kh??ng?)
                        </span>
                      </li>
                      <li style={{ fontWeight: 400 }} aria-level="2">
                        <span style={{ fontWeight: 400 }}>
                          She could ride a car when she was 16 years old (C?? ???y
                          c?? th??? ??i xe ?????p khi c?? ???y ???????c 16 tu???i)
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
              <h2 id="Comparison-header">IV. Comparison - C??u so s??nh</h2>
              <p>
                C??u so s??nh - ch??? ??i???m ng??? ph??p TOEIC ti???p theo b???n c???n l??u ??.
                Trong ti???ng Anh c?? 3 d???ng so s??nh ???? l?? so s??nh nh???t, so s??nh
                b???ng v?? so s??nh h??n. B???n c???n ph???i hi???u th???t k??? v??? c???u tr??c h??nh
                th??nh 3 d???ng so s??nh v?? bi???t c??ch ph??n bi???t 3 lo???i so s??nh n??y.
                Trong m???i d???ng so s??nh s??? c?? nh???ng tr?????ng h???p ?????c bi???t m?? b???n
                c???n ph???i n???m v???ng ????? kh??ng m???t ??i???m oan trong c??c ph???n thi nh??
                Vi???t hay N??i.
              </p>
              <p style={{ textAlign: "justify" }}>
                <b>So s??nh b???ng:&nbsp; </b>
                <span style={{ fontWeight: 400 }}>
                  So s??nh b???ng th??? hi???n vi???c so s??nh gi???a nh???ng s??? v???t ho???c s???
                  vi???c ??? c???p ????? ngang b???ng v???i nhau.&nbsp;
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>C???u tr??c so s??nh b???ng:</b>
                  <span style={{ fontWeight: 400 }}>
                    {" "}
                    TO BE + AS + ADJ + AS
                  </span>
                </li>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>V?? d???:</b>
                  <span style={{ fontWeight: 400 }}>
                    {" "}
                    She is as short as her brother
                  </span>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <b>So s??nh nh???t: </b>
                <span style={{ fontWeight: 400 }}>
                  So s??nh nh???t l?? d???ng so s??nh ???????c s??? d???ng ?????i v???i ng?????i v?? v???t
                  ????? ch??? ?????i t?????ng ???? th?????ng c?? t??nh ch???t kh??c bi???t nh???t so v???i
                  c??c ?????i t?????ng trong c??ng m???t nh??m (??t nh???t l?? 3 ?????i t?????ng)
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li aria-level="1">
                  <b>C???u tr??c so s??nh nh???t:&nbsp;</b>
                </li>
              </ul>
              <ul style={{ textAlign: "justify" }}>
                <li>
                  <ul>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + the + t??nh t??? ng???n ??? est&nbsp;
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + the + most + t??nh t??? d??i
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <b>So s??nh h??n: </b>
                <span style={{ fontWeight: 400 }}>
                  So s??nh h??n c?? th??? ???????c hi???u l?? c???u tr??c so s??nh gi???a 2 hay
                  nhi???u v???t/ng?????i v???i nhau v??? m???t hay m???t v??i ti??u ch??, trong s???
                  c?? m???t v???t ?????t ???????c ti??u ch?? ???????c ????a ra ph?? h???p nh???t so v???i
                  c??c v???t c??n l???i
                </span>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <b>C???u tr??c so s??nh h??n:</b>
                  <span style={{ fontWeight: 400 }}>&nbsp;</span>
                  <ul>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + t??nh t??? ng???n ??? er + than
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="2">
                      <span style={{ fontWeight: 400 }}>
                        To be + more + t??nh t??? d??i + than
                      </span>
                    </li>
                  </ul>
                </li>
                <li style={{ fontWeight: 400 }} aria-level="1">
                  <span style={{ fontWeight: 400 }}>
                    V?? d???: She is taller than both of her sisters.
                  </span>
                </li>
              </ul>
              <h2 id="Passive-header">V. Passive Voice - C??u b??? ?????ng</h2>
              <p>
                C??u b??? ?????ng - ki???n th???c ng??? ph??p TOEIC ti???p theo m?? b???n kh??ng
                th??? b??? qua. Th??? b??? ?????ng l?? th??? khi ch??? ng??? l?? ng?????i ho???c l?? v???t
                b??? ch???u t??c ?????ng c???a ngo???i c???nh, h??nh vi kh??c l??n n??. C??u b???
                ?????ng c?? t??c d???ng nh???n m???nh ?????n ?????i t?????ng b??? ch???u t??c ?????ng c???a
                h??nh ?????ng ????. Trong ???? c???n l??u ?? ?????c bi???t l?? th?? c???a c??u b??? ?????ng
                lu??n ph???i tu??n theo th?? c???a c??u ch??? ?????ng.
              </p>
              <p>{DummyText}</p>
              <h2 id="Subject-header">
                VI. Subject - Verb Agreement: S??? h??a h???p gi???a ch??? ng??? v?? ?????ng t???
              </h2>
              <p>{DummyText}</p>
              <h2 id="IF-header">VII. IF - C??u ??i???u ki???n</h2>
              <p>
                Trong ti???ng Anh c??u ??i???u ki???n th?????ng ???????c d??ng ????? di???n ?????t, gi???i
                th??ch v??? m???t s??? vi???c n??o ???? c?? th??? s??? x???y ra khi ??i???u ki???n n??i
                ?????n x???y ra. B???n c???n l??u ?? ?????n ch??? ??i???m ng??? ph??p TOEIC v??? c??u
                ??i???u ki???n ????? ?????t nh???ng s??? ??i???m cao trong k??? thi n??y. H???u h???t khi
                c??c c??u ??i???u ki???n ?????u ch???a ???if???. M???t c??u ??i???u ki???n th?????ng bao
                g???m hai m???nh ????? ???? l??:
              </p>
              <h2 id="Clause-header">VIII. Clause - M???nh ????? </h2>
              <p>
                C???u tr??c c??u ti???ng Anh gi??p c??c b???n hi???u ???????c nguy??n nh??n t???i
                sao l???i s??? d???ng c??c t??? lo???i n??y m?? kh??ng s??? d???ng t??? lo???i kh??c,
                t???i sao ch???n t??? n??y v?? c??ch s???p x???p c??c t??? lo???i trong c??u nh??
                th??? n??o? C???u tr??c ng??? ph??p ti???ng Anh c???a m???t c??u ???????c chia th??nh
                hai d???ng ch??nh: D???ng ????n gi???n (c??u r??t g???n, c??u ?????c bi???t, c??u ??t
                c??c th??nh ph???n) v?? c???u tr??c ph???c t???p ( c??u ??a ch??? v???, v?? ??a
                th??nh ph???n). H??y ??n t???p th???t k??? ki???n th???c ng??? ph??p TOEIC n??y ?????
                ???rinh??? nh???ng s??? ??i???m th???t cao trong b??i thi TOEIC nh??!
              </p>
              <h2 id="past-p2-header">
                IX. Past Participle - Qu?? kh??? ph??n t??? (?????ng t??? ??u??i ED) v?? hi???n
                t???i ph??n t??? (?????ng t??? ??u??i -ing)
              </h2>
              <p>
                Hi???n t???i ph??n t??? hay c??n l?? ?????ng t??? th??m ??u??i ???V-ing???. Hi???n t???i
                ph??n t??? hay c??n ???????c g???i l?? danh ?????ng t???, ???????c th??nh l???p b???ng
                c??ch th??m ???-ing??? v??o sau ?????ng t???.
              </p>
              <p>
                Qu?? kh??? ph??n t??? hay c??n l?? ?????ng t??? th??m ??u??i ???-ed??? (?????i v???i c??c
                ?????ng t??? c?? quy t???c v?? c??c ?????ng t??? n???m ??? c???t cu???i c??ng trong b???ng
                li???t k?? c??c ?????ng t??? b???t quy t???c). V?? d???:
              </p>
              <h2 id="Subjunctive-header">X. Subjunctive - C??u gi??? ?????nh</h2>
              <p>
                Ng??? ph??p TOEIC th??ng d???ng ti???p theo b???n n??n n???m v???ng ch??nh l??
                c??u gi??? ?????nh (Subjunctive). C??u gi??? ?????nh (c??u c???u khi???n) l?? lo???i
                c??u ???????c s??? d???ng khi ng?????i n??i mong mu???n ai ???? l??m m???t vi???c g??
                ????. C???u tr??c gi??? ?????nh ch??? mang t??nh ch???t c???u khi???n ch??? kh??ng
                bi???u ?????t t??nh ??p bu???c nh?? c??u m???nh l???nh.
              </p>
              <h2 id="Question-header">
                XI. The Question - C??c lo???i c??u h???i hay xu???t hi???n trong ti???ng
                Anh
              </h2>
              <p>
                Ki???n th???c ng??? ph??p TOEIC v??? c??c lo???i c??u h???i trong Ti???ng Anh
                th?????ng hay xu???t hi???n r???t nhi???u trong b??i thi TOEIC, ?????c bi???t l??
                ph???n thi Listening. Ch??nh v?? v???y c??c b???n h??y ??n t???p th???t k??? v???
                ki???n th???c n??y ????? c?? th??? t??? tin ?????t ??i???m cao nh??!
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>C??u h???i Yes/ No.</span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      C??u h???i nh???m l???y th??ng tin (information question)
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Who ho???c What: c??u h???i ch??? ng???
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      Whom ho???c What: c??u h???i ?????i t?????ng t??n ng???
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      When, Where, How v?? Why: C??u h???i b??? ng??? ngh??a
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      C??u h???i ph???c (hay c??n g???i l?? embedded question)
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      C??u h???i ??u??i (tag questions)
                    </span>
                  </li>
                </ul>
              </p>
              <h2 id="Types-header">XII. Types of words - T??? lo???i Ti???ng Anh</h2>
              <p>
                Ph???n ti???p sau ????y c??ng v?? c??ng quan tr???ng trong khi c??c b???n ??n
                luy???n ng??? ph??p TOEIC ???? l?? ph???n thi v??? c??c t??? lo???i Ti???ng Anh.
                Trong Ti???ng Anh c?? c??c t??? lo???i ch??nh sau m?? b???n c???n ?????c bi???t l??u
                t??m:
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
          <h3 className="HeadingText">{"T???ng h???p ki???n th???c thi Toeic"}</h3>
          <p className="DescriptionText">{" C??c t??i li???u tham kh???o :"}</p>
          <a href="https://prep.vn/blog/ngu-phap-toeic/" class="link-primary">
            T???ng h???p ki???n th???c
          </a>
          <br />
          <a
            href="https://tienganhmoingay.com/meo-thi-toeic/"
            class="link-primary"
          >
            M???o thi toeic
          </a>
        </div>
      </div> */}
    </Layout>
  );
}

export default SummaryView;
