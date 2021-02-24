import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  RadioButton,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  Modal,
  ModalBody,
  CardText,
  CardDeck,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Media,
} from "reactstrap";
import Closebtn from "../../assets/img/close-btn.svg";
/*
import Campuses from './../Pages/Campuses/Campuses';

import Facilities from './../Facilities/Facilities';

import Entryrequirement from './../Pages/Entryrequirement/Entryrequirement';

import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import { Addsubsection } from "../Pages/Campuses/index";

import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
*/
import { Prompt } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ProfileBanner from "../../assets/img/viewus_bg.jpg";
import buliding from "../../assets/img/university/img_01.jpg";
import fullimg from "../../assets/img/university/img_02.jpg";
import universityimg from "../../assets/img/university/img_03.png";
import studentimg from "../../assets/img/university/img_04.png";
import studenthub from "../../assets/img/university/img_05.jpg";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import formeelogo from "../../assets/img/brand/formee-logo.svg";
import bargraph from "../../assets/img/university/bar_graph.svg";
import contlogo from "../../assets/img/university/australia_circle_flag.svg";
import favourites from "../../assets/img/university/favourites.svg";
import heart from "../../assets/img/university/heart.svg";
import eyeicon from "../../assets/img/university/view_simple.svg";
import ratingfive from "../../assets/img/university/rating-five.svg";
import rating from "../../assets/img/university/rating.svg";
import ratingthree from "../../assets/img/university/rating-three.svg";
import ratingtwo from "../../assets/img/university/rating-two.svg";
import ratingone from "../../assets/img/university/rating-one.svg";
import backarrow from "../../assets/img/university/back_arrow.svg";
import Phoneicon from "../../assets/img/university/phone-icon.svg";
import Calendaricon from "../../assets/img/university/calendar-icon.svg";
import Mailicon from "../../assets/img/university/mail-high-icon.svg";
import Prefimg1 from "../../assets/img/pref-img-1.svg";
import Prefimg2 from "../../assets/img/pref-img-2.svg";
import Flagimg1 from "../../assets/img/flag-1.svg";
import Flagimg2 from "../../assets/img/flag-2.svg";
import Flagimg3 from "../../assets/img/flag-3.svg";
import Flagimg4 from "../../assets/img/flag-4.svg";
import Chartimg from "../../assets/img/chart-img.svg";
import Certificate from "../../assets/img/certificate.svg";
import $, { param } from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config.json";

var baseurl = `${config.baseurl}`;
class AddViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: [],
      facility: [],
      facilityuniversity: [],
      facilitystudent: [],
      //campusmain: [],
      //campussub: [],
      items: [],
      campus: [],
      aboutsub: [],
      language: [],
      facilitysub: [],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formData: new FormData(),
      upload_photo: [],
      location: "",
      errors: {},
      overall_star: 0,
      totalstudents: 0,
      estimatedcost: 0,
      fileLength: "",
      funding: "",
      logo: "",
      banner: "",
      services_offered: [],
      agentdetails: [],
      agentdetails_first_five: [],
      review: "",
      seemore: false,
      isDirty: false,
      registersuccess: false,
      disable_others: false,
      agent_disabled_others: [],
    };

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleChangeone = this.handleChangeone.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    var agentid = localStorage.getItem("agentid");
    var studentid = localStorage.getItem("studentid");
    var universityid = localStorage.getItem("universityid");
    //alert(id);
    axios
      .get(baseurl + "/getagentshareddetails/" + studentid + "/" + universityid)
      .then((response) => {
        // if (response.data.length > "0") {
        //console.log(response.data.agentdetails.company_name);
        this.setState({
          agentdetails: response.data,
        });
        let arr = [];
        response.data.map((item, index) => {
          if (index < 5) {
            arr.push(item);
          }
        });
        this.setState({ agentdetails_first_five: arr });
        // }
      });
  }
  componentDidMount() {
    // alert(
    //   localStorage.getItem("universityid"),
    //   localStorage.getItem("studentid")
    // );
  }
  closeall() {
    window.location.reload();
  }

  handleLayoutChange(e) {
    this.setState({
      selectedOption: e.target.value,
    });
  }
  handleChangeone(e) {
    this.setState({
      review: e.target.value,
    });
  }

  showseemore = (param) => (e) => {
    this.setState({ seemore: !this.state.seemore });
  };

  ViewProfile = (param) => (e) => {
    localStorage.setItem("agentid", param);
    window.open("/#/preferedpartnerabout");
  };

  AddViewertoPrompt = (param) => (e) => {
    debugger;
    e.preventDefault();
    localStorage.setItem("agentid", param.id);
    localStorage.setItem("agent_name", param.company_name);
    this.setState({
      registersuccess: true,
      disable_others: true,
    });

    this.state.agent_disabled_others.push(param);

    // confirmAlert({
    //   title: " ",
    //   message:
    //     "Are you sure you want to add the " +
    //     param1 +
    //     " as a viewer to your application? " +
    //     localStorage.getItem("course_name"),
    //   buttons: [
    //     {
    //       label: "Confirm",
    //       onClick: () => {
    //         let fd = new FormData();
    //         fd.append("university_id", localStorage.getItem("universityid"));
    //         fd.append("student_id", localStorage.getItem("studentid"));
    //         fd.append("course_id", localStorage.getItem("courseid"));
    //         fd.append("agent_id", localStorage.getItem("agentid"));
    //         fd.append("application_id", localStorage.getItem("applicationid"));
    //         fd.append("course_startdate", localStorage.getItem("start_date"));
    //         let uri = baseurl + "/saveagentviewer";
    //         const post = axios.post(uri, fd).then((response) => {
    //           toast.success("Saved successfully!..");
    //         });
    //         window.location.href = "/#/draftapplication";
    //       },
    //     },
    //     {
    //       label: "Cancel",
    //       onClick: () => (window.location = "/#/AddViewer"),
    //     },
    //   ],
    // });
  };

  AddViewertoTable = () => (e) => {
    e.preventDefault();
    // alert("hi");
    let fd = new FormData();
    fd.append("university_id", localStorage.getItem("universityid"));
    fd.append("student_id", localStorage.getItem("studentid"));
    fd.append("course_id", localStorage.getItem("courseid"));
    fd.append("agent_id", localStorage.getItem("agentid"));
    fd.append("application_id", localStorage.getItem("applicationid"));
    fd.append("course_startdate", localStorage.getItem("start_date"));
    let uri = baseurl + "/saveagentviewer";
    const post = axios.post(uri, fd).then((response) => {
      toast.success("Saved successfully!..");
    });
    window.location.href = "/#/draftapplication";
  };

  toggleSuccess() {
    this.setState({
      registersuccess: !this.state.registersuccess,
    });
  }
  render() {
    console.log(this.state.agentdetails, "arrsy");
    const imgpath = `${config.baseurl}`;
    let overall_star = 0;
    this.state.items.map((item) => {
      overall_star = overall_star + item.no_of_ratings;
    });
    const overall_review = overall_star / this.state.items.length;
    const university_logo = localStorage.getItem("university_logo");
    const university_name = localStorage.getItem("university_name");
    return (
      <div className="animated fadeIn gray-bg-300 foe-viewus">
        <Container>
          <ToastContainer />
          <form>
            <Modal
              isOpen={this.state.registersuccess}
              toggle={this.toggleSuccess}
              className={"modal-md " + "register-popup sucess-pop"}
            >
              <ModalBody>
                <div className="modal_header mb-4">
                  <span>
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={Closebtn}
                      alt="close-icon"
                      onClick={this.closeall}
                      className="uni-icon"
                    />
                  </span>
                </div>
                <div className="p-5 addview-popup text-center">
                  <div className="mb-5 sucess-text">
                    <span>
                      Are you sure you want to add the{" "}
                      {localStorage.getItem("agent_name")} as a viewer to your
                      application?{" "}
                    </span>

                    <p> {localStorage.getItem("course_name")}</p>
                  </div>
                  <div className="row mx-auto addviewer-btn">
                    <a
                      onClick={this.AddViewertoTable()}
                      style={{ background: "#ffffff", fontSize: "10px" }}
                      color="link "
                      className="px-0 register-link-a"
                    >
                      Confirm
                    </a>
                    <a
                      onClick={this.closeall}
                      style={{ background: "#ffffff", fontSize: "10px" }}
                      color="link "
                      className="px-0 register-link-a"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            <div className="container-fluid px-0">
              <div className="top-section">
                <div className="container mb-5">
                  <div className="col-md-8 leave-review uni-right-card addviewer mx-auto">
                    <a
                      className="col-6 backarrow mt-5 mb-5 pl-md-4 pt-3"
                      href="/#/draftapplication"
                    >
                      <span className="pr-1">
                        <img src={backarrow} alt="" />
                      </span>
                      Back
                    </a>
                    <div className="content-block mt-3 partner-info row mx-0 col-md-12">
                      <h3 className="cont-rgt-head col-12 mb-4">Add Viewer</h3>
                      <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-2 my-auto">
                        <img
                          src={
                            university_logo !== "null" &&
                            university_logo !== null
                              ? imgpath + "/" + university_logo
                              : formeelogo
                          }
                          alt=""
                        />
                      </div>
                      {/* <div className="col-5 my-4">{university_name}</div> */}
                      <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-5 mb-2 my-4">
                        {localStorage.getItem("course_name")}
                      </div>
                      <div className="pl-0 mb-1 col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-2 input-group">
                        <label className="card-label">ACADEMIC YEAR OPEN</label>
                        <span className="app-re-btn mr-0">
                          {localStorage.getItem("start_date")}
                        </span>
                      </div>
                      <div className="pl-0 mb-1 col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-2 input-group">
                        <label className="card-label">EXPIRE DATE</label>
                        <span className="">
                          {localStorage.getItem("expire_date")}
                        </span>
                      </div>
                    </div>
                    <hr className="review-subactor" />
                    <div className="col-md-12">
                      <div className="col-12 mb-4 font-weight-500">
                        Select a Viewer from the below list of Preferred
                        Partners
                      </div>

                      {this.state.disable_others === true
                        ? this.state.agent_disabled_others.map((item) => {
                            return (
                              <div className="content-block mt-4 pt-2 addvier-info row mx-0 col-md-12">
                                <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3  pl-0">
                                  <img
                                    src={
                                      item.logo_image !== null &&
                                      item.logo_image !== ""
                                        ? imgpath + "/Agent/" + item.logo_image
                                        : formeelogo
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="col-5 my-autoa">
                                  {item.company_name}
                                </div>
                                <div className="pl-0 mb-1 col-4 d-flex my-auto">
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-primary mr-3 blue-btn-aadd-view"
                                    onClick={this.AddViewertoPrompt(item)}
                                  >
                                    Add Viewer
                                  </button>
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-outline-primary blue-outline"
                                    onClick={this.ViewProfile(item.id)}
                                  >
                                    View Profile
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        : this.state.seemore === false
                        ? this.state.agentdetails_first_five.map((item) => {
                            return (
                              <div className="content-block mt-4 pt-2 addvier-info row mx-0 col-md-12">
                                <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                                  <img
                                    src={
                                      item.logo_image !== null &&
                                      item.logo_image !== ""
                                        ? imgpath + "/Agent/" + item.logo_image
                                        : formeelogo
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-5 text-center text-sm-left my-auto">
                                  {item.company_name}
                                </div>
                                <div className="pl-0 mb-1 col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center my-auto">
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-primary my-4 my-sm-4 my-md-4 my-lg-0 my-xl-0 mr-3 blue-btn-aadd-view"
                                    onClick={this.AddViewertoPrompt(item)}
                                  >
                                    Add Viewer
                                  </button>
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-outline-primary my-4 my-sm-4 my-md-4 my-lg-0 my-xl-0 blue-outline"
                                    onClick={this.ViewProfile(item.id)}
                                  >
                                    View Profile
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        : this.state.agentdetails.map((item) => {
                            return (
                              <div className="content-block mt-4 pt-2 addvier-info row mx-0 col-md-12">
                                <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                                  <img
                                    src={
                                      item.logo_image !== null &&
                                      item.logo_image !== ""
                                        ? imgpath + "/Agent/" + item.logo_image
                                        : formeelogo
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-5 text-center text-sm-left my-auto">
                                  {item.company_name}
                                </div>
                                <div className="pl-0 mb-1 col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center my-auto">
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-primary my-4 my-sm-4 my-md-4 my-lg-0 my-xl-0 mr-3  blue-btn-aadd-view"
                                    onClick={this.AddViewertoPrompt(item)}
                                  >
                                    Add Viewer
                                  </button>
                                  <button
                                    type="submit"
                                    class="px-2 save-btn font-12 btn btn-outline-primary my-4 my-sm-4 my-md-4 my-lg-0 my-xl-0 blue-outline"
                                    onClick={this.ViewProfile(item.id)}
                                  >
                                    View Profile
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      <div className="content-block mt-4 mb-4 addvier-info row mx-0 col-md-12">
                        {this.state.seemore === false ? (
                          <a
                            className="font-12"
                            href="/#/AddViewer"
                            onClick={this.showseemore(true)}
                          >
                            <u>See More</u>
                          </a>
                        ) : (
                          <a
                            className="font-12"
                            href="/#/AddViewer"
                            onClick={this.showseemore(true)}
                          >
                            <u>See Less</u>
                          </a>
                        )}
                      </div>
                    </div>

                    <hr className="review-subactor" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

export default AddViewer;
