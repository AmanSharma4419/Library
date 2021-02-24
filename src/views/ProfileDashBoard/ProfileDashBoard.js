import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import ViewMeeting from "../MeetingForMail/ViewMeeting";
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

import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import ausflag from "../../assets/img/university/australia_circle_flag.svg";
import sendicon from "../../assets/img/university/send-icon.jpg";
import sendwicon from "../../assets/img/whiteplane.svg";
import calendar from "../../assets/img/university/select-date-calendar.jpg";
import config from "../../config.json";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import moment from "moment";

import Flag from 'react-world-flags';
import { countries } from "../../countryCodes";

var baseurl = `${config.baseurl}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

var momentdate = [];
var yeardata = [];
let i;
let m = moment();
for (i = moment().year(); i <= moment().year(); i++) {
  for (var j = 0; j < 12; j++) {
    momentdate.push({
      mounthno: m.months(j).year(i).format("MM"),
      mounthname: m.months(j).year(i).format("MMM"),
    });
  }
}
for (i = moment().year(); i <= moment().year() + 2; i++) {
  // for (var j = 0; j < 12; j++) {
  yeardata.push(m.year(i).format("yyyy"));
  // }
}

function submitDate(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `getCalenderApplication`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
      console.log("datas", response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

// Card Chart 1

class ProfileDashBoard extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.state = {
      startdate_fall: "",
      fname: "",
      lname: "",
      regdate: "",
      large: false,
      country: "",
      countryCode: "",
      countdata: [],
      meetingdate: {},
      getmeeting: [],
      startDate: new Date(),
      endDate: new Date(),
      mounth: "",
      year: "",
      meetingaction: "",
      selectedmeetingdate: "",
      commantdate: "",
      mountharray: momentdate,
      yeararray: yeardata,
      formData: new FormData(),
      selectedDays: [],
      meeting_date: '', description: '', meeting_time: '',
    };

    // moment(new Date()).format('MMM')
    // moment(new Date()).format('yyyy')
    // this.handlepostmounth = this.handlepostmounth.bind(this);
    // this.handlepostyear = this.handlepostyear.bind(this);
    this.getGeneraldata();
    this.getcountdate();
  }


  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      // console.log('selecteddays', selectedIndex)
      // selectedDays = selectedIndex
      // selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    // console.log('selecteddays', selectedDays)
    this.getallmeeting(day);
    // this.setState({ selectedDays });
  }

  componentDidMount() {
    this.getallmeeting(new Date());
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }


  viewpopup = e => {
    this.setState({
      description: '',
      meeting_date: '',
      meeting_time: '',
    });
    localStorage.setItem('mailview', '');
    localStorage.setItem('meeting_id', e);
    // if (e) {
    //   axios
    //     .get(baseurl + "view_meeting_details/" + e)
    //     .then((response) => {
    //       this.setState({
    //         description: response.data.meeting_details.description,
    //         meeting_date: response.data.meeting_details.meeting_date,
    //         meeting_time: response.data.meeting_details.meeting_time,
    //       });
    //     });
      this.toggleLarge();
    
  }


  getallmeeting = selectedDate => {
    axios
      .get(baseurl + "get_calendarmeetings/Student/" + localStorage.getItem("studentid"))
      .then((response) => {
        if (response.status == 200) {
          this.setState({ selectedmeetingdate: selectedDate });
          console.log('response.status', response);
          const filterdata = response.data.result.filter(o => moment(o.meeting_date).format('yyyy-MMM-DD') === moment(selectedDate).format('yyyy-MMM-DD'));
          this.setState({ getmeeting: filterdata });
          if (response.data.result.length) {
            const alldates = [];
            for (let i = 0; i < response.data.result.length; i++) {
              const element = response.data.result[i];
              alldates.push(new Date(element.meeting_date));
            }
            this.setState({ selectedDays: alldates });
            console.log('sa', alldates)
          }

        }
      })
  }


  getallsdmeeting = selecteddata => {
    axios
      .get(baseurl + "get_calendarmeetings/Student/" + localStorage.getItem("studentid"))
      .then((response) => {
        if (response.status == 200) {
          // console.log('getallsdmeeting', getallsdmeeting);
          if (selecteddata == 'date') {
            const filterdata = response.data.result.filter(o =>
              moment(o.meeting_date).format('yyyy-MMM-DD') >= moment(this.state.startDate).format('yyyy-MMM-DD') &&
              moment(o.meeting_date).format('yyyy-MMM-DD') <= moment(this.state.endDate).format('yyyy-MMM-DD')
            );
            this.setState({ getmeeting: filterdata });
          } else {
            console.log('filter', moment(new Date(this.state.year + '-' + this.state.mounth)).format('yyyy-MMM'));
            const dates = this.state.year + '-' + this.state.mounth;
            const filterdata = response.data.result.filter(o => moment(o.meeting_date).format('yyyy-MMM') === moment(dates).format('yyyy-MMM'));
            this.setState({ getmeeting: filterdata });
          }


          if (response.data.result.length) {
            const alldates = [];
            for (let i = 0; i < response.data.result.length; i++) {
              const element = response.data.result[i];
              alldates.push(new Date(element.meeting_date));
            }
            this.setState({ selectedDays: alldates });
            console.log('sa', alldates)
          }

        }
      })
  }




  findCountryCode = (countryName) => {
    let code = '';
    countries.forEach(obj => {
      if (obj.name === countryName) {
        code = obj.code.toLowerCase();
        this.setState({ countryCode: code });
      }
    });
    return code;
  }

  getGeneraldata() {
    axios
      .get(baseurl + "get_generalinfo/" + localStorage.getItem("studentid"))
      .then((response) => {
        console.log(response);
        //alert(response.data.length);
        //alert(new Date(response.data[0].dateof_birth)+'--'+response.data[0].dateof_birth);

        if (response.data.length > "0") {
          if (response.data[0].created_at != null)
            //options.timeZone = 'UTC';
            //options.timeZoneName = 'short';
            //console.log(new Intl.DateTimeFormat('en-US', options).format(date));

            //alert (new Intl.DateTimeFormat('en-US', options).format(sdob));

            this.setState({
              fname: response.data[0].first_name,
              lname: response.data[0].last_name,
              country: response.data[0].country_name,
            });
          this.findCountryCode(response.data[0].country_name);
        }
      });
  }



  getcountdate = () => {
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append(
      "start_date",
      moment(this.state.startDate).format("yyyy-MM-DD")
    );
    this.state.formData.append(
      "end_date",
      moment(this.state.endDate).format("yyyy-MM-DD")
    );
    this.state.formData.append("month", this.state.mounth);
    this.state.formData.append("year", "");
    this.state.formData.append("command", "date");
    submitDate(
      "form-data",
      this.state.formData,
      (msg) => {
        console.log("as", msg);
        this.setState({ countdata: msg });
        // toast.success("Search Saved Successfully"); setTimeout(function () {
        // }, 3000);
      },
      "student"
    );
  };

  handleApply = () => {
    this.setState({ commantdate: "date" });
    this.getcountdate();
    this.getallsdmeeting('date')
  };

  handlecancel = () => {
    // this.setState({year: event.yeardata, commantdate: 'monthyear'});
    this.getallmeeting(new Date());
    this.state.formData.append("student_id", localStorage.getItem('studentid'));
    this.state.formData.append("start_date", '2019-01-01');
    this.state.formData.append("end_date", '2021-12-30');
    this.state.formData.append("month", '');
    this.state.formData.append("year", '');
    this.state.formData.append("command", 'date');
    submitDate("form-data", this.state.formData, (msg) => {
      this.setState({ countdata: msg });
    }, 'student');
  }

  handlepostmounth = (event) => {
    this.setState({ mounth: event.target.value });
    if (this.state.year == '') {
      this.setState({ year: moment(new Date).format('yyyy') });
    }
    this.state.formData.append("student_id", localStorage.getItem('studentid'));
    this.state.formData.append("start_date", moment(this.state.startDate).format('yyyy-MM-DD'));
    this.state.formData.append("end_date", moment(this.state.endDate).format('yyyy-MM-DD'));
    this.state.formData.append("month", event.target.value);
    this.state.formData.append("year", this.state.year);
    this.state.formData.append("command", 'monthyear');
    submitDate("form-data", this.state.formData, (msg) => {
      this.setState({ countdata: msg });
    }, 'student');
  }

  handlepostmounth = (event) => {
    this.setState({ mounth: event.target.value });
    this.getallsdmeeting('mounth')
  };

  handlepostyear = (event) => {
    this.setState({ year: event.yeardata, commantdate: "monthyear" });
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append(
      "start_date",
      moment(this.state.startDate).format("yyyy-MM-DD")
    );
    this.state.formData.append(
      "end_date",
      moment(this.state.endDate).format("yyyy-MM-DD")
    );
    this.state.formData.append("month", this.state.mounth);
    this.state.formData.append("year", event.yeardata);
    this.state.formData.append("command", "monthyear");
    submitDate(
      "form-data",
      this.state.formData,
      (msg) => {
        this.setState({ countdata: msg });
        this.setState({ year: event.yeardata, commantdate: "monthyear" });
      },
      "student"
    );
    this.getallsdmeeting('year');
  };

  handleDateChange = (date) => {
    this.setState({ startdate_fall: date });
  };

  onChange = (dates) => {
    const [start, end] = dates;
    this.setState({ startDate: start, endDate: end });
  };

  render() {
    const styles = {
      fontSize: "10px",
      fontWeight: "bold",
    };

    const two_chars = {
      fontFamily: 'monospace',
      width: '2ch',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }

    const modifiersStyles = {
      selected: {
        backgroundColor: '#4da1ff1a',
        color: '#000',
      },
      today: {
        backgroundColor: '#4da1ff1a',
        // color: '#000',
      }
    };

    return (
      <div className="foe-studen-container profile-dashboard">
        <div className="foe-student-box">
          <Container>
            <ToastContainer />
            <Modal isOpen={this.state.large} toggle={this.toggleLarge}
              className={'modal-lg ' + this.props.className}>
              <ModalBody className="student-popup">
                <div className="container">
                  <ViewMeeting/>
                </div>
              </ModalBody>
              <ModalFooter>
              <Button color="secondary" onClick={()=> this.setState({large : false})}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Row>
              <Col xs="12" sm="12" xl="3" md="12" lg="3">
                <Card className="uni-left-card">
                  <CardBody>
                    <ListGroup className="left-list">
                      <ListGroupItem className="active">
                        Dashboard
                      </ListGroupItem>
                      <Link to="/studentprofile">
                        <ListGroupItem>Personal Information</ListGroupItem>
                      </Link>
                      <Link to="/changepassword">
                        <ListGroupItem>Change password</ListGroupItem>
                      </Link>
                      <Link to="/paymentdetails">
                        <ListGroupItem>Payments</ListGroupItem>
                      </Link>
                      <Link to="/documentation">
                        <ListGroupItem>Documentation</ListGroupItem>
                      </Link>
                      <Link to="/profilenotification">
                        <ListGroupItem>Notification</ListGroupItem>
                      </Link>
                      <Link to="/savedsearch">
                        <ListGroupItem>Saved Searches</ListGroupItem>
                      </Link>
                    </ListGroup>


                  </CardBody>
                </Card>
              </Col>

              {/* <Card> */}
              {/* <CardBody> */}
              <Col
                xs="12"
                sm="12"
                xl="9"
                md="12"
                lg="9"
                className="uni-right-card"
              >
                <Row className="mx-0">
                  <div className="col-md-6 left-dash-align">
                    <Card>
                      <CardBody>
                        <span className="seemore-link">
                          <Link to="/studentprofile">
                            see more <i className="fa fa-angle-right"></i>
                          </Link>
                        </span>

                        <p className="dashboard-name">
                          {this.state.fname} {this.state.lname}
                        </p>

                        <div>
                          <Flag className="rounded mr-2" code={this.state.countryCode} height="14" fallback={<span>Unknown</span>} />
                          <span className="pl-2 align-middle">{this.state.country}</span>
                        </div>
                      </CardBody>
                    </Card>
                    <div>
                      <Card>
                        <CardBody>
                        <div className="accordion" id="faq">
                        <a
                                          href="#"
                                          className="btn btn-header-link collapsed pl-0 w-100"
                                          data-toggle="collapse"
                                          data-target="#faq1"
                                          aria-expanded="true"
                                          aria-controls="faq1"
                                        >
                          <div className="dashboard-border">
                            <span>
                              <span>{moment(this.state.selectedmeetingdate).format('DD')}</span> {moment(this.state.selectedmeetingdate).format('MMMM - yyyy')}
                            </span>
                          </div>
                          </a>
                          
                          <div id="faq1"
                                        className="collapse"
                                        aria-labelledby="faqhead1"
                                        data-parent="#faq">
                          {this.state.getmeeting.length > 0 ? this.state.getmeeting.map(m =>
                            <div className={this.state.meetingaction == m.id ? "card-section active" : "card-section"} onClick={() => (this.setState({ meetingaction: m.id }), this.viewpopup(m.id))}>
                              <div>
                                <span className="dash-pan">
                                  {/* 11:00 AM - 11:30 AM */}
                                  {m.meeting_time}
                                </span>
                              </div>
                              <div className="pb-3 pt-3">
                                <span className="">{m.title}</span>
                              </div>
                              <div className="mr-3 send-icon">
                                {/* <a>
                                  <img src={sendicon} alt="" />
                                </a> */}
                                {m.members.map(f => (
                                  f !== localStorage.getItem('studentemail') ? <button className="edit-btn btn btn-orange btn-danger mr-3">
                                    <span className=""><div className="two_charslength largepro">{f}</div></span>
                                  </button> : null
                                ))}

                                {/* <button className="edit-btn btn btn-primary">
                                JB
                              </button> */}
                              </div>
                            </div>
                          ) : null}</div>
                          </div>
                          {/* <div className="card-section active">
                            <div>
                              <span className="dash-pan">
                                11:00 AM - 11:30 AM
                              </span>
                            </div>
                            <div className="pb-3 pt-3">
                              <span className="">video chat</span>
                            </div>
                            <div className="mr-3 send-icon">
                              <button className="send-btn btn btn-danger mr-3">
                                <img src={sendwicon} alt="" />
                              </button>
                              <button className="edit-btn btn btn-danger mr-3">
                                LA
                              </button>
                              <button className="edit-btn btn btn-primary">
                                JB
                              </button>
                            </div>
                          </div> */}
                          {/* <div className="card-section">
                            <div>
                              <span className="dash-pan">
                                11:00 AM - 11:30 AM
                              </span>
                            </div>
                            <div className="pb-3 pt-3">
                              <span className="">video chat</span>
                            </div>
                            <div className="mr-3 send-icon">
                              <a>
                                <img src={sendicon} alt="" />
                              </a>
                              <button className="edit-btn btn btn-danger mr-3">
                                LA
                              </button>
                              <button className="edit-btn btn btn-primary">
                                JB
                              </button>
                            </div> */}
                          {/* </div> */}
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  <div className="col-md-6 px-5 right-dash-align">
                    <h5 className="mb-4 app-sub-heading font-weight-bold">Event Calendar</h5>
                    <div className="event-cal-1 mt-3">
                      <div className="event-cal calendar-col">
                        <DayPicker
                          selectedDays={this.state.selectedDays}
                          onDayClick={this.handleDayClick}
                          modifiersStyles={modifiersStyles}
                        />
                        {/* <DatePicker
                          selected={this.state.startDate}
                          onChange={() => this.onChange}
                          // startDate={this.state.startDate}
                          // endDate={this.state.endDate}
                          selectsRange
                          // disabled
                          inline
                        /> */}
                      </div>

                      {/* <img src={calendar} alt="" /> */}
                      {/* <DatePicker
                        selected={this.state.startdate_fall}
                        onChange={(date) => this.handleDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className='form-control'
                        id="dateofbirth"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MM-DD"
                      /> */}
                      <hr></hr>
                      <div className="select-app-profile  picker-api-box">
                        <h5 className="mb-3 mt-3 picker-box justify-content-start">Custom Select</h5>
                        <Row className="mx-sm-0 px-sm-0">
                          <div className="col-md-12 mx-sm-0 px-sm-0 text-left">
                            <label className="pt-3 pb-3 mb-0 font-10">DATE RANGE</label>
                          </div>
                          <div className="col-12 d-flex px-0">
                            <div className="col-md-4 text-left px-0">
                              <DatePicker
                                className="shadowbox"
                                selected={this.state.startDate}
                                onChange={date => this.setState({ startDate: date, commantdate: 'date' })}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                dateFormat="MMMM d, yyyy"
                              />
                            </div>
                            <div className="col-md-6 text-left row px-0">
                              <div className="mr-1 ml-1 pt-2 col-1">-</div>
                              <DatePicker
                                className="shadowbox"
                                selected={this.state.endDate}
                                onChange={date => this.setState({ endDate: date })}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={this.state.startDate}
                                dateFormat="MMMM d, yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 mx-sm-0 px-sm-0 py-4 text-left">
                            <button className="edit-btn btn btn-primary mr-2 font-10 btn-clr-blue" onClick={this.handleApply}>Apply</button>
                          <button className="edit-btn btn btn-otln-blue btn-outline-primary" onClick={this.handlecancel}>Cancel</button> 
                          </div>
                        </Row>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="total-app pb-4  p-3 mt-4 mb-2 card">

                      <h5 className="mb-sm-1 text-center pb-4 justify-content-center" style={{ alignItems: 'center', fontWeight: 'bold' }}>Total Applications Sent</h5>
                      {/* <h3 className="mb-4 text-center app-sub-heading">4</h3> */}
                      <div className="cal-filter text-center">
                        <Row >
                          <div className="col-md-4 pr-0 pt-2">
                            <a className="active btn-blue-clr" onClick={this.handlecancel}>All</a>
                          </div>
                          <div className="col-md-3 pr-0 dash-drop">
                            <select className="form-control checksame border-transparent" onChange={this.handlepostmounth}
                              value={this.state.mounth} id="mounth" >
                                <option>Month</option>
                              {this.state.mountharray.map(m => {
                                return (
                                  <option key={m.mounthno} value={m.mounthno}>{m.mounthname}</option>
                                )
                              })}
                            </select>
                            {/* <DatePicker
                              selected={this.state.mounth}
                              onChange={date => this.handlemounthyear(date)}
                              selectsStart
                              startDate={this.state.mounth}
                              endDate={this.state.year}
                              dateFormat="MMM"
                              showMonthYearPicker
                            /> */}
                          </div>
                          <div className="col-md-4 dash-drop">
                            <select className="form-control checksame border-transparent" onChange={(val) => this.handlepostyear({ yeardata: val.target.value })} value={this.state.year} id="year" >
                              <option value="">Year</option>
                              {this.state.yeararray.map(m => {
                                return (
                                  <option key={m} value={m}>{m}</option>
                                )
                              })}
                            </select>
                            {/* <DatePicker
                              selected={this.state.year}
                              selectsEnd
                              startDate={this.state.mounth}
                              endDate={this.state.year}
                              dateFormat="yyyy"
                              disabled
                              showMonthYearPicker
                            /> */}
                          </div>
                        </Row>
                        {/* <a className="active">Week</a>
                        <a>Month</a>
                        <a>Year</a> */}
                      </div>
                    </div>
                    <div className="total-app active pb-0  pt-3  px-3 mt-2 card ">
                      {/* 
                      <h5 className="mb-1 text-center app-sub-heading">Total Applications Viewed</h5>
                      <h3 className="mb-4 text-center app-sub-heading">4</h3> */}
                      <Row className="cal-filter text-center">
                        <div className="col-md-4 px-0">
                          <p className="font-8pt" style={styles}>Total Sent</p>
                          <h5 className="font-24pt">{this.state.countdata.sent_count}</h5>
                        </div>
                        <div className="col-md-4 px-0">
                          <p className="font-8pt" style={styles}>Total Approved</p>
                          <h5 className="font-24pt">{this.state.countdata.approved_count}</h5>
                        </div>
                        <div className="col-md-4 px-0">
                          <p className="font-8pt" style={styles}>Total Rejected</p>
                          <h5 className="font-24pt">{this.state.countdata.rejected_count}</h5>
                        </div>
                      </Row>
                      {/* <div className="cal-filter text-center">
                        <a>Day</a>
                        <a className="active">Week</a>
                        <a>Month</a>
                        <a>Year</a>
                      </div> */}
                    </div>
                  </div>
                </Row>
              </Col>
              {/* </CardBody> */}
              {/* </Card> */}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ProfileDashBoard;
