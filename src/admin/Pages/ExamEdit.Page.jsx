import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import TableComponent from "../components/table.component";

// import Button from 'react-bootstrap/Button';
import axios from "axios";
import QuizComponent2 from "../components/quiz.component";
function ExamEditPage(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //   const searchParams = useParams();
  const exam = props.history.location.state.exam;
  //   console.log(exam);
  //   console.log(props.history.location.state.exam);

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const { data: response } = await axios.get(
  //         "http://localhost:4000/api/exam/all"
  //       );
  //       setData(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <div className="wrapper">
      <div className="content-wrappers">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Quản lý đề thi</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Exam</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Danh sách câu hỏi của đề thi</h3>

              <div className="card-tools">
                <button className="btn btn-success btn-sm">
                  <i className="fas fa-trash"></i>
                  Thêm đề thi
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <TableComponent exam={exam} />
              <QuizComponent2 DataQuestion={exam.question[100]} />
            </div>
          </div>
        </section>
      </div>

      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          {/* <b>Version</b> 3.2.0 */}
        </div>
        <strong>
          {/* Copyright &copy; 2014-2021{" "} */}
          {/* <a href="https://adminlte.io">AdminLTE.io</a>. */}
        </strong>{" "}
        {/* All rights reserved. */}
      </footer>

      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default ExamEditPage;
