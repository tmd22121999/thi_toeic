import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import TableComponent from "../components/table.component";
import TextInput from "../components/TextInput.component";

// import Button from 'react-bootstrap/Button';
import axios from "axios";
import QuizComponent2 from "../components/quiz.component";
function ExamEditPage(props) {
  const [loading, setLoading] = useState(false);
  //   const searchParams = useParams();
  const exam2 = props.history.location.state?.exam;
  const [exam, setExam] = useState(exam2);
  // console.log(exam);
  const [Name, setName] = useState(exam?.Name);
  const [description, setDescription] = useState(exam?.description);
  //   console.log(props.history.location.state.exam);

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:4000/api/exam/"+exam._id
        );
        console.log("res",response);
        setExam(response[0]);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
const HandleUpdateData=()=>{
  fetchData()
}

  const UpdateMetadataExam = () => {
    // const insertData = async () => {
    // setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/exam/"+exam._id,
        JSON.stringify({Name,description}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status != 200) {
          return;
        }
        fetchData();
        // console.log(response);
        console.log(response.data.exam);
        // setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    // };
  };

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
              <h3 className="card-title">Thông tin về bài thi</h3>

              <div className="card-tools">
                <button 
                className="btn btn-success btn-sm"
                onClick={UpdateMetadataExam}
                >
                  <i className="fas fa-trash"></i>
                  Cập nhật mô tả
                </button>
              </div>
            </div>
            <div style={{ margin: 10 }} className="card-body p-0">
              <label>Tên Bài thi:</label>
              <TextInput 
              valueProps={exam?.Name} 
              setTextProps={setName}
              />
              <label>Giới thiệu:</label>
              <TextInput 
              valueProps={exam?.description} 
              setTextProps={setDescription}/>
              {/* <QuizComponent2 DataQuestion={exam.question[100]} /> */}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Danh sách câu hỏi của đề thi</h3>

              <div className="card-tools">
                <button 
                className="btn btn-success btn-sm"
                // onClick={AddQuestion}
                >
                  <i className="fas fa-trash"></i>
                  Thêm câu hỏi
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
              <TableComponent exam={exam} HandleUpdateData={HandleUpdateData} />
              {/* <QuizComponent2 DataQuestion={exam.question[100]} /> */}
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
