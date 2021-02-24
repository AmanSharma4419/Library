
import React, { Component, lazy, Suspense } from "react";
import "./Exam.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';

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
class libraryexamresult extends Component {
  render() {
    return (
      <div className="exam-layout-wrapper exam-result">
     
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
    <li className="Qus-comple">X/20 qUESTIONS Completed</li>
  </ul>
  </div>
 
</div>
<div className="exam_result_completed">
    <h1>Exam Complete</h1>
<div className="view_result"><a href="#">View Results</a></div>
  </div>
</Container>
     </div>
     </div>

</div>


    );
  }
}

export default libraryexamresult;
