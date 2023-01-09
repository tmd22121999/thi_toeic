import React, { Component, useState, useRef, useMemo } from "react";
import { Col, Button, Collapse, Container, Modal, Row } from "react-bootstrap";
import TextInput from "./TextInput.component";


const EditQuestion = ()=>{
    return(
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
                                <input type="file" accept="audio/*" onChange={(e)=>handleFileChange(e,'sound')}  id="exampleInputFile"/><br />
                                <label>Link Ảnh :</label>
                                <TextInput
                                    valueProps={previewContent.question.image}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'image', input: newContent })
                                    }}
                                />
                                <input type="file"  accept="image/*" onChange={(e)=>handleFileChange(e,'image')}  id="exampleInputFile"/><br />
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

                                  <option value={'t1'}>Part 1 : listen 1</option>
                                  <option  value={'t2'}>Part 2 : listen 2</option>
                                  <option  value={'t3'}>Part 3 : listen 3</option>
                                  <option  value={'t4'}>Part 4 : listen 4</option>
                                  <option  value={'t5'}>Part 5 : reading 1</option>
                                  <option  value={'t6'}>Part 6 : reading 2</option>
                                  <option  value={'t7'}>Part 7 : reading 3</option>
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
                </Modal.Footer>
            </Modal>
    )
}
export default EditQuestion;