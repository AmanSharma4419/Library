
import React, { Component, lazy, Suspense } from "react";
import "./Exam.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import gcheckicon from "../../assets/img/studentlibrary/green-check.png";
import gcloseicon from "../../assets/img/studentlibrary/close-red-icon.png";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  Modal,
  ModalBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  ModalFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  ListGroup,
  ListGroupItem,
  Media,
  Container,
  Table,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import config from "../../config.json";

import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

var baseurl = `${config.baseurl}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class librarymultiple extends Component {
  render() {
    return (
      <div className="exam-layout-wrapper exam-multiple-result">
     
      <div className="exam_layout-box">
        <div className="exam_library_heading">
     <Container>
     <div className="Exam-headig">
       <div className="ex-left-bar">
         <h1>COURSE NAME - Subcategory name </h1>
       </div>
       <div className="ex-right-bar">
            <button className="btn ex-exit-btn">Exit</button>
       </div>
     </div>
     </Container>
     </div>
  
     <div className="exam_main_layout">
     <Container>
<div className="exam_box">
  <div className="exbox_heading">
  <ul>
    <li className="name">Test Name</li>
    <li className="Qus-comple">19/20</li>
  </ul>
  </div>
 
</div>


<div className="result-question-answer">
<div className="result_question">
<div className="question_heading">
  <img src={gcheckicon} alt="check-icon"/>
<h2>Question 1</h2>
</div>
<div className="question_content">
<p>Question sample text sample text sample text. Sample text sample text sample text sample text sample text sample text.</p>
</div>
</div>
<div className="result_answer">
<div className="answer_heading">
<h2>Answer</h2>
</div>
<div className="answer_content">
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check disabled">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
</div>
</div>
</div>


<div className="result-question-answer">
<div className="result_question">
<div className="question_heading">
  <img src={gcloseicon} alt="check-icon"/>
<h2>Question 2</h2>
</div>
<div className="question_content">
<p>Question sample text sample text sample text. Sample text sample text sample text sample text sample text sample text.</p>
</div>
</div>
<div className="result_answer">
<div className="answer_heading">
<h2>Answer</h2>
</div>
<div className="answer_content">
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check disabled">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
<div className="form-check">
  <label className="form-check-label">
    <input type="radio" className="form-check-input" name="optradio"/><span>Option sample text sample text sample text</span>
  </label>
</div>
</div>
</div>
</div>
</Container>
     </div>
     </div>

</div>


    );
  }
}

export default librarymultiple;
