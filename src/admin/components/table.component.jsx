import React, { Component, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Container, Modal, Row } from "react-bootstrap";
import QuizComponent2 from "./quiz.component";
import TableRow from "./TableRow";
import { useState } from "react";
import data from "../../test/dataTest.json";
import axios from "axios";

import JoditEditor from "jodit-react";

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;


const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
});

function TableComponent(props) {

  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState(props.exam);

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
  const HandleUpdateData=()=>{
    console.log('aaacnsadkas');
    fetchData();
  }


  // console.log(props);
  let flat_data = [];
  // let exam = props.exam.question;
  //   exam.map((item) => {
  //     if (item.hasChild == 0) {
  //       flat_data.push(item);
  //     } else {
  //       flat_data.push(item);
  //       flat_data.push(...item.childCard);
  //     }
  //     return item;
  //   });
  // console.log(flat_data);
  const [items, setItems] = useState(exam ? exam.question : data);
  console.log('item',items);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsReorder = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(itemsReorder);
  };
  const setText = (id, newText, type) => {
    let itemsReorder = items;
    // console.log(itemsReorder.find((obj) => obj._id == id));
    itemsReorder.find((obj) => obj._id == id).question[type] = newText;
    setItems(itemsReorder);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  const TextInput = ({ setText, placeholder, value }) => {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setText(e.target.value)}
          placeholder={value}
          //   value={value}
        ></input>
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-envelope"></span>
          </div>
        </div>
      </div>
    );
  };

  const [show, setShow] = useState(false);
  const [curItem, setCurItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {/* <TableRow item={items[0]} index={0} /> */}
              {items
                ? items.map((item, index) => (
                    <>
                    <TableRow itemProps={item} id={item._id} index={index} HandleUpdateData={HandleUpdateData} />
                    
                      {/* <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            order Index : {index} - id : {item._id}
                          </div>
                        )}
                      </Draggable>
                      <Container>
                        <Row>
                          <TextInput
                            setText={(textValue) =>
                              setText(item._id, textValue, "sound")
                            }
                            placeholder={"Link to sound file"}
                            value={item.question.sound}
                          />
                          <TextInput
                            setText={(textValue) =>
                              setText(item._id, textValue, "image")
                            }
                            placeholder={"Link to image file"}
                            value={item.question.image}
                          />
                          <div>content here {index}</div>

                          <button
                            className="btn btn-danger btn-sm mx-1"
                            variant="primary"
                            onClick={() => {
                              setCurItem(item);
                              handleShow();
                            }}
                          >
                            Preview
                          </button>
                        </Row>
                      </Container> */}
                    </>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuizComponent2 DataQuestion={curItem} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm mx-1" onClick={handleClose}>
            Cancel
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
      </Modal>  {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) :null}
    </>
  );
}

export default TableComponent;
