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
class Examwrittenanswers extends Component {
  render() {
    return (
      <div className="exam-layout-wrapper exam-writtenanswer">
     
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
 
  </ul>
  </div>
 
</div>


<div className="written-question-answer">
<div className="written_main_question">
<h2>Question 1</h2>
<p>Question sample text sample text sample text. Sample text sample text sample text sample text sample text sample text.</p>
</div>
<div className="wr_sm_answer">
<div className="wr_main_answer">
<h2>My Answer</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim ullamcorper duis tortor quam. Vulputate consectetur morbi sed risus. Id platea mattis hendrerit nulla urna, a mattis. Magna faucibus proin sed gravida.</p>
</div>
<div className="wr-sample_answer">
<h2>SAMPLE Answer</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At odio amet integer maecenas nec egestas sed. Id mauris vulputate molestie egestas nec enim dolor elit. Purus quis volutpat ac sed euismod diam, cras netus. Id amet, sagittis id natoque.</p>
<p>
Felis in lectus tincidunt et proin velit molestie turpis. Ut purus bibendum nulla felis. Erat non sit est aenean turpis bibendum a, cursus. In integer augue posuere tincidunt. Amet, elementum odio non dignissim sagittis leo, tortor leo facilisi. Nunc proin ornare cursus ultrices fermentum feugiat faucibus. Amet ut justo curabitur tristique consequat a ut.</p>
</div>
</div>
</div>


<div className="written-question-answer">
<div className="written_main_question">
<h2>Question 2</h2>
<p>Question sample text sample text sample text. Sample text sample text sample text sample text sample text sample text.</p>
</div>
<div className="wr_sm_answer">
<div className="wr_main_answer">
<h2>My Answer</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim ullamcorper duis tortor quam. Vulputate consectetur morbi sed risus. Id platea mattis hendrerit nulla urna, a mattis. Magna faucibus proin sed gravida.</p>
</div>
<div className="wr-sample_answer">
<h2>SAMPLE Answer</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At odio amet integer maecenas nec egestas sed. Id mauris vulputate molestie egestas nec enim dolor elit. Purus quis volutpat ac sed euismod diam, cras netus. Id amet, sagittis id natoque.</p>
<p>
Felis in lectus tincidunt et proin velit molestie turpis. Ut purus bibendum nulla felis. Erat non sit est aenean turpis bibendum a, cursus. In integer augue posuere tincidunt. Amet, elementum odio non dignissim sagittis leo, tortor leo facilisi. Nunc proin ornare cursus ultrices fermentum feugiat faucibus. Amet ut justo curabitur tristique consequat a ut.</p>
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

export default Examwrittenanswers;
