import React, { Component } from "react";
import config from "../../../config.json";
import axios from "axios";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import inboxicon from "../../../assets/img/student/inbox-blue.svg";
import senticon from "../../../assets/img/student/sent.svg";
import outboxicon from "../../../assets/img/student/outbox.svg";
import drafticon from "../../../assets/img/student/draft.svg";
import staredicon from "../../../assets/img/student/starred.svg";
import countryflag from "../../../assets/img/student/flag-my-icon.svg";
import livechat from "../../../assets/img/student/live_chat.svg";
import moreicon from "../../../assets/img/student/more.svg";
import forwiocn from "../../../assets/img/student/forward.svg";
import replyicon from "../../../assets/img/student/replay.svg";
import attachicon from "../../../assets/img/student/attach.svg";
import avtivestaricon from "../../../assets/img/student/avtive_star.svg";
import inavtivestaricon from "../../../assets/img/student/inactive_star.svg";
import bluesnticon from "../../../assets/img/student/blue-snt.svg";
import calendaricon from "../../../assets/img/student/calendar.svg";
import vectoricon from "../../../assets/img/student/vector.svg";
import deleteicon from "../../../assets/img/university/delete.svg";
import chatmessage from "../../../assets/img/student/chatbox.jpg";
import dummylogo from "../../../assets/img/dummy_logo.png";
import CreatableSelect from "react-select/creatable";
import { Scrollbars } from "react-custom-scrollbars";
import { Prompt } from "react-router-dom";
import { data, param } from "jquery";
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

var file_path = `${config.file_url}`;

var sub = [
  { label: "Complaints ", value: 1 },
  { label: "Reports of Abuse", value: 2 },
  { label: "Functionality Error", value: 3 },
  { label: "Block Requests", value: 4 },
];

function submitReadFav(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/university_mailaciton`,
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

function submitdeleteAPi(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/delete_sentmail`,
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
var ev = [];
class MailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      detailsdata: [],
      formData: new FormData(),
      isToggleon: "false",
      forwardFile: null,
      pagename: "",
      path: "",
      agentlist: [],
      isToggleforword: "false",
      page: "",
      count: "",
      isTogglebcc: "false",
      selectedFile: null,
      type: "Student",
      type_id: localStorage.getItem("studentid"),
      mail_cc: "",
      reply_mailto: "",
      mail_bcc: "",
      mail_to: "",
      mail_from: localStorage.getItem("studentemail"),
      subject: "",
      message: "",
      editable: true,
      sharetype: 1,
      hiretype: 1,
      terminatetype: 2,
      mailCount:
        localStorage.getItem("mailCount") !== null
          ? localStorage.getItem("mailCount")
          : 0,
      editorVal: 0,
      editorState: EditorState.createEmpty(),
    };
    this.arr = [];
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    //alert(convertToRaw(this.state.editorState.getCurrentContent()));
  };

  changeEditor = (val) => {
    if (this.state.editorVal == 0) {
      this.setState({ editorVal: 1 });
    } else {
      this.setState({ editorVal: 0 });
    }
  };

  handleChangemailmessage = (evt) => {
    this.setState({ message: evt.target.value });
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

  componentWillMount() {
    this.getdata();
    const detail = JSON.parse(sessionStorage.getItem("mdetail")) || "";
    // console.log('asd1', detail)
    this.setState({
      pagename: detail.type,
      path: detail.pathName,
      count: detail.count,
      page: detail.page,
    });
    // this.setState({ detailsdata: JSON.parse(sessionStorage.getItem('mdetail')) });
  }

  getdata = () => {
    localStorage.removeItem("storeagentid");
    const maildata = JSON.parse(sessionStorage.getItem("mdetail"));
    // console.log('asd', maildata)

    axios
      .get(
        baseurl +
        "/get_studentdetailpage/" +
        localStorage.getItem("studentid") +
        "/Student/" +
        maildata.id
      )
      .then((response) => {

        this.setState({
          detailsdata: response.data.result,
          agentlist: response.data.cr_result
        });
        console.log('viewdetailsfor agent', response.data.result);
        if (response.data.result[0].type == "Student") {
          if (response.data.result[0].agent_id !== null) {
            localStorage.setItem('storeagentid', response.data.result[0].agent_id);
            this.getmailcond();
          }
        }
      });
  };

  getmailcond = () => {

    const astoredata = localStorage.getItem("storeagentid");


    if (astoredata !== 'null') {
      this.setState({ agentiddata: astoredata });
      // console.log("id - -", astoredata);     
      this.setState({
        sharetype: 0,
        hiretype: 0,
        terminatetype: 2,
      });
      axios
        .get(baseurl + "/get_clientsharedlist/" + astoredata)
        .then((response) => {
          console.log("agentdetails", response.data);
          for (let i = 0; i < response.data.student_list.length; i++) {
            if (
              response.data.student_list[i].student_id ==
              localStorage.getItem("studentid")) {
              console.log("agentdetails2", response.data.student_list[i]);
              if (response.data.student_list[i].agent_id == astoredata) {
                console.log("agentdetails3", response.data.student_list[i]);
                this.setState({
                  sharetype: response.data.student_list[i].is_shared,
                  hiretype: 0,
                });
              }
            }

          }
        });
      axios
        .get(baseurl + "/get_clienthiredlist/" + astoredata)
        .then((response) => {
          console.log("agentdetailshire", response.data);
          for (let i = 0; i < response.data.student_list.length; i++) {
            if (
              response.data.student_list[i].student_id ==
              localStorage.getItem("studentid")) {
              console.log('get_clienthiredlist1', response.data.student_list[i])
              if (response.data.student_list[i].agent_id == astoredata) {
                console.log('get_clienthiredlist2', response.data.student_list[i]);
                this.setState({
                  sharetype: 1,
                  hiretype: response.data.student_list[i].is_hired,
                  terminatetype: 1,
                });
              }
            }

          }
        });
    }
  };

  shareprofile = (val) => {
    const astoredata = localStorage.getItem("storeagentid");
    if (astoredata) {
      if (val === "Share") {
        this.setState({ sharetype: 1 });
      }
      if (val === "Hire") {
        this.setState({ hiretype: 1 });
      }
      this.state.formData.append("type", val);
      this.state.formData.append("agent_id", astoredata);
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


  updateterminateStatus = () => {
    const astoredata = localStorage.getItem("storeagentid");
    if (astoredata) {
      this.state.formData.append("agent_id", astoredata);
      this.state.formData.append(
        "student_id",
        localStorage.getItem("studentid")
      );
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
                    window.location.reload();
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

  // .get(baseurl + "/get_studentdetailpage/" + maildata.type_id + "/" + maildata.types + "/" + maildata.id)

  handlestarred = (datas) => {
    this.state.formData.append("type", "Student");
    this.state.formData.append("type_id", localStorage.getItem("studentid"));
    this.state.formData.append("action_type", "Favourite");
    this.state.formData.append("composedmail_id", datas.id);
    this.state.formData.append("status", datas.starred);
    submitReadFav(
      "form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success("Starred Mail Successfully");
          setTimeout(function () { }, 3000);
          this.getdata();
        } else {
          toast.success(msg.message);
        }
      },
      "studentreadfav"
    );
  };

  deletemail = (ids) => {
    console.log("delete details", ids);
    const maildata = JSON.parse(sessionStorage.getItem("mdetail"));
    this.state.formData.append("type", "Student");
    this.state.formData.append("type_id", localStorage.getItem("studentid"));
    this.state.formData.append("composedmail_id", ids.did);
    this.state.formData.append(
      "delete_for",
      ids.type ? ids.type : maildata.type
    );
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to permanently delete this email?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            submitdeleteAPi(
              "form-data",
              this.state.formData,
              (msg) => {
                if (msg.status_code == 200) {
                  toast.success("Mail Removed Successfully");
                  setTimeout(function () { }, 3000);
                  // this.getdata();
                  window.location = ids.path;
                } else {
                  toast.success(msg.message);
                }
              },
              "studentdelete"
            ),
        },
        {
          label: "No",
          onClick: () => (window.location = "/#/maildetail"),
        },
      ],
    });
  };

  handleSelectChange = (param) => (e) => {
    this.setState({ subject: e.label });
  };

  onFileChange = (event) => {
    // debugger;
    // Update the state
    if (event.target.files.length !== 0) {
      // const arr = [];
      // ev = [];
      for (var i = 0; i < event.target.files.length; i++) {
        // arr.push(event.target.files[i]);
        ev.push(event.target.files[i]);
      }
      this.setState({ selectedFile: ev });
      document.getElementById("file").value = "";
      // console.log('hhh', ev)
    }
  };

  validate = () => {
    let errors = false;
    if (this.state.mail_to === "") {
      toast.error("Please Enter Recepient Mail.");
      errors = true;
    }
    // } else if (this.state.subject === "") {
    // }
    return errors;
  };
  validate1 = () => {
    let errors = false;
    if (this.state.reply_mailto === "") {
      toast.error("Please Enter Recepient Mail.");
      errors = true;
    }
    // } else if (this.state.subject === "") {
    // }
    return errors;
  };
  bcc = (data) => {
    // console.log('a', data); this.setState({
    this.setState({ isTogglebcc: data, mail_bcc: "" });
  };

  OnMailForward = (param) => (e) => {
    // debugger;
    const ptype = JSON.parse(sessionStorage.getItem("mdetail"));
    console.log("get posst forword");
    this.setState({ isDirty: false });
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
    } else {
      // const formData = new FormData();

      // Update the formData object
      if (ev.length !== 0) {
        for (let i = 0; i < ev.length; i++) {
          // if (ev[i].original_name) {
          //     this.state.formData.append("file[]", ev[i], ev[i].original_name);
          // } else {
          this.state.formData.append("file[]", ev[i], ev[i].name);
          // }
        }
      } else {
        this.state.formData.append("file", "");
      }
      // Update the formData object
      // formData.append("file[]", this.state.detailsdata.file);
      this.state.formData.append("type", this.state.type);
      this.state.formData.append("type_id", this.state.type_id);
      this.state.formData.append("mail_from", this.state.mail_from);
      this.state.formData.append("mail_to", this.state.mail_to);
      this.state.formData.append("mail_cc", this.state.mail_cc || "");
      this.state.formData.append("mail_bcc", this.state.mail_bcc || "");
      this.state.formData.append("subject", this.state.subject);
      this.state.formData.append("agent_id", localStorage.getItem("storeagentid"));
      this.state.formData.append("message", this.state.message);
      this.state.formData.append("parent_mail_id", ptype.id);
      this.state.formData.append("mail_type", "Forward");
      // Details of the uploaded file
      // console.log(this.state.selectedFile, "checking");

      // Request made to the backend api
      // Send formData object
      axios
        .post(baseurl + "/save_universityreplymail", this.state.formData)
        .then((response) => {
          console.log(response, "success");
          if (response.status == 200) {
            toast.success("Forward Mail Sent Successfully.");
            window.location = "/#/sentmail";
          } else {
            toast.success(response.message);
          }
        })
        .catch((err) => {
          console.log(err, "failure");
        });
    }
  };

  OnMailReply = (param) => (e) => {
    // debugger;
    // console.log('get posst reply');
    const ptype = JSON.parse(sessionStorage.getItem("mdetail"));

    this.setState({ isDirty: false });
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
    } else {
      // const formData = new FormData();

      // console.log('ev', ev);
      if (ev.length !== "0") {
        for (let i = 0; i < ev.length; i++) {
          this.state.formData.append("file[]", ev[i], ev[i].name);
          // console.log('file', ev[i].name);
        }
      } else {
        this.state.formData.append("file[]", "");
      }
      // Update the formData object
      // formData.append("file", this.state.detailsdata.file);
      // ptype.type == 'Sent' ? this.state.detailsdata.mail_to : this.state.detailsdata.mail_from)
      this.state.formData.append("type", this.state.type);
      this.state.formData.append("type_id", this.state.type_id);
      this.state.formData.append("mail_from", this.state.mail_from);
      this.state.formData.append("mail_to", this.state.mail_to);
      this.state.formData.append("mail_cc", this.state.mail_cc || "");
      this.state.formData.append("mail_bcc", this.state.mail_bcc || "");
      this.state.formData.append("subject", this.state.subject);
      this.state.formData.append("message", this.state.message);
      this.state.formData.append("agent_id", localStorage.getItem("storeagentid"));
      this.state.formData.append("parent_mail_id", ptype.id);
      this.state.formData.append("mail_type", "Reply");
      // Details of the uploaded file

      // Request made to the backend api
      // Send formData object
      axios
        .post(baseurl + "/save_universityreplymail", this.state.formData)
        .then((response) => {
          // console.log(response, "success");
          console.log(response, "success");
          if (response.status == 200) {
            toast.success("Reply Mail Sent Successfully.");
            window.location = "/#/sentmail";
          } else {
            toast.success(response.message);
          }
        })
        .catch((err) => {
          console.log(err, "failure");
        });
    }
  };
  ViewMeeting = (param) => (e) => {
    // alert(param);
    localStorage.setItem('mailview', 'mail');
    localStorage.setItem('viewmeetingid', param.id);
    localStorage.setItem("meeting_id", param.meeting_id);
    window.location.href = "/#/viewMeeting";
   };
  reset = () => {
    ev = [];
    this.setState({
      mail_to: "",
      mail_cc: "",
      mail_bcc: "",
      subject: "",
      reply_mailto: "",
      message: "",
      isDirty: false,
      selectedFile: null,
    });
    // window.location.href = "/#/inboxmail";
  };

  reply = (data) => {
    this.reset();
    this.setState({ mail_to: "", mail_cc: "", mail_bcc: "", subject: "" });
    const ptype = JSON.parse(sessionStorage.getItem("mdetail"));
    console.log("reply mail", data);
    const cc = data.rpdata.mail_cc ? data.rpdata.mail_cc : "";
    const bcc = data.rpdata.mail_bcc ? data.rpdata.mail_bcc : "";
    const mailmessage =
      "<p></p><p><b>From:</b> " +
      data.rpdata.mail_from +
      "</p><p><b>Sent:</b> " +
      new Date(data.rpdata.updated_date) +
      "</p><p><b>To:</b> " +
      data.rpdata.mail_to +
      "</p><p><b>CC:</b> " +
      cc +
      "</p><p><b>BCC:</b> " +
      bcc +
      "</p><p><b>Subject:</b> " +
      data.rpdata.subject +
      "</p><p>" +
      data.rpdata.message +
      "</p>";

    if (
      data.rpdata.mail_type !== "Reply" ||
      data.rpdata.mail_type !== "Forward"
    ) {
      this.setState({
        isToggleon: "true",
        isToggleforword: "false",
        mail_to:
          ptype.type == "Sent" ? data.rpdata.mail_to : data.rpdata.mail_from,
        mail_cc:
          localStorage.getItem("studentemail") !== data.rpdata.mail_cc
            ? data.rpdata.mail_cc
            : ptype.type == "Sent"
              ? data.rpdata.mail_from
              : data.rpdata.mail_to,
        mail_bcc:
          localStorage.getItem("studentemail") !== data.rpdata.mail_bcc
            ? data.rpdata.mail_bcc
            : "",
        subject: data.rpdata.subject,
        message: mailmessage,
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(mailmessage))
        ),
      });
    }

    if (
      data.rpdata.mail_type === "Reply" ||
      data.rpdata.mail_type === "Forward"
    ) {
      this.setState({
        isToggleon: "true",
        isToggleforword: "false",
        mail_to:
          ptype.type == "Sent" ? data.rpdata.mail_to : data.rpdata.mail_from,
        mail_cc:
          localStorage.getItem("studentemail") !== data.rpdata.mail_cc
            ? data.rpdata.mail_cc
            : ptype.type == "Sent"
              ? data.rpdata.mail_from
              : data.rpdata.mail_to,
        mail_bcc:
          localStorage.getItem("studentemail") !== data.rpdata.mail_bcc
            ? data.rpdata.mail_bcc
            : "",
        subject: data.rpdata.subject,
        message: mailmessage,
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(mailmessage))
        ),
      });
    }
  };

  forwardopt = (data) => {
    console.log("forw", data);
    this.reset();
    this.setState({ mail_to: "", mail_cc: "", mail_bcc: "", subject: "" });
    const cc = data.frdata.mail_cc ? data.frdata.mail_cc : "";
    const bcc = data.frdata.mail_bcc ? data.frdata.mail_bcc : "";
    const mailmessage =
      "<p></p><p><b>From:</b> " +
      data.frdata.mail_from +
      "</p><p><b>Sent:</b> " +
      new Date(data.frdata.updated_date) +
      "</p><p><b>To:</b> " +
      data.frdata.mail_to +
      "</p><p><b>CC:</b> " +
      cc +
      "</p><p><b>BCC:</b> " +
      bcc +
      "</p><p><b>Subject:</b> " +
      data.frdata.subject +
      "</p><p>" +
      data.frdata.message +
      "</p>";

    this.setState({
      isToggleon: "false",
      isToggleforword: "true",
      message: mailmessage,
      subject: data.frdata.subject,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(mailmessage))
      ),
    });
    // ev = datas.frdata.files;
    // console.log(this.state.detailsdata.files);
  };

  handleagentviewClick = data => {
    localStorage.setItem("agentid", data);
    window.location = "/#/preferedpartnerabout";
  }

  handleagentcontactClick = storedata => {
    // console.log('store detail', storedata);
    localStorage.removeItem("agentstore");
    const data = {
      id: storedata.agent_id,
      email: storedata.email,
    };
    localStorage.setItem("agentstore", JSON.stringify(data));
    window.location = "/#/composemail";
  };

  handleSelectChange = (param) => (e) => {
    this.setState({ subject: e.label, isDirty: e.label.length > 0 });
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

  render() {
    const { editorState } = this.state;

    const imgpath = `${config.baseurl}`;
    // const d = this.state.detailsdata;
    const drf = this.state.detailsdata;

    $(".editorClass").css("display", "none");
    // const c = this.state.detailsdata;
    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="2" sm="1" xl="1" md="1" lg="1" className="pr-0">
                <div className="stud-left uni-right-border">
                  <CardBody className="pr-0 pt-1">
                    <ListGroup className="left-list float-right">
                      <a href="/#/inboxmail">
                        <ListGroupItem
                          className={
                            this.state.path == "/#/inboxmail"
                              ? "active list-group-item"
                              : ""
                          }
                        >
                          <img src={inboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/sentmail">
                        <ListGroupItem
                          className={
                            this.state.path == "/#/sentmail"
                              ? "active list-group-item"
                              : ""
                          }
                        >
                          <img src={senticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/outboxmail">
                        <ListGroupItem
                          className={
                            this.state.path == "/#/outboxmail"
                              ? "active list-group-item"
                              : ""
                          }
                        >
                          <img src={outboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/maildraft">
                        <ListGroupItem
                          className={
                            this.state.path == "/#/maildraft"
                              ? "active list-group-item"
                              : ""
                          }
                        >
                          <img src={drafticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/starredmail">
                        <ListGroupItem
                          className={
                            this.state.path == "/#/starredmail"
                              ? "active list-group-item"
                              : ""
                          }
                        >
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
              <Col xs="10" sm="11" xl="9" md="11" lg="9" className="px-0 pr-2">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0 uni-right-border">
                    <Row>
                      <div className="col-sm-8 px-3">
                        <div className="d-flex m-auto">
                          <h3>
                            {this.state.page}{" "}
                            <span className="font-12 pt-2 pl-2">
                              {" "}
                              (You have {this.state.count} message)
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-sm-4 text-right justify-content-end composemail-head">
                        {/* <select className="form-control w-50 checksame" value="" id="" name="" required="">
                                                <option value="">Recently</option>
                                            </select> */}
                        {/* <Button className="btn btn-primary mr-3">Share Profile</Button> */}
                        {this.state.sharetype !== 1 ? (
                          <Button
                            className="btn btn-primary mr-3"
                            onClick={() => this.shareprofile("Share")}
                          >
                            Share Profile
                          </Button>
                        ) : (
                            ""
                          )}
                        {this.state.hiretype !== 1 ? (
                          <Button
                            className="btn btn-primary mr-3"
                            onClick={() => this.shareprofile("Hire")}
                          >
                            Hire Profile
                          </Button>
                        ) : (
                            ""
                          )}
                        {this.state.hiretype == 1 ? (
                          this.state.terminatetype !== 2 ? (
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
                          )}
                        <a href="/#/composemail" className="mr-3 pt-1">
                          <img src={vectoricon} alt="" />
                        </a>
                      </div>
                    </Row>
                    {/* {d ? */}
                    <Scrollbars style={{ height: 330 }}>
                      <div className="view-message">
                        {drf.length !== 0
                          ? drf.map((d) => (
                            <div className="card-body mt-3 table-responsive ">
                              <table className="table">
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {d.is_read ? (
                                        <span className="btn font-12 mail-new-btn">
                                          {d.is_read !== 1 ? "" : ""}
                                        </span>
                                      ) : (
                                          ""
                                        )}
                                    </td>
                                    <td>
                                      <span className="unread-text">
                                        {this.state.page === "Sent"
                                          ? d.mail_from !== ""
                                            ? d.mail_from
                                            : ""
                                          : d.mail_to !== ""
                                            ? d.mail_to
                                            : ""}
                                      </span>
                                    </td>
                                    <td>{d.subject ? d.subject : ""}</td>
                                    <td>
                                      {d.calendar_meeting == "1" ? (
                                        <a className="calen-btn mr-3">
                                          <img src={calendaricon} alt="" onClick={this.ViewMeeting(d)} />
                                        </a>
                                      ) : null}
                                      {d.is_starred == 1 ? (
                                        <a
                                          className="calen-btn mr-3"
                                          onClick={() =>
                                            this.handlestarred({
                                              id: d.id,
                                              starred: 0,
                                            })
                                          }
                                        >
                                          <img src={avtivestaricon} alt="" />
                                        </a>
                                      ) : (
                                          <a
                                            className="calen-btn mr-3"
                                            onClick={() =>
                                              this.handlestarred({
                                                id: d.id,
                                                starred: 1,
                                              })
                                            }
                                          >
                                            <img
                                              src={inavtivestaricon}
                                              alt=""
                                            />
                                          </a>
                                        )}
                                      <a
                                        className="del-btn"
                                        onClick={() =>
                                          this.deletemail({
                                            did: d.id,
                                            type: d.mail_type,
                                            path: this.state.path,
                                          })
                                        }
                                      >
                                        <img
                                          src={deleteicon}
                                          width="16"
                                          alt=""
                                        />
                                      </a>
                                    </td>
                                    <td>
                                      {moment(d.created_date).format(
                                        "MMM DD, YYYY LTS"
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="row">
                                <div className="col-6">
                                  <div className="input-group font-12">
                                    <label className="font-10 pr-3">
                                      FROM:{" "}
                                    </label>
                                    {d.mail_from ? d.mail_from : ""}
                                  </div>
                                  <div className="input-group font-12">
                                    <label className="font-10 pr-3">
                                      TO:{" "}
                                    </label>
                                    {d.mail_to ? d.mail_to : ""}
                                  </div>
                                  <div className="input-group font-12">
                                    <label className="font-10 pr-3">
                                      {d.mail_cc !== "null" &&
                                        d.mail_cc !== null
                                        ? "CC:"
                                        : ""}
                                    </label>
                                    {d.mail_cc !== "null" &&
                                      d.mail_cc !== null
                                      ? d.mail_cc
                                      : ""}
                                  </div>
                                  {/* <div className="input-group font-12"><label className="font-10 pr-3">{d.mail_bcc ? 'BCC:' : ''} </label>{d.mail_bcc ? d.mail_bcc : ''}</div> */}
                                </div>
                                <CardHeader className="text-right col-6">
                                  {this.state.isToggleon == "true" ? (
                                    <img
                                      src={replyicon}
                                      onClick={() =>
                                        this.reply({
                                          rpdata: d,
                                          status: "false",
                                        })
                                      }
                                      alt=""
                                      width="15"
                                      className="mr-4 hand-cursor"
                                    />
                                  ) : (
                                      <img
                                        src={replyicon}
                                        onClick={() =>
                                          this.reply({
                                            rpdata: d,
                                            status: "true",
                                          })
                                        }
                                        alt=""
                                        width="15"
                                        className="mr-4 hand-cursor"
                                      />
                                    )}
                                  {this.state.forwardopt == "true" ? (
                                    <img
                                      src={forwiocn}
                                      onClick={() =>
                                        this.forwardopt({
                                          frdata: d,
                                          status: "false",
                                        })
                                      }
                                      alt=""
                                      width="15"
                                      className="mr-4 hand-cursor"
                                    />
                                  ) : (
                                      <img
                                        src={forwiocn}
                                        onClick={() =>
                                          this.forwardopt({
                                            frdata: d,
                                            status: "true",
                                          })
                                        }
                                        alt=""
                                        width="15"
                                        className="mr-4 hand-cursor"
                                      />
                                    )}
                                  {/* <img src={moreicon} alt="" width="15" className="" /> */}
                                </CardHeader>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-11">
                                  {/* <pre>
                                                                    {d.message ? d.message : ''}
                                                                </pre> */}
                                  {/* <ContentEditable
                                                                    className="textalleditable"
                                                                    tagName="pre"
                                                                    html={d.message} // innerHTML of the editable div
                                                                    disabled={true}  // use true to disable edition
                                                                    // onChange={this.handleChangemailmessage} // handle innerHTML change
                                                                    onBlur={this.sanitize}
                                                                /> */}
                                  <div className="editable">
                                    <Editor
                                      toolbarHidden={true}
                                      editorState={EditorState.createWithContent(
                                        ContentState.createFromBlockArray(
                                          convertFromHTML(d.message)
                                        )
                                      )}
                                      readOnly={true}
                                      toolbarClassName="toolbarClassName"
                                      wrapperClassName="wrapperClassName textalleditable"
                                      editorClassName="editorClassName"
                                      onEditorStateChange={
                                        this.onEditorStateChange
                                      }
                                    />
                                  </div>

                                  <br />
                                </div>

                              </div>
                              {this.state.agentlist.length > 0 ?
                                <div className="table-section">
                                  {this.state.agentlist.map(agent => (
                                    <div className="row mailer-table mx-0">
                                      <div className="col-3 logo-block"> <img src={agent.company_logo ? agent.company_logo : dummylogo} alt="" width="" /> </div>
                                      <div className="col-5 context-block"> {agent.company_name} </div>
                                      <div className="col-4 btn-mailer">
                                        <button className="px-2 save-btn font-12 btn btn-outline-info mr-2" onClick={() => this.handleagentcontactClick(agent)}> Contact
                                  </button>  <button class="px-2 save-btn font-12 btn btn-outline-info" onClick={() => this.handleagentviewClick(agent.agent_id)}> View Profile
                                  </button> </div>
                                    </div>
                                  ))}
                                  {/* <div className="row mailer-table mx-0">
                                  <div className="col-3 logo-block"> <img src={dummylogo} alt="" width="" /> </div>
                                  <div className="col-5 context-block"> test data </div>
                                  <div className="col-4 btn-mailer">
                                    <button className="px-2 save-btn font-12 btn btn-outline-info mr-2" onClick={()=> this.handleagentcontactClick(agent)}> Contact
                                  </button>  <button className="px-2 save-btn font-12 btn btn-outline-info" onClick={()=> this.handleagentviewClick(agent.agent_id)}> View Profile
                                  </button> </div>
                                </div>
                                <div className="row mailer-table mx-0">
                                  <div className="col-3 logo-block"> <img src={dummylogo} alt="" width="" /> </div>
                                  <div className="col-5 context-block"> test data </div>
                                  <div className="col-4 btn-mailer">
                                    <button className="px-2 save-btn font-12 btn btn-outline-info mr-2"> Contact
                                  </button>  <button className="px-2 save-btn font-12 btn btn-outline-info"> View Profile
                                  </button> </div>
                                </div> */}
                                  {/* <div className="row mt-3 mx-0">
                                  <div className="col-3 mt-4 logo-block"> <a className="see-more-link"> <u>See More </u></a> </div>
                                </div> */}
                                </div> : null}

                              <CardBody className="pl-4">
                                {d.files.length > 0
                                  ? d.files.map((item) => (
                                    <a
                                      className="custumelisting-files"
                                      href={file_path + "/" + item.filename}
                                      target="_blank"
                                    >
                                      <span className="file-name">
                                        {" "}
                                        {item.original_name}
                                      </span>
                                    </a>
                                  ))
                                  : null}
                              </CardBody>
                            </div>
                          ))
                          : null}
                      </div>
                    </Scrollbars>

                    {/* : null} */}
                    <div className="view-message">
                      {this.state.isToggleon == "true" ? (
                        <div className="card-body reply-message table-responsive composemail-body">
                          <Card className="mb-0">
                            <h6>Reply</h6>
                            <form
                              onSubmit={this.OnMailReply()}
                              encType="multipart/form-data"
                            >
                              <div className="row">
                                <CardHeader className="text-right col-12">
                                  <label className="customfile-file-input">
                                    <a className="mx-4 align-middle black">
                                      <img
                                        src={bluesnticon}
                                        alt=""
                                        onClick={this.OnMailReply()}
                                        className="hand-cursor"
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
                                      onClick={() => this.changeEditor("1")}
                                      className="mx-4 align-middle black hand-cursor"
                                    >
                                      Aa
                                    </span>
                                  </a>
                                  {this.state.isTogglebcc == "true" ? (
                                    <a onClick={() => this.bcc("false")}>
                                      <span className="mx-4 align-middle hand-cursor">
                                        Bcc
                                      </span>
                                    </a>
                                  ) : (
                                      <a onClick={() => this.bcc("true")}>
                                        <span className="mx-4 align-middle hand-cursor">
                                          Bcc
                                      </span>
                                      </a>
                                    )}

                                  {/* <img src={moreicon} alt="" width="15" className="ml-4" /> */}
                                </CardHeader>
                                <div className="col-12">
                                  <InputGroup
                                    className="my-0"
                                    style={inputgroupbox}
                                  >
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
                                        this.setState({
                                          mail_to: e.target.value,
                                        });
                                      }}
                                      readOnly
                                    />
                                  </InputGroup>
                                  <InputGroup
                                    className="my-0"
                                    style={inputgroupbox}
                                  >
                                    <InputGroupAddon
                                      addonType="prepend"
                                      style={inputgroup}
                                    >
                                      From:
                                    </InputGroupAddon>
                                    <Input
                                      id="to"
                                      className="mailform"
                                      value={this.state.mail_from}
                                      readOnly
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
                                      value={
                                        this.state.mail_cc === "null" ||
                                          this.state.mail_cc === null
                                          ? ""
                                          : this.state.mail_cc
                                      }
                                      onChange={(e) => {
                                        this.setState({
                                          mail_cc: e.target.value,
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
                                        value={
                                          this.state.mail_bcc === "null" ||
                                            this.state.mail_bcc === null
                                            ? ""
                                            : this.state.mail_bcc
                                        }
                                        onChange={(e) => {
                                          this.setState({
                                            mail_bcc: e.target.value,
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
                                  <br />
                                  <br />

                                  {/* <Input
                                                                    style={inputgroupbox}
                                                                    type="textarea"
                                                                    name="text"
                                                                    id="messageText"
                                                                    placeholder="Message Here"
                                                                    multiple
                                                                    rows="10"
                                                                    value={this.state.message}
                                                                    onChange={(e) => {
                                                                        this.setState({ message: e.target.value });
                                                                    }}
                                                                /> */}

                                  {/* <ContentEditable
                                                                    className="textalleditable"
                                                                    tagName="pre"
                                                                    html={this.state.message} // innerHTML of the editable div
                                                                    disabled={!this.state.editable}  // use true to disable edition
                                                                    onChange={this.handleChangemailmessage} // handle innerHTML change
                                                                    onBlur={this.sanitize}
                                                                /> */}

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
                                      onEditorStateChange={
                                        this.onEditorStateChange
                                      }
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

                                </div>
                              </div>
                              {this.state.agentlist.length > 0 ?
                                <div className="table-section">
                                  {this.state.agentlist.map(agent => (
                                    <div className="row mailer-table mx-0">
                                      <div className="col-3 logo-block"> <img src={agent.company_logo ? agent.company_logo : dummylogo} alt="" width="" /> </div>
                                      <div className="col-5 context-block"> {agent.company_name} </div>
                                      <div className="col-4 btn-mailer">
                                        <button className="px-2 save-btn font-12 btn btn-outline-info mr-2" onClick={() => this.handleagentcontactClick(agent)}> Contact
                                  </button>  <button class="px-2 save-btn font-12 btn btn-outline-info" onClick={() => this.handleagentviewClick(agent.agent_id)}> View Profile
                                  </button> </div>
                                    </div>
                                  ))}

                                </div> : null}
                              <CardBody className="pl-4"></CardBody>
                              <CardFooter className="text-muted pb-0">
                                <div className="text-right">
                                  <a>
                                    <img
                                      src={bluesnticon}
                                      alt=""
                                      onClick={this.OnMailReply()}
                                      className="hand-cursor"
                                    />
                                  </a>
                                </div>
                              </CardFooter>
                            </form>
                          </Card>
                        </div>
                      ) : null}

                      {this.state.isToggleforword == "true" ? (
                        <div className="card-body reply-message table-responsive composemail-body">
                          <Card className="mb-0">
                            <h6>Forward</h6>
                            <form
                              onSubmit={this.OnMailForward()}
                              encType="multipart/form-data"
                            >
                              <div className="row">
                                <CardHeader className="text-right col-12">
                                  <label className="customfile-file-input ">
                                    <img
                                      src={attachicon}
                                      style={{ cursor: "pointer" }}
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
                                      className="cursor-issue"
                                    />
                                  </label>

                                  <a onClick={() => this.changeEditor("1")}>
                                    <span
                                      onClick={() => this.changeEditor("1")}
                                      className="mx-4 align-middle black hand-cursor"
                                    >
                                      Aa
                                    </span>
                                  </a>
                                  {this.state.isTogglebcc == "true" ? (
                                    <a onClick={() => this.bcc("false")}>
                                      <span className="mx-4 align-middle hand-cursor">
                                        Bcc
                                      </span>
                                    </a>
                                  ) : (
                                      <a onClick={() => this.bcc("true")}>
                                        <span className="mx-4 align-middle hand-cursor">
                                          Bcc
                                      </span>
                                      </a>
                                    )}

                                  {/* <img src={moreicon} alt="" width="15" className="ml-4" /> */}
                                </CardHeader>
                                <div className="col-12">
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
                                    value={"FW: " + this.state.fwdmsg.subject}
                                    onChange={(e) => {
                                      this.setState({
                                        subject: e.target.value,
                                      });
                                    }}
                                  /> */}

                                    <CreatableSelect
                                      value={[
                                        { label: this.state.subject, value: 0 },
                                      ]}
                                      components={{
                                        IndicatorSeparator: () => null,
                                        DropdownIndicator: () => null,
                                      }}
                                      onChange={this.handleSelectChange()}
                                      options={sub}
                                      placeholder=""
                                    />
                                  </InputGroup>
                                  <InputGroup
                                    className="my-0"
                                    style={inputgroupbox}
                                  >
                                    <InputGroupAddon
                                      addonType="prepend"
                                      style={inputgroup}
                                    >
                                      From:
                                    </InputGroupAddon>
                                    <Input
                                      id="to"
                                      className="mailform"
                                      value={this.state.mail_from}
                                      readOnly
                                    />
                                  </InputGroup>
                                  {/* <div><label>FROM: </label>{d.mail_from}</div> */}
                                  <InputGroup
                                    className="my-0"
                                    style={inputgroupbox}
                                  >
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
                                        this.setState({
                                          mail_to: e.target.value,
                                          isDirty: e.target.value.length > 0,
                                        });
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
                                      value={
                                        this.state.mail_cc === "null" ||
                                          this.state.mail_cc === null
                                          ? ""
                                          : this.state.mail_cc
                                      }
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
                                        value={
                                          this.state.mail_bcc === "null" ||
                                            this.state.mail_bcc === null
                                            ? ""
                                            : this.state.mail_bcc
                                        }
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
                                      ? this.state.selectedFile.map((f) =>
                                        f.name ? (
                                          <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="file-name">
                                              {f.name}
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
                                        ) : (
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                              <span className="file-name">
                                                {" "}
                                                {f.original_name}{" "}
                                              </span>
                                              <button
                                                className="badge badge-primary badge-pill custome-btn-del"
                                                onClick={() =>
                                                  this.getIndex(
                                                    f.original_name,
                                                    this.state.selectedFile,
                                                    "original_name"
                                                  )
                                                }
                                              >
                                                {" "}
                                                delete
                                              </button>
                                            </li>
                                          )
                                      )
                                      : ""}
                                  </ul>

                                  <br />
                                  <br />
                                  {/* <Input
                                                                    style={inputgroupbox}
                                                                    type="textarea"
                                                                    name="text"
                                                                    id="messageText"
                                                                    placeholder="Message Here"
                                                                    multiple
                                                                    rows="10"
                                                                    value={this.state.message}
                                                                    onChange={(e) => {
                                                                        this.setState({ message: e.target.value, isDirty: e.target.value.length > 0 });
                                                                    }}
                                                                /> */}
                                  {/* <ContentEditable
                                                                    className="textalleditable"
                                                                    tagName="pre"
                                                                    html={this.state.message} // innerHTML of the editable div
                                                                    disabled={!this.state.editable}  // use true to disable edition
                                                                    onChange={this.handleChangemailmessage} // handle innerHTML change
                                                                    onBlur={this.sanitize}
                                                                /> */}

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
                                      onEditorStateChange={
                                        this.onEditorStateChange
                                      }
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
                                </div>

                                {/* {this.state.agentlist.length > 0 ?
                              <div className="table-section">
                                {this.state.agentlist.map(agent => (                              
                                <div className="row mailer-table mx-0">
                                  <div className="col-3 logo-block"> <img src={agent.company_logo ? agent.company_logo : dummylogo} alt="" width="" /> </div>
                                  <div className="col-5 context-block"> {agent.company_name} </div>
                                  <div className="col-4 btn-mailer">
                                    <button className="px-2 save-btn font-12 btn btn-outline-info mr-2" onClick={()=> this.handleagentcontactClick(agent)}> Contact
                                  </button>  <button class="px-2 save-btn font-12 btn btn-outline-info" onClick={()=> this.handleagentviewClick(agent.agent_id)}> View Profile
                                  </button> </div>
                                </div>
                                ))}
                               
                              </div>: null} */}
                              </div>

                              <CardBody className="pl-4"></CardBody>
                              <CardFooter className="text-muted pb-0">
                                <div className="text-right">
                                  <a>
                                    <img
                                      src={bluesnticon}
                                      alt=""
                                      onClick={this.OnMailForward()}
                                    />
                                  </a>
                                </div>
                              </CardFooter>
                            </form>
                          </Card>
                        </div>
                      ) : null}
                    </div>
                    {/* </Scrollbars> */}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="12" xl="2" md="12" lg="2" className="px-0">
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
      // <div></div>
    );
  }
}

export default MailDetail;
