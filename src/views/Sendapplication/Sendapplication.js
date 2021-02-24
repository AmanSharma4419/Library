import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Link, Redirect } from "react-router-dom";
import config from "../../config.json";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import deleteicon from "../../assets/img/university/delete.svg";
import moment from "moment";
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
var baseurl = `${config.baseurl}`;

function dateFormat(dateString) {
  if (dateString == "" || dateString == null){
    return "";
  }

  let date = moment(dateString, ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "YYYY-DD-MM"]);
  return date.format("DD/MM/YYYY");
}

class Draftapplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      sentapplicationlist: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        baseurl + "/sentapplicationlist/" + localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log("sent application", response);
        this.setState({
          sentapplicationlist: response.data,
        });
      });

    setTimeout(() => {
      // Highlighting boxess
      console.log("highlight", $('.highlight-tab'));
      let stopHighlighting = true;
      var $highlight_elements = $('.highlight-tab');
      var $window = $(window);

      function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($highlight_elements, function () {
          var $element = $(this);
          var element_height = $element.outerHeight();
          var element_top_position = $element.offset().top;
          var element_bottom_position = (element_top_position + element_height);

          //check to see if this current container is within viewport
          if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position) &&
            (stopHighlighting === true)) {
            $element.addClass('bg-info');
          } else {
            $element.removeClass('bg-info');
          }
        });
      }

      $window.on('scroll resize', check_if_in_view);
      $window.trigger('scroll');

      setTimeout(() => {
        stopHighlighting = false;
        $('.highlight-tab').removeClass('bg-info');
      },6000);

      }, 3000);
  }

  apply = (param) => (e) => {
    //alert(param);
    //alert(localStorage.getItem('applicationid'));
    localStorage.setItem("applicationid", param);
    window.location = "/#/Applicationacceptoffer";
  };

  viewapplication = (param) => (e) => {
    // localStorage.setItem("applicationid", param);
    // debugger;
    axios.get(
      baseurl+'/update_highlight/'+ param.id) 
      .then(function(response) {
        console.log("highlight check", response)    
      })

    localStorage.setItem("apptype","Sent");
  
    if(param.newmessage||param.message){
      localStorage.setItem("MsgReceived","true");
    }
    else{
      localStorage.setItem("MsgReceived","false");
    }

    
    if(param.status===4 || param.status===9){
      localStorage.setItem("IsRejected","true");
      
      localStorage.setItem("MsgReceived","true");
    }else{
      localStorage.setItem("IsRejected","false");
    }
   
    localStorage.setItem("applicationid", param.id);
    localStorage.setItem("app_id", param.id);
    //localStorage.setItem('universityid',param);
    localStorage.setItem("fromApplicationType","Sent");
    window.location = "/#/sendapplicationinprocess";


  };

  render() {
    const imgpath = `${config.baseurl}`;
    return (
      <div className="foe-studen-container draft-app-page pt-5 resp-blue-list s-application-list send-app-2 send-app-page pb-5">
        <div className="foe-student-box">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="2" xl="2" md="2" lg="2" className="pr-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <ListGroup className="left-list float-right">
                      <a href="/#/draftapplication">
                        <ListGroupItem className="draft-padding-align">Draft Applications</ListGroupItem>
                      </a>
                      <a href="/#/sendapplication">
                        <ListGroupItem className="active draft-padding-align">
                          Sent Applications
                        </ListGroupItem>
                      </a>
                      <a href="/#/Acceptedapplication">
                        <ListGroupItem className="draft-padding-align">Accepted Applications</ListGroupItem>
                      </a>
                      <a href="/#/agentcontracts">
                        <ListGroupItem className="draft-padding-align">Agent Contracts</ListGroupItem>
                      </a>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="10" xl="10" md="10" lg="10" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0 mt-3">
                    <Row>
                      <div className="col-6 start-fix px-3">
                        <h3>Sent Applications</h3>
                      </div>
                      <div className="col-6 d-flex justify-content-end ">
                        <select
                          class="form-control w-155px mr-3 mr-sm-0 checksame"
                          value=""
                          id=""
                          name=""
                          required=""
                        >
                          <option value="">Recently</option>
                        </select>
                      </div>
                    </Row>
                    <div className="card-body table-responsive px-0">
                      <table className="draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
                        <tr>
                          <th>App No</th>
                          <th>School</th>
                          <th className="program-width">Program</th>
                          <th>Course Start Date</th>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                        </tr>

                        {this.state.sentapplicationlist.map(
                          (sentapplicationlist, index) => (
                            <tr className={sentapplicationlist.highlight_status === 1 ? "" : "highlight-tab"}>
                              <td>{sentapplicationlist.id}</td>
                              <td>
                                <img
                                  src={imgpath + sentapplicationlist.logo_image}
                                  width="50"
                                  height=""
                                  alt=""
                                />
                              </td>
                              <td>{sentapplicationlist.heading}</td>
                              {/*<td>
							<label className="card-label title-label">Academy Likely OPen</label>
							<select class="form-control supervisor_id checksame" value="" id="" name="" required="">
							<option value="">Please select</option>
							</select>
							</td>  */}
                              <td>{dateFormat(sentapplicationlist.course_startdate)}</td>
                              <td>
                                {sentapplicationlist.status == "2" ? (
                                  <p className="appinprocess">In process </p>
                                ) : sentapplicationlist.status == "3" ? (
                                  <p className="appapproved">Approved</p>
                                ) : sentapplicationlist.status == "4" ? (
                                  <p className="apprejected">Rejected</p>
                                ) : sentapplicationlist.status == "6" ? (
                                  <p className="apppayment">Payment pending</p>
                                ) : sentapplicationlist.status == "9" ? (
                                  <p className="appdeclined">Declined</p>
                                ) : sentapplicationlist.status == "7" ? (
                                  <p className="apppaid">Paid</p>
                                ) : (
                                  <></>
                                )}
                              </td>

                              <td>
                                {sentapplicationlist.status == "2" ? (
                                  <p>{sentapplicationlist.newmessage}</p>
                                ) : sentapplicationlist.status == "3" ? (
                                  <a
                                    className="viewoffer"
                                    onClick={this.apply(sentapplicationlist.id)}
                                  >
                                    View letter of offer
                                  </a>
                                ) : sentapplicationlist.status == "4" ? (
                                  <p>{sentapplicationlist.message}</p>
                                ) : sentapplicationlist.status == "9" ? (
                                  <p>Student declined</p>
                                ) : (
                                  <></>
                                )}
                              </td>

                              <td>
                                {sentapplicationlist.status == "2" ? (
                                  <Button
                                    color="primary"
                                    className="appinprocess"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : sentapplicationlist.status == "3" ? (
                                  <Button
                                    color="primary"
                                    className="appapproved"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : sentapplicationlist.status == "4" ? (
                                  <Button
                                    color="primary"
                                    className="apprejected"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : sentapplicationlist.status == "6" ? (
                                  <Button
                                    color="primary"
                                    className="apppayment"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : sentapplicationlist.status == "9" ? (
                                  <Button
                                    color="primary"
                                    className="appdeclined"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : sentapplicationlist.status == "7" ? (
                                  <Button
                                    color="primary"
                                    className="apppaid"
                                    type="submit"
                                    onClick={this.viewapplication(
                                      sentapplicationlist
                                    )}
                                  >
                                    VIEW
                                  </Button>
                                ) : (
                                  <></>
                                )}
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
