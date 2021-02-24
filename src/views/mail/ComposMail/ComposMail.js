import React, { Component, useContext } from "react";
import cookie from "react-cookies";
import config from "../../../config.json";
import axios from "axios";
import moment from "moment";
import inboxicon from "../../../assets/img/student/inbox-blue.svg";
import senticon from "../../../assets/img/student/sent.svg";
import outboxicon from "../../../assets/img/student/outbox.svg";
import drafticon from "../../../assets/img/student/draft.svg";
import staredicon from "../../../assets/img/student/starred.svg";
import countryflag from "../../../assets/img/student/flag-my-icon.svg";
import livechat from "../../../assets/img/student/live_chat.svg";
import moreicon from "../../../assets/img/student/more.svg";
import attachicon from "../../../assets/img/student/attach.svg";
import bluesnticon from "../../../assets/img/student/blue-snt.svg";
import calendaricon from "../../../assets/img/student/calendar.svg";
import vectoricon from "../../../assets/img/student/vector.svg";
import deleteicon from "../../../assets/img/university/delete.svg";
import chatmessage from "../../../assets/img/student/chatbox.jpg";
import {
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
  Button,
} from "reactstrap";

import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CreatableSelect from "react-select/creatable";
import { MailContext } from "../../../context";
import { MaildataContext } from "../../../context/MailContext";
import { param } from "jquery";
import { Prompt } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import $ from "jquery";
var baseurl = `${config.baseurl}`;
var universityname;
var mailid;
// Importing files for translating
const { translate, languages } = require("@paiva/translation-google");

var baseurl = `${config.baseurl}`;
var sub = [
  { label: "Complaints ", value: 1 },
  { label: "Reports of Abuse", value: 2 },
  { label: "Functionality Error", value: 3 },
  { label: "Block Requests", value: 4 },
];

const cardheader = {
  textAlign: "right",
  backgroundColor: "#fff",
  borderColor: "#fff",
};

const inputgroup = {
  width: "10%",
  backgroundColor: "#f0f3f5",
  borderBottom: "1px solid #c1c1c1",
};
const inputgroupbox = {
  marginBottom: "10px",
};

function submitcomposemail(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/store_universitydraftmail`,
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

function submitsharedemail(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/pp_processaction`,
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

// creating select dropdown list options
function createSelectOptions(langObj) {
  let arrOpt = [];
  for (const key in langObj) {
    // console.log(key);
    arrOpt.push({
      value: key,
      label: (
        <div>
          <img src={countryflag} alt="" className="mx-4" width="15" />
          {langObj[key]}
        </div>
      ),
    });
  }
  return arrOpt;
}

var ev = [];
class ComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      isTogglebcc: "false",
      agentiddata: "",
      selectedFile: null,
      formData: new FormData(),
      type: "Student",
      type_id: localStorage.getItem("studentid"),
      mail_cc: "",
      mail_bcc: "",
      mail_to: "",
      universityiddata: "",
      courseiddata: "",
      mail_from: localStorage.getItem("studentemail"),
      subject: cookie.load("subject") ? cookie.load("subject") : "",
      coursedetails: [],
      message: cookie.load("message") ? cookie.load("message") : "",
      sharetype: 1,
      hiretype: 1,
      terminatetype: 1,
      isEnable: 0,
      editable: true,
      mailCount:
        localStorage.getItem("mailCount") !== null
          ? localStorage.getItem("mailCount")
          : 0,
      editorVal: 0,
      editorState: EditorState.createEmpty(),
      application_advice_flag: false,
      languageCodes: languages,
      language: cookie.load("language") ? cookie.load("language") : "en",
      universityname: "",
      levelname: "",
      sendMessageFromPP : localStorage.getItem("agentstore") != null ? JSON.parse(localStorage.getItem("agentstore")): "",
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    //alert(convertToRaw(this.state.editorState.getCurrentContent()));
  };
  handleChangemailmessage = (evt) => {
    this.setState({ message: evt.target.value });
    // this.setState({editorState:evt.target.value });
  };

  sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] },
  };

  sanitize = () => {
    this.setState({
      message: sanitizeHtml(this.state.message, this.sanitizeConf),
    });
  };

  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  componentDidMount() {
    var mailto =
      localStorage.getItem("fromPage") !== null &&
      localStorage.getItem("fromPage").toString() === "ContactUs"
        ? localStorage.getItem("fromUniversityMail").toString()
        : "";
    localStorage.setItem("fromPage", "");
    this.setState({ mail_to: mailto });
    axios.get(baseurl + "/getadminemail").then((response) => {
      console.log("getadminemail", response.data);
      this.mailid = response.data;
      //  this.setState({ mail_to:response.data});
    });
    var id = localStorage.getItem("universityidvalue");
    axios.get(baseurl + "/getuniversityabout/" + id).then((response) => {
      console.log("universityname inside", response.data);

      this.setState({universityname: response.data[0].institute_name});
      console.log("universityname 1", this.state.universityname);
      if (localStorage.getItem("coursemail")) {
        axios
          .get(
            baseurl +
              "/getcoursedetails/" +
              localStorage.getItem("coursemail") +
              "/" +
              localStorage.getItem("studentid")
          )
          .then((response) => {
            console.log("getcoursedetails", response.data);
            if (response.data.courses !== null)
              console.log("universityname outside", this.state.universityname);

            this.setState({
              levelname: response.data.levelname,
              coursedetails: response.data.courses,
              universityiddata: response.data.courses.university_id,
              courseiddata: response.data.courses.id,
              message:
                "University name:" +
                this.state.universityname +
                "," +
                " " +
                "Tenure:" +
                response.data.courses.tenure +
                "," +
                "Tution fees:" +
                response.data.courses.tution_fee +
                "," +
                " " +
                "Application fees:" +
                response.data.courses.application_fee +
                "," +
                " " +
                "Prerequiste Education:" +
                response.data.levelname +
                " GRADE : MIN:  " +
                response.data.courses.grade_min +
                "- " +
                "Recommented:" +
                response.data.courses.grade_recommended,
              editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(
                    "<p>University name: " +
                      this.state.universityname +
                      "<br/>Tenure: " +
                      response.data.courses.tenure +
                      "<br/>Tution fees: " +
                      response.data.courses.tution_fee +
                      "<br/>Application fees: " +
                      response.data.courses.application_fee +
                      "<br/>Prerequiste Education: " +
                      response.data.levelname +
                      "<br/>GRADE : MIN- " +
                      response.data.courses.grade_min +
                      "% Recommented- " +
                      response.data.courses.grade_recommended +
                      "%</p>"
                  )
                )
              ),
              application_advice_flag: true,
              mail_to: "test@gmail.com",
              subject: "Consultancy Request",
            });
            localStorage.setItem("coursemail", false);
          });
      } else {
        this.setState({
          coursedetails: "",
          message: "",
        });
      }
    });

    const astoredatanew = JSON.parse(localStorage.getItem("agentstore")) || null;
    if (astoredatanew !== null) {
      this.setState({ 
      mail_to: astoredatanew.email,
      subject: "Preferred Partner Request", 
    });
  }
    //alert(localStorage.getItem("coursemail"));

    // console.log('localStorage.getItem',JSON.parse(localStorage.getItem("agent")));
    //const data = {id: '33', email: 'a@gmail.com'};
    //localStorage.setItem('agentstore', JSON.stringify(data));
    if (!this.state.application_advice_flag) {
      this.getmailcond();
    }
  }

  getmailcond = () => {
    const astoredata = JSON.parse(localStorage.getItem("agentstore")) || null;

    if (astoredata !== null) {
      this.setState({ agentiddata: astoredata.id });
      // console.log("id - -", astoredata);
      this.setState({
        sharetype: 0,
        hiretype: 0,
        mail_to: astoredata.email,
        terminatetype: 1,
      });

      axios
        .get(baseurl + "/get_clientsharedlist/" + astoredata.id)
        .then((response) => {
          // console.log("agentdetails", response.data);
          for (let i = 0; i < response.data.student_list.length; i++) {
            if (
              response.data.student_list[i].student_id ==
                localStorage.getItem("studentid") &&
              response.data.student_list[i].agent_id == astoredata.id
            ) {
              console.log("clientShared", response.data[i]);
              this.setState({
                sharetype: response.data.student_list[i].is_shared,
                // hiretype: response.data.student_list[i].is_hired,
                // terminatetype: 0,
              });
            }
          }
        });
      axios
        .get(baseurl + "/get_clienthiredlist/" + astoredata.id)
        .then((response) => {
          console.log("agentdetailshire", response.data);
          for (let i = 0; i < response.data.student_list.length; i++) {
            if (
              response.data.student_list[i].student_id ==
                localStorage.getItem("studentid") &&
              response.data.student_list[i].agent_id == astoredata.id
            ) {
              console.log("clientHired", response.data.student_list[i]);
              this.setState({
                sharetype: response.data.student_list[i].is_shared,
                hiretype: response.data.student_list[i].is_hired,
                terminatetype: 0,
              });
            }
          }
        });
    }
  };

  updateterminateStatus = () => {
    const astoredata = JSON.parse(localStorage.getItem("agentstore")) || null;
    if (astoredata !== null) {
      this.state.formData.append("agent_id", astoredata.id);
      this.state.formData.append(
        "student_id",
        localStorage.getItem("studentid")
      );
      this.state.formData.append("is_terminated", 1);
      this.state.formData.append("is_hired", 0);
      this.state.formData.append("is_shared", 0);
      confirmAlert({
        title: "",
        message: "Do you want to continue?",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              axios
                .post(
                  baseurl + "/delete_agent_eligibility",
                  this.state.formData
                )
                .then((response) => {
                  // console.log(response, "success");
                  if (response.data.status_code == 200) {
                    toast.success("Terminate Contract Successfully.");
                    this.setState({
                      terminatetype: 1,
                      sharetype: 0,
                      hiretype: 0,
                    });
                    // window.location.reload();
                  } else {
                    toast.error(response.message);
                  }
                })
                .catch((err) => {
                  console.log(err, "failure");
                }),
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  onFileChange = (event) => {
    // debugger;
    // Update the state

    if (event.target.files.length !== 0) {
      // const arr = [];
      for (var i = 0; i < event.target.files.length; i++) {
        // arr.push(event.target.files[i]);
        ev.push(event.target.files[i]);
      }
      this.setState({ selectedFile: ev });
      document.getElementById("file").value = "";
      // console.log('hhh', ev)
    }
  };

  // fileupload = (ev) => {
  //   console.log('file', ev);
  //   if (ev.length !== 0) {
  //     for (let i = 0; i < ev.length; i++) {
  //       this.state.formData.append('file', ev[i], ev[i].name);
  //       console.log('file', ev[i].name);
  //     }
  //   }

  // }

  validate = () => {
    let errors = false;
    if (this.state.mail_to === "") {
      toast.error("Please Enter Recepient Mail.");
      errors = true;
    } else if (this.state.subject === "") {
      toast.error("Please Enter Mail Subject.");
      errors = true;
    }

    return errors;
  };

  bcc = (data) => {
    // console.log('a', data); this.setState({
    this.setState({ isTogglebcc: data, mail_bcc: "" });
  };

  OnDraftSent = (e) => {
    // debugger;
    // console.log('get posst');

    // const formData = new FormData();
    this.setState({ isDirty: false });
    // Update the formData object
    if (ev.length !== 0) {
      for (let i = 0; i < ev.length; i++) {
        this.state.formData.append("file[]", ev[i], ev[i].name);
        // console.log('file', ev[i].name);
      }
    } else {
      this.state.formData.append("file", "");
    }
    this.state.formData.append("type", this.state.type);
    this.state.formData.append("type_id", this.state.type_id);
    this.state.formData.append("mail_from", this.state.mail_from);
    this.state.formData.append("mail_to", this.state.mail_to);
    this.state.formData.append("mail_cc", this.state.mail_cc);
    this.state.formData.append("mail_bcc", this.state.mail_bcc);
    this.state.formData.append("subject", this.state.subject);
    this.state.formData.append(
      "message",
      this.state.message ? this.state.message : "<p>.</p>"
    );
    this.state.formData.append("agent_id", this.state.agentiddata);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("university_id", this.state.universityiddata);
    this.state.formData.append("couse_id", this.state.courseiddata);
    this.state.formData.append("is_draft", 1);
    this.state.formData.append("id", "");
    this.state.formData.append("status", 0);
    // Details of the uploaded file
    // console.log(this.state.selectedFile, "checking");

    // Request made to the backend api
    // Send formData object

    submitcomposemail(
      "multipart/form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success("Draft Mail Added Successfully.");
          this.reset();
        } else {
          toast.success(msg.message);
        }
      },
      "studentcomposemail"
    );

    // axios
    //   .post(baseurl + "/store_universitydraftmail", this.state.formData)
    //   .then((response) => {
    //     console.log(response, "success");
    //     toast.success("Draft Mail Added Successfully.");
    //     // this.reset();
    //   })
    //   .catch((err) => {
    //     console.log(err, "failure");
    //   });
  };

  OnMailSent = (param) => (e) => {
    // debugger;
    // console.log('get posst');
    // const astoredata = JSON.parse(localStorage.getItem("agentstore")) || null;

    if (this.state.isEnable == "0") {
      this.setState({ isDirty: false });
      e.preventDefault();
      const errors = this.validate();
      if (errors) {
      } else {
        // const formData = new FormData();

        // Update the formData object
        if (ev.length !== 0) {
          for (let i = 0; i < ev.length; i++) {
            this.state.formData.append("file[]", ev[i], ev[i].name);
            // console.log('file', ev[i].name);
          }
        } else {
          this.state.formData.append("file", "");
        }
        // formData.append("file", this.state.selectedFile);
        this.state.formData.append("type", this.state.type);
        this.state.formData.append("type_id", this.state.type_id);
        this.state.formData.append("mail_from", this.state.mail_from);
        this.state.formData.append("mail_to", this.state.mail_to);
        this.state.formData.append("mail_cc", this.state.mail_cc);
        this.state.formData.append("mail_bcc", this.state.mail_bcc);
        this.state.formData.append("subject", this.state.subject);
        this.state.formData.append(
          "message",
          this.state.message ? this.state.message : "<p>.</p>"
        );
        this.state.formData.append("agent_id", this.state.agentiddata);
        this.state.formData.append(
          "student_id",
          localStorage.getItem("studentid")
        );
        this.state.formData.append(
          "university_id",
          this.state.universityiddata
        );
        this.state.formData.append("couse_id", this.state.courseiddata);
        this.state.formData.append("is_draft", 0);
        this.state.formData.append("id", "");
        this.state.formData.append("status", 0);
        this.setState({ isEnable: 1 });
        // Details of the uploaded file
        // console.log(this.state.selectedFile, "checking");

        // Request made to the backend api
        // Send formData object
        submitcomposemail(
          "multipart/form-data",
          this.state.formData,
          (msg) => {
            console.log("sent message", msg);
            if (msg.status_code == 200) {
              toast.success("Mail Sent Successfully.");
              this.reset();
            } else {
              toast.success(msg.message);
            }
          },
          "studentcomposemail"
        );
        // axios
        //   .post(baseurl + "/store_universitydraftmail", this.state.formData)
        //   .then((response) => {
        //     console.log(response, "success");
        //     toast.success("Mail Sent Successfully.");
        //     this.reset();
        //   })
        //   .catch((err) => {
        //     console.log(err, "failure");
        //   });
      }
    }
  };

  reset = () => {
    this.setState({ isDirty: false });
    ev = [];
    this.setState({
      mail_to: "",
      mail_cc: "",
      mail_bcc: "",
      subject: "",
      message: "",
      selectedFile: null,
    });
    window.location.href = "/#/sentmail";
  };

  getIndex = (value, arr, prop) => {
    const unmatchdata = [];
    ev = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] !== value) {
        unmatchdata.push(arr[i]);
        ev.push(arr[i]);
      }
    }
    this.setState({ selectedFile: unmatchdata });
    return -1; //to handle the case where the value doesn't exist
  };

  handleSelectChange = (param) => (e) => {
    console.log("ssdsddds", e);
    var PPrequest = JSON.parse(localStorage.getItem("storeagent")) || null;
    this.setState({
      subject: e.label,
      isDirty: e.label.length > 0,
      // mail_to: "",
    });
    if (e.value == 6) {
      this.setState({ mail_to: PPrequest.email });
      console.log("ssdsddds", e);
      return PPrequest.email;
    }
    sub.map((item) => {
      if (item.label != e.label) {
        console.log("inside else");
        this.setState({ mail_to: "" }, () => {
          console.log("sssas", this);
        });
      } else {
        this.setState({ mail_to: this.mailid }, () => {
          console.log("inside if toooo", this.state.mail_to);
          if (item.value === e.value) {
            this.setState({ mail_to: this.mailid });
          }
        });
      }

      // if (item.value === e.value) {
      //   var email="test@gmail.com"
      //   console.log("inside if",email)
      //    this.setState({ mail_to: email },()=>{
      //     console.log("inside if toooo",this.state.mail_to)

      //    });
      //    console.log("inside if mail",this.state.mail_to)

      // }
    });
  };
  changeEditor = (val) => {
    if (this.state.editorVal == 0) {
      this.setState({ editorVal: 1 });
    } else {
      this.setState({ editorVal: 0 });
    }
  };
  shareprofile = (val) => {
    const astoredata = JSON.parse(localStorage.getItem("agentstore")) || null;
    if (astoredata) {
      if (val === "Share") {
        this.setState({ sharetype: 1 });
      }
      if (val === "Hire") {
        this.setState({ hiretype: 1, sharetype: 1, terminatetype: 0 });
      }
      this.state.formData.append("type", val);
      this.state.formData.append("agent_id", astoredata.id);
      this.state.formData.append(
        "student_id",
        localStorage.getItem("studentid")
      );

      submitsharedemail(
        "multipart/form-data",
        this.state.formData,
        (msg) => {
          console.log("shared message", msg);
          if (msg.status_code == 200) {
            this.getmailcond();
            toast.success(val + "Profile Sent Successfully.");
          } else {
            if (msg.status_code == 0) {
              toast.success(msg.message + "Successfully");
            } else {
              toast.success(msg.message);
            }
          }
        },
        "sharedprofile"
      );
    }
  };

  // Translate text message
  changeHandler = (language) => {
    let subject = this.state.subject;
    let message = this.state.message;
    let cookieLanguage = cookie.load("language");
    let transSubject = "";
    let transMessage = "";

    const translatingSubject = (transSubject) => {
      if (subject !== transSubject) {
        this.setState({ subject: transSubject });
        cookie.save("subject", transSubject, { path: "/" });
      }
    };

    const translatingMessage = (transMessage) => {
      if (message !== transMessage) {
        this.setState({ message: transMessage });
        cookie.save("message", transMessage, { path: "/" });
      }
    };

    if (language !== cookieLanguage) {
      // translate the message when selecting a different language
      translate(subject, { to: language })
        .then((res) => {
          transSubject = res.text;
          translatingSubject(transSubject);
          console.log("Subject", this.state.subject);
        })
        .catch((err) => {
          console.error("Error in translating subject text:", err);
        });

      // translate the message when selecting a different language
      translate(message, { to: language })
        .then((res) => {
          transMessage = res.text;
          translatingMessage(transMessage);
          console.log("Message", this.state.message);
        })
        .catch((err) => {
          console.error("Error in translating message text:", err);
        });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };

  render() {
    const { editorState } = this.state;
    $(".editorClass").css("display", "none");
    // $('.textalleditable').css('display','none');
    // console.log(this.state.selectedFile, "Compose File");

    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="1" xl="1" md="1" lg="1" className="pr-0">
                <div className="stud-left uni-right-border">
                  <CardBody className="pr-0 pt-1">
                    <ListGroup className="left-list float-right">
                      <a href="/#/inboxmail">
                        <ListGroupItem className="active">
                          <img src={inboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/sentmail">
                        <ListGroupItem>
                          <img src={senticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/outboxmail">
                        <ListGroupItem>
                          <img src={outboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/maildraft">
                        <ListGroupItem>
                          <img src={drafticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/starredmail">
                        <ListGroupItem>
                          <img src={staredicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a 
                      // href="/#/"
                      >
                        <ListGroupItem className="pt-5 pr-2 mt-5 mb-5">
                          <img src={livechat} alt="" />
                        </ListGroupItem>
                      </a>
                    </ListGroup>
                  </CardBody>
                </div>
              </Col>
              <Col xs="12" sm="9" xl="9" md="9" lg="9" className="px-0 pr-2">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0 uni-right-border">
                    <Row>
                      <div className="col-sm-8 px-4">
                        <div className="d-flex m-auto">
                          <h3>
                            Create Message
                            <span className="font-12 pt-2 pl-2">
                              (You have {this.state.mailCount} message)
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-sm-4 text-right row justify-content-end composemail-head">
                        {/* <select class="form-control w-50 checksame" value="" id="" name="" required="">
                                                <option value="">Recently</option>
                                            </select> */}
                        {/* {console.log("1", this.state.sharetype)}
                        {this.state.sharetype !== 1 || this.state.terminatetype !== 1 ? (
                          <Button
                            className="btn btn-primary mr-3"
                            onClick={() => this.shareprofile("Share")}
                          >
                            Share Profile
                          </Button>
                        ) : (
                          ""
                        )}
                        {console.log("2", this.state.hiretype)}
                        
                        {this.state.hiretype !== 1 || this.state.terminatetype !== 1 ? (
                          <Button
                            className="btn btn-primary mr-3"
                            onClick={() => this.shareprofile("Hire")}
                          >
                            Hire PP
                          </Button>
                        ) : (
                          ""
                        )}
                        {console.log("3", this.state.hiretype)}
                        {console.log("4", this.state.terminatetype)}
                        {this.state.hiretype == 1 ? (
                          this.state.terminatetype == 1 ? (
                            <Button
                              className="btn btn-danger mr-3"
                              onClick={() => this.updateterminateStatus()}
                            >
                              Terminate Contract
                            </Button>
                          ) : (
                           ""
                          )
                         ) : (
                          ""
                        )} */}
                        {this.state.terminatetype !== 1 ? (
                          <Button
                            className="btn btn-danger mr-3"
                            onClick={() => this.updateterminateStatus()}
                          >
                            Terminate Contract
                          </Button>
                        ) : this.state.hiretype !== 1 ? (
                          this.state.sharetype !== 1 ? (
                            <div>
                              <Button
                                className="btn btn-primary mr-3"
                                onClick={() => this.shareprofile("Share")}
                              >
                                Share Profile
                              </Button>
                              <Button
                                className="btn btn-primary mr-3"
                                onClick={() => this.shareprofile("Hire")}
                              >
                                Hire PP
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="btn btn-primary mr-3"
                              onClick={() => this.shareprofile("Hire")}
                            >
                              Hire PP
                            </Button>
                          )
                        ) : null}
                        <a className="mr-3 pt-1">
                          <img src={vectoricon} alt="" />
                        </a>
                      </div>
                    </Row>
                    <div className="card-body table-responsive px-0 composemail-body">
                      <Card className="mb-0">
                        <form
                          onSubmit={this.OnMailSent()}
                          encType="multipart/form-data"
                        >
                          <CardHeader style={cardheader}>
                            <label className="customfile-file-input">
                              <a className="mx-4 align-middle black hand-cursor">
                                <img
                                  src={bluesnticon}
                                  alt=""
                                  onClick={this.OnMailSent()}
                                />
                              </a>
                              <img
                                src={attachicon}
                                alt=""
                                width="15"
                                className="hand-cursor"
                              />

                              <input
                                id="file"
                                name="file[]"
                                type="file"
                                multiple
                                onChange={(e) => this.onFileChange(e)}
                              />
                            </label>
                            <a onClick={() => this.changeEditor("1")}>
                              <span
                                className="mx-4 align-middle black hand-cursor"
                                onClick={() => this.changeEditor("1")}
                              >
                                Aa
                              </span>
                            </a>
                            <Select
                              className="text-left d-inline-block border w-25"
                              options={createSelectOptions(languages)}
                              onChange={(e) => this.changeHandler(e.value)}
                            />
                            <img
                              onClick={() => this.OnDraftSent()}
                              src={drafticon}
                              alt=""
                              className="mx-4 hand-cursor"
                              width="15"
                            />
                            {this.state.isTogglebcc == "true" ? (
                              <a onClick={() => this.bcc("false")}>
                                <span className="mx-4 align-middle">Bcc</span>
                              </a>
                            ) : (
                              <a onClick={() => this.bcc("true")}>
                                <span className="mx-4 align-middle hand-cursor">
                                  Bcc
                                </span>
                              </a>
                            )}
                            <img
                              onClick={() => this.reset()}
                              src={deleteicon}
                              alt=""
                              width="15"
                              className="mx-4 hand-cursor"
                            />
                            {/* <img
                              src={moreicon}
                              alt=""
                              width="15"
                              className="ml-4"
                            /> */}

                            {/* Language selecting options */}
                          </CardHeader>

                          <CardBody className="pl-4">
                            <InputGroup style={inputgroupbox}>
                              <InputGroupAddon
                                addonType="prepend"
                                style={inputgroup}
                              >
                                SUBJECT:
                              </InputGroupAddon>
                              {/* <Input
                              id="subject"
                              className="mailform to-address"
                              required
                              value={this.state.subject}
                              onChange={(e) => {
                                this.setState({ subject: e.target.value });
                              }}
                            /> */}
                              {this.state.application_advice_flag ? (
                                <CreatableSelect
                                  components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => null,
                                  }}
                                  onChange={this.handleSelectChange()}
                                  options={sub}
                                  placeholder=""
                                  value={[
                                    { label: "Consultancy Request", value: 5 },
                                  ]}
                                  isDisabled
                                />
                              ) : this.state.sendMessageFromPP != "" ? (
                                <CreatableSelect
                                  components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => null,
                                  }}
                                  onChange={this.handleSelectChange()}
                                  options={sub}
                                  placeholder=""
                                  value={[
                                    { label: "Preferred Partner Request", value: 6 },
                                  ]}
                                  isDisabled
                                />
                              ) : (
                                <CreatableSelect
                                  components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => null,
                                  }}
                                  onChange={this.handleSelectChange()}
                                  options={sub}
                                  placeholder=""
                                />)
                              }
                            </InputGroup>

                            <InputGroup className="my-0" style={inputgroupbox}>
                              <InputGroupAddon
                                addonType="prepend"
                                style={inputgroup}
                              >
                                TO:
                              </InputGroupAddon>
                              <Input
                                id="to"
                                className="mailform"
                                value={this.state.mail_to}
                                onChange={(e) => {
                                  this.setState({ mail_to: e.target.value });
                                }}
                              />
                            </InputGroup>

                            <InputGroup style={inputgroupbox}>
                              <InputGroupAddon
                                addonType="prepend"
                                style={inputgroup}
                              >
                                CC:
                              </InputGroupAddon>
                              <Input
                                id="cc"
                                className="mailform"
                                value={this.state.mail_cc}
                                onChange={(e) => {
                                  this.setState({
                                    mail_cc: e.target.value,
                                    isDirty: e.target.value.length > 0,
                                  });
                                }}
                              />
                            </InputGroup>
                            {this.state.isTogglebcc == "true" ? (
                              <InputGroup style={inputgroupbox}>
                                <InputGroupAddon
                                  addonType="prepend"
                                  style={inputgroup}
                                >
                                  BCC:
                                </InputGroupAddon>
                                <Input
                                  id="bcc"
                                  className="mailform"
                                  value={this.state.mail_bcc}
                                  onChange={(e) => {
                                    this.setState({
                                      mail_bcc: e.target.value,
                                      isDirty: e.target.value.length > 0,
                                    });
                                  }}
                                />
                              </InputGroup>
                            ) : null}

                            <ul className="list-group custome-files">
                              {this.state.selectedFile !== null
                                ? this.state.selectedFile.map((f) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                      <span className="file-name">
                                        {" "}
                                        {f.name}{" "}
                                      </span>{" "}
                                      <button
                                        className="badge badge-primary badge-pill custome-btn-del"
                                        onClick={() =>
                                          this.getIndex(
                                            f.name,
                                            this.state.selectedFile,
                                            "name"
                                          )
                                        }
                                      >
                                        {" "}
                                        delete
                                      </button>
                                    </li>
                                  ))
                                : ""}
                            </ul>

                            <Input
                              style={inputgroupbox}
                              type="email"
                              name="email"
                              disabled
                              id="studentmailid"
                              value={"FROM :" + " " + this.state.mail_from}
                              placeholder=""
                            />

                            {/* <Input
                              style={inputgroupbox}
                              type="textarea"
                              name="text"
                              id="messageText"
                              placeholder="Message Here"
                              multiple
                              rows="4"
                              value={this.state.message}
                              onChange={(e) => {
                                this.setState({ message: e.target.value, isDirty: e.target.value.length > 0 });
                              }}
                            /> */}

                            {/* <div className="editable">
                              <Editor
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "remove",
                                    "fontSize",
                                    "link",
                                    "list",
                                    "textAlign",
                                    "history",
                                  ],
                                  inline: { inDropdown: true },
                                  list: { inDropdown: true },
                                  textAlign: { inDropdown: true },
                                  link: { inDropdown: true },
                                  history: { inDropdown: true },
                                }}
                                toolbarHidden={
                                  this.state.editorVal == 1 ? false : true
                                }
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName textalleditable"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                                //initialEditorState={this.state.message}
                                onChange={(e) => {
                                  this.setState({
                                    message: draftToHtml(
                                      convertToRaw(
                                        editorState.getCurrentContent()
                                      )
                                    ),
                                  });
                                }}
                              />
                            </div>
                          */}
                            <div className="editable">
                              <Editor
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "remove",
                                    "fontSize",
                                    "link",
                                    "list",
                                    "textAlign",
                                    "link",
                                    "history",
                                  ],
                                  inline: { inDropdown: true },
                                  list: { inDropdown: true },
                                  textAlign: { inDropdown: true },
                                  link: { inDropdown: true },
                                  history: { inDropdown: true },
                                }}
                                toolbarHidden={
                                  this.state.editorVal == 1 ? false : true
                                }
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName textalleditable"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                                onChange={(e) => {
                                  this.setState({
                                    message: draftToHtml(
                                      convertToRaw(
                                        editorState.getCurrentContent()
                                      )
                                    ),
                                  });
                                }}
                              />
                            </div>
                          </CardBody>
                          <CardFooter
                            className="text-muted pb-0"
                            style={cardheader}
                          >
                            <div className="text-right">
                              <a className="hand-cursor">
                                <img
                                  src={bluesnticon}
                                  alt=""
                                  onClick={this.OnMailSent()}
                                  className="hand-cursor"
                                />
                              </a>
                            </div>
                          </CardFooter>
                        </form>
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="2" xl="2" md="2" lg="2" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0 uni-right-border">
                    <Row>
                      <img src={chatmessage} alt="" className="chat_bot" />
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Prompt
          when={this.state.isDirty}
          message={(location) =>
            confirmAlert({
              title: "Confirm",
              message:
                'Are you sure ?. You want to save the mail to Draft "Click Save" or Dont want to save "Click Cancel"',
              buttons: [
                {
                  label: "Save",
                  onClick: () => this.OnDraftSent(),
                },
                {
                  label: "Cancel",
                  onClick: () => (window.location = "/#" + location.pathname),
                },
              ],
            })
          }
        />
      </div>
    );
  }
}

export default ComposeMail;
