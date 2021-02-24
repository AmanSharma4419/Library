
import React, { Component, lazy, Suspense } from "react";
import "./viewtutorial.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
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

var baseurl = `${config.library_student}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class viewtutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classMaterialStudy: "",
      classMaterialsAssignment: "",
      classMaterialsVideo: "",
      tutorialsDetails: ""
    };
  }

  componentDidMount() {
    axios.post(baseurl + 'tutorialDetail', {
      course_id: this.props.match.params.courseId,
      student_id: localStorage.getItem("studentid"),
      tutorial_id: this.props.match.params.tutorialId,
    }
    ).then(res => {
      this.setState({ ...this.state, classMaterialStudy: res.data.classMaterialStudy, classMaterialsAssignment: res.data.classMaterialsAssignment, classMaterialsVideo: res.data.classMaterialsVideo, tutorialsDetails: res.data.tutorials })
    })
  }
  render() {
    console.log(this.state.classMaterialsVideo, "in the cse")
    return (
      <div className="viewtutorial-layout-wrapper">
        <Container>
          <Row>
            <div className="viewtutorial-layout">
              <div className="view-heading-column">
                <h1><img src={leftarrow} onClick={() => { this.props.history.goBack() }} /><span>Intro to IELTS Advanced</span></h1>
              </div>
              <div className="view-layout-box">
                <div className="view-video-tutorial">
                  <Row>
                    <Col xs="12" sm="12" xl="7" md="7" lg="7" className="pl-0">
                      <div className="view-tutoril-video">
                        <iframe width="100%" height="315"
                          src={`http://3.20.249.205/public/${this.state.classMaterialsVideo.material_path}/${this.state.classMaterialsVideo.material_name}`}>
                        </iframe>
                      </div>
                    </Col>
                    <Col xs="12" sm="12" xl="5" md="5" lg="5">
                      <div className="view-tutoril-nt">
                        <div className="tt-name"> <h2>Tutor: {this.state.tutorialsDetails.tutor_name}</h2>
                          <p>{this.state.tutorialsDetails.description && this.state.tutorialsDetails.description.replace(/<[^>]+>/g, '')}</p></div>
                        <div className="tt-type">
                          <h2>Tutorial Type</h2>
                          <p>Video</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="tutorial-view-mt">
                  <Row>
                    <Col xs="12" sm="12" xl="7" md="7" lg="7" className="pl-0">
                      <div className="view-pdf-link">
                        <div className="stm-link">
                          <h2>Study Materials</h2>
                          <div className="link_list">
                            {
                              this.state.classMaterialStudy.length != 0 ? this.state.classMaterialStudy.map((val, index) => {
                                return (
                                  <>
                                    {
                                      val.original_name ? <div key={index} className="pdf_link">
                                        {val.original_name}
                                      </div> : "" || val.material_url ? <ul>
                                        <li><a href={val.material_url}>{val.material_url}</a></li>
                                      </ul> : ""
                                    }
                                  </>

                                )
                              }) : "No Data"
                            }

                          </div>

                        </div>
                        <div className="stm-link">
                          <h2>Assignments</h2>
                          <div className="link_list">
                            {
                              this.state.classMaterialsAssignment.length != 0 ? this.state.classMaterialsAssignment.map((val, index) => {
                                console.log(val, "in the assignments")
                                return (
                                  <>
                                    {
                                      val.original_name ? <div key={index} className="pdf_link">
                                        {val.original_name}
                                      </div> : "" || val.material_url ? <ul>
                                        <li><a href={val.material_url}>{val.material_url}</a></li>
                                      </ul> : ""
                                    }
                                  </>
                                )
                              }) : "No Data"
                            }

                          </div>

                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>

    );
  }
}

export default viewtutorial;