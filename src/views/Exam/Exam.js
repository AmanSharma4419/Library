
import React, { Component, lazy, Suspense } from "react";
import "./Exam.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import timericon from "../../assets/img/studentlibrary/timer-icon.png";
import Qustionicon from "../../assets/img/studentlibrary/Question-icon.png";
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
class libraryexam extends Component {
  render() {
    return (
        <div className="exam-layout-wrapper">
     
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
        <li><img src={Qustionicon} /><span>20 QUESTIONS</span></li>
        <li><img src={timericon} /><span>120 mins</span> </li>
      </ul>
      </div>
      <div className="ex_box_content">
      
      <h2>Test Name</h2>
      <p>Test description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text description sample text</p>
      </div>
    </div>
    <div className="begin-exam-btn">
      <button className="btn begin-btn">Begin Exam</button>
    </div>
    </Container>
         </div>
         </div>
  
   </div>

    );
  }
}

export default libraryexam;
