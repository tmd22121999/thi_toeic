import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Container, Row } from "react-bootstrap";
import QuizComponent2 from "./quiz.component";

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

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
});

class TableComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    let flat_data = [];
    let exam = props.exam.question;
    exam.map((item) => {
      if (item.hasChild == 0) {
        flat_data.push(item);
      } else {
        flat_data.push(item);
        flat_data.push(...item.childCard);
      }
      return item;
    });
    console.log(flat_data);
    this.state = {
      items: props.exam.question,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    console.log(items);
    this.setState({
      items,
    });
  }
  setText(id, newText) {
    console.log(this.state.items.find((obj) => obj._id == id));
    this.state.items.find((obj) => obj._id == id).question.image = newText;
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const TextInput = ({ setText, placeholder, value }) => {
      return (
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            // value={value}
          ></input>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
      );
    };
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <>
                  <Draggable
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
                        {item._id}
                      </div>
                    )}
                  </Draggable>
                  <Container>
                    <Row>
                      <Col xs={6}>
                        <QuizComponent2 DataQuestion={item} />
                      </Col>
                      <Col xs={6}>
                        <TextInput
                          setText={this.setText}
                          placeholder={"Link to sound file"}
                          value={item.question.sound}
                        />
                        <TextInput
                          setText={(textValue) =>
                            this.setText(item._id, textValue)
                          }
                          placeholder={"Link to image file"}
                          value={item.question.image}
                        />
                        <div>content here {index}</div>
                      </Col>
                    </Row>
                  </Container>
                </>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default TableComponent;
