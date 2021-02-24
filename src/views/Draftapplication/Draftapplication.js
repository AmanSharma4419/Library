import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Link, Redirect } from "react-router-dom";
import config from "../../config.json";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import deleteicon from "../../assets/img/university/delete.svg";
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

function dateFormat(dateString) {
  if (dateString == "" || dateString == null) {
    return "";
  }

  let date = moment(dateString, [
    "DD-MM-YYYY",
    "MM-DD-YYYY",
    "YYYY-MM-DD",
    "YYYY-DD-MM",
  ]);
  return date.format("DD/MM/YYYY");
}

class Draftapplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      draftapplication: [],
    };
  }

  apply = (
    id,
    param,
    course_name,
    application_start_date,
    application_end_date
  ) => (e) => {
    //alert(param);
    localStorage.setItem("apptype", "Draft");
    localStorage.setItem("MsgReceived", "false");
    localStorage.setItem("course_name", course_name);
    localStorage.setItem("courseid", param);
    localStorage.setItem("applicationid", id);
    localStorage.setItem("app_id", id);
    localStorage.setItem("start_date", application_start_date);
    localStorage.setItem("expire_date", application_end_date);

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
    axios
      .get(baseurl + "/draftapplication/" + localStorage.getItem("studentid"))
      .then((response) => {
        this.setState({
          draftapplication: response.data,
        });
      });
  }

  diffDays = (startDate) => {
    let date = startDate.split("/");
    let temp = date[0];
    date[0] = date[1];
    date[1] = temp;
    date = date.join("/");
    const date1 = new Date();
    const date2 = new Date(date);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  applyButtonChange = (draftapplication) => {
    localStorage.setItem("fromApplicationType", "Draft");
    if (draftapplication.activerules == "countryactive") {
      const today = new Date();
      let date = draftapplication.application_start_date.split("/");
      let temp = date[0];
      date[0] = date[1];
      date[1] = temp;
      date = date.join("/");
      const start = new Date(date);
      let date1 = draftapplication.application_end_date.split("/");
      let temp1 = date1[0];
      date1[0] = date1[1];
      date1[1] =  parseInt(temp1) +1;
      date1 = date1.join("/");
      const end = new Date(date1);
      console.log("today", today, start, end);
      if (today < start) {
        return <p>Application date not yet started</p>;
      } else if (today >= start && today <= end) {
        return (
          <Button
            color="primary"
            className="add-staff-bn"
            onClick={this.apply(
              draftapplication.id,
              draftapplication.course_id,
              draftapplication.heading,
              draftapplication.application_start_date,
              draftapplication.application_end_date
            )}
          >
            Continue to apply
          </Button>
        );
       } else if (today > end) {
        return <p>Expired</p>;
      }
    } else {
      return <p>Application Closed</p>;
    }
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
                        <ListGroupItem className="active draft-padding-align">
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
                        <ListGroupItem className="draft-padding-align">
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
                        <h3>Draft Applications</h3>
                      </div>

                      <div className="col-6 d-flex justify-content-end">
                        <select
                          class="form-control w-155px checksame mr-3 mr-sm-0"
                          value=""
                          id=""
                          name=""
                          required=""
                        >
                          <option value="">Recently</option>
                        </select>
                      </div>
                    </Row>
                    <Row>
                      <div class="col-12 mt-3">
                        <ViewApplication />
                      </div>
                    </Row>
                    <div className="card-body table-responsive px-0 ">
                      <table className="draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
                        <tr>
                          <th>School</th>
                          <th className="program-width">Program</th>
                          <th>Course Start Date</th>
                          <th>Start Date</th>
                          <th>Expire Date</th>
                          <th>Fee</th>
                          <th>Status</th>
                          <th></th>
                          {/*<th></th>*/}
                        </tr>

                        {this.state.draftapplication.map(
                          (draftapplication, index) => (
                            <tr>
                              <td>
                                <img
                                  src={imgpath + draftapplication.logo_image}
                                  width="50"
                                  height=""
                                  alt=""
                                />
                              </td>
                              <td>{draftapplication.heading}</td>
                              {/*<td>
							<label className="card-label title-label">Academy Likely OPen</label>
							<select class="form-control supervisor_id checksame" value="" id="" name="" required="">
							<option value="">Please select</option>
							</select>
							</td>  */}
                              <td>
                                {dateFormat(draftapplication.cursestartdate)}
                              </td>
                              <td>{dateFormat(draftapplication.start_date)}</td>
                              <td>
                                {draftapplication.expiry_date}
                                <br />
                                {this.diffDays(
                                  draftapplication.application_start_date
                                ) > 0 ? (
                                  draftapplication.daysleft != "no" ? (
                                    <span className="days-left">
                                      {this.diffDays(
                                        draftapplication.application_start_date
                                      )}
                                      days left
                                    </span>
                                  ) : (
                                    <></>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                Application Fee
                                <br />
                                <b>
                                  {draftapplication.currency_code}{" "}
                                  {draftapplication.application_fee}
                                </b>
                                <br />
                              </td>
                              <td>Draft</td>
                              <td>
                                {this.applyButtonChange(draftapplication)}
                                {/* {draftapplication.showform == "yes" &&
                                draftapplication.activerules ==
                                  "countryactive" ? (
                                  <Button
                                    color="primary"
                                    className="add-staff-bn"
                                    onClick={this.apply(
                                      draftapplication.id,
                                      draftapplication.course_id,
                                      draftapplication.heading,
                                      draftapplication.application_start_date,
                                      draftapplication.application_end_date
                                    )}
                                  >
                                    Continue to apply
                                  </Button>
                                ) : 
                                // draftapplication.showform == "yes" &&
                                  draftapplication.activerules !=
                                    "countryactive" ? (
                                  <p>Closed application</p>
                                ) : 
                                // draftapplication.showform == "no" &&
                                  draftapplication.activerules !=
                                    "countryactive" ? (
                                  <p>Closed application</p>
                                ) : (
                                  <p>Application date not yet started</p>
                                )} */}
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

export default Draftapplication;
