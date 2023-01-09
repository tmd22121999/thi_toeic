import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import axios from "axios";
import TextInput from "../components/TextInput.component";

function ExamPage() {
  //fetch data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [Name, setName] = useState('');
  const [description, setDescription] = useState('');

  
  const handleClose = () => {
    // setPreviewContent(item);
    // setIsChange(!isChange)
    setShow(false);
}
const handleShow = () => setShow(true);

  const history = useHistory();

  //modal insert exam
  const HandleInsertExam = () => {
    // const insertData = async () => {
    // setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/exam",
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
        // fetchData();
        // console.log(response);
        history.push(`/edit/${response.data.exam._id}`, {
          exam: response.data.exam,
        });
        console.log(response.data.exam);
        // setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    // };
  };

  const HandleEditExam = (id, exam) => {
    if (!id) {
      return;
    }

    history.push(`/edit/${id}`, { exam: exam });
  };
  const HandleDeleteExam = (id) => {
    // const insertData = async () => {
    setLoading(true);
    axios
      .delete(
        "http://localhost:4000/api/exam/" + id,
        // {Name:Name,description:description},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        fetchData();

        // setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    // };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:4000/api/exam/all"
      );
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const RowExam = ({ exam }) => {
    if (!exam) {
      return <tr></tr>;
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <tr>
        <td>{exam._id}</td>
        <td>
          <a>{exam.Name}</a>
          {/* <br />
          <small>Created 01.01.2019</small> */}
        </td>
        <td>
          {exam.description}
          {/* <ul className="list-inline">
            <li className="list-inline-item">
              <img
                alt="Avatar"
                className="table-avatar"
                src="../../dist/img/avatar.png"
              ></img>
            </li>
            <li className="list-inline-item">
              <img
                alt="Avatar"
                className="table-avatar"
                src="../../dist/img/avatar2.png"
              ></img>
            </li>
            <li className="list-inline-item">
              <img
                alt="Avatar"
                className="table-avatar"
                src="../../dist/img/avatar3.png"
              ></img>
            </li>
            <li className="list-inline-item">
              <img
                alt="Avatar"
                className="table-avatar"
                src="../../dist/img/avatar4.png"
              ></img>
            </li>
          </ul> */}
        </td>
        {/* <td className="project_progress">
          <div className="progress progress-sm">
            <div
              className="progress-bar bg-green"
              role="progressbar"
              aria-valuenow="57"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "57%" }}
            ></div>
          </div>
          <small>57% Complete</small>
        </td> */}
        <td className="project-state">
          {exam.ltype}-{exam.type}
          {/* <span className="badge badge-success">Success</span> */}
        </td>
        <td className="project-actions text-right">
          {/* <a className="btn btn-primary btn-sm" href="#">
            <i className="fas fa-folder"></i>
            View
          </a> */}
          <button
            onClick={() => HandleEditExam(exam._id, exam)}
            className="btn btn-info btn-sm mx-1"
            href="#"
          >
            <i className="fas fa-pencil-alt"></i>
            Edit
          </button>
          <button
            onClick={() => handleShow()}
            className="btn btn-danger btn-sm mx-1"
            href="#"
          >
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </td>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn xoá bài thi thử "{exam.Name}" không?
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-sm mx-1" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger btn-sm mx-1"
              variant="primary"
              onClick={() => {
                HandleDeleteExam(exam._id);
                handleClose;
              }}
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
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
                  <li className="breadcrumb-item active">Exam</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Danh sách đề thi thử</h3>

              <div className="card-tools">
                <button
                  onClick={handleShow}
                  className="btn btn-success btn-sm"
                >
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
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>ID</th>
                    <th style={{ width: "20%" }}>Name</th>
                    <th style={{ width: "20%" }}>Description</th>
                    {/* <th>Project Progress</th> */}
                    <th style={{ width: "18%" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "20%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((item) => {
                        return <RowExam key={item._id} exam={item} />;
                      })
                    : null}
                </tbody>
              </table>
            </div>
            <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bài thi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                                <label>Tên bài thi :</label>
                                <TextInput
                                    valueProps={""}
                                    setTextProps={(newContent) => {setName(newContent)}}
                                />
                                <label>Mô tả :</label>
                                <TextInput
                                    valueProps={""}
                                    setTextProps={(newContent) => {setDescription(newContent)}}
                                />  
                                {/* <input type="file"  id="exampleInputFile"/><br /> */}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger btn-sm mx-1" onClick={handleClose}>
                        Huỷ
                    </button>
                    <button className="btn btn-success btn-sm mx-1" onClick={HandleInsertExam}>
                        Thêm
                    </button>
                    {/* <button
            className="btn btn-danger btn-sm mx-1"
            variant="primary"
            onClick={() => {
              HandleDeleteExam(exam._id);
              handleClose;
            }}
          >
            Delete
          </button> */}
                </Modal.Footer>
            </Modal>
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
    {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) :null}
    </div>
  );
}

export default ExamPage;
