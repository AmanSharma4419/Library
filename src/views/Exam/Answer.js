
import React, { Component, lazy, Suspense } from "react";
import "./Exam.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import wtimericon from "../../assets/img/studentlibrary/white-timer-icon.png";
import previcon from "../../assets/img/studentlibrary/p-qusetion.png";
import nexticon from "../../assets/img/studentlibrary/r-question.png";
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
class libraryanswer extends Component {
  render() {
    return (
      <div className="exam-layout-wrapper Qus-lt">
     
      <div className="exam_layout-box">
        <div className="exam_library_heading">
     <Container>
     <div className="Exam-headig">
       <div className="ex-left-bar">
         <h1>COURSE NAME - Subcategory name </h1>
       </div>
       <div className="ex-right-bar">
         <div className="Ques-timer">
          <img src={wtimericon}  alt="clock-icon"/><span>19:59</span>
         </div>
            <button className="btn ex-exit-btn">Finish</button>
       </div>
     </div>
     </Container>
     </div>
  
     <div className="exam_main_layout">
     <Container>
<div className="exam_box">
  <div className="exbox_heading">
  <ul>
    <li><span className="Question-count">Question 1/20</span></li>
    <li><span className="wordlimit">Word Limit: 150</span> </li>
  </ul>
  </div>
  <div className="ex_box_content">
  <p>Test description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text</p>
  </div>
 
</div>
<div className="Question-textarea answer-textarea">
  <textarea class="form-control" id="defult-answer" rows="4" placeholder="Write your answer...">Sample answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text answer text</textarea>
  <div className="word-count">Word COUNT: 120/150</div>
  </div>
<div className="begin-exam-btn">
  <button className="btn prQ-btn"><img src={previcon}  alt="prev-icon"/><span>Previous Question</span></button>
  <button className="btn nextQ-btn"><span>Next Question</span><img src={nexticon}  alt="next-icon"/></button>
</div>
</Container>
     </div>
     </div>

</div>

    );
  }
}

export default libraryanswer;
