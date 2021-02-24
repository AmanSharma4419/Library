import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactToPdf from "react-to-pdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Label,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
  CardHeader,
  FormGroup,
  ListGroup,
  ListGroupItem,
  CardGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecondaryHeaderProgram from "./../SecondaryHeaderProgram/index";
import config from "../../config.json";
import deleteicon from "../../assets/img/university/delete_icn.svg";
import Logicon from "../../assets/img/university/log-icon.svg";
import Loggicon from "../../assets/img/university/log-gray-icon.svg";
import Penicon from "../../assets/img/university/pen-icon.svg";
import Closebtn from "../../assets/img/close-btn.svg";
import solveicon from "../../assets/img/checkmark.svg";
import Infoicon from "../../assets/img/student/info-icon.svg";
import Closeicon from "../../assets/img/close-btn.svg";
import optiondot from "../../assets/img/more.svg";
import chathead from "../../assets/img/chat-bluehead.png";
import chatgrayhead from "../../assets/img/chat-grayhead.png";
import circleflg from "../../assets/img/university/australia_circle_flag.svg";
import profilestar from "../../assets/img/university/star.png";
import starredicon from "../../assets/img/university/starred.png";
import unstarredicon from "../../assets/img/university/unstarred.png";
import searchicon from "../../assets/img/search-icon.svg";
import downloadicon from "../../assets/img/university/download.png";
import docfile from "../../assets/img/university/docfile.png";
import chaticon from "../../assets/img/university/chat.png";
import chatinitial from "../../assets/img/initialprofile.png";
import chaticon1 from "../../assets/img/chat-bluehead.png";
import SecondaryHeader from "./../SecondaryHeader/SecondaryHeader";

import backarrow from "../../assets/img/back_arrow.svg";
import verifiedIcon from "../../assets/img/verifiedc.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import Staricon from "../../assets/img/star_header.png";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import "./style.css";
import $ from "jquery";
import DeleteIcon from "../../assets/img/delete.png";
var baseurl = `${config.baseurl}`;
var admin_url = `${config.admin_url}`;
//API Base Url
function submitFormCommand(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/applicationcomment`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

function submitFormCommandEdit(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/editapplicationcomment`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Viewapplications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackmodel: false,
      commandmodel: false,
      viewcommandmodel: false,
      chaticonaction: true,
      layout: "normal",
      getmessagebyid: [],
      id: "",
      app_id: "",
      course_id: "",
      course_name: "",
      message: "",
      student_created: "",
      edu_level: "",
      student_id: "",
      university_name: "",
      commantfieldname: "",
      login_email: "",
      main_country: "",
      stu_personal: [],
      stu_doc: [],
      org_stu_doc: [],
      stu_edu: [],
      stu_tst: [],
      classes: [],
      main_status: "",
      eduhis: [],
      getnotes: [],
      stu_app_id: [],
      stu_stuid: [],
      stu_stuname: [],
      commantmsg: "",
      getallmessagecommant: [],
      newFeedback: false,
      country: [],
      country_name: [],
      country_id: [],
      year: [],
      cities: [],
      cities_id: [],
      edu_name: [],
      edu_id: [],
      starred_status: [],
      degree_level: "",
      countryid: "",
      cityid: "",
      institute_name: "",
      getmessagebyfields: [],
      student_id: "",
      grad_year: "",
      req_doc: "",
      verified: "",
      course_startdate: "",
      errors: {},
      filterallcommants: "All",
      formData: new FormData(),
      first_namefieldname: "",
      addr_emailfieldname: "",
      dateof_birthfieldname: "",
      phonefieldname: "",
      first_languagefieldname: "",
      genderfieldname: "",
      marital_statusfieldname: "",
      passport_nofieldname: "",
      edu_countryfieldname: "",
      edu_edulevelfieldname: "",
      edulevelfieldname: "",
      institutefieldname: "",
      countryfieldname: "",
      awardfieldname: "",
      awardonfieldname: "",
      emailfieldname: "",
      cityfieldname: "",
      exam_typefieldname: "",
      exam_datefieldname: "",
      reading_scorefieldname: "",
      listening_scorefieldname: "",
      writing_scorefieldname: "",
      speaking_scorefieldname: "",
      gre_exam_datefieldname: "",
      gre_verbal_scorefieldname: "",
      gre_verbal_rankfieldname: "",
      gre_quanitative_scorefieldname: "",
      gre_quanitative_rankfieldname: "",
      gre_writing_scorefieldname: "",
      gre_writing_rankfieldname: "",
      gmat_exam_datefieldname: "",
      gmat_verbal_scorefieldname: "",
      gmat_verbal_rankfieldname: "",
      gmat_quanitative_scorefieldname: "",
      gmat_quanitative_rankfieldname: "",
      gmat_writing_scorefieldname: "",
      gmat_writing_rankfieldname: "",
      gmat_total_scorefieldname: "",
      gmat_total_rankfieldname: "",
      stu_docfieldname: "",
      aplication_feedback: [],
      tickshow: false,
      edittext: false,
    };

    this.togglefeedback = this.togglefeedback.bind(this);
    this.commandmodel = this.commandmodel.bind(this);
    this.viewcommandmodel = this.viewcommandmodel.bind(this);
    // this.chaticonaction = this.chaticonaction.bind(this);
  }

  handleMessageChange = (event) => {
    //alert(event.target.value);
    this.setState({ message: event.target.value });
  };

  togglefeedback() {
    // alert('hello');
    this.setState({ feedbackmodel: !this.state.feedbackmodel });
  }
  togglefeedback1 = (item) => (e) => {
    localStorage.setItem("app_id", item.application_id);
    localStorage.setItem("agentid", item.agent_id);
    // alert('hello');
    //this.updateStatus();
    this.getPopupData();
    this.setState({ feedbackmodel: !this.state.feedbackmodel });
  };
  updateStatus() {
    axios
      .get(
        baseurl + "/updatenewappliststudent/" + localStorage.getItem("app_id")
      )
      .then((response) => {
        this.setState({ newFeedback: false, aplication_feedback: [] });
      });
  }
  getPopupData() {
    axios
      .get(
        baseurl +
        "/viewapplicationagent_details/" +
        localStorage.getItem("app_id")
      )
      .then((response) => {
        console.log("viewapplicationagent_details", response.data);
        this.setState({
          app_id: response.data.appl_id,
          course_id: response.data.course_id,
          course_name: response.data.course_name,
          student_created: response.data.student_created,
          edu_level: response.data.edu_level,
          student_id: response.data.stu_personal.student_id,
          stu_personal: response.data.stu_personal,
          university_name: response.data.university_name,
          login_email: response.data.login_email,
          stu_doc: response.data.stu_doc,
          org_stu_doc: response.data.org_stu_doc,
          stu_edu: response.data.stu_edu,
          eduhis: response.data.eduhis,
          stu_tst: response.data.stu_tst,
          classes: response.data.classes,
          main_country: response.data.main_country,
          stu_stuid: response.data.id,
          stu_stuname: response.data.student_name,
          starred_status: response.data.starred_status,
          stu_app_id: response.data.id,
          main_status: response.data.main_status,
          verified: response.data.verified,
          course_startdate: response.data.course_startdate,
        });

        axios
          .get(
            baseurl +
            "/getappallcomments/" +
            localStorage.getItem("app_id") +
            "/" +
            localStorage.getItem("agentid") +
            "/" +
            response.data.stu_personal.student_id
          )
          .then((response) => {
            console.log("getallmessagecommant", response.data);
            if (response.status == 200) {
              // console.log('getallmessagecommant', this.groupBy(response.data, "created_date"));
              // const groupBy = response.data.reduce((catsSoFar, { created_date }) => {
              // 	if (!catsSoFar[created_date]) catsSoFar[created_date] = [];
              // 	catsSoFar[created_date].push(catsSoFar);
              // 	return catsSoFar;
              // }, {});

              var groups = {};
              for (var i = 0; i < response.data.length; i++) {
                var groupName = moment(response.data[i].created_date).format(
                  "yyyy, MMM DD"
                );
                if (!groups[groupName]) {
                  groups[groupName] = [];
                }
                groups[groupName].push(response.data[i]);
              }
              var myArray = [];
              for (var groupName in groups) {
                myArray.push({
                  group: groupName,
                  groupdata: groups[groupName],
                });
              }
              this.setState({
                getallmessagecommant: myArray,
              });
              console.log("getallmessagecommant", myArray);
            }
          });

        axios
          .get(
            baseurl +
            "/getapplicationfieldnamestudent/" +
            localStorage.getItem("app_id") +
            "/" +
            response.data.stu_personal.student_id
          )
          .then((response) => {
            if (response.status == 200) {
              response.data.map((element) => {
                switch (element.fieldname) {
                  case "first_name":
                    return this.setState({
                      first_namefieldname: element.fieldname,
                      first_namefieldnamecount: element.totalcount,
                    });
                  case "addr_email":
                    return this.setState({
                      addr_emailfieldname: element.fieldname,
                      addr_emailfieldnamecount: element.totalcount,
                    });
                  case "dateof_birth":
                    return this.setState({
                      dateof_birthfieldname: element.fieldname,
                      dateof_birthfieldnamecount: element.totalcount,
                    });
                  case "phone":
                    return this.setState({
                      phonefieldname: element.fieldname,
                      phonefieldnamecount: element.totalcount,
                    });
                  case "first_language":
                    return this.setState({
                      first_languagefieldname: element.fieldname,
                      first_languagefieldnamecount: element.totalcount,
                    });
                  case "gender":
                    return this.setState({
                      genderfieldname: element.fieldname,
                      genderfieldnamecount: element.totalcount,
                    });
                  case "marital_status":
                    return this.setState({
                      marital_statusfieldname: element.fieldname,
                      marital_statusfieldnamecount: element.totalcount,
                    });
                  case "passport_no":
                    return this.setState({
                      passport_nofieldname: element.fieldname,
                      passport_nofieldnamecount: element.totalcount,
                    });
                  case "edu_country":
                    return this.setState({
                      edu_countryfieldname: element.fieldname,
                      edu_countryfieldnamecount: element.totalcount,
                    });
                  case "edu_edulevel":
                    return this.setState({
                      edu_edulevelfieldname: element.fieldname,
                      edu_edulevelfieldnamecount: element.totalcount,
                    });
                  case "edulevel":
                    return this.setState({
                      edulevelfieldname: element.fieldname,
                      edulevelfieldnamecount: element.totalcount,
                    });
                  case "institute":
                    return this.setState({
                      institutefieldname: element.fieldname,
                      institutefieldnamecount: element.totalcount,
                    });
                  case "country":
                    return this.setState({
                      countryfieldname: element.fieldname,
                      countryfieldnamecount: element.totalcount,
                    });
                  case "award":
                    return this.setState({
                      awardfieldname: element.fieldname,
                      awardfieldnamecount: element.totalcount,
                    });
                  case "awardon":
                    return this.setState({
                      awardonfieldname: element.fieldname,
                      awardonfieldnamecount: element.totalcount,
                    });
                  case "email":
                    return this.setState({
                      emailfieldname: element.fieldname,
                      emailfieldnamecount: element.totalcount,
                    });
                  case "city":
                    return this.setState({
                      cityfieldname: element.fieldname,
                      cityfieldnamecount: element.totalcount,
                    });
                  case "exam_type":
                    return this.setState({
                      exam_typefieldname: element.fieldname,
                      exam_typefieldnamecount: element.totalcount,
                    });
                  case "exam_date":
                    return this.setState({
                      exam_datefieldname: element.fieldname,
                      exam_datefieldnamecount: element.totalcount,
                    });
                  case "reading_score":
                    return this.setState({
                      reading_scorefieldname: element.fieldname,
                      reading_scorefieldnamecount: element.totalcount,
                    });
                  case "listening_score":
                    return this.setState({
                      listening_scorefieldname: element.fieldname,
                      listening_scorefieldnamecount: element.totalcount,
                    });
                  case "writing_score":
                    return this.setState({
                      writing_scorefieldname: element.fieldname,
                      writing_scorefieldnamecount: element.totalcount,
                    });
                  case "speaking_score":
                    return this.setState({
                      speaking_scorefieldname: element.fieldname,
                      speaking_scorefieldnamecount: element.totalcount,
                    });
                  case "gre_exam_date":
                    return this.setState({
                      gre_exam_datefieldname: element.fieldname,
                      gre_exam_datefieldnamecount: element.totalcount,
                    });
                  case "gre_verbal_score":
                    return this.setState({
                      gre_verbal_scorefieldname: element.fieldname,
                      gre_verbal_scorefieldnamecount: element.totalcount,
                    });
                  case "gre_verbal_rank":
                    return this.setState({
                      gre_verbal_rankfieldname: element.fieldname,
                      gre_verbal_rankfieldnamecount: element.totalcount,
                    });
                  case "gre_quanitative_score":
                    return this.setState({
                      gre_quanitative_scorefieldname: element.fieldname,
                      gre_quanitative_scorefieldnamecount: element.totalcount,
                    });
                  case "gre_quanitative_rank":
                    return this.setState({
                      gre_quanitative_rankfieldname: element.fieldname,
                      gre_quanitative_rankfieldnamecount: element.totalcount,
                    });
                  case "gre_writing_score":
                    return this.setState({
                      gre_writing_scorefieldname: element.fieldname,
                      gre_writing_scorefieldnamecount: element.totalcount,
                    });
                  case "gre_writing_rank":
                    return this.setState({
                      gre_writing_rankfieldname: element.fieldname,
                      gre_writing_rankfieldnamecount: element.totalcount,
                    });
                  case "gmat_exam_date":
                    return this.setState({
                      gmat_exam_datefieldname: element.fieldname,
                      gmat_exam_datefieldnamecount: element.totalcount,
                    });
                  case "gmat_verbal_score":
                    return this.setState({
                      gmat_verbal_scorefieldname: element.fieldname,
                      gmat_verbal_scorefieldnamecount: element.totalcount,
                    });
                  case "gmat_verbal_rank":
                    return this.setState({
                      gmat_verbal_rankfieldname: element.fieldname,
                      gmat_verbal_rankfieldnamecount: element.totalcount,
                    });
                  case "gmat_quanitative_score":
                    return this.setState({
                      gmat_quanitative_scorefieldname: element.fieldname,
                      gmat_quanitative_scorefieldnamecount: element.totalcount,
                    });
                  case "gmat_quanitative_rank":
                    return this.setState({
                      gmat_quanitative_rankfieldname: element.fieldname,
                      gmat_quanitative_rankfieldnamecount: element.totalcount,
                    });
                  case "gmat_writing_score":
                    return this.setState({
                      gmat_writing_scorefieldname: element.fieldname,
                      gmat_writing_scorefieldnamecount: element.totalcount,
                    });
                  case "gmat_writing_rank":
                    return this.setState({
                      gmat_writing_rankfieldname: element.fieldname,
                      gmat_writing_rankfieldnamecount: element.totalcount,
                    });
                  case "gmat_total_score":
                    return this.setState({
                      gmat_total_scorefieldname: element.fieldname,
                      gmat_total_scorefieldnamecount: element.totalcount,
                    });
                  case "gmat_total_rank":
                    return this.setState({
                      gmat_total_rankfieldname: element.fieldname,
                      gmat_total_rankfieldnamecount: element.totalcount,
                    });
                  case "stu_doc":
                    return this.setState({
                      stu_docfieldname: element.fieldname,
                      stu_docfieldnamecount: element.totalcount,
                    });
                  default:
                    return null;
                }
              });
            }
          });
      });

    axios
      .get(baseurl + "/getmessageapplicant/" + localStorage.getItem("app_id"))
      .then((response) => {
        this.setState({
          getnotes: response.data,
        });
      });
  }
  deletecommantstatus = (dataid) => {
    if (dataid) {
      axios
        .get(baseurl + "/deletecomments/" + dataid + "/" + 0)
        .then((response) => {
          // console.log('getmessagebyid-chatbox-updatedonestatus', response.data);
          // if (response) {
          this.viewcommandmodel();
          this.componentDidMount();
          toast.success("Comment deleted successfully!...");
          // }
        });
    }
  };
  commandmodel() {
    this.setState({ commandmodel: !this.state.commandmodel });
  }

  viewcommandmodel() {
    this.setState({
      viewcommandmodel: !this.state.viewcommandmodel,
      tickshow: false,
      edid: 0,
      edittext: false,
      commantmsg: "",
    });
  }

  // chaticonaction() {
  //   this.setState({ chaticonaction: !this.state.chaticonaction });
  // }

  commandfieldmodel = (data) => {
    this.setState({ commantfieldname: "" });
    if (data) {
      this.setState({ commantfieldname: data });
      this.commandmodel();
    }
  };

  sentmessage = (data) => {
    // this.setState({ commantmsg: data })
    // debugger;

    this.state.formData.append(
      "application_id",
      localStorage.getItem("app_id")
    );
    this.state.formData.append("type", "Student");
    this.state.formData.append("from_id", localStorage.getItem("agentid"));
    this.state.formData.append("to_id", this.state.student_id);
    this.state.formData.append("fieldname", this.state.commantfieldname);
    this.state.formData.append("message", this.state.commantmsg);
    this.state.formData.append("is_parent", 1);

    submitFormCommand(
      "multipart/form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success(msg.message);
          this.commandmodel();
          this.componentDidMount();
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 5000);
        } else {
          toast.success(msg.message);
        }
      },
      "aboutsubsection"
    );
  };

  rsentmessage = (data) => {
    // this.setState({ commantmsg: data })

    this.state.formData.append(
      "application_id",
      localStorage.getItem("app_id")
    );
    this.state.formData.append("type", "Student");
    this.state.formData.append("from_id", localStorage.getItem("agentid"));
    this.state.formData.append("to_id", this.state.student_id);
    this.state.formData.append("fieldname", this.state.commantfieldname);
    this.state.formData.append("message", this.state.commantmsg);
    this.state.formData.append("is_parent", 0);

    submitFormCommand(
      "multipart/form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success(msg.message);
          this.viewcommandmodel();
          this.componentDidMount();
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 5000);
        } else {
          toast.success(msg.message);
        }
      },
      "aboutsubsection"
    );
  };

  onTextEdit = (data) => (e) => {
    // this.setState({ commantmsg: data })
    this.state.formData.append("id", data);
    this.state.formData.append(
      "application_id",
      localStorage.getItem("app_id")
    );
    this.state.formData.append("type", "Student");
    this.state.formData.append("from_id", localStorage.getItem("agentid"));
    this.state.formData.append("to_id", this.state.student_id);
    this.state.formData.append("fieldname", this.state.commantfieldname);
    this.state.formData.append("edited_message", this.state.commantmsg);
    this.state.formData.append("is_parent", 0);

    submitFormCommandEdit(
      "multipart/form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success(msg.message);
          this.viewcommandmodel();
          this.componentDidMount();
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 5000);
        } else {
          toast.success(msg.message);
        }
      },
      "aboutsubsection"
    );
  };

  getsentmessagebyid = (data) => {
    this.setState({ commantfieldname: "" });
    if (data) {
      this.setState({ commantfieldname: data });
      this.viewcommandmodel();
      axios
        .get(
          baseurl +
          "/getapplicationcommentstudent/" +
          localStorage.getItem("app_id") +
          "/" +
          this.state.student_id +
          "/" +
          data
        )
        .then((response) => {
          console.log("getmessagebyid", response.data);
          if (response.status == 200) {
            this.setState({
              getmessagebyid: response.data,
            });
          }
        });
    }
  };

  chatcommant = (data) => {
    if (data) {
      this.setState({ commantfieldname: data.fieldname });
      this.viewcommandmodel();
      axios
        .get(
          baseurl +
          "/getapplicationcommentstudent/" +
          localStorage.getItem("app_id") +
          "/" +
          this.state.student_id +
          "/" +
          data.fieldname
        )
        .then((response) => {
          console.log("getmessagebyid-chatbox", response.data);
          if (response.status == 200) {
            this.setState({
              getmessagebyid: response.data,
            });
          }
        });
    }
  };

  componentDidMount() {
    setInterval(() => {
      axios
        .get(
          baseurl +
          "/getnewappliststudent" +
          "/" +
          localStorage.getItem("studentid")
        )
        .then((response) => {
          if (response.data.length > 0) {
            this.setState({
              newFeedback: true,
              aplication_feedback: response.data,
            });
          }
        });
      axios
        .get(
          baseurl +
          "/getfieldcomments/" +
          localStorage.getItem("app_id") +
          "/" +
          localStorage.getItem("agentid") +
          "/" +
          this.state.student_id
        )
        .then((response) => {
          this.setState({
            totalcountmsg: response.data.total,
          });
        });
    }, 1000);
  }

  getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return value;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  };

  HandleFeedback = () => {
    //alert("hi");
    this.setState({ newFeedback: false });
    this.updateStatus();
    // window.location.reload();
  };
  updatedonestatus = (datas) => {
    if (datas) {
      axios
        .get(
          baseurl +
          "/updatedonestatus/" +
          localStorage.getItem("app_id") +
          "/" +
          localStorage.getItem("agentid") +
          "/" +
          datas +
          "/Student"
        )
        .then((response) => {
          // console.log('getmessagebyid-chatbox-updatedonestatus', response.data);
          if (response.data.status_code == 200) {
            // this.viewcommandmodel();
            this.updateStatus();
            this.componentDidMount();
            toast.success("Feedback Sent Successfully");
            setTimeout(function () {
              window.location.reload(true);
            }, 5000);
          } else {
            toast.success("Please try again");
          }
        });
    }
  };
  filtercommants = (e) => {
    this.setState({ filterallcommants: e });
    const datenow = new Date();
    if (e !== "all") {
      const dateTo = moment(new Date()).format("yyyy, MMM DD");
      const dateFrom = moment().subtract(e, "d").format("yyyy, MMM DD");
      // const currentdata = datenow.getDate() - this.state.filtercommants ;
      axios
        .get(
          baseurl +
          "/getappallcomments/" +
          localStorage.getItem("app_id") +
          "/" +
          localStorage.getItem("agentid") +
          "/" +
          this.state.student_id
        )
        .then((response) => {
          // console.log('getallmessagecommant', response.data);
          if (response.status == 200) {
            const datalist = response.data.filter((item) => {
              return (
                moment(item.created_date).format("yyyy, MMM DD") >= dateFrom &&
                moment(item.created_date).format("yyyy, MMM DD") <= dateTo
              );
            });
            // console.log('getallmessagecommant', datalist);
            var groups = {};
            for (var i = 0; i < datalist.length; i++) {
              var groupName = moment(datalist[i].created_date).format(
                "yyyy, MMM DD"
              );
              if (!groups[groupName]) {
                groups[groupName] = [];
              }
              groups[groupName].push(datalist[i]);
            }
            var myArray = [];
            for (var groupName in groups) {
              myArray.push({ group: groupName, groupdata: groups[groupName] });
            }
            this.setState({
              getallmessagecommant: myArray,
            });
          }
        });
      // this.setState({filterallcommants: e});
      // console.log('filtercommants', dateTo, dateFrom, e );
    } else {
      axios
        .get(
          baseurl +
          "/getappallcomments/" +
          localStorage.getItem("app_id") +
          "/" +
          localStorage.getItem("agentid") +
          "/" +
          this.state.student_id
        )
        .then((response) => {
          // console.log('getallmessagecommant', response.data);
          if (response.status == 200) {
            var groups = {};
            for (var i = 0; i < response.data.length; i++) {
              var groupName = moment(response.data[i].created_date).format(
                "yyyy, MMM DD"
              );
              if (!groups[groupName]) {
                groups[groupName] = [];
              }
              groups[groupName].push(response.data[i]);
            }
            var myArray = [];
            for (var groupName in groups) {
              myArray.push({ group: groupName, groupdata: groups[groupName] });
            }
            this.setState({
              getallmessagecommant: myArray,
            });
          }
        });
    }
  };
  showTick = (data) => (e) => {
    this.setState({
      tickshow: true,
      edid: data.id,
      edittext: true,
      commantmsg: data.message,
    });
  };
  printDocument = () => {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      var pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save("download.pdf");
    });
  };
  render() {
    const { errors } = this.state;
    const { showhide } = this.state;

    const ref = React.createRef();
    const options = {
      orientation: "landscape",
      unit: "in",
      format: [4, 2],
    };

    return (
      <div className="entry-box invite-box staff-page view-application-one view-application-page pl-0">
        <Modal
          isOpen={this.state.feedbackmodel}
          toggle={this.togglefeedback}
          className={"modal-xl viewpop " + this.props.className}
        >
          <ModalHeader toggle={this.togglefeedback}></ModalHeader>
          <ModalBody className="p-0">
            <Modal
              isOpen={this.state.commandmodel}
              toggle={this.commandmodel}
              className={"modal-sm createpop " + this.props.className}
            >
              <ModalHeader toggle={this.commandmodel}></ModalHeader>
              <ModalBody className="commandbody create px-2">
                <div>
                  <textarea
                    rows="3"
                    placeholder="Add Comment"
                    className="commant-input w-100 border-transparent"
                    onChange={(e) =>
                      this.setState({ commantmsg: e.target.value })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter className="commandfooter create justify-content-start">
                <div className="row">
                  <div className="col-12 d-flex">
                    <Button
                      className="primary commant-post mr-3"
                      onClick={() => this.sentmessage()}
                    >
                      Post
                    </Button>
                    <Button
                      className="secoundary commant-cancel"
                      onClick={this.commandmodel}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={this.state.viewcommandmodel}
              toggle={this.viewcommandmodel}
              className={"modal-sm  viewpopup px-0 " + this.props.className}
            >
              <ModalHeader toggle={this.viewcommandmodel}></ModalHeader>
              <ModalBody className="commandbody view py-0">
                {this.state.getmessagebyid.length > 0
                  ? this.state.getmessagebyid.map((m) => (
                    <Card
                      body
                      className="mb-0 border-transparent d-flex px-2 row flex-row-dir"
                    >
                      <div className="col-2 p-0">
                        <span>
                          <div className="border-line-design">
                            <div className="two_charslength largepro">{m.name}</div>
                          </div>
                        </span>
                        {/* <img
                            src={chatinitial}
                            alt=""
                            className=""
                            width="30"
                          /> */}
                      </div>
                      <div className="col-10 p-0">
                        <div className="col-12 row ml-0 px-0">
                          <div className="col-10 px-0">
                            <CardTitle className="mb-0">{m.name}</CardTitle>
                          </div>
                          {m.type === "Student" ? (
                            <div className="col-1 px-0 pr-2">
                              <div class="dropdown commant-reply">
                                <a
                                  class="dropdown-toggle"
                                  role="button"
                                  id="dropdownMenuLink"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <img
                                    src={optiondot}
                                    alt=""
                                    className=""
                                    width="15"
                                  />
                                </a>

                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuLink"
                                >
                                  <a
                                    class="dropdown-item"
                                    onClick={this.showTick(m)}
                                  >
                                    Edit
                                    </a>
                                  <a
                                    class="dropdown-item"
                                    onClick={() =>
                                      this.deletecommantstatus(m.id)
                                    }
                                  >
                                    Delete
                                    </a>
                                </div>
                              </div>
                              {/* <img src={DeleteIcon} alt="" className="" width="15" /> */}
                            </div>
                          ) : (
                              <div className="col-1 px-0 pr-2">
                                <img
                                  src={optiondot}
                                  alt=""
                                  className=""
                                  width="15"
                                />
                              </div>
                            )}
                          {this.state.tickshow === true &&
                            this.state.edid === m.id ? (
                              <div className="col-1 px-0">
                                <img
                                  src={solveicon}
                                  alt=""
                                  className=""
                                  width="15"
                                  onClick={this.onTextEdit(m.id)}
                                />
                              </div>
                            ) : null}
                        </div>
                        <div className="col-12 px-0 mb-2 chat-date">
                          {moment(m.created_date).format("LTS")},{" "}
                          {moment(m.created_date).format("DD, MMM yyyy")}.
                          </div>
                        <CardText>
                          {this.state.edittext === true &&
                            this.state.edid === m.id ? (
                              <textarea
                                rows="2"
                                placeholder="Edit"
                                className="reply-commantbox w-100 border-transparent"
                                value={this.state.commantmsg}
                                onChange={(e) =>
                                  this.setState({ commantmsg: e.target.value })
                                }
                              />
                            ) : m.edited_message ? (
                              m.edited_message
                            ) : (
                                m.message
                              )}
                        </CardText>
                      </div>
                    </Card>
                  ))
                  : null}
              </ModalBody>
              <ModalFooter className="commandfooter view">
                <div className="row">
                  <div className="col-12">
                    <textarea
                      rows="2"
                      placeholder="Reply"
                      className="reply-commantbox w-100 border-transparent"
                      onChange={(e) =>
                        this.setState({ commantmsg: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 d-flex">
                    <Button
                      className="commant-reply primary mr-3"
                      onClick={() => this.rsentmessage()}
                    >
                      Reply
                    </Button>{" "}
                    <Button
                      className="commant-cancel secoundary"
                      onClick={this.viewcommandmodel}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>
            <div className="modal_header  w-100 ">
              <div className="col-md-9 col-12 uni-add-box mx-auto py-4">
                <div className="float-right d-flex">
                  <img
                    src={downloadicon}
                    alt=""
                    className="view-applcn-icon min-icon pop-headicon"
                    width="20"
                    onClick={this.printDocument}
                  />

                  {/* <img
                    src={chaticon1}
                    alt=""
                    className="view-applcn-icon min-chat-icon pop-headicon"
                    onClick={this.chaticonaction}
                    width="20"
                  /> */}

                  <button
                    className="add-staff-bn btn btn-primary"
                    onClick={() => this.updatedonestatus(this.state.student_id)}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="col-md-3 col-12 uni-add-box mx-auto py-4 view-modal-border-left view-modal-border-down view-app-detail row px-0 py-2">
                <div className=" w-100 cmnt-head col-12 row mx-0">
                  <div className="col-6 px-0">Comments</div>
                  <div className="col-4 pr-0">
                    <div className="select-wrapper-1">
                      <div className="select-wrapper-1">
                        <select
                          className="w-100 cmt-drop"
                          value={this.state.filterallcommants}
                          onChange={(e) => this.filtercommants(e.target.value)}
                        >
                          <option
                            value="all"
                            onClick={(e) =>
                              this.setState({ filterallcommants: "all" })
                            }
                          >
                            All
                          </option>
                          <option value="2">2 days later</option>
                          <option value="7">1 week later</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 px-0">
                    <img src={chaticon1} alt="" className="" width="20" />
                    <span class="badge badge-secondary">{this.state.totalcountmsg}</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="pdfdiv">
              <div className="row mx-auto w-100">
                <div className="col-md-9 col-12 uni-add-box mx-auto view-application-one view-application-page">
                  <div class="col-12 pt-3 Clearfix view-prof-detail">
                    <h3 className="Clearfix">
                      {this.state.stu_personal.first_name}{" "}
                      {this.state.stu_personal.last_name}
                    </h3>

                    <div className="media mb-2 mt-3">
                      <img
                        className="mr-3"
                        src={circleflg}
                        alt="Generic placeholder image"
                      />
                      <div className="media-body">
                        <h5 className="mt-0">{this.state.main_country}</h5>
                      </div>
                    </div>

                    <div className="row view-app-detail">
                      <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                        Date Client Added :
                      </div>
                      <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                        {this.state.student_created}
                      </div>
                      {/* <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Applications sent on behalf :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.university_name}
											</div>
											<div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Formee Express ID :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.student_id}
											</div>
											<div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Application ID :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.app_id}
											</div>
											<div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Course ID :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.course_id}
											</div>
											<div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Program :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.course_name}
											</div>
											<div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
												Level :
</div>
											<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
												{this.state.stu_edu.edu_edulevel}
											</div> */}
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="col-12 row">
                      <div className="pl-0 col-4">
                        <label className="card-label mb-2">ESL:</label>
                        <select
                          class="form-control w-100 checksame"
                          value=""
                          id=""
                          name=""
                          required=""
                        >
                          {/* <option value="">{this.state.course_startdate}</option> */}
                        </select>
                      </div>
                      <div className="col-6 drop-field">
                        <label className="card-label mb-2">
                          APPLICATION SENT ON BEHALF:
                        </label>
                        <span className="app-re-btn">
                          {" "}
                          {this.state.university_name}
                          {/* {this.getAppstatus(this.state.main_status)} */}
                        </span>
                      </div>
                    </div>
                    {/**end of Tab_content**/}
                    {/**Tab_content**/}
                    <div className="px-0 col-12 mt-3 view-application-tab">
                      <div className="row">
                        <div className="profile-student col-12">
                          <div className="tab-content border-transparent	">
                            <div
                              className="tab-pane active px-0"
                              id="tab1"
                              role="tabpanel"
                            >
                              <div className="d-flex justify-content-end col-12"></div>
                              {/**tab1**/}
                              <div id="main">
                                <div className="container px-0">
                                  <div
                                    className="accordion feedback-acc"
                                    id="faq"
                                  >
                                    {/**accordian_1**/}
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead1"
                                      >
                                        <a
                                          className="btn btn-header-link"
                                          data-target="#faq1"
                                          aria-expanded="true"
                                          aria-controls="faq1"
                                          data-toggle="collapse"
                                        >
                                          General Information
                                        </a>
                                      </div>
                                      <div
                                        id="faq1"
                                        className="collapse show"
                                        aria-labelledby="faqhead1"
                                        data-parent="#faq"
                                      >
                                        <div className="card-body">
                                          <div className="row view-app-detail">
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Formee Express ID :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .student_id
                                              }
                                              {/* {this.state.chaticonaction == true ? <img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon" onClick={() => this.commandfieldmodel('student_id')} />
																							: null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Student Name :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .first_name
                                              }{" "}
                                              {
                                                this.state.stu_personal
                                                  .last_name
                                              }
                                              {this.state.first_namefieldname ==
                                                "first_name" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "first_name"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .first_namefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "first_name"
                                                        )
                                                      }
                                                    />
                                                  ) : null}
                                              {/* {this.getIndex("first_name", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('first_name')} /> : null } */}
                                              {/* {this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('first_name')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Login Email :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.login_email}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Primary Email :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .addr_email
                                              }

                                              {this.state.addr_emailfieldname ==
                                                "addr_email" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "addr_email"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .addr_emailfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "addr_email"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("addr_email", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('addr_email')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('addr_email')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Birthday :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .dateof_birth
                                              }

                                              {this.state
                                                .dateof_birthfieldname ==
                                                "dateof_birth" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "dateof_birth"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .dateof_birthfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "dateof_birth"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("dateof_birth", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('dateof_birth')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('dateof_birth')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Phone Number :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_personal.ph_code}{" "}
                                              {this.state.stu_personal.phone}
                                              {this.state.phonefieldname ==
                                                "phone" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "phone"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .phonefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "phone"
                                                        )
                                                      }
                                                    />
                                                  ) : null}
                                              {/* {this.getIndex("phone", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('phone')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('phone')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              First Language :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .first_language
                                              }

                                              {this.state
                                                .first_languagefieldname ==
                                                "first_language" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "first_language"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .first_languagefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "first_language"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("first_language", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('first_language')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('first_language')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Gender :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_personal.gender}

                                              {this.state.genderfieldname ? (
                                                <div>
                                                  <img
                                                    src={chaticon1}
                                                    alt=""
                                                    className="view-applcn-icon min-chat-icon small-charticons"
                                                    onClick={() =>
                                                      this.getsentmessagebyid(
                                                        "gender"
                                                      )
                                                    }
                                                  />

                                                  {
                                                    this.state
                                                      .genderfieldnamecount
                                                  }
                                                </div>
                                              ) : this.state.chaticonaction ==
                                                true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gender"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("gender", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('gender')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('gender')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Marital Status :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .marital_status
                                              }

                                              {this.state
                                                .marital_statusfieldname ==
                                                "marital_status" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "marital_status"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .marital_statusfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "marital_status"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("marital_status", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('marital_status')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('marital_status')} /> : null} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Passport Number :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_personal
                                                  .passport_no
                                              }

                                              {this.state
                                                .passport_nofieldname ==
                                                "passport_no" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "passport_no"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .passport_nofieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "passport_no"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.getIndex("passport_no", this.state.getmessagebyfields, "fieldname") ?
																						<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																						onClick={() => this.getsentmessagebyid('passport_no')} /> : null }

																						{this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('passport_no')} /> : null} */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/**accordian_2**/}
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead2"
                                      >
                                        <a
                                          className="btn btn-header-link collapsed"
                                          data-target="#faq2"
                                          aria-expanded="true"
                                          aria-controls="faq2"
                                          data-toggle="collapse"
                                        >
                                          Education History
                                        </a>
                                      </div>

                                      <div
                                        id="faq2"
                                        aria-labelledby="faqhead2"
                                        data-parent="#faq"
                                        className="collapse show"
                                      >
                                        <div className="card-body">
                                          <div className="row view-app-detail">
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              COUNTRY OF EDUCATION :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_edu.edu_country}

                                              {this.state
                                                .edu_countryfieldname ==
                                                "edu_country" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "edu_country"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .edu_countryfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "edu_country"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("edu_country", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('edu_country')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('edu_country')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              HIGHEST LEVEL OF EDUCATION :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_edu.edu_edulevel}

                                              {this.state
                                                .edu_edulevelfieldname ==
                                                "edu_edulevel" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "edu_edulevel"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .edu_edulevelfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "edu_edulevel"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("edu_edulevel", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('edu_edulevel')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('edu_edulevel')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>Recent Schools Attended</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              LEVEL OF EDUCATION :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.edulevel}

                                              {this.state.edulevelfieldname ==
                                                "edulevel" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "edulevel"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .edulevelfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "edulevel"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("edulevel", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('edulevel')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('edulevel')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              NAME OF INSTITUTION :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.institute}

                                              {this.state.institutefieldname ==
                                                "institute" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "institute"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .institutefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "institute"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("institute", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('institute')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('institute')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              COUNTRY OF INSTITUTION :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.country}

                                              {this.state.countryfieldname ==
                                                "country" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "country"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .countryfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "country"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("country", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('country')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('country')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              DEGREE AWARDED :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.award}

                                              {this.state.awardfieldname ==
                                                "award" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "award"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .awardfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "award"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("award", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('award')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('award')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              DEGREE AWARDED ON :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.awardon}

                                              {this.state.awardonfieldname ==
                                                "awardon" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "awardon"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .awardonfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "awardon"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("awardon", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('awardon')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('awardon')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              INSTITUTE EMAIL :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.email}

                                              {this.state.emailfieldname ==
                                                "email" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "email"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .emailfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "email"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("email", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('email')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('email')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              INSTITUTE CITY :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.eduhis.city}

                                              {this.state.cityfieldname ==
                                                "city" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "city"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .cityfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "city"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("city", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('city')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('city')} /> : null)} */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/**accordian_3**/}
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead3"
                                      >
                                        <a
                                          className="btn btn-header-link collapsed"
                                          data-target="#faq3"
                                          aria-expanded="true"
                                          aria-controls="faq3"
                                          data-toggle="collapse"
                                        >
                                          Test Scores
                                        </a>
                                      </div>

                                      <div
                                        id="faq3"
                                        aria-labelledby="faqhead3"
                                        data-parent="#faq"
                                        className="collapse show"
                                      >
                                        <div className="card-body">
                                          <div className="row view-app-detail">
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>Test Scores</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              English Exam Type :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_tst.exam_type}

                                              {this.state.exam_typefieldname ==
                                                "exam_type" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "exam_type"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .exam_typefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "exam_type"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("exam_type", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('exam_type')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('exam_type')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Exam Date :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_tst.exam_date}

                                              {this.state.exam_datefieldname ==
                                                "exam_date" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "exam_date"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .exam_datefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "exam_date"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("exam_date", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('exam_date')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('exam_date')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>Input Exact Scores</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              READING SCORES :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_tst.reading_score}

                                              {this.state
                                                .reading_scorefieldname ==
                                                "reading_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "reading_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .reading_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "reading_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("reading_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('reading_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('reading_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              LISTENING SCORES :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .listening_score
                                              }

                                              {this.state
                                                .listening_scorefieldname ==
                                                "listening_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "listening_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .listening_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "listening_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("listening_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('listening_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('listening_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              WRITING SCORES :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_tst.writing_score}

                                              {this.state
                                                .writing_scorefieldname ==
                                                "writing_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "writing_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .writing_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "writing_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("writing_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('writing_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('writing_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              SPEAKING SCORES :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .speaking_score
                                              }

                                              {this.state
                                                .speaking_scorefieldname ==
                                                "speaking_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "speaking_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .speaking_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "speaking_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("speaking_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('speaking_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('speaking_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>Additional Qualifications</b>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>GRE Exam Scores</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              GRE EXAM DATE :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {this.state.stu_tst.gre_exam_date}

                                              {this.state
                                                .gre_exam_datefieldname ==
                                                "gre_exam_date" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_exam_date"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_exam_datefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_exam_date"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_exam_date", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_exam_date')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_exam_date')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>VERBAL</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_verbal_score
                                              }

                                              {this.state
                                                .gre_verbal_scorefieldname ==
                                                "gre_verbal_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_verbal_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_verbal_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_verbal_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_verbal_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_verbal_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_verbal_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_verbal_rank
                                              }

                                              {this.state
                                                .gre_verbal_rankfieldname ==
                                                "gre_verbal_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_verbal_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_verbal_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_verbal_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_verbal_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_verbal_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_verbal_rank')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>QUANTITATIVE</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_quanitative_score
                                              }

                                              {this.state
                                                .gre_quanitative_scorefieldname ==
                                                "gre_quanitative_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_quanitative_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_quanitative_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_quanitative_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_quanitative_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_quanitative_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_quanitative_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_quanitative_rank
                                              }

                                              {this.state
                                                .gre_quanitative_rankfieldname ==
                                                "gre_quanitative_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_quanitative_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_quanitative_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_quanitative_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_quanitative_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_quanitative_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_quanitative_rank')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>WRITING</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_writing_score
                                              }

                                              {this.state
                                                .gre_writing_scorefieldname ==
                                                "gre_writing_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_writing_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_writing_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_writing_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_writing_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_writing_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_writing_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gre_writing_rank
                                              }

                                              {this.state
                                                .gre_writing_rankfieldname ==
                                                "gre_writing_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gre_writing_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gre_writing_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gre_writing_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gre_writing_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gre_writing_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gre_writing_rank')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>GMAT Exam Scores</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              GMAT EXAM DATE :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_exam_date
                                              }

                                              {this.state
                                                .gmat_exam_datefieldname ==
                                                "gmat_exam_date" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_exam_date"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_exam_datefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_exam_date"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_exam_date", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_exam_date')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_exam_date')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>VERBAL</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_verbal_score
                                              }

                                              {this.state
                                                .gmat_verbal_scorefieldname ==
                                                "gmat_verbal_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_verbal_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_verbal_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_verbal_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_verbal_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_verbal_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_verbal_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_verbal_rank
                                              }

                                              {this.state
                                                .gmat_verbal_rankfieldname ==
                                                "gmat_verbal_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_verbal_rank"
                                                        )
                                                      }
                                                    />
                                                    {
                                                      this.state
                                                        .gmat_verbal_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_verbal_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_verbal_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_verbal_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_verbal_rank')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>QUANTITATIVE</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_quanitative_score
                                              }

                                              {this.state
                                                .gmat_quanitative_scorefieldname ==
                                                "gmat_quanitative_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_quanitative_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_quanitative_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_quanitative_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_quanitative_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_quanitative_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_quanitative_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_quanitative_rank
                                              }

                                              {this.state
                                                .gmat_quanitative_rankfieldname ==
                                                "gmat_quanitative_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_quanitative_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_quanitative_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_quanitative_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_quanitative_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_quanitative_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_quanitative_rank')} /> : null)}
																								 */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>WRITING</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_writing_score
                                              }

                                              {this.state
                                                .gmat_writing_scorefieldname ==
                                                "gmat_writing_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_writing_score"
                                                        )
                                                      }
                                                    />
                                                    {
                                                      this.state
                                                        .gmat_writing_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_writing_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_writing_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_writing_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_writing_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_writing_rank
                                              }

                                              {this.state
                                                .gmat_writing_rankfieldname ==
                                                "gmat_writing_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_writing_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_writing_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_writing_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_writing_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_writing_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_writing_rank')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                                              <b>TOTAL</b>
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Score :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_total_score
                                              }

                                              {this.state
                                                .gmat_total_scorefieldname ==
                                                "gmat_total_score" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_total_score"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_total_scorefieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_total_score"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_total_score", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_total_score')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_total_score')} /> : null)} */}
                                            </div>
                                            <div className="col-12 col-sm-4 col-lg-4 col-md-4 col-xl-4 view-app-left">
                                              Rank % :
                                            </div>
                                            <div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
                                              {
                                                this.state.stu_tst
                                                  .gmat_total_rank
                                              }

                                              {this.state
                                                .gmat_total_rankfieldname ==
                                                "gmat_total_rank" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "gmat_total_rank"
                                                        )
                                                      }
                                                    />

                                                    {
                                                      this.state
                                                        .gmat_total_rankfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "gmat_total_rank"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																							(this.getIndex("gmat_total_rank", this.state.getmessagebyfields, "fieldname") ?
																								<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																									onClick={() => this.getsentmessagebyid('gmat_total_rank')} /> : null) :
																							(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																								className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.commandfieldmodel('gmat_total_rank')} /> : null)} */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/**accordian_4**/}
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead4"
                                      >
                                        <a
                                          className="btn btn-header-link"
                                          data-target="#faq4"
                                          aria-expanded="true"
                                          aria-controls="faq1"
                                          data-toggle="collapse"
                                        >
                                          Document
                                        </a>
                                      </div>

                                      <div
                                        id="faq4"
                                        aria-labelledby="faqhead1"
                                        data-parent="#faq"
                                        className="collapse show"
                                      >
                                        <div className="card-body doc-app">
                                          <div className="row">
                                            <div className=" col-12 ">
                                              {this.state.stu_docfieldname ==
                                                "stu_doc" ? (
                                                  <div>
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticons"
                                                      onClick={() =>
                                                        this.getsentmessagebyid(
                                                          "stu_doc"
                                                        )
                                                      }
                                                    />{" "}
                                                    {
                                                      this.state
                                                        .stu_docfieldnamecount
                                                    }
                                                  </div>
                                                ) : this.state.chaticonaction ==
                                                  true ? (
                                                    <img
                                                      src={chaticon1}
                                                      alt=""
                                                      className="view-applcn-icon min-chat-icon small-charticon"
                                                      onClick={() =>
                                                        this.commandfieldmodel(
                                                          "stu_doc"
                                                        )
                                                      }
                                                    />
                                                  ) : null}

                                              {/* {this.state.getmessagebyfields ?
																						(this.getIndex("stu_doc", this.state.getmessagebyfields, "fieldname") ?
																							<img src={chaticon1} alt="" className="view-applcn-icon min-chat-icon small-charticon"
																								onClick={() => this.getsentmessagebyid('stu_doc')} /> : null) :
																						(this.state.chaticonaction == true ? <img src={chaticon1} alt=""
																							className="view-applcn-icon min-chat-icon small-charticon"
																							onClick={() => this.commandfieldmodel('stu_doc')} /> : null)} */}
                                            </div>
                                          </div>
                                          <div className=" col-12 row">
                                            {this.state.stu_doc.map(
                                              (doc, index) => (
                                                <div className="col-4 text-center mt-4 mb-2">
                                                  <div className="pt-3 view-app-file">
                                                    <a
                                                      className="custumelisting-files py-0"
                                                      href={
                                                        baseurl +
                                                        this.state.stu_doc[
                                                        index
                                                        ]
                                                      }
                                                      target="_blank"
                                                    >
                                                      <img
                                                        src={admin_url + doc}
                                                        alt=""
                                                      />
                                                      <br />
                                                      {
                                                        this.state.org_stu_doc[
                                                        index
                                                        ]
                                                      }{" "}
                                                    </a>
                                                  </div>
                                                  {/* <Button color="primary" onClick={() => this.verifyStudent(this.state.stu_personal.student_id, doc)} className="add-staff-bn mx-auto mt-2 mr-1">Request Verification</Button> */}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* <div className="card">
																			<div className="card-header" id="faqhead4">
																				<a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#notes"
																					aria-expanded="true" aria-controls="faq1">Notes</a>
																			</div>

																			<div id="notes" className="collapse" aria-labelledby="faqhead1" data-parent="#faq">


																				<div className="note-container">

																					{this.state.getnotes.map(getnotes => (

																						<div className="row note-row">
																							<div className="col-md-2 col-lg-2 note-left">
																								<p>{getnotes.created_date}</p>
																							</div>
																							<div className="col-md-9 col-lg-9 note-center">
																								<div className="row">
																									<div className="col-md-11 col-lg-11 note-inner-center">
																										<label className="card-label">{getnotes.heading == "msg" ?
																											<p>Message from university</p>
																											: <p>{getnotes.heading}</p>
																										}</label>
																										<p>{getnotes.message}</p>

																									</div>
																									<div className="col-md-1 col-lg-1 note-inner-right">
																										<img src={Staricon} alt="" />
																									</div>
																								</div>

																							</div>
																							<div className="col-md-1 col-lg-1 note-right">

																							</div>
																						</div>

																					))}
																				</div>


																			</div>
																		</div> */}
                                  </div>
                                </div>
                              </div>
                              {/***end tab1****/}
                              {/***tab2****/}
                            </div>
                            <div className="tab-pane" id="tab2" role="tabpanel">
                              <div className="d-flex justify-content-end col-12"></div>
                              <p>tab2</p>
                            </div>
                            {/***end tab2****/}
                            {/***tab3****/}
                            <div className="tab-pane" id="tab3" role="tabpanel">
                              <p>tab3</p>
                            </div>
                            {/***end tab3****/}
                          </div>
                        </div>
                      </div>
                      {/**End of tab content**/}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 px-0 col-12 uni-add-box mx-auto view-modal-border-left">
                  {this.state.getallmessagecommant.length > 0
                    ? this.state.getallmessagecommant.map((com) => {
                      return (
                        <div className="chatcommant">
                          <h4 className="cmnt-head mb-0 pl-3">{com.group}</h4>
                          <ul className="chatcommantlist pl-0">
                            {com.groupdata.map((s) => {
                              return (
                                <li className="chatcommantitems">
                                  <div
                                    class="px-2 py-2 view-modal-border-down chat-box mr-0"
                                    onClick={() => this.chatcommant(s)}
                                  >
                                    <div className="chat-body w-100">
                                      <img
                                        src={chathead}
                                        alt=""
                                        className="chathead"
                                        width="23"
                                      />{" "}
                                      <img
                                        src={chatgrayhead}
                                        alt=""
                                        className="chatgrayhead"
                                        width="23"
                                      />
                                    </div>
                                    <div className="chat-body">{s.name}</div>
                                    <div className="chat-body">
                                      {moment(s.created_date).format("LTS")}{" "}
                                      {moment(s.created_date).format(
                                        "DD, MMM yyyy"
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })
                    : null}
                  {/* // this.groupBy(response.data, "created_date" getallmessagecommant); */}
                </div>
              </div>
            </div>
          </ModalBody>
          {/* <ModalFooter>

					</ModalFooter> */}
        </Modal>

        {this.state.newFeedback === true
          ? this.state.aplication_feedback.map((item) => {
            return (
              <div className="col-12">
                <div className="complete-box flex-column">
                  <div className="row">
                    <div className="com-top col-6">
                      <img
                        src={Infoicon}
                        alt="home-icon"
                        className="uni-icon pr-2"
                      />{" "}
                      <span className="align-middle">NEW FEEDBACK!</span>
                    </div>
                    <div className="com-top col-6 d-flex justify-content-end">
                      <img
                        src={Closeicon}
                        alt="home-icon"
                        className="uni-icon pr-2"
                        onClick={this.HandleFeedback}
                      />
                    </div>
                  </div>
                  <div className="com-body row">
                    <div className="col-4">
                      <p className="com-text mb-0">
                        <strong>
                          {item.agent_name} from {item.company_name} left
                            comments on your draft application ID:
                            {item.application_id}
                        </strong>
                        <br />
                      </p>
                    </div>
                    <div className="col-2">
                      <p className="com-text mb-0">{item.university_name}</p>
                    </div>
                    <div className="col-3">
                      <p className="com-text mb-0">{item.course_name}</p>
                    </div>
                    <div className="col-3">
                      <button
                        className="score-save btn"
                        onClick={this.togglefeedback1(item)}
                      >
                        View
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : null}
      </div>
    );
  }
}

export default Viewapplications;
