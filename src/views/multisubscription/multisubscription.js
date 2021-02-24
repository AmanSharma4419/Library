import React, { Component, lazy, Suspense } from "react";
import "./multisubscription.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import videolimg from "../../assets/img/studentlibrary/study-m-img.png";
import closeicon from "../../assets/img/studentlibrary/close-icon.png";
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

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class multisubscription extends Component {
  render() {
    return (
        <div className="student-main-dashboard-wrapper mutlisubscription">
        <Container>
        <Row>
              <Col xs="12" sm="12" xl="3" md="12" lg="3">
                <Card className="uni-left-card">
                  <CardBody>
                    <ListGroup className="left-list">
                     
                        <ListGroupItem> <Link className="active" to="/Academicbeginner">IELTS ACADEMIC Beginner</Link></ListGroupItem>
                      <ListGroupItem>  <Link to="/Academicbeginner">IELTS ACADEMIC Intermediate</Link></ListGroupItem>
                      <ListGroupItem>  <Link to="/Academicbeginner">IELTS ACADEMIC Advanced</Link></ListGroupItem>
                     <ListGroupItem> <Link to="/Academicbeginner">ELTS GENERAL </Link></ListGroupItem>
                     <ListGroupItem>  <Link to="/Academicbeginner"> IELTS ACADEMIC Beginner  </Link></ListGroupItem>
                     <ListGroupItem><Link to="/Academicbeginner">IELTS ACADEMIC Intermediate  </Link></ListGroupItem>
                     <ListGroupItem><Link to="/Academicbeginner">IELTS ACADEMIC Advanced </Link></ListGroupItem>
                     <ListGroupItem><Link to="/onesubscription">OneSubscription</Link></ListGroupItem>
                     <ListGroupItem><Link to="/multisubscription">MultiSubscription</Link></ListGroupItem>
                    </ListGroup>


                  </CardBody>
                </Card>
              </Col>

             
              <Col xs="12" sm="12" xl="9" md="12" lg="9" className="uni-right-card">
                <Row className="mx-0">
<div className="mutlisubscription-wrapper">
                <div className="library-stab px-0">
                <ul className="nav nav-tabs d-inline d-xl-flex" role="tablist"
                        >
                          <li className="nav-item w-33 mx-auto">
                            <a className="nav-link active ia-advanced  d-flex align-self-end" data-toggle="tab" href="#iaadvanced"role="tab">
                             IELTS ACADEMIC - advanced
                            </a>
                          </li>
                          <li className="nav-item w-33 mx-auto">
                            <a className="nav-link ia-Intermediate d-flex align-self-end" data-toggle="tab" href="#iaintermediate" role="tab">
                            IELTS ACADEMIC - Intermediate
                            </a>
                          </li>
                          <li className="nav-item w-33 mx-auto">
                            <a className="nav-link ia-Beginner d-flex align-self-end" data-toggle="tab" href="#iabeginner" role="tab">
                            IELTS ACADEMIC - Beginner
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content tp-box-layout">
                          <div className="tab-pane active pt-0" id="iaadvanced" role="tabpanel">
            <div className="ielts-dashboard-layout subscription-layout">
              <div className="ilt-dash-header">
              <div className="row col-12 pr-0">
              <div className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-start pl-0">
              <div className="ilt-left-heading">
              <h3> MY LIBRARY</h3>
              <h1>IELTS ACADEMIC </h1>
              <h2>Advanced</h2>
              </div>
              </div>
              <div className="pl-1 col-md-8 col-lg-8 col-xl-8 pr-1 ">
              <div className="ilt-right-btn  justify-content-end d-flex">
                <div className="onesub-tab-column">
                <ul
                          className="nav nav-tabs d-flex align-item-center"
                          id="subscriptionTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active tutorialstab"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                            >
                             Tutorials
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link practiceeamtab"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                            >
                            Practice Exams
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link studentmaterials"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                            >
                            Study Materials
                            </a>
                          </li>
                        </ul>
                </div>
              <span className="chsub-btn">Change Subscription</span>
              </div>
              </div>
              </div>
              </div>
              <div className="ilts-main-tblayout">

              <div className="row">
                      <div className="library-stab col-12 px-0 px-sm-0 px-md-3 px-lg-3 px-xl-3">
                        

                      
                        <div className="tab-content ">
                          <div className="tab-pane active pt-0" id="tab1" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}

                               
                               <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                                     </div>
                          <div className="tab-pane pt-0" id="tab2" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                           <div className="tutorialTable">
                           <div className="table">
                               <div className="tt-header">
                                <div className="widthfourtyfive">
                                <span>NOTIFICATION</span>
                                </div>
                                <div className="col-wr text-left">
                                <span>Category</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span>Date</span>
                                </div>
                                <div className="wt3 text-center">
                                
                                </div>
                               </div>


                              {/* column start */}
                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>


                            

                               {/* column end */}

                             </div>
                           
                           
                          </div>
                          </div>
                         </div>
                          <div className="tab-pane pt-0" id="tab3" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}
                               <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                               
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                       
                          </div>
                         
                        </div>
                      </div>
                    </div>

               </div>
            </div>



         </div>


         <div className="tab-pane pt-0" id="iaintermediate" role="tabpanel">
         <div className="ielts-dashboard-layout subscription-layout">
              <div className="ilt-dash-header">
              <div className="row col-12 pr-0">
              <div className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-start pl-0">
              <div className="ilt-left-heading">
              <h3> MY LIBRARY</h3>
              <h1>IELTS ACADEMIC </h1>
              <h2>Intermediate</h2>
              </div>
              </div>
              <div className="pl-1 col-md-8 col-lg-8 col-xl-8 pr-1 ">
              <div className="ilt-right-btn  justify-content-end d-flex">
                <div className="onesub-tab-column">
                <ul
                          className="nav nav-tabs d-flex align-item-center"
                          id="subscriptionTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active tutorialstab"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                            >
                             Tutorials
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link practiceeamtab"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                            >
                            Practice Exams
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link studentmaterials"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                            >
                            Study Materials
                            </a>
                          </li>
                        </ul>
                </div>
              <span className="chsub-btn">Change Subscription</span>
              </div>
              </div>
              </div>
              </div>
              <div className="ilts-main-tblayout">

              <div className="row">
                      <div className="library-stab col-12 px-0 px-sm-0 px-md-3 px-lg-3 px-xl-3">
                        

                      
                        <div className="tab-content ">
                          <div className="tab-pane active pt-0" id="tab1" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}

                               
                               <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                                     </div>
                          <div className="tab-pane pt-0" id="tab2" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                           <div className="tutorialTable">
                           <div className="table">
                               <div className="tt-header">
                                <div className="widthfourtyfive">
                                <span>NOTIFICATION</span>
                                </div>
                                <div className="col-wr text-left">
                                <span>Category</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span>Date</span>
                                </div>
                                <div className="wt3 text-center">
                                
                                </div>
                               </div>


                              {/* column start */}
                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>


                            

                               {/* column end */}

                             </div>
                           
                           
                          </div>
                          </div>
                         </div>
                          <div className="tab-pane pt-0" id="tab3" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}
                               <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                               
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                       
                          </div>
                         
                        </div>
                      </div>
                    </div>

               </div>
            </div>
         </div>



         <div className="tab-pane pt-0" id="iabeginner" role="tabpanel">
         <div className="ielts-dashboard-layout subscription-layout">
              <div className="ilt-dash-header">
              <div className="row col-12 pr-0">
              <div className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-start pl-0">
              <div className="ilt-left-heading">
              <h3> MY LIBRARY</h3>
              <h1>IELTS ACADEMIC </h1>
              <h2>Beginner</h2>
              </div>
              </div>
              <div className="pl-1 col-md-8 col-lg-8 col-xl-8 pr-1 ">
              <div className="ilt-right-btn  justify-content-end d-flex">
                <div className="onesub-tab-column">
                <ul
                          className="nav nav-tabs d-flex align-item-center"
                          id="subscriptionTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active tutorialstab"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                            >
                             Tutorials
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link practiceeamtab"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                            >
                            Practice Exams
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link studentmaterials"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                            >
                            Study Materials
                            </a>
                          </li>
                        </ul>
                </div>
              <span className="chsub-btn">Change Subscription</span>
              </div>
              </div>
              </div>
              </div>
              <div className="ilts-main-tblayout">

              <div className="row">
                      <div className="library-stab col-12 px-0 px-sm-0 px-md-3 px-lg-3 px-xl-3">
                        

                      
                        <div className="tab-content ">
                          <div className="tab-pane active pt-0" id="tab1" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}

                               
                               <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                                     </div>
                          <div className="tab-pane pt-0" id="tab2" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                           <div className="tutorialTable">
                           <div className="table">
                               <div className="tt-header">
                                <div className="widthfourtyfive">
                                <span>NOTIFICATION</span>
                                </div>
                                <div className="col-wr text-left">
                                <span>Category</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span>Date</span>
                                </div>
                                <div className="wt3 text-center">
                                
                                </div>
                               </div>


                              {/* column start */}
                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body pr-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New practice Exam available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Practice Exams</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body nsm-exam">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>New Study Material available</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Study Material</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>

                               <div className="tt-body tc-change">
                                  <div className="tt-body-data">
                                    <div className="col-w">
                                    <h2>Speaking Class 11:30AM: Tutor change</h2>
                                    </div>
                                    <div className="col-wr text-left">
                                <span className="Q-vl">Class Calendar</span>
                                </div>
                                <div className="widthfifteen text-left">
                                <span className="DRU-vl">11/05/21</span>
                                </div>
                                <div className="wt3 text-center">
                                <div className="subcolumn-btn">
                                <a class="viewDetailBtn" href="#">View</a>
                                <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                </div>
                                </div>
                                  </div>
                                 
                               </div>


                            

                               {/* column end */}

                             </div>
                           
                           
                          </div>
                          </div>
                         </div>
                          <div className="tab-pane pt-0" id="tab3" role="tabpanel">
                          <div className="tutorial-stlb pracitce-exam-layout">
                            
                            <div className="tutorialTable">
                            <div className="table">
                                <div className="tt-header">
                                 <div className="widthfourtyfive">
                                 <span>NOTIFICATION</span>
                                 </div>
                                 <div className="col-wr text-left">
                                 <span>Category</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span>Date</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 
                                 </div>
                                </div>
 
 
                               {/* column start */}
                               <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body nsm-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New Study Material available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Study Material</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body pr-exam">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>New practice Exam available</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Practice Exams</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                               
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
                                <div className="tt-body tc-change">
                                   <div className="tt-body-data">
                                     <div className="col-w">
                                     <h2>Speaking Class 11:30AM: Tutor change</h2>
                                     </div>
                                     <div className="col-wr text-left">
                                 <span className="Q-vl">Class Calendar</span>
                                 </div>
                                 <div className="widthfifteen text-left">
                                 <span className="DRU-vl">11/05/21</span>
                                 </div>
                                 <div className="wt3 text-center">
                                 <div className="subcolumn-btn">
                                 <a class="viewDetailBtn" href="#">View</a>
                                 <span className="close-icon"><img src={closeicon} alt="close icon"/></span>
                                 </div>
                                 </div>
                                   </div>
                                  
                                </div>
 
 
                             
 
                                {/* column end */}
 
                              </div>
                            
                            
                           </div>
                           </div>
                       
                          </div>
                         
                        </div>
                      </div>
                    </div>

               </div>
            </div>
         </div>



      </div>

</div>
</div>
                </Row>
              </Col>
             
            </Row>
        </Container>
   </div>
    );
  }
}

export default multisubscription;
