
import React, { Component, lazy, Suspense } from "react";
import "./Academicbeginner.css";
import "../../scss/studentlibrary.scss";
import { Bar, Line } from "react-chartjs-2";
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import videolimg from "../../assets/img/studentlibrary/study-m-img.png";
import popupcloseicon from "../../assets/img/studentlibrary/close_icon.png";
import confirmokicon from "../../assets/img/studentlibrary/ok-icon.png";
import bellicon from "../../assets/img/studentlibrary/bell-icon.png";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
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
import Modal from 'react-modal';

import { ToastContainer, toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import config from "../../config.json";

import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

var baseurl = `${config.library_student}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class academicbeginner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses_list: '',
      tutorial_details: '',
      tutorialsCount: "",
      practice_exams: '',
      practiceExamsCount: '',
      study_materials: '',
      studyMaterialsCount: '',
      isFav: false,
      title_studymaterial: '',
      title_tutorial: '',
      selected_value_studtmaterial: '102',
      selected_value_sort: "1",
      title_pratical: '',
      search_result: ''
    }
  }
  showconfirmation() {
    document.getElementById("close-icon").click();
  }

  onHandleLinkClick(id) {
    this.props.history.push(`/Academicbeginner/${id}`)
    window.location.reload(true)
  }
  handleChange(e) {
    this.setState({ ...this.state, selected_value_studtmaterial: e.target.value })
  }
  handleSearchTutorials() {
    axios.post(baseurl + "tutorialSearch", {
      title: this.state.title_tutorial,
      course_id: this.props.match.params.id,
      student_id: localStorage.getItem("studentid"),
      sort: this.state.selected_value_sort
    }).then(res => {
      if (res.data.tutorialsCount !== 0) {
        this.setState({ ...this.state, tutorial_details: res.data.tutorials })
      } else {
        this.setState({ ...this.state, tutorial_details: "", search_result: "No Data Found with this Search" })
      }
    })
  }
  handleSubscription(id) {
    this.showconfirmation()
    axios.post(baseurl + "courseSubscribe", {
      course_id: this.props.match.params.id,
      student_id: localStorage.getItem("studentid"),
      email: id
    }).then(res => {
      console.log(res, "in the response of data")
    })
  }
  handleSearchStudyMaterial() {
    axios.post(baseurl + "studyMaterialSearch", {
      title: this.state.title_studymaterial,
      course_id: this.props.match.params.id,
      student_id: localStorage.getItem("studentid"),
      sort: this.state.selected_value_studtmaterial
    }).then(res => {
      if (res.data.studyMaterialsCount !== 0) {
        this.setState({ ...this.state, study_materials: res.data.studyMaterials })
      } else {
        this.setState({ ...this.state, study_materials: "", search_result: "No Data Found with this Search" })
      }
    })
  }
  handleSearchPraticalExam() {
    axios.post(baseurl + "practicalExamSearch", {
      title: this.state.title_pratical,
      course_id: this.props.match.params.id,
      student_id: localStorage.getItem("studentid"),
      sort: this.state.selected_value_sort
    }).then(res => {
      if (res.data.practiceExamsCount !== 0) {
        this.setState({ ...this.state, practice_exams: res.data.practiceExams })
      } else {
        this.setState({ ...this.state, practice_exams: "", search_result: "No Data Found with this Search" })
      }
    })
  }
  handleFavourite(id) {
    this.setState({ ...this.state, isFav: !this.state.isFav })
    axios.post(baseurl + "insertMaterialFavourite", {
      study_material_id: id,
      student_id: localStorage.getItem("studentid"),
      fav: this.state.isFav ? 1 : 0
    }).then(res => {
      console.log(res, "in the response of the dat")
    })
  }
  onhandleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  onViewClick(mId, sId) {
    console.log(mId, sId, "in the viewww")
    axios.post(baseurl + 'insertMaterialView', {
      material_id: mId,
      student_id: localStorage.getItem("studentid"),
      study_material_id: sId,
    }
    ).then(res => {
      console.log(res, "in the res of onviewclick")
    })
  }
  componentDidMount() {
    console.log(this.props.match, "in the id")
    axios.get(baseurl + `coursesList?student_id=${localStorage.getItem("studentid")}`,
    ).then(res => {
      this.setState({ ...this.state, courses_list: res.data.courses })
    })
    axios.post(baseurl + "coursesDetail", {
      course_id: this.props.match.params.id,
      student_id: localStorage.getItem("studentid")
    }).then(res => {
      this.setState({ ...this.state, tutorial_details: res.data.tutorials, tutorialsCount: res.data.tutorialsCount, practice_exams: res.data.practiceExams, practiceExamsCount: res.data.practiceExamsCount, study_materials: res.data.studyMaterials, studyMaterialsCount: res.data.studyMaterialsCount })
    })
  }
  render() {
    window.scroll(0, 0)
    return (
      <div className="student-main-dashboard-wrapper">
        <Container>
          <Row>
            <Col xs="12" sm="12" xl="3" md="12" lg="3">
              <Card className="uni-left-card">
                <CardBody>
                  <ListGroup className="left-list">
                    {this.state.courses_list && this.state.courses_list.map((value, index) => {
                      return (
                        <>
                          <ListGroupItem> <Link className="active" onClick={() => {
                            this.onHandleLinkClick(value.id)
                          }}>{value.courses_title}</Link></ListGroupItem>
                        </>
                      )
                    })}
                    <ListGroupItem><Link to="/onesubscription">OneSubscription</Link></ListGroupItem>
                    <ListGroupItem><Link to="/multisubscription">MultiSubscription</Link></ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="12" xl="9" md="12" lg="9" className="uni-right-card">
              <Row className="mx-0">
                <div className="ielts-dashboard-layout">
                  <div className="ilt-dash-header">
                    <div className="row col-12 pr-0">
                      <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-start">
                        <div className="ilt-left-heading">
                          <h3> MY LIBRARY</h3>
                          <h1>IELTS ACADEMIC </h1>
                          <h2>Advanced</h2>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6 pr-1 ">
                        <div className="ilt-right-btn  justify-content-end d-flex">
                          <button class="btn btn-primary" data-toggle="modal" data-target="#subscribeConfirm" onClick={() => {
                          }}>Subscribe</button></div>
                      </div>
                    </div>
                  </div>
                  <div className="ilts-main-tblayout">

                    <div className="row">
                      <div className="library-stab col-12 px-0 px-sm-0 px-md-3 px-lg-3 px-xl-3">
                        <ul
                          className="nav nav-tabs d-inline d-xl-flex"
                          id="ProfileTab"
                          role="tablist"
                        >
                          <li className="nav-item w-33 mx-auto">
                            <a
                              className="nav-link active tutorialstab  d-flex align-self-end"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                            >
                              Tutorials
                            </a>
                          </li>
                          <li className="nav-item w-33 mx-auto">
                            <a
                              className="nav-link practiceeamtab d-flex align-self-end"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                            >
                              Practice Exams
                            </a>
                          </li>
                          <li className="nav-item w-33 mx-auto">
                            <a
                              className="nav-link studentmaterials d-flex align-self-end"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                            >
                              Study Materials
                            </a>
                          </li>
                        </ul>


                        <div className="tab-content ">
                          <div className="tab-pane active pt-0" id="tab1" role="tabpanel">

                            <div className="tutorial-stlb">
                              <div class="tutorialTable tutorial-dashboard-layout">
                                <div className="study-m-search-bar">
                                  <div className="stm-ss-box">
                                    <div className="input-group">
                                      <input type="text" class="form-control" onChange={(e) => [
                                        this.onhandleChange(e)]} name="title_tutorial" placeholder="Search" />
                                      <div className="input-group-append">
                                        <button className="btn btn-secondary" type="button">
                                          <i onClick={() => {
                                            this.handleSearchTutorials()
                                          }} className="fa fa-search"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                      this.setState({ ...this.state, selected_value_sort: e.target.value })
                                    }}>
                                      <option selected>Show: All</option>
                                      <option value="1">Recenty Added</option>
                                      <option value="2">By Name A-Z</option>
                                      <option value="3">By Name Z-A</option>
                                      <option value="4">Completed</option>
                                      <option value="5">In Progress</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="table">
                                  <div className="tt-header">
                                    <div className="col-wf">
                                      <span>Class</span>
                                    </div>
                                    <div className="col-wl text-center">
                                      <span>Status</span>
                                    </div>
                                  </div>
                                  {/* column start */}
                                  {
                                    this.state.tutorial_details && this.state.tutorialsCount != 0 ? this.state.tutorial_details.map((value, index) => {
                                      console.log(value, "in the value of tutorial view")
                                      return (
                                        <>
                                          <div className="tt-body">
                                            <div className="tt-body-heading">
                                              <div className="col-wf">
                                                <h2>{value.tutorial_title}</h2>
                                              </div>
                                              <div className="col-wl text-right">
                                                {value.tutorial_view_status_count >= value.class_materials_count ? <a className="completebtn" href="#">Complete</a> : <a className="inprogressbtn" href="#">in progress</a>
                                                }
                                              </div>
                                            </div>
                                            <div className="tt-body-pb">
                                              <div className="col-wf">
                                                <div className="tutor-np">
                                                  <h3>Tutor: {value.tutor_name}</h3>
                                                  <p>{value.description && value.description.replace(/<[^>]+>/g, '')}</p>
                                                </div>
                                              </div>
                                              <div className="col-wl text-right">
                                                <Link className="viewDetailBtn" onClick={() => { this.props.history.push(`/viewtutorial/${this.props.match.params.id}/${value.id}`) }} >View Details</Link>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    }) : this.state.search_result
                                  }
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="tab-pane pt-0" id="tab2" role="tabpanel">
                            <div className="tutorial-stlb pracitce-exam-layout">
                              <div className="practice-search-bar">
                                <div className="input-group">
                                  <input type="text" class="form-control" placeholder="Search" name="title_pratical" onChange={(e) => {
                                    this.onhandleChange(e)
                                  }} />
                                  <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button">
                                      <i onClick={() => {
                                        this.handleSearchPraticalExam()
                                      }} className="fa fa-search"></i>
                                    </button>
                                  </div>
                                  <div className="stm-select-box">
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                      this.setState({ ...this.state, selected_value_sort: e.target.value })
                                    }} >
                                      <option selected>Show: All</option>
                                      <option value="1">Recenty Added</option>
                                      <option value="2">By Name A-Z</option>
                                      <option value="3">By Name Z-A</option>
                                      <option value="4">Completed</option>
                                      <option value="5">In Progress</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="tutorialTable">
                                <div className="table">
                                  <div className="tt-header">
                                    <div className="col-w">
                                      <span>DESCRIPTION</span>
                                    </div>
                                    <div className="col-wr text-center">
                                      <span>QUESTIONS</span>
                                    </div>
                                    <div className="col-wr text-center">
                                      <span>DURATION</span>
                                    </div>
                                    <div className="col-wr text-center">
                                      <span>STATUS</span>
                                    </div>
                                  </div>
                                  {/* column start */}
                                  {
                                    this.state.practice_exams && this.state.practiceExamsCount != 0 ? this.state.practice_exams.map((value, index) => {
                                      return (
                                        <>
                                          <div className="tt-body">
                                            <div className="tt-body-heading">
                                              <div className="col-w">
                                                <h2>{value.exam_title}</h2>
                                              </div>
                                              <div className="col-wr text-center">
                                                <span className="Q-vl">{value.practice_exam_given_answers_count + "/" + value.practice_questions_count}</span>
                                              </div>
                                              <div className="col-wr text-center">
                                                <span className="DRU-vl">{value.time_limits.time_title}</span>
                                              </div>
                                              <div className="col-wr text-center">
                                                {value.practice_exam_given_answers_count === value.practice_questions_count && value.practice_questions_count !== 0 ? < span className="com-vl">Complete</span> : <span className="st-vl">In Progress</span>}
                                              </div>
                                            </div>
                                            <div className="tt-body-pb">
                                              <div className="col-w">
                                                <div className="tutor-np">
                                                  <p>{value.description && value.description.replace(/<[^>]+>/g, '')}</p>
                                                </div>
                                              </div>
                                              <div className="col-wl text-right">
                                                <a className="continueexbtn" href="#">Continue Exam</a>
                                                <a className="restartexBtn" href="#">Restart Exam</a>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    }) : this.state.search_result
                                  }
                                  {/* column end */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane pt-0" id="tab3" role="tabpanel">
                            <div className="tutorial-stlb studym-layout">
                              <div className="study-m-search-bar">
                                <div className="stm-ss-box">
                                  <div className="input-group">
                                    <input type="text" class="form-control" onChange={(e) => [
                                      this.onhandleChange(e)]} name="title_studymaterial" placeholder="Search" />
                                    <div className="input-group-append">
                                      <button className="btn btn-secondary" type="button">
                                        <i onClick={() => {
                                          this.handleSearchStudyMaterial()
                                        }} className="fa fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="stm-select-box">
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                      this.handleChange(e)
                                    }}>
                                      <option selected >Show All:</option>
                                      <option value="101" >Saved</option>
                                      <option value="1">Books</option>
                                      <option value="2">Videos </option>
                                      <option value="3">Solved Papers</option>
                                      <option value="102">Recently Added</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="tutorialTable">
                                <div className="table">
                                  <div className="tt-header">
                                    <div className="stum-left-column d-flex widthseventy">
                                      <div className="widtheighty">
                                        <span>DESCRIPTION</span>
                                      </div>
                                      <div className="widthtwenty text-left">
                                        <span className="type-vl">TYPE</span>
                                      </div>
                                    </div>
                                    <div className="widththirtyfive"></div>
                                  </div>
                                  {/* column start */}
                                  {
                                    this.state.study_materials && this.state.studyMaterialsCount ? this.state.study_materials.map((value, index) => {
                                      return (
                                        <>
                                          <div className="tt-body d-flex">
                                            <div className="widthseventy">
                                              <div className="tt-body-heading">
                                                {
                                                  value.type[0].title === "Video" ? <span className="video-img">
                                                    <img src={videolimg} alt="img" className="videolimg" />
                                                  </span> : ""
                                                }
                                                <div className="widtheighty">
                                                  <h2>{value.material_title}</h2>
                                                </div>
                                                <div className="widthtwenty text-left">
                                                  <span className="BK-vl">{value.type[0].title}</span>
                                                </div>
                                              </div>
                                              <div className="tt-body-pb">
                                                <div className="widthseventy">
                                                  <div className="tutor-np">
                                                    <p>{value.material_description && value.material_description.replace(/<[^>]+>/g, '')}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="widththirty">
                                              <button onClick={() => this.handleFavourite(value.id)
                                              }>Click</button>
                                              <div className="view-btn text-center">
                                                <a onClick={() => {
                                                  this.onViewClick(value.study_material_docs[0].id, value.id)
                                                }} href={`http://3.20.249.205/public${value.study_material_docs[0].material_path}/${value.study_material_docs[0].material_name}`} className="stm-view-btn" target="blank" >{value.study_material_view_count != 0 ? "View Again" : "View"}</a>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    }) : this.state.search_result

                                  }
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
              </Row>
            </Col>

          </Row>
        </Container>
        <div className="study-library-popup">
          <div className="modal fade subscribeConfirm" id="subscribeConfirm">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="courseNameHead">
                    <button type="button" id="close-icon" className="close" data-dismiss="modal"><img src={popupcloseicon} alt="close icon" /></button>
                    <h3 className="text-center insertHeading">Subscribed!</h3>
                  </div>
                  <div className="insertContent">
                    <h3><img src={bellicon} alt="bell-icon" /></h3>
                    <p className="insertP">Would you like to receive email notifications?</p>
                  </div>
                </div>
                <div className="modal-footer modelFooterBtn clear">

                  <div className="yes-btn ft-btn"><button type="button" class="btn btn-primary" onClick={() => { this.handleSubscription("1") }
                  } data-toggle="modal" data-target="#subscribeConfirmation">yes</button>
                    <span>RECEIVE NOTIFICATIONS</span>
                  </div>
                  <div className="no-btn ft-btn"> <button type="button" class="btn btn-secondary" onClick={() => { this.handleSubscription("0") }}>No</button>
                    <span>NO NOTIFICATIONS</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* subscription confirmation model */}
          <div className="modal fade subscribeConfirmation" id="subscribeConfirmation">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="courseNameHead">
                    <button type="button" className="close" data-dismiss="modal"><img src={popupcloseicon} alt="close icon" /></button>
                  </div>
                  <div className="insertContent">
                    <h3><img className="checkicon" src={confirmokicon} alt="ok-icon" /></h3>
                    <p className="confirmationtitle">Confirmation Template</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default academicbeginner;
