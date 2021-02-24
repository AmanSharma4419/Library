import React, { Component, useContext } from "react";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CreatableSelect from "react-select/creatable";
import { Prompt } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { MailContext } from "../../../context";
import { MaildataContext } from "../../../context/MailContext";

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

import { param } from "jquery";
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
    url: baseurl + `/store_universityoutboxmail`,
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

var ev = [];
class FComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      isTogglebcc: "false",
      selectedFile: null,
      formData: new FormData(),
      type: "Student",
      type_id: localStorage.getItem("studentid"),
      mail_cc: "",
      mail_bcc: "",
      mail_to: "",
      editable: true,
      mail_from: localStorage.getItem("studentemail"),
      subject: "",
      message: "",
      mailCount:
        localStorage.getItem("mailCount") !== null
          ? localStorage.getItem("mailCount")
          : 0,
      editorVal: 0,
      editorState: EditorState.createEmpty(),
    };
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

  componentDidMount() {
    this.getdata();
  }

  getdata = () => {
    const getdataid = sessionStorage.getItem("recomposeid");
    axios
      .get(
        baseurl +
          "/get_universityoutboxmail/" +
          localStorage.getItem("studentid") +
          "/Student"
      )
      .then((response) => {
        console.log("outboxre", response.data.outbox_mail, getdataid);
        // countdata = response.data.mail.length || '0';
        for (var i = 0; i < response.data.outbox_mail.length; i++) {
          if (response.data.outbox_mail[i].id == getdataid) {
            console.log("asdjk", response.data.outbox_mail);
            this.setState({
              mail_cc: response.data.outbox_mail[i].mail_cc,
              mail_bcc: response.data.outbox_mail[i].mail_bcc,
              mail_to: response.data.outbox_mail[i].mail_to,
              subject: response.data.outbox_mail[i].subject,
              message: response.data.outbox_mail[i].message,
              editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(response.data.outbox_mail[i].message)
                )
              ),
              selectedFile: response.data.outbox_mail[i].files,
            });
            ev = response.data.outbox_mail[i].files;
          }
        }
      });
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
    }else if (this.state.subject === "") {
      toast.error("Please Enter Mail Subject.");
      errors = true;
    } 

    // if (this.state.message === "") {
    //   this.setState({message: "."}) 
    // }
    // else if (this.state.message === "") {
    //   toast.error("Please Enter your message.");
    //   errors = true;
    // }
    // } else if (this.state.subject === "") {
    // }
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
      this.state.formData.append("file[]", "");
    }
    this.state.formData.append("type", this.state.type);
    this.state.formData.append("type_id", this.state.type_id);
    this.state.formData.append("mail_from", this.state.mail_from);
    this.state.formData.append("mail_to", this.state.mail_to);
    this.state.formData.append("mail_cc", this.state.mail_cc);
    this.state.formData.append("mail_bcc", this.state.mail_bcc);
    this.state.formData.append("subject", this.state.subject);
    this.state.formData.append("message", this.state.message ? this.state.message : '<p>.</p>');
    this.state.formData.append("is_draft", 1);
    this.state.formData.append("id", sessionStorage.getItem("recomposeid"));
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
          window.location = "/#/maildraft";
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
    console.log("get posst");
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
          //   this.state.formData.append("file[]", ev[i], ev[i].original_name);
          // } else {
          this.state.formData.append("file[]", ev[i], ev[i].name);
          // }
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
      this.state.formData.append("message", this.state.message ? this.state.message : '<p>.</p>');
      this.state.formData.append("is_draft", 0);
      this.state.formData.append("id", sessionStorage.getItem("recomposeid"));
      this.state.formData.append("status", 0);
      // Details of the uploaded file
      console.log(this.state.selectedFile, "checking");

      // Request made to the backend api
      // Send formData object
      submitcomposemail(
        "multipart/form-data",
        this.state.formData,
        (msg) => {
          toast.success("Mail Sent Successfully.");
          this.reset();
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
  };

  reset = () => {
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

  deletemail = () => {
    this.state.formData.append("type", "Student");
    this.state.formData.append("type_id", localStorage.getItem("studentid"));
    this.state.formData.append(
      "composedmail_id",
      sessionStorage.getItem("recomposeid")
    );
    this.state.formData.append("delete_for", "Outbox");
    confirmAlert({
      title: "Confirm",
      message: "Are you sure ?. You need to Remove Outbox Mail",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            submitdeleteAPi(
              "form-data",
              this.state.formData,
              (msg) => {
                toast.success("Outbox Mail Removed Successfully");
                setTimeout(function () {}, 3000);
                window.location = "/#/outboxmail";
              },
              "studentdelete"
            ),
        },
        {
          label: "No",
          onClick: () => this.getdata(),
        },
      ],
    });
  };

  handleSelectChange = (param) => (e) => {
    this.setState({
      subject: e.label,
      isDirty: e.label.length > 0,
      // mail_to: "",
    });
    sub.map((item) => {
      if (item.label === e.label) {
        // this.setState({ mail_to: "test@gmail.com" });
      }
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(this.state.selectedFile, "Compose File");
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
                      <div className="col-sm-4 text-right justify-content-end composemail-head">
                        {/* <select class="form-control w-50 checksame" value="" id="" name="" required="">
                                                <option value="">Recently</option>
                                            </select> */}
                        {/* <Button className="btn btn-primary mr-3">
                          Share Profile
                      </Button> */}
                        <a className="mr-3 pt-1">
                          <img src={vectoricon} alt="" />
                        </a>
                      </div>
                    </Row>
                    <div className="card-body table-responsive px-0 composemail-body">
                      <Card className="mb-0">
                        <form encType="multipart/form-data">
                          <CardHeader style={cardheader}>
                            <label className="customfile-file-input">
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
                                onChange={(event) => this.onFileChange(event)}
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
                            <img
                              src={countryflag}
                              alt=""
                              className="mx-4 hand-cursor"
                              width="15"
                            />
                            {/* <img onClick={() => this.OnDraftSent()}
                            src={drafticon}
                            alt=""
                            className="mx-4"
                            width="15"
                          /> */}
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
                            <img
                              onClick={() => this.OnDraftSent()}
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
                              <CreatableSelect
                                value={[{ label: this.state.subject, valu: 0 }]}
                                components={{
                                  IndicatorSeparator: () => null,
                                  DropdownIndicator: () => null,
                                }}
                                onChange={this.handleSelectChange()}
                                options={sub}
                                placeholder=""
                              />
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
                                ? this.state.selectedFile.map((f) =>
                                    f.name ? (
                                      <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="file-name">
                                          {" "}
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
                                          {f.original_name}
                                        </span>{" "}
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
                            {/* {this.state.selectedFile !== null ? this.state.selectedFile.map(f => (
                            <div>
                              <p>{f.name} <button onClick={() => this.getIndex(f.name, this.state.selectedFile, 'name')}>delete</button></p>
                            </div>
                          )) : ''} */}
                          </CardBody>
                          <CardFooter
                            className="text-muted pb-0"
                            style={cardheader}
                          >
                            <div className="text-right">
                              <a>
                                <img
                                  src={bluesnticon}
                                  alt=""
                                  onClick={this.OnMailSent()}
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

export default FComposeMail;
