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
import formeelogo from "../../assets/img/brand/university-logo.svg";
import bargraph from "../../assets/img/university/bar_graph.svg";
import contlogo from "../../assets/img/university/australia_circle_flag.svg";
import favourites from "../../assets/img/university/favourites.svg";
import heart from "../../assets/img/university/heart.svg";
import eyeicon from "../../assets/img/university/view_simple.svg";

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
import locateicon from "../../assets/img/university/locate-icon.svg";

var baseurl = `${config.baseurl}`;
class ViewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: [],
      facility: [],
      facilityuniversity: [],
      facilitystudent: [],
      reschedule_status: 0,
      //campusmain: [],
      //campussub: [],
      locationname: this.props.location ? this.props.location.pathname : "",
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
      title: "",
      description: "",
      meeting_date: "",
      meting_time: "",
      composed_mail_id: localStorage.getItem("composed_mail_id_for_meeting"),
      errors: {},
      reasons: [
        {
          value: "I am not feeling well.",
          label: "I am not feeling well.",
          checked: false,
        },
        {
          value: "I am behind schedule due to personal reasons.",
          label: "I am behind schedule due to personal reasons.",
          checked: false,
        },
        {
          value: "There was an error while scheduling.",
          label: "There was an error while scheduling.",
          checked: false,
        },
        {
          value: "I need more time to prepare all the necessary information.",
          label: "I need more time to prepare all the necessary information.",
          checked: false,
        },
      ],
      company_name: "",
      address: "",
      meeting_id: localStorage.getItem("meeting_id"),
    };

    this.handleMeetingDate = this.handleMeetingDate.bind(this);
    this.handleMeetingTime = this.handleMeetingTime.bind(this);
    //this.onMeetingMailSend = this.onMeetingMailSend.bind(this);

    // var universityid = localStorage.getItem("universityid");
    // var meeting_id = localStorage.getItem("meeting_id");
    // //alert(id);
    // axios.get(baseurl + "/getuniversityabout/" + universityid).then((response) => {
    //   // debugger;
    //   console.log("res", response.data[0]);
    //   console.log(response.data[0].id, "profile left");

    //   this.setState({
    //     phone: response.data[0].contact_phone,
    //     country_name: response.data[0].country_id,
    //     company_email: response.data[0].company_email,
    //     company_name: response.data[0].company_name,
    //     company_logo: response.data[0].company_logo,
    //     address: response.data[0].location,
    //     title: response.data[0].company_name,
    //   });
    // });
  }
  
  componentDidMount() {
    // console.log("id", this.props.location)
    var meeting_id = localStorage.getItem("meeting_id");
    if(localStorage.getItem('mailview') == 'mail'){
     
      axios.get(baseurl + "/view_meeting_details/" + meeting_id +'/'+ localStorage.getItem('viewmeetingid'))
      .then((response) => {
        // console.log("response", response)
        if (response.data.sender_details) {
         
          this.setState({
            company_name: response.data.sender_details[0].institute_name?response.data.sender_details[0].institute_name:response.data.sender_details[0].company_name,
            address: response.data.sender_details[0].location?response.data.sender_details[0].location:response.data.sender_details[0].street_address === null
            ? ""
            : response.data.sender_details[0].street_address +
                " , " +
                response.data.sender_details[0].city ===
              null
            ? ""
            : response.data.sender_details[0].city + " , " + response.data.sender_details[0].state === null
            ? ""
            : response.data.sender_details[0].state +
                " , " +
                response.data.sender_details[0].contact_postalcode ===
              null
            ? ""
            : response.data.sender_details[0].contact_postalcode,
          });
        }
        this.setState({
          description: response.data.meeting_details.description,
          reschedule_status: response.data.reschedule_status,
          meeting_date: response.data.meeting_details.meeting_date,
          meeting_time: response.data.meeting_details.meeting_time,
          mail_from: response.data.meeting_details.mail_from,
          meeting_status: response.data.meeting_details_view.length !== 0 ? response.data.meetingstatus[localStorage.getItem("studentemail")] : null,
          meeting_cancelled_reason: response.data.meeting_details_view.length !== 0 ? response.data.meetingstatus[localStorage.getItem("studentemail")+'_reason'] : null
        });
      });
    } else {      
    axios
      .get(baseurl + "/getmeeting_details_api/" + meeting_id)
      .then((response) => {
        // console.log("response", response)
        if (response.data.sender_details) {
          this.setState({
            company_name: response.data.sender_details[0].institute_name?response.data.sender_details[0].institute_name:response.data.sender_details[0].company_name,
            address: response.data.sender_details[0].location?response.data.sender_details[0].location:response.data.sender_details[0].street_address === null
            ? ""
            : response.data.sender_details[0].street_address +
                " , " +
                response.data.sender_details[0].city ===
              null
            ? ""
            : response.data.sender_details[0].city + " , " + response.data.sender_details[0].state === null
            ? ""
            : response.data.sender_details[0].state +
                " , " +
                response.data.sender_details[0].contact_postalcode ===
              null
            ? ""
            : response.data.sender_details[0].contact_postalcode,
          });
        }
        this.setState({
          description: response.data.meeting_details.description,
          meeting_date: response.data.meeting_details.meeting_date,
          meeting_time: response.data.meeting_details.meeting_time,
          mail_from: response.data.meeting_details.mail_from,
          meeting_status: response.data.meeting_details_view.length !== 0 ? response.data.meetingstatus[localStorage.getItem("studentemail")] : null,
          meeting_cancelled_reason: response.data.meeting_details_view.length !== 0 ? response.data.meetingstatus[localStorage.getItem("studentemail")+'_reason'] : null
        });
      });
    }
   // alert(this.state.meeting_status);
}

  handleMeetingDate = (event) => {
    console.log(event.target.value, "meeting date");
    this.setState({ meeting_date: event.target.value });
  };
  handleMeetingTime = (event) => {
    console.log(event.target.value, "meeting time");
    this.setState({ meting_time: event.target.value });
  };
  onDeleteRequest = (e) => {
    e.preventDefault();
    window.location.href = "/#/inbox";
  };

  validate1 = () => {
    const errors = {};
    let chk = true;
    this.state.reasons.map((item) => {
      if (item.checked === true) {
        chk = false;
        this.setState({ reason: item.label });
      }
    });
    if (chk === true) {
      errors.reason = "Reason is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // validate = () => {
  //   const errors = {};
  //   if (
  //     this.state.description.trim() === "" ||
  //     this.state.description === null
  //   ) {
  //     errors.description = "Description is required";
  //   }
  //   if (this.state.meeting_date === "" || this.state.meeting_date === null) {
  //     errors.meeting_date = "Date is required";
  //   }
  //   if (this.state.meting_time === "" || this.state.meting_time === null) {
  //     errors.meting_time = "Time is required";
  //   }
  //   return Object.keys(errors).length === 0 ? null : errors;
  // };
  // onMeetingMailSend = (e) => {
  //   e.preventDefault();
  //   const errors = this.validate();

  //   this.setState({ errors });
  //   if (errors) return;

  //   let fd = new FormData();
  //   fd.append("type", "University");
  //   fd.append("type_id", localStorage.getItem("universityid"));
  //   fd.append("type_id", localStorage.getItem("meeting_id"));
  //   fd.append("composedmail_id", this.state.composed_mail_id);
  //   fd.append("title", this.state.title);
  //   fd.append("description", this.state.description);
  //   fd.append("meeting_date", this.state.meeting_date);
  //   fd.append("meeting_time", this.state.meting_time);

  //   axios.post(baseurl + "/store_meeting", fd).then((response) => {
  //     toast.success(response.data.message);
  //   });
  //   this.setState({ errors: {} });
  //   window.location.href = "/#/inbox";
  // };
  onCancelMailSend = (e) => {
    e.preventDefault();
    const errors = this.validate1();

    this.setState({ errors });
    if (errors) return;

    let fd = new FormData();

    var reason;

    this.state.reasons.map((item) => {
      if (item.checked === true) {
        reason = item.label;
      }
    });
    
    fd.append("type", "Student");
    fd.append("type_id", localStorage.getItem("studentid"));
    fd.append("status", 1);
    fd.append("user_id", localStorage.getItem("studentemail"));
    fd.append("reason", reason);
    fd.append("meeting_id", localStorage.getItem("meeting_id"));

    axios.post(baseurl + "/accept_reject_meeting", fd).then((response) => {
      toast.success(response.data.message);
    });
    this.setState({ errors: {} });
    window.location.href = "/#/inboxmail";
  };
  openCancelPopup = (e) => {
    e.preventDefault();
    this.setState({ registersuccess: true });
  };
  onMeetingMailAcceptSend = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("type", "Student");
    fd.append("type_id", localStorage.getItem("studentid"));
    fd.append("status", 0);
    fd.append("user_id", localStorage.getItem("studentemail"));
    fd.append("reason", "Accepted");
    fd.append("meeting_id", localStorage.getItem("meeting_id"));

    axios.post(baseurl + "/accept_reject_meeting", fd).then((response) => {
      toast.success(response.data.message);
    });
   
    window.location.href = "/#/inboxmail";
  };
  toggleSuccess() {
    this.setState({
      registersuccess: !this.state.registersuccess,
    });
  }
  closeall() {
    window.location.reload();
  }
  handleReason = (item, index) => (e) => {
    let arr = [...this.state.reasons];
    arr.map((ite, ind) => {
      if (ind === index) {
        ite.checked = true;
      } else {
        ite.checked = false;
      }
    });
    this.setState({ reasons: arr });
  };
  // openRescheduleMeeting = () => {
  //   window.location.href = "/#/reschedulemeeting";
  // };
  render() 
  
  {
   
    console.log(this.state.description)
    const { errors } = this.state;
    var today = new Date().toISOString().split("T")[0];
    var nextWeekDate = new Date(
      new Date().getTime() + 1000 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    return (
      <div className="animated fadeIn gray-bg-300 foe-viewus">
        <Container>
          <ToastContainer />
          <form>
            <Modal
              isOpen={this.state.registersuccess}
              toggle={this.toggleSuccess}
              className={"modal-lg " + "register-popup sucess-pop max-600px"}
            >
              <ModalBody>
                <div className="modal_header my-4">
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
                <div className="px-5 py-3meeting-popup text-left">
                  <div className="mb-5 sucess-text">
                    <div className="mb-4 font-16px">Cancel Meeting</div>

                    <p>
                      {" "}
                      <div className="col-12 font-12 resechedule-radio pl-0">
                        <h6 className="font-12">
                          {" "}
                          <b>Select a reason to cancel the meeting</b>:
                        </h6>
                        {this.state.reasons.map((item, index) => {
                          return (
                            <div class="col-12 px-0 mt-3">
                              <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  value={item.value}
                                  checked={item.checked}
                                  onChange={this.handleReason(item, index)}
                                />
                                <label class="custom-control-label">
                                  {item.label}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <h6 style={{ color: "red" }}>{errors.reason}</h6>
                    </p>
                  </div>
                  <div className="row mx-auto cncl-btn-snd addviewer-btn float-right ">
                    <a
                      style={{ fontSize: "10px" }}
                      color="link "
                      className="px-0 register-link-a btn-blue-clr"
                      onClick={this.onCancelMailSend}
                    >
                      Send
                    </a>
                  </div>
                </div>
              </ModalBody>
            </Modal>
            <div className="container-fluid px-0">
              <div className="schedule-section">
                <div className="container mb-5">
                  <div className="col-md-8 leave-review uni-right-card addviewer mx-auto">
                   
                    {this.state.locationname == "/viewMeeting" ? <a
                      className="col-6 backarrow mt-5 mb-5 pl-md-4 pt-3"
                      href="/#/inboxmail"
                    >
                      <span className="pr-1">
                        <img src={backarrow} alt="" />
                      </span>
                      Back
                    </a> :  <a
                      className="col-6 backarrow mt-5 mb-5 pl-md-4 pt-3"
                      onClick={()=>{window.location.reload()}}
                    >
                      <span className="pr-1">
                        <img src={backarrow} alt="" />
                      </span>
                      Back
                    </a> }
                    <div className="content-block mt-3 partner-info row mx-0 col-md-12">
                      <h3 className="cont-rgt-head col-12 mb-2">
                        Your Meeting Details
                      </h3>
                      <div className="meeting-des col-6">
                        {this.state.company_name}
                      </div>
                      <div className="meeting-loc col-12">
                        <img src={locateicon} className="ag-icon" width="15" />
                        {this.state.address}
                      </div>
                    </div>
                    <hr className="review-subactor" />
                    <div className="col-md-12">
                      <div className="text-right">
                      
<div>{ this.state.reschedule_status == 0 ?this.state.meeting_status!=="Accepted" && this.state.meeting_status!=="Rejected"?(<div><Button
  className="font-12 mr-2 btn-primary btn-blue-clr"
  onClick={this.onMeetingMailAcceptSend}
>
  Accept Meeting
</Button><Button
                          className="btn-danger font-12"
                          onClick={this.openCancelPopup}
                        >
                          Cancel Meeting
                        </Button></div> ):this.state.meeting_status==="Accepted"?(<Button
                          className="btn-danger font-12"
                          onClick={this.openCancelPopup}
                        >
                          Cancel Meeting
                        </Button>):(<p>Cancellation Reason: {this.state.meeting_cancelled_reason}</p>):"This Meeting has been Rescheduled."}</div>
                       

                       
                      </div>
                      <div className="content-block mt-4 pt-2 addvier-info row mx-0 col-md-12">
                        <h6 className="font-12">
                          {" "}
                          <b>What u need</b>:
                        </h6>
                        <div className="col-12 pl-0">
                        {/* {this.state.description} */}
                          <textarea
                            class="form-control"
                            // id="validationTextarea"
                            rows="5"
                            // onChange={(e) =>
                            //   this.setState({ description: e.target.value })
                            // }
                            value = {this.state.description}
                            disabled
                            style={{
                              backgroundColor: "#e4e7ea",
                              resize: "none",
                            }}
                           
                          >
                          </textarea>
                          <h6 style={{ color: "red" }}>{errors.description}</h6>
                        </div>
                        <div className="col-12 row mt-3">
                          <h6 className="font-12">
                            {" "}
                            <b>Time for meeting</b>:
                          </h6>
                        </div>
                        <div className="col-12 row my-3">
                          <div className="pl-0 mb-1 col-6 input-group">
                            <label className="card-label">date</label>
                            <input
                              placeholder=""
                              type="text"
                              class="form-control date-picker-grey"
                              value={this.state.meeting_date}
                              disabled
                              style={{
                                backgroundColor: "#e4e7ea",
                              }}
                            />
                          </div>

                          <div className="pl-0 mb-1 col-6 input-group">
                            <label className="card-label">Time</label>
                            <input
                              placeholder=""
                              type="text"
                              class="form-control"
                              value={this.state.meeting_time}
                              disabled
                              style={{
                                backgroundColor: "#e4e7ea",
                              }}
                            />
                          </div>
                          <div className="pl-0 mb-1 col-6 input-group">
                            <h6 style={{ color: "red" }}>
                              {errors.meeting_date}
                            </h6>
                          </div>
                          <div className="pl-0 mb-1 col-6 input-group">
                            <h6 style={{ color: "red" }}>
                              {errors.meeting_time}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ViewMeeting;

