import React, { Component, useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Button, Collapse, Container, Modal, Row } from "react-bootstrap";

import QuizComponent2 from "./quiz.component";
import TextInput from "./TextInput.component";
import JoditEditor from "jodit-react";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Checkbox } from "@material-ui/core";


function TableRow({ itemProps, id, index }) {
    // console.log("item:", item);
    // const [item, setItem] = useState(itemProps);
    const item = structuredClone(itemProps);
    const [open, setOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [isChange2, setIsChange2] = useState(false);
    const [show, setShow] = useState(false);
    // const [hasChild, setHasChild] = useState(false);
    const [curItem, setCurItem] = useState({});

    const [previewContent, setPreviewContent] = useState(itemProps);
    useEffect(() => {
        // setItem(itemProps)
        setIsChange2(!isChange2);
        setPreviewContent(item);
    }, [id])

    const handleClose = () => {
        setPreviewContent(item);
        setIsChange(!isChange)
        setShow(false);
    }
    const handleShow = () => setShow(true);
    
  const [file, setFile] = useState({image:{},sound:{}});
  const handleFileChange = (e,type) => {
    let fileTemp = file
    fileTemp[type]={
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(fileTemp);
    setContent({type:type,input:fileTemp[type].preview})
    setFile(fileTemp);
  };


    const editor = useRef(null);
    // const [content, setContent] = useState(item.question.text);

    const setContent = ({ type, input }) => {
        // console.log(audio);
        // if (!input) {
        //     return;
        // }
        const temp = previewContent;
        // if (type == 'question') {
        // temp.question.text = input.text ? input.text : temp.question.text;
        type == "hasChild"
            ? temp.hasChild = input.hasChild ? 1 : 0
            : temp.question[type] = input
        //     temp.question.sound = input.audio ;
        //     temp.question.image = input.image ;
        // }
        // temp.hasChild = input.hasChild;
        setPreviewContent(temp);
        setIsChange(!isChange)
    }

    const handleChangeType = (type) => {
        const temp = previewContent;
        temp.type = type
        setPreviewContent(temp);
        console.log(temp);
        // setIsChange(!isChange)
    }
    const InitialValue ={
        hasChild:  0,
        parentId: item._id,
        question:{
            text:"",
            image:  "",
            sound:"",
            hint: ""
          }
        ,
        answer: {
            texts:[""],
            choices:[""],
            image:  "",
            sound:"",
            hint: ""
          }
        ,
        tags: [],
        type:  1,
        orderIndex:  0
      }
    const HandleAddAnswer = () => {
        const newAnswer=InitialValue;
        const temp = previewContent;
        temp.childCard = [...temp.childCard,newAnswer]
        setPreviewContent(temp);
        console.log(previewContent);
        setIsChange(!isChange)
    }

    const HandleAnswerChange = ({ type, input }) => {
        // console.log(audio);
        if (!input) {
            return;
        }
        const temp = previewContent;
        if (temp.hasChild) {
            switch (type) {
                case "question":
                    temp.childCard[input.index].question.text = input.text;
                    break;
                case "answer":
                    const answerText = input.text?.split(";");
                    if (!answerText) {
                        return;
                    }
                    temp.childCard[input.index].answer.texts = [answerText.shift()]
                    temp.childCard[input.index].answer.choices = answerText;
                    break;
                case "hint":
                    temp.childCard[input.index].answer.hint = input.text;
                    break;
                default:
                    break;
            }
        } else {

            switch (type) {
                case "hint":
                    temp.answer.hint = input.text;
                    break;
                case "answer":
                    const answerText = input.text?.split(";");
                    if (!answerText) {
                        return;
                    }
                    temp.answer.texts = [answerText.shift()]
                    temp.answer.choices = answerText;
                default:
                    break;
            }
        }
        setPreviewContent(temp);
        setIsChange(!isChange)
    }

    const config =
    {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: 'Start typings...',
        maxHeight: 399,
        enter: "BR",
    }

    const grid = 4;
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        borderRadius: 20,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    return (
        <Row style={{ margin: 10 }}>
            <Col md="auto">
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
                            // style={{width:70}}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            Câu : {index}
                        </div>
                    )}
                </Draggable></Col>
            <Col >
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls={item._id}
                    aria-expanded={open}
                    style={{ width: 500 }}
                >
                    Id : {item._id}
                </Button>
            </Col>
            <Col >
                <Button
                    className="mx-1"
                    aria-controls={item._id}
                    aria-expanded={open}
                    variant="warning"
                    onClick={() => {
                        setCurItem(item);
                        handleShow();
                    }}
                // style={{width:500}}
                >
                    Sửa
                </Button>
                <Button
                    className="mx-1"
                    aria-controls={item._id}
                    aria-expanded={open}
                    variant="danger"
                // style={{width:500}}
                >
                    Xoá
                </Button>
            </Col>
            <Row>
                <Collapse in={open}>
                    <div id={item._id}>
                        <QuizComponent2 isChange={isChange2} DataQuestion={item} />
                        {/* <button
                            className="btn btn-danger btn-sm mx-1"
                            variant="primary"
                            onClick={() => {
                                setCurItem(item);
                                handleShow();
                            }}
                        >
                            Preview
                        </button> */}
                    </div>
                </Collapse></Row>
            <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa câu hỏi
                    </Modal.Title>
                    <Col md="auto" >
                        <Button onClick={() => setIsChange(!isChange)} variant="secondary" className="btn btn-sm mx-1 " >Preview</Button>
                        <Button className="btn btn-sm mx-1 " >Save</Button>
                        <Button variant="success" className="btn btn-sm mx-1 " >update</Button>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Row>
                            <Col xs={5}><QuizComponent2 isChange={isChange} DataQuestion={previewContent} /></Col>
                            <Col xs={6}>
                                <label>Link Audio :</label>
                                <TextInput
                                    valueProps={previewContent.question.sound}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'sound', input: newContent })
                                    }}
                                />
                                <input type="file" onChange={(e)=>handleFileChange(e,'sound')}  id="exampleInputFile"/><br />
                                <label>Link Ảnh :</label>
                                <TextInput
                                    valueProps={previewContent.question.image}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'image', input: newContent })
                                    }}
                                />
                                <input type="file" onChange={(e)=>handleFileChange(e,'image')}  id="exampleInputFile"/><br />
                                <label>Câu hỏi :</label>
                                <JoditEditor
                                    ref={editor}
                                    value={previewContent.question.text}
                                    config={config}
                                    style={{ maxHeight: 400 }}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent({ type: 'text', input: newContent })} // preferred to use only this option to update the content for performance reasons
                                    onChange={newContent => { }}
                                />
                                <label>Loại câu hỏi</label>
                                <select value={previewContent.type} 
                                onChange={(e)=>{handleChangeType(e.target.value)}}
                                className="form-control select2" 
                                >

                                  <option>listen1</option>
                                  <option>listen2</option>
                                  <option>listen3</option>
                                  <option>listen4</option>
                                  <option>reading1</option>
                                  <option>reading2</option>
                                  <option>reading31</option>
                                  <option>reading32</option>
                                </select>
                                <div style={{ marginTop: 10 }} className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={previewContent.hasChild}
                                        onChange={(e) => setContent({ type: "hasChild", input: { hasChild: e.target.checked } })}
                                    />
                                    <label className="form-check-label">Has Child</label>
                                </div>
                                {!previewContent.hasChild
                                    ? <>
                                        <label>Đáp án:</label>
                                        <sub className="text-danger"> Lưu ý: Các đáp án phân tách nhau bởi dấu chấm phảy ';' và bao gồm cả (A)</sub>
                                        <br />
                                        <sub className="text-danger">Đáp án đúng đặt ở đầu tiên </sub>
                                        <br />
                                        <TextInput
                                            setTextProps={(newContent) => HandleAnswerChange({type:"answer", input: { text: newContent } })}
                                            valueProps={[...item.answer.texts, ...item.answer.choices].join(";")}
                                        />
                                        <label>Hint:</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={previewContent.answer.hint}
                                            config={config}
                                            style={{ maxHeight: 400 }}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => HandleAnswerChange({ type: 'hint', input:{text:newContent}  })} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => { }}
                                        />
                                    </>
                                    : <Col>
                                        <sub className="text-danger"> Lưu ý: Các đáp án phân tách nhau bởi dấu chấm phảy ';' và bao gồm cả (A)</sub>
                                        <br />
                                        <sub className="text-danger">Đáp án đúng đặt ở đầu tiên </sub>
                                        <br />
                                        {previewContent.childCard?.map((item, index) => {
                                            return (<>
                                                <label style={{marginTop:30}}>Câu hỏi {index + 1} :</label>
                                                <TextInput
                                                    setTextProps={
                                                        (newContent) => HandleAnswerChange({ type: "question", input: { index: index, text: newContent } })
                                                    }
                                                    valueProps={item.question.text}
                                                />
                                                <label>Đáp án:</label>
                                                <TextInput
                                                    setTextProps={(newContent) => HandleAnswerChange({type:"answer", input: { index: index, text: newContent } })}
                                                    valueProps={[...item.answer.texts, ...item.answer.choices].join(";")}
                                                />
                                                <label>Hint:</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={item.answer.hint}
                                                    config={config}
                                                    style={{ maxHeight: 400 }}
                                                    tabIndex={1} // tabIndex of textarea
                                                    onBlur={newContent => HandleAnswerChange({ type: 'hint', input: { index: index, text: newContent } })} // preferred to use only this option to update the content for performance reasons
                                                    onChange={newContent => { }}
                                                />
                                            </>
                                            )
                                        })
                                        }
                                        <Button
                                            onClick={() => HandleAddAnswer()}
                                            variant="success"
                                            className="btn btn-sm mx-1 " >
                                            Thêm câu hỏi phụ
                                        </Button>
                                    </Col>
                                }
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger btn-sm mx-1" onClick={handleClose}>
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
            </Modal>
        </Row>
    );
}

export default TableRow;