
import React, { Component, lazy, Suspense } from "react";
import "./Exam.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import ReactAudioPlayer from 'react-audio-player';
import videolimg from "../../assets/img/studentlibrary/study-m-img.png";
import bellicon from "../../assets/img/studentlibrary/bell-icon.png";
import popupcloseicon from "../../assets/img/studentlibrary/close_icon.png";
import confirmokicon from "../../assets/img/studentlibrary/ok-icon.png";
import leftarrow from "../../assets/img/studentlibrary/arrow-left.png";
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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import config from "../../config.json";

import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

var baseurl = `${config.baseurl}/`;
function showconfirmation() {
  document.getElementById("close-icon").click();
}

const Widget03 = lazy(() => import("../Widgets/Widget03"));
class libraryeaudiorecord extends Component {
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


              <div className="written-question-answer auto-recording-layout">
                <div className="written_main_question">
                  <h2>Question 1</h2>
                  <p>Question sample text sample text sample text. Sample text sample text sample text sample text sample text sample text.</p>
                </div>
                <div className="wr_sm_answer">
                  <div className="wr_main_answer">
                    <h2>My Answer</h2>
                    <div className="audio_div"><ReactAudioPlayer
                      src="my_audio_file.ogg"
                      autoPlay
                      controls
                    /></div>
                  </div>
                  <div className="wr-sample_answer">
                    <h2>SAMPLE Answer</h2>
                    <div className="audio_div"><ReactAudioPlayer
                      src="my_audio_file.ogg"
                      autoPlay
                      controls
                    /></div>
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

export default libraryeaudiorecord;
