import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Link, Redirect } from "react-router-dom";
import config from "../../config.json";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import deleteicon from "../../assets/img/university/delete.svg";
import staryellow from "../../assets/img/star-yellow.svg";
import graystar from "../../assets/img/star.png";
import yellowstar from "../../assets/img/imagesstar.png";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  ModalFooter,
  InputGroupAddon,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
import Pricon from "../../assets/img/student/personal-icon.svg";
import Flagicon from "../../assets/img/student/flag-my-icon.svg";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewApplication from "../Viewapplications/Viewapplications";
import moment from "moment";
var baseurl = `${config.baseurl}`;

class AgentContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      draftapplication: [],
      mailArrangementSelected: "",
      mailArrangementOptions: ["Recently", "10 days before"],
    };
  }

  apply = (id, param, course_name, start_date, expire_date) => (e) => {
    //alert(param);
    localStorage.setItem("apptype", "Draft");
    localStorage.setItem("MsgReceived", "false");
    localStorage.setItem("course_name", course_name);
    localStorage.setItem("courseid", param);
    localStorage.setItem("applicationid", id);
    localStorage.setItem("app_id", id);
    localStorage.setItem("start_date", start_date);
    localStorage.setItem("expire_date", expire_date);

    axios
      .get(
        baseurl +
          "getcourseuniversitydetails/" +
          param +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        localStorage.setItem("universityid", response.data[0].universityid);
        /*this.setState({
					logo_image : response.data[0].logo_image, 
                   heading: response.data[0].heading,
				   start_date : response.data[0].start_date,
				*/
      });

    localStorage.setItem("selectcoursedraft", param);
    localStorage.setItem("fromApplicationType", "Draft");
    window.location = "/#/applications";
  };
  componentDidMount() {
    this.getData();
  }

  handleChangeMailArrangement = (e) => {
    const value = e.target.value;
    let inboxMails = [];
    const currentDate = new Date();

    if (value === "recently") {
      inboxMails = this.state.draftapplication;
    } else if (value === "10 days before") {
      // Normal Sorting by time - 1 Week before
      const weekBeforeDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - 10)
      );
      console.log("weekBeforeDate", weekBeforeDate);
      inboxMails = this.state.draftapplication.filter((mail) => {
        console.log("mailll", mail);
        const mailDate = new Date(mail.created_date);
        if (mailDate >= weekBeforeDate) console.log(mailDate, weekBeforeDate);
        return mailDate >= weekBeforeDate;
      });
    }

    // Set the changed value
    this.setState({
      mailArrangementSelected: value,
      draftapplication: inboxMails,
    });
    console.log("thiiss application", this.state.draftapplication);
  };
  getData = () => {
    axios
      .get(
        baseurl +
          "/get_accesscontract_detail/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log("inside");
        var newarr = [];
        var newarr1 = [];
        console.log(response.data, "contracts");
        debugger;
        if (
          response.data.agent_guide.length !== 0 &&
          response.data.agent_shared_hired !== 0
        ) {
          newarr = [...response.data.agent_shared_hired];
          newarr1 = [...response.data.agent_guide];
          var filteredArray = newarr.filter(function (item, pos) {
            return newarr.indexOf(item) == pos;
          });
          var filteredArray1 = newarr1.filter(function (item, pos) {
            return newarr1.indexOf(item) == pos;
          });

          filteredArray1.map((item, idx) => {
            filteredArray.map((jtem, index) => {
              if (item.agent_id === jtem.agent_id) {
                filteredArray.splice(index, 1);
              }
            });
          });

          var arr = filteredArray.concat(filteredArray1);

          this.setState({
            draftapplication: arr,
          });
        } else if (response.data.agent_shared_hired.length === 0) {
          var filteredArray = response.data.agent_guide.filter(function (
            item,
            pos
          ) {
            return newarr.indexOf(item) == pos;
          });

          this.setState({
            draftapplication: filteredArray,
          });
        } else if (response.data.agent_guide.length === 0) {
          var filteredArray = response.data.agent_shared_hired.filter(function (
            item,
            pos
          ) {
            return newarr.indexOf(item) == pos;
          });

          this.setState({
            draftapplication: filteredArray,
          });
        }
        console.log("thiiss 2323", this.state.draftapplication);
      });
  };

  LeaveReview = (param) => (e) => {
    localStorage.setItem("agentid", param);
    window.location.href = "/#/LeaveReview";
  };

  openProfile = (param) => (e) => {
    localStorage.setItem("agentid", param);
    window.location.href = "/#/preferedpartnerabout";
  };

  callPostMethod = (data) => {
    axios
      .post(baseurl + "/access_contract_pp_action", data)
      .then((response) => {
        toast.success("Updated Successfully");
        this.getData();
      });
  };

  TerminateContract = (param) => (e) => {
    const pdata = {
      type: param.type,
      application_id: param.application_id,
      agent_id: param.agent_id,
      student_id: param.student_id,
      is_starred: param.is_starred,
      is_terminate: 1,
    };
    this.callPostMethod(pdata);
    if (param.type === "guide") {
      axios
        .get(
          baseurl +
            "/removeviewer/" +
            param.application_id +
            "/" +
            param.student_id
        )
        .then((response) => {});
    }
  };

  Starred = (param) => (e) => {
    const pdata = {
      type: param.type,
      application_id: param.application_id,
      agent_id: param.agent_id,
      student_id: param.student_id,
      is_starred: 1,
      is_terminate: param.is_terminate,
    };
    this.callPostMethod(pdata);
  };

  UnStarred = (param) => (e) => {
    const pdata = {
      type: param.type,
      application_id: param.application_id,
      agent_id: param.agent_id,
      student_id: param.student_id,
      is_starred: 0,
      is_terminate: param.is_terminate,
    };
    this.callPostMethod(pdata);
  };

  render() {
    const imgpath = `${config.baseurl}`;
    return (
      <div className="foe-studen-container pt-5 send-app-2 resp-blue-list s-application-list send-app-page pb-5">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="2" xl="2" md="2" lg="2" className="pr-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0 mt-3">
                    <ListGroup className="left-list float-right">
                      <a href="/#/draftapplication">
                        <ListGroupItem className="draft-padding-align">
                          Draft Applications
                        </ListGroupItem>
                      </a>
                      <a href="/#/sendapplication">
                        <ListGroupItem className="draft-padding-align">
                          Sent Applications
                        </ListGroupItem>
                      </a>
                      <a href="/#/Acceptedapplication">
                        <ListGroupItem className="draft-padding-align">
                          Accepted Applications
                        </ListGroupItem>
                      </a>
                      <a href="/#/agentcontracts">
                        <ListGroupItem className="active draft-padding-align">
                          Agent Contracts
                        </ListGroupItem>
                      </a>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="10" xl="10" md="10" lg="10" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <Row>
                      <div className="col-6 start-fix px-3">
                        <h3>Agent Contracts</h3>
                      </div>

                      <div className="col-6 d-flex justify-content-end">
                        <select
                          className="form-control width-150 checksame"
                          value={this.state.mailArrangementSelected}
                          id=""
                          name=""
                          required=""
                          onChange={this.handleChangeMailArrangement}
                        >
                          {this.state.mailArrangementOptions.map((mOpt) => (
                            <option
                              key={mOpt.toLowerCase()}
                              value={mOpt.toLowerCase()}
                            >
                              {mOpt}
                            </option>
                          ))}
                        </select>
                        {/* <select
                          class="form-control w-155px checksame mr-3 mr-sm-0 mr-md-0 mr-lg-0 mr-xl-0"
                          value=""
                          id=""
                          name=""
                          required=""
                        >
                          <option value="">Recently</option>
                        </select> */}
                      </div>
                    </Row>

                    <div className="card-body agent-studtable table-responsive px-0 ">
                      <table className="draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
                        <tr>
                          <th></th>
                          <th className="program-width">Date</th>
                          <th>Agent Name</th>
                          <th>Institute</th>
                          <th>Program</th>
                          <th>Application No.</th>
                          <th>Application Deadline</th>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                        </tr>

                        {this.state.draftapplication.map(
                          (draftapplication, index) => (
                            <tr>
                              <td className="pl-2 text-center">
                                {draftapplication.is_starred === 0 ? (
                                  <img
                                    src={graystar}
                                    width="18px"
                                    alt=""
                                    className=""
                                    onClick={this.Starred(draftapplication)}
                                  />
                                ) : (
                                  <img
                                    src={yellowstar}
                                    width="30px"
                                    alt=""
                                    className=""
                                    onClick={this.UnStarred(draftapplication)}
                                  />
                                )}
                              </td>
                              <td>
                                {moment(draftapplication.created_date).format(
                                  "YYYY-MM-DD"
                                )}
                              </td>
                              <td
                                onClick={this.openProfile(
                                  draftapplication.agent_id
                                )}
                              >
                                <Link>{draftapplication.agent_name}</Link>
                              </td>

                              <td>{draftapplication.university_name}</td>
                              <td>{draftapplication.course_name}</td>
                              <td>{draftapplication.application_id}</td>
                              <td>
                                {draftapplication.course_expiry_date}
                                <br />
                                {draftapplication.day_left !== "no" &&
                                draftapplication.day_left !== 0 ? (
                                  <span className="days-left">
                                    {draftapplication.day_left}days left
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </td>

                              <td>
                                {draftapplication.appl_status == 2 ? (
                                  <p className="appinprocess">In process </p>
                                ) : draftapplication.appl_status == 3 ? (
                                  <p className="appapproved">Approved</p>
                                ) : draftapplication.appl_status == 4 ? (
                                  <p className="apprejected">Rejected</p>
                                ) : draftapplication.appl_status == 6 ? (
                                  <p className="apppayment">Payment pending</p>
                                ) : draftapplication.appl_status == 9 ? (
                                  <p className="appdeclined">Declined</p>
                                ) : draftapplication.appl_status == 7 ? (
                                  <p className="apppaid">Paid</p>
                                ) : draftapplication.appl_status == 1 ? (
                                  <p>Draft</p>
                                ) : (
                                  <></>
                                )}
                              </td>
                              <td>
                                <button
                                  type="submit"
                                  class="stud-bluebtn btn btn-primary"
                                  onClick={this.LeaveReview(
                                    draftapplication.agent_id
                                  )}
                                >
                                  Leave Review
                                </button>
                              </td>
                              <td>
                                {draftapplication.is_terminate === 0 &&
                                (draftapplication.appl_status === 1 ||
                                  draftapplication.type === "shared") ? (
                                  <button
                                    type="submit"
                                    class="stud-dangerbtn btn btn-danger"
                                    onClick={this.TerminateContract(
                                      draftapplication
                                    )}
                                  >
                                    Terminate Contract
                                  </button>
                                ) : draftapplication.is_terminate === 1 &&
                                  (draftapplication.appl_status === 1 ||
                                    draftapplication.type === "shared") ? (
                                  "Terminated"
                                ) : null}
                              </td>

                              {/*<td>
							<a href="#"><img src={deleteicon} alt="" className="del-icon"/></a>
							</td>  */}
                            </tr>
                          )
                        )}
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AgentContract;
